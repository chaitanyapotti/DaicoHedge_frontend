import web3 from '../../web3Instance';
import actionTypes from '../../action_types';
import fs from 'fs';
// 0xd3add19ee7e5287148a5866784aE3C55bd4E375A
import conversionRateABI from '../../ABIs/ConversionRates';
import KyberNetworkProxyABI from '../../ABIs/kyberNetworkProxy';
const ETH_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
const DAI_ADDRESS = '0xE0C546cdca469e1dB471eF53fa863A99CC69754E';
const CONVERSION_RATES_CONTRACT_ADDRESS =
  '0x1A8d8E9B5d506Bc12Ec4F41C024e4F48979848c9';
const SENDER_PRIVATE_KEY =
  '0x1aba488300a9d7297a315d127837be4219107c62c61966ecdf7a75431d75cc61';
const KYBER_NETWORK_PROXY_ADDRESS =
  '0x3c9AE9a91ed238fcbABC89567547dBd52bc8ef63';

const NetworkProxyInstance = new web3.eth.Contract(
  KyberNetworkProxyABI,
  KYBER_NETWORK_PROXY_ADDRESS
);

export const withdrawalAmountChanged = value => dispatch => {
  return dispatch({
    type: actionTypes.WITHDRAWAL_AMOUNT_CHANGED,
    payload: value
  });
};

export const fetchDaiRate = () => async dispatch => {
  let expectedRateBuy;
  let slippageRateBuy;
  let expectedRateSell;
  let slippageRateSell;
  const buySidePrice = await NetworkProxyInstance.methods
    .getExpectedRate(
      ETH_ADDRESS, // srcToken
      DAI_ADDRESS, // destToken
      web3.utils.toWei('1') // srcQty
    )
    .call();

  console.log('buy side prices: ', buySidePrice);
  expectedRateBuy = buySidePrice.expectedRate;
  slippageRateBuy = buySidePrice.slippageRate;

  const sellSidePrice = await NetworkProxyInstance.methods
    .getExpectedRate(
      DAI_ADDRESS, // destToken
      ETH_ADDRESS, // srcToken
      web3.utils.toWei('1') // srcQty
    )
    .call();
  expectedRateSell = sellSidePrice.expectedRate;
  slippageRateSell = sellSidePrice.slippageRate;

  dispatch({
    type: actionTypes.DAI_PRICES,
    payload: (expectedRateBuy + expectedRateSell) / 2
  });
};

export const marketMakingSpreadChanged = value => dispatch => {
  return dispatch({
    type: actionTypes.MARKET_MAKING_SPREAD_CHANGED,
    payload: value
  });
};

export const balanceRatioChanged = value => dispatch => {
  return dispatch({
    type: actionTypes.BALANCE_RATE_CHANGED,
    payload: value
  });
};

export const balancingAggressionChanged = value => dispatch => {
  return dispatch({
    type: actionTypes.BALANCING_AGGRESSION_CHANGED,
    payload: value
  });
};

export const startTradingBot = percentage => async dispatch => {
  var ConversionRatesContract = await new web3.eth.Contract(
    conversionRateABI,
    CONVERSION_RATES_CONTRACT_ADDRESS
  );
  let expectedRate;
  let slippageRate;
  const blockNumber = await web3.eth.getBlockNumber();
  const pba = await web3.eth.getAccounts();
  const obj = await NetworkProxyInstance.methods
    .getExpectedRate(
      ETH_ADDRESS, // srcToken
      DAI_ADDRESS, // destToken
      web3.utils.toWei('1') // srcQty
    )
    .call();
  expectedRate = obj.expectedRate;
  slippageRate = obj.slippageRate;
  //   stdlog(`ETH <-> KNC getExpectedRate() = expectedRate: ${expectedRate}, slippageRate:${slippageRate}`);
  var txData = await ConversionRatesContract.methods
    .setBaseRate(
      [DAI_ADDRESS], //ERC20[] tokens
      [parseInt(expectedRate * (1 + percentage / 100))], //uint[] baseBuy
      [parseInt(expectedRate * (1 - percentage / 100))], //uint[] baseSell
      ['0x0000000000000000000000000000'], //bytes14[] buy
      ['0x0000000000000000000000000000'], //bytes14[] sell
      blockNumber, //most recent ropsten ETH block number as time of writing
      [0] //uint[] indices
    )
    .encodeABI();
  const gasPrice = await web3.eth.getGasPrice();
  var signedTx = await web3.eth.accounts.signTransaction(
    {
      from: pba[0],
      to: CONVERSION_RATES_CONTRACT_ADDRESS,
      value: 0,
      data: txData,
      gas: 300000, //gasLimit
      gasPrice: gasPrice
    },
    SENDER_PRIVATE_KEY
  );
  let txHash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  console.log(txHash);
};

export const balanceRatios = percentage => async dispatch => {
  return;
};
