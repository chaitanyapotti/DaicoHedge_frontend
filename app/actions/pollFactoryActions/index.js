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
  const instance = await contractInstance(config.pollFactory_contract_address);
  const killPollAddress = await instance.methods.killPollAddress().call();
  const pollInstance = await contractInstance(killPollAddress);
  const killVoteTally = await pollInstance.methods.getVoteTally(0).call();
  const killVoteDenominator = await pollInstance.methods
    .getVoterBaseDenominator()
    .call();
  const killConsensus = (killVoteTally / killVoteDenominator) * 100;
  dispatch(killConsensusReceived(killConsensus));
};

export const getTapConsensus = () => async dispatch => {
  const instance = await contractInstance(config.pollFactory_contract_address);
  const tapPollAddress = await instance.methods.tapPoll().call();
  const pollInstance = await contractInstance(tapPollAddress);
  const tapVoteTally = await pollInstance.methods.getVoteTally(0).call();
  const tapVoteDenominator = await pollInstance.methods
    .getVoterBaseDenominator()
    .call();
  const tapConsensus = (tapVoteTally / tapVoteDenominator) * 100;
  dispatch(tapConsensusReceived(tapConsensus));
};

export const getCurrentTap = () => async dispatch => {
  const instance = await contractInstance(config.pollFactory_contract_address);
  const currentTap = await instance.methods.currentTap().call();
  dispatch(tapReceived(currentTap));
};

export const getRemainingBalance = () => async dispatch => {
  const etherBalance = await web3.utils.fromWei(
    await web3.eth.getBalance(config.pollFactory_contract_address)
  );
  const daiInstance = await contractInstance(config.daiToken_contract_address);
  const daiBalance = await web3.utils.fromWei(
    daiInstance.methods.balanceOf(config.pollFactory_contract_address)
  );
  dispatch(remainingBalanceReceived(etherBalance, daiBalance));
};
