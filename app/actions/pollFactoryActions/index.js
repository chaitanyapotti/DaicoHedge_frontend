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
    const transferEvents = await tokenInstance.getPastEvents('Transfer', {
      filter: {},
      fromBlock: 0,
      toBlock: 'latest'
    });
    console.log(transferEvents);

    allMembers = [...new Set(allMembers)];
    const balancePromiseArray = [];
    for (let index = 0; index < allMembers.length; index++) {
      const element = allMembers[index];
      const balancePromise = tokenInstance.methods.balanceOf(element).call();
      balancePromiseArray.push(balancePromise);
    }
    Promise.all(balancePromiseArray)
      .then(async balances => {
        const capPercent = parseFloat(result.capPercent) / 100;
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
        for (let index = 0; index < allMembers.length; index++) {
          let temp = parseFloat(balances[index]);
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
                Math.floor(
                  (temp * 100) / (parseFloat(totalMintableSupply) * diff)
                )
              ]['voters'] += 1;
            } else {
              binDict[99]['voters'] += 1;
            }
          }
        }
        res.status(200).send({
          message: 'Success',
          data: {
            binDict: binDict,
            collectiveVoteWeight: (
              (activeVotingTokens * 100) /
              parseFloat(totalMintableSupply)
            ).toFixed(2)
          },
          reason: ''
        });
      })
      .catch(err => {
        console.log(err.message);
        return res.status(400).send({
          message: 'Failed',
          reason: "Couldn't execute",
          data: []
        });
      });
  } catch (error) {
    console.log(error.message);
    return res.status(400).send({
      message: 'Failed',
      reason: "Couldn't execute",
      data: []
    });
  }
};
