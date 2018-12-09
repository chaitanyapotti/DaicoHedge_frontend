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
  const killConsensus =
    (parseFloat(killVoteTally) / parseFloat(killVoteDenominator)) * 100;
  dispatch(killConsensusReceived(killConsensus));
};

export const getTapConsensus = () => async dispatch => {
  const instance = await contractInstance(
    'PollFactory',
    config.pollFactory_contract_address
  );
  const tapPollAddress = await instance.methods.tapPoll().call();
  if (tapPollAddress !== '0x0000000000000000000000000000000000000000') {
    const pollInstance = await contractInstance('IPoll', tapPollAddress);
    const tapVoteTally = await pollInstance.methods.getVoteTally(0).call();
    const tapVoteDenominator = await pollInstance.methods
      .getVoterBaseDenominator()
      .call();
    const tapConsensus =
      (parseFloat(tapVoteTally) / parseFloat(tapVoteDenominator)) * 100;
    dispatch(tapConsensusReceived(tapConsensus));
  }
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
  const etherBalance = web3.utils.fromWei(
    await web3.eth.getBalance(config.pollFactory_contract_address)
  );
  const daiInstance = await contractInstance(
    'DaicoToken',
    config.daiToken_contract_address
  );
  const daiBalance = web3.utils.fromWei(
    await daiInstance.methods
      .balanceOf(config.pollFactory_contract_address)
      .call()
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
    const binDict = {};
    const binCount = 100;
    const diff = capPercent / binCount;
    for (let i = 0; i < binCount; i++) {
      binDict[i] = {};
      binDict[i].min = (diff * i).toFixed(fixedSize);
      binDict[i].max = (diff * (i + 1)).toFixed(fixedSize);
      binDict[i].voters = 0;
    }
    let activeVotingTokens = 0;
    for (const key in balances) {
      let temp = parseFloat(balances[key]);
      const capBalance = (capPercent / 100) * parseFloat(totalMintableSupply);
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
          ].voters += 1;
        } else {
          binDict[99].voters += 1;
        }
      }
    }
    dispatch(voteHistogramReceived(binDict));
  } catch (error) {
    console.log(error);
  }
};

