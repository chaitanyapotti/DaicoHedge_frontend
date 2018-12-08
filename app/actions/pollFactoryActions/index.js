import actionTypes from '../../action_types';
import contractInstance from '../../utils/contractInstance';
import config from '../../config';
import web3 from '../../web3Instance';

export const killConsensusReceived = data => ({
  payload: { rec: data },
  type: actionTypes.KILL_CONSENSUS_RECEIVED
});

export const tapConsensusReceived = data => ({
  payload: { rec: data },
  type: actionTypes.TAP_CONSENSUS_RECEIVED
});

export const tapReceived = data => ({
  payload: { rec: data },
  type: actionTypes.CURRENT_TAP_RECEIVED
});

export const voteHistogramReceived = data => ({
  payload: { rec: data },
  type: actionTypes.VOTE_HISTOGRAM_RECEIVED
});

export const remainingBalanceReceived = (etherBalance, daiBalance) => ({
  payload: { etherBalance, daiBalance },
  type: actionTypes.REMAINING_BALANCE_RECEIVED
});

export const getKillConsensus = () => async dispatch => {
  const instance = await contractInstance(
    'PollFactory',
    config.pollFactory_contract_address
  );
  const killPollAddress = await instance.methods.killPollAddress().call();
  const pollInstance = await contractInstance('IPoll', killPollAddress);
  const killVoteTally = await pollInstance.methods.getVoteTally(0).call();
  const killVoteDenominator = await pollInstance.methods
    .getVoterBaseDenominator()
    .call();
  const killConsensus = (killVoteTally / killVoteDenominator) * 100;
  dispatch(killConsensusReceived(killConsensus));
};

export const getTapConsensus = () => async dispatch => {
  const instance = await contractInstance(
    'PollFactory',
    config.pollFactory_contract_address
  );
  const tapPollAddress = await instance.methods.tapPoll().call();
  const pollInstance = await contractInstance('IPoll', tapPollAddress);
  const tapVoteTally = await pollInstance.methods.getVoteTally(0).call();
  const tapVoteDenominator = await pollInstance.methods
    .getVoterBaseDenominator()
    .call();
  const tapConsensus = (tapVoteTally / tapVoteDenominator) * 100;
  dispatch(tapConsensusReceived(tapConsensus));
};

export const getCurrentTap = () => async dispatch => {
  const instance = await contractInstance(
    'PollFactory',
    config.pollFactory_contract_address
  );
  const currentTap = await instance.methods.currentTap().call();
  dispatch(tapReceived(currentTap));
};

export const getRemainingBalance = () => async dispatch => {
  const etherBalance = await web3.utils.fromWei(
    await web3.eth.getBalance(config.pollFactory_contract_address)
  );
  const daiInstance = await contractInstance(
    'PollFactory',
    config.daiToken_contract_address
  );
  const daiBalance = await web3.utils.fromWei(
    daiInstance.methods.balanceOf(config.pollFactory_contract_address)
  );
  dispatch(remainingBalanceReceived(etherBalance, daiBalance));
};

export const getVoteHistogram = () => async dispatch => {
  try {
    const tokenInstance = await contractInstance(
      'DaicoToken',
      config.daicoToken_contract_address
    );
    const totalMintableSupply = await tokenInstance.methods
      .totalMintableSupply()
      .call();
    const PollFactoryInstance = await contractInstance(
      'PollFactory',
      config.pollFactory_contract_address
    );
    const capPercent =
      (await PollFactoryInstance.methods.capPercent().call()) / 100;
    const transferEvents = await tokenInstance.getPastEvents('Transfer', {
      filter: {},
      fromBlock: 0,
      toBlock: 'latest'
    });

    const balances = {};

    transferEvents.forEach(element => {
      const returnValues = element.returnValues;
      const from = returnValues.from;
      const to = returnValues.to;
      const value = returnValues.value;
      if (from !== '0x0000000000000000000000000000000000000000')
        balances[from] = !isNaN(balances[from])
          ? balances[from] - parseFloat(value)
          : -parseFloat(value);
      if (to !== '0x0000000000000000000000000000000000000000')
        balances[to] = !isNaN(balances[to])
          ? balances[to] + parseFloat(value)
          : parseFloat(value);
    });
    const bool1 = capPercent % 1 === 0;
    const bool2 = (capPercent * 10) % 1 === 0;
    // const bool3 = capPercent * 100 % 1 === 0;
    const fixedSize = bool1 ? 2 : bool2 ? 3 : 4;
    let binDict = {};
    const binCount = 100;
    let diff = capPercent / binCount;
    for (let i = 0; i < binCount; i++) {
      binDict[i] = {};
      binDict[i]['min'] = (diff * i).toFixed(fixedSize);
      binDict[i]['max'] = (diff * (i + 1)).toFixed(fixedSize);
      binDict[i]['voters'] = 0;
    }
    let activeVotingTokens = 0;
    for (const key in balances) {
      let temp = parseFloat(balances[key]);
      let capBalance = (capPercent / 100) * parseFloat(totalMintableSupply);
      let capped = false;
      if (temp >= capBalance) {
        temp = capBalance;
        capped = true;
      }
      activeVotingTokens += temp;
      if (temp > 0) {
        if (!capped) {
          binDict[
            Math.floor((temp * 100) / (parseFloat(totalMintableSupply) * diff))
          ]['voters'] += 1;
        } else {
          binDict[99]['voters'] += 1;
        }
      }
    }
    dispatch(voteHistogramReceived(binDict));
  } catch (error) {
    console.log(error);
  }
};
