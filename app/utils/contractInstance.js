import web3 from '../web3Instance';
import getContractDetails from './getContractDetails';

export default (name, address) => {
  return new Promise((resolve, reject) => {
    getContractDetails(name)
      .then(async response => {
        const accounts = await web3.eth.getAccounts();
        const isCheckSummed = web3.utils.checkAddressChecksum(address);
        if (!isCheckSummed) {
          reject(new Error('Not a valid address'));
        } else {
          resolve(new web3.eth.Contract(response.abi, address));
        }
      })
      .catch(err => reject(err.message));
  });
};
