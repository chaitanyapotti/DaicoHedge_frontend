import actionTypes from '../../action_types';
import contractInstance from '../../utils/contractInstance';
import config from '../../config';

export const roundInfoReceived = data => ({
  payload: { rec: data },
  type: actionTypes.ROUND_INFO_RECEIVED
});

export const getRoundDetails = contractAddress => async dispatch => {
  const instance = await contractInstance(config.crowdsale_contract_address);
  const roundDetails = await instance.methods.roundDetails().call();
  dispatch(roundInfoReceived(roundDetails));
};