export const getSpendCurve = () => async dispatch => {
  try {
    contractInstance('PollFactory', config.pollFactory_contract_address)
      .then(async instance => {
        const promiseArray = [];
        const increaseTapArrayPromise = instance.getPastEvents('TapIncreased', {
          filter: {},
          fromBlock: 0,
          toBlock: 'latest'
        });
        const withdrawArrayPromise = instance.getPastEvents('Withdraw', {
          filter: {},
          fromBlock: 0,
          toBlock: 'latest'
        });
        const crowdSaleInstance = await contractInstance(
          'CrowdSale',
          req.query.crowdsaleaddress
        );
        const contributionEventArrayPromise = crowdSaleInstance.getPastEvents(
          'LogContribution',
          {
            filter: {},
            fromBlock: 0,
            toBlock: 'latest'
          }
        );
        promiseArray.push(increaseTapArrayPromise);
        promiseArray.push(withdrawArrayPromise);
        promiseArray.push(contributionEventArrayPromise);
        Promise.all(promiseArray).then(async result => {
          try {
            const increaseTapArray = result[0];
            const withdrawArray = result[1];
            const contributionArray = result[4];
            const tapData = [];
            const withdrawData = [];
            const contributionData = [];
            for (let index = 0; index < increaseTapArray.length; index++) {
              const item = increaseTapArray[index];
              const { returnValues, blockNumber } = item || {};
              const { currentTap } = returnValues || {};
              const blockObject = await web3.eth.getBlock(blockNumber);
              const { timestamp } = blockObject;
              tapData.push({ timestamp, amount: currentTap });
            }
            for (let index = 0; index < withdrawArray.length; index++) {
              const item = withdrawArray[index];
              const { returnValues, blockNumber } = item || {};
              const { amountWei } = returnValues || {};
              const blockObject = await web3.eth.getBlock(blockNumber);
              const { timestamp } = blockObject;
              const amount = amountWei
                ? await web3.utils.fromWei(amountWei.toString(), 'ether')
                : 0;
              withdrawData.push({ timestamp, amount });
            }
            for (let index = 0; index < contributionArray.length; index++) {
              const item = contributionArray[index];
              const { returnValues, blockNumber } = item || {};
              const { etherAmount } = returnValues || {};
              const blockObject = await web3.eth.getBlock(blockNumber);
              const { timestamp } = blockObject;
              const amount = etherAmount
                ? await web3.utils.fromWei(etherAmount.toString(), 'ether')
                : 0;
              contributionData.push({ timestamp, amount });
            }
            dispatch({
              payload: {
                tapData,
                withdrawData,
                withdrawXfrData,
                allXfrData,
                contributionData
              },
              type: actionTypes.SPENDING_CURVE_RECEIVED
            });
          } catch (err) {
            console.log(err);
          }
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  } catch (error) {
    console.log(error.message);
  }
};

export const withdrawAmount = amount => async dispatch => {
  const pba = await web3.eth.getAccounts();
  const instance = await contractInstance(
    'PollFactory',
    config.pollFactory_contract_address
  );
  const weiAmount = await web3.utils.toWei(amount);
  const txData = await instance.methods.withdrawAmount(weiAmount).encodeABI();
  const gasPrice = await web3.eth.getGasPrice();
  var signedTx = await web3.eth.accounts.signTransaction(
    {
      from: pba[0],
      to: config.pollFactory_contract_address,
      value: 0,
      data: txData,
      gas: 1000000, //gasLimit
      gasPrice: gasPrice
    },
    config.SENDER_PRIVATE_KEY
  );
  let txHash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
};

export const getRefund = () => async dispatch => {
  const instance = await contractInstance(
    'PollFactory',
    config.pollFactory_contract_address
  );
  const treasuryRound = instance.methods.treasuryState().call();
  if (treasuryRound === '1') {
    const txData = await instance.methods.refundBySoftcapFail().encodeABI();
    const gasPrice = await web3.eth.getGasPrice();
    var signedTx = await web3.eth.accounts.signTransaction(
      {
        from: pba[0],
        to: config.pollFactory_contract_address,
        value: 0,
        data: txData,
        gas: 1000000, //gasLimit
        gasPrice: gasPrice
      },
      config.SENDER_PRIVATE_KEY
    );
    let txHash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    dispatch({ type: actionTypes.CROWD_SALE_REFUND });
  }
  if (treasuryRound === '3') {
    const txData = await instance.methods.refundByKill().encodeABI();
    const gasPrice = await web3.eth.getGasPrice();
    var signedTx = await web3.eth.accounts.signTransaction(
      {
        from: pba[0],
        to: config.pollFactory_contract_address,
        value: 0,
        data: txData,
        gas: 1000000, //gasLimit
        gasPrice: gasPrice
      },
      config.SENDER_PRIVATE_KEY
    );
    let txHash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    dispatch({ type: actionTypes.KILL_REFUND });
  }
};

export const getUserTokenBalance = () => async dispatch => {
  const pba = await web3.eth.getAccounts();
  const tokenInstance = await contractInstance(
    'DaicoToken',
    config.daicoToken_contract_address
  );
  const balance = web3.utils.fromWei(
    await tokenInstance.methods.balanceOf(pba[0]).call()
  );
  dispatch({type: actionTypes.USER_TOKEN_BALANCE, payload: balance})
};

export const getPollFactoryEther = () =>  async dispatch => {
  const balance = web3.utils.fromWei(
    await web3.eth.getBalance(config.pollFactory_contract_address).call()
  );
  dispatch({type: actionTypes.POLL_FACT_ETHER, payload: balance})
};

export const getPollFactoryDai = () => async dispatch => {
  const tokenInstance = await contractInstance(
    'DaicoToken',
    config.daiToken_contract_address
  );
  const balance = web3.utils.fromWei(
    await tokenInstance.methods.balanceOf(config.pollFactory_contract_address).call()
  );
  dispatch({type: actionTypes.POLL_FACT_DAI, payload: balance})
}

export const getTotalSupply = () => async dispatch => {
  const okenInstance = await contractInstance(
    'DaicoToken',
    config.daiToken_contract_address
  );
  const balance = web3.utils.fromWei(
    await tokenInstance.methods.totalSupply().call()
  );
  dispatch({type: actionTypes.TOTAL_TOKEN_SUPPLY, payload: balance})
}