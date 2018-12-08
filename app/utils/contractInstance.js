const web3 = require('../web3Instance');
const getContractDetails = require('./getContractDetails');

module.exports = (name, address) => {
  return new Promise((resolve, reject) => {
    getContractDetails(name)
      .then(response => {
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
