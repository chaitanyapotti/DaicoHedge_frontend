const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const walletMnemonic =
  'gesture rather obey video awake genuine patient base soon parrot upset lounge'; // Your mnemonic
const walletAPIUrl = 'http://127.0.0.1:8545'; // Your Infura URL

const provider = new HDWalletProvider(walletMnemonic, walletAPIUrl);

export default new Web3(provider);
