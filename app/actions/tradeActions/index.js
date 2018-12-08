import web3 from '../../web3Instance';
import actionTypes from '../../action_types';
import fs from 'fs';
import axios from 'axios';
// 0xd3add19ee7e5287148a5866784aE3C55bd4E375A
import conversionRateABI from '../../ABIs/ConversionRates';
import KyberNetworkProxyABI from '../../ABIs/kyberNetworkProxy';
const ETH_ADDRESS = '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee';
const DAI_ADDRESS = '0x8c13AFB7815f10A8333955854E6ec7503eD841B7';
const CONVERSION_RATES_CONTRACT_ADDRESS =
  '0xF6084Ad447076da0246cD28e104533f9f51dbD2F';
const SENDER_PRIVATE_KEY =
  '0x1aba488300a9d7297a315d127837be4219107c62c61966ecdf7a75431d75cc61';
const KYBER_NETWORK_PROXY_ADDRESS =
  '0xA46E01606f9252fa833131648f4D855549BcE9D9';

const NetworkProxyInstance = new web3.eth.Contract(
  KyberNetworkProxyABI,
  KYBER_NETWORK_PROXY_ADDRESS
);

export const manualEthChanged = (value) => (dispatch) => {
    return dispatch({
        type: actionTypes.MANUAL_ETHER_CHANGED,
        payload: value
    })
}

export const manualDaiChanged = (value) => (dispatch) => {
    return dispatch({
        type: actionTypes.MANUAL_DAI_CHANGED,
        payload: value
    })
}

export const startManualEthHedging = (current_ask, current_bid, manualAggressionFactor, weis) => async (dispatch) => {
    let ask_rate = parseInt(Math.pow(10, 18)/current_ask)
    let bid_rate = parseInt(Math.pow(10, 18)/current_bid)
    var ConversionRatesContract = await new web3.eth.Contract(conversionRateABI, CONVERSION_RATES_CONTRACT_ADDRESS);
    const blockNumber = await web3.eth.getBlockNumber();
    const pba = await web3.eth.getAccounts();
    var txData = await ConversionRatesContract.methods.setBaseRate(
        [DAI_ADDRESS], //ERC20[] tokens
        [web3.utils.toHex(ask_rate*(1 - manualAggressionFactor/10 ))], //uint[] baseBuy
        [web3.utils.toHex(bid_rate*(0.999))], //uint[] baseSell
        ["0x0000000000000000000000000000"], //bytes14[] buy
        ["0x0000000000000000000000000000"], //bytes14[] sell
        blockNumber, //most recent ropsten ETH block number as time of writing
        [0], //uint[] indices
        ).encodeABI();
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
    let tradeSize = weis    
    let hardPad = 5000
    let softPad = -2000
    ConversionRatesContract.methods.setImbalanceStepFunction(
        DAI_ADDRESS, //ERC20 token: KNC
        [ web3.utils.toHex(parseInt(tradeSize/10)), web3.utils.toHex(parseInt(2*tradeSize))],
        [0, web3.utils.toHex(softPad)],
        [web3.utils.toHex(-1*tradeSize) , 0],
        [web3.utils.toHex(hardPad), 0]
        // [100000000000000000000,200000000000000000000,300000000000000000000,5000000000000000000000], //uint[] xBuy
        // [0,-30,-60,-80], //uint[] yBuy
        // [-300000000000000000000,-200000000000000000000,-100000000000000000000,0], //uint[] xSell
        // [-70,-50,-25,0] //uint[] ySell
    ).send(
    {
        from: pba[0],
    },
    (err, res) => {
        if (err){
            console.log("sendsignedtransaction error: ", err)
            dispatch({
                type: actionTypes.MANUAL_ETH_IMBALANCE_RATIO_SETTING_FAILED,
                payload: "Failed to set imbalance ratio."
            })
            return 
        }
        dispatch({
            type: actionTypes.MANUAL_ETH_IMBALANCE_RATIO_SETTING_SUCCESS,
            payload: "Imbalance ratio set successful."
        })
        console.log(`Err: ${err}`);
        console.log(`Res: ${res}`);
    }
    )
}

export const startManualDaiHedging = (current_ask, current_bid, manualAggressionFactor, weis) => async (dispatch) => {
    let ask_rate = parseInt(Math.pow(10, 18)/current_ask)
    let bid_rate = parseInt(Math.pow(10, 18)/current_bid)
    var ConversionRatesContract = await new web3.eth.Contract(conversionRateABI, CONVERSION_RATES_CONTRACT_ADDRESS);
    const blockNumber = await web3.eth.getBlockNumber();
    const pba = await web3.eth.getAccounts();
    var txData = await ConversionRatesContract.methods.setBaseRate(
        [DAI_ADDRESS], //ERC20[] tokens
        [web3.utils.toHex(ask_rate*(1.001))], //uint[] baseBuy
        [web3.utils.toHex(bid_rate*(1 +manualAggressionFactor/10)) ], //uint[] baseSell
        ["0x0000000000000000000000000000"], //bytes14[] buy
        ["0x0000000000000000000000000000"], //bytes14[] sell
        blockNumber, //most recent ropsten ETH block number as time of writing
        [0], //uint[] indices
        ).encodeABI();
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
    let tradeSize = weis    
    let hardPad = -5000
    let softPad = 2000
    ConversionRatesContract.methods.setImbalanceStepFunction(
        DAI_ADDRESS, //ERC20 token: KNC
        [ web3.utils.toHex(parseInt(tradeSize)), web3.utils.toHex(parseInt(2*tradeSize))],
        [0, web3.utils.toHex(hardPad)],
        [web3.utils.toHex(-1*tradeSize/10) , 0],
        [web3.utils.toHex(softPad), 0]
        // [100000000000000000000,200000000000000000000,300000000000000000000,5000000000000000000000], //uint[] xBuy
        // [0,-30,-60,-80], //uint[] yBuy
        // [-300000000000000000000,-200000000000000000000,-100000000000000000000,0], //uint[] xSell
        // [-70,-50,-25,0] //uint[] ySell
    ).send(
    {
        from: pba[0],
    },
    (err, res) => {
        if (err){
            console.log("sendsignedtransaction error: ", err)
            dispatch({
                type: actionTypes.MANUAL_DAI_IMBALANCE_RATIO_SETTING_FAILED,
                payload: "Failed to set imbalance ratio."
            })
            return 
        }
        dispatch({
            type: actionTypes.MANUAL_DAI_IMBALANCE_RATIO_SETTING_SUCCESS,
            payload: "Imbalance ratio set successful."
        })
        console.log(`Err: ${err}`);
        console.log(`Res: ${res}`);
    }
    )
} 

export const fetchDaiRate =() => async (dispatch) =>{
    axios.get("https://api.kyber.network/market")
        .then(data => {
            let d = data.data.data
            console.log(d) 
            for (let instrument in d){
                if (d[instrument]["quote_symbol"]==="DAI"){
                    dispatch({
                        type: actionTypes.DAI_PRICES,
                        payload: d[instrument]
                    })
                    // break
                }
            }
            
        }).catch(err => {
            console.log(err)
            dispatch({
                type: actionTypes.DAI_PRICES_ERROR,
                payload: "error"
            })
        })

    
    // let expectedRateBuy;
    // let slippageRateBuy;
    // let expectedRateSell;
    // let slippageRateSell;
    // const buySidePrice = await NetworkProxyInstance.methods.getExpectedRate(
    //     ETH_ADDRESS, // srcToken
    //     DAI_ADDRESS, // destToken
    //     web3.utils.toWei('1'), // srcQty
    //   ).call();

    //   console.log("buy side prices: ", buySidePrice)
    //   expectedRateBuy = buySidePrice.expectedRate;
    //   slippageRateBuy = buySidePrice.slippageRate;

    //   const sellSidePrice = await NetworkProxyInstance.methods.getExpectedRate(
    //     DAI_ADDRESS, // destToken
    //     ETH_ADDRESS, // srcToken
    //     web3.utils.toWei('1'), // srcQty
    //   ).call();
    //   expectedRateSell = sellSidePrice.expectedRate;
    //   slippageRateSell = sellSidePrice.slippageRate;

    //   dispatch({
    //       type: actionTypes.DAI_PRICES,
    //       payload: (expectedRateBuy + expectedRateSell)/2
    //   })
}


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

export const balancingAggressionChanged = (value) => (dispatch) => {
    return dispatch({
        type: actionTypes.BALANCING_AGGRESSION_CHANGED,
        payload: value
    })
}

export const manualAggressionChanged = (value) => (dispatch) => {
    return dispatch({
        type: actionTypes.MANUAL_AGGRESSION_CHANGED,
        payload: value
    })
}

export const startTradingBot = (percentage, avgPrice, ethEquivalent) => async (dispatch) => {
    var ConversionRatesContract = await new web3.eth.Contract(conversionRateABI, CONVERSION_RATES_CONTRACT_ADDRESS);
    let expectedRate;
    let slippageRate;
    const blockNumber = await web3.eth.getBlockNumber();
    const pba = await web3.eth.getAccounts();
    // const obj = await NetworkProxyInstance.methods.getExpectedRate(
    //     ETH_ADDRESS, // srcToken
    //     DAI_ADDRESS, // destToken
    //     web3.utils.toWei('1'), // srcQty
    //   ).call();
    //   expectedRate = obj.expectedRate;
    //   slippageRate = obj.slippageRate;
    //   stdlog(`ETH <-> KNC getExpectedRate() = expectedRate: ${expectedRate}, slippageRate:${slippageRate}`);
    var txData = await ConversionRatesContract.methods.setBaseRate(
        [DAI_ADDRESS], //ERC20[] tokens
        [web3.utils.toHex(parseInt((Math.pow(10, 18)/avgPrice)*(1 + (percentage/200)))) ], //uint[] baseBuy
        [web3.utils.toHex(parseInt((Math.pow(10, 18)/avgPrice)*(1 - (percentage/200)))) ], //uint[] baseSell
        ["0x0000000000000000000000000000"], //bytes14[] buy
        ["0x0000000000000000000000000000"], //bytes14[] sell
        blockNumber, //most recent ropsten ETH block number as time of writing
        [0], //uint[] indices
        ).encodeABI();
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
    let imbalance = 0.01*Math.pow(10, 18)*ethEquivalent   
    let extreme = 5*imbalance 
    let padding = 5000
    ConversionRatesContract.methods.setImbalanceStepFunction(
        DAI_ADDRESS, //ERC20 token: KNC
        [web3.utils.toHex(imbalance) ,web3.utils.toHex( extreme)],
        [0,web3.utils.toHex( padding*-1)],
        [web3.utils.toHex(imbalance*-1), 0],
        [padding, 0]
        // [100000000000000000000,200000000000000000000,300000000000000000000,5000000000000000000000] //uint[] xBuy
        // [0,-30,-60,-80] //uint[] yBuy
        // [-300000000000000000000,-200000000000000000000,-100000000000000000000,0] //uint[] xSell
        // [-70,-50,-25,0] //uint[] ySell
    ).send(
    {
        from: pba[0],
    },
    (err, res) => {
        if (err){
            console.log("sendsignedtransaction error: ", err)
            dispatch({
                type: actionTypes.IMBALANCE_RATIO_SETTING_FAILED,
                payload: "Failed to set imbalance ratio."
            })
            return 
        }
        dispatch({
            type: actionTypes.IMBALANCE_RATIO_SETTING_SUCCESS,
            payload: "Imbalance ratio set successful."
        })
        console.log(`Err: ${err}`);
        console.log(`Res: ${res}`);
    }
    )

};

export const balanceRatios = (balanceRatio, balancingAggressionFactor, etherBalance, daiBalance, avgPrice, current_ask, current_bid) => async dispatch => {
    if (etherBalance===0 && daiBalance ===0){
        return 
    }
    let currentRatio = etherBalance*100/(etherBalance + daiBalance*avgPrice)
    console.log("current ratio", currentRatio, etherBalance, daiBalance)
    if (currentRatio> balanceRatio){
        let ask_rate = parseInt(Math.pow(10, 18)/current_ask)
    let bid_rate = parseInt(Math.pow(10, 18)/current_bid)
    var ConversionRatesContract = await new web3.eth.Contract(conversionRateABI, CONVERSION_RATES_CONTRACT_ADDRESS);
    const blockNumber = await web3.eth.getBlockNumber();
    const pba = await web3.eth.getAccounts();
    var txData = await ConversionRatesContract.methods.setBaseRate(
        [DAI_ADDRESS], //ERC20[] tokens
        [web3.utils.toHex(ask_rate*(1.001))], //uint[] baseBuy
        [web3.utils.toHex(bid_rate*(1 +balancingAggressionFactor/10)) ], //uint[] baseSell
        ["0x0000000000000000000000000000"], //bytes14[] buy
        ["0x0000000000000000000000000000"], //bytes14[] sell
        blockNumber, //most recent ropsten ETH block number as time of writing
        [0], //uint[] indices
        ).encodeABI();
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
    let tradeSize = Math.pow(10, 18)*((etherBalance + daiBalance*avgPrice)*(currentRatio-balanceRatio)/100)
    let hardPad = -5000
    let softPad = 2000
    ConversionRatesContract.methods.setImbalanceStepFunction(
        DAI_ADDRESS, //ERC20 token: KNC
        [ web3.utils.toHex(parseInt(tradeSize)), web3.utils.toHex(parseInt(2*tradeSize))],
        [0, web3.utils.toHex(hardPad)],
        [web3.utils.toHex(-1*tradeSize/10) , 0],
        [web3.utils.toHex(softPad), 0]
        // [100000000000000000000,200000000000000000000,300000000000000000000,5000000000000000000000], //uint[] xBuy
        // [0,-30,-60,-80], //uint[] yBuy
        // [-300000000000000000000,-200000000000000000000,-100000000000000000000,0], //uint[] xSell
        // [-70,-50,-25,0] //uint[] ySell
    ).send(
    {
        from: pba[0],
    },
    (err, res) => {
        if (err){
            console.log("sendsignedtransaction error: ", err)
            dispatch({
                type: actionTypes.DAI_RATIO_IMBALANCE_RATIO_SETTING_FAILED,
                payload: "Failed to set imbalance ratio."
            })
            return 
        }
        dispatch({
            type: actionTypes.DAI_RATIO_IMBALANCE_RATIO_SETTING_SUCCESS,
            payload: "Imbalance ratio set successful."
        })
        console.log(`Err: ${err}`);
        console.log(`Res: ${res}`);
    }
    )
    } else{
        let ask_rate = parseInt(Math.pow(10, 18)/current_ask)
    let bid_rate = parseInt(Math.pow(10, 18)/current_bid)
    var ConversionRatesContract = await new web3.eth.Contract(conversionRateABI, CONVERSION_RATES_CONTRACT_ADDRESS);
    const blockNumber = await web3.eth.getBlockNumber();
    const pba = await web3.eth.getAccounts();
    var txData = await ConversionRatesContract.methods.setBaseRate(
        [DAI_ADDRESS], //ERC20[] tokens
        [web3.utils.toHex(ask_rate*(1 - balancingAggressionFactor/10 ))], //uint[] baseBuy
        [web3.utils.toHex(bid_rate*(0.999))], //uint[] baseSell
        ["0x0000000000000000000000000000"], //bytes14[] buy
        ["0x0000000000000000000000000000"], //bytes14[] sell
        blockNumber, //most recent ropsten ETH block number as time of writing
        [0], //uint[] indices
        ).encodeABI();
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
    let tradeSize = Math.pow(10, 18)* (balanceRatio-currentRatio)*((etherBalance + daiBalance*avgPrice)/100)    
    let hardPad = 5000
    let softPad = -2000
    ConversionRatesContract.methods.setImbalanceStepFunction(
        DAI_ADDRESS, //ERC20 token: KNC
        [ web3.utils.toHex(parseInt(tradeSize/10)), web3.utils.toHex(parseInt(2*tradeSize))],
        [0, web3.utils.toHex(softPad)],
        [web3.utils.toHex(-1*tradeSize) , 0],
        [web3.utils.toHex(hardPad), 0]
        // [100000000000000000000,200000000000000000000,300000000000000000000,5000000000000000000000], //uint[] xBuy
        // [0,-30,-60,-80], //uint[] yBuy
        // [-300000000000000000000,-200000000000000000000,-100000000000000000000,0], //uint[] xSell
        // [-70,-50,-25,0] //uint[] ySell
    ).send(
    {
        from: pba[0],
    },
    (err, res) => {
        if (err){
            console.log("sendsignedtransaction error: ", err)
            dispatch({
                type: actionTypes.DAI_RATIO_IMBALANCE_RATIO_SETTING_FAILED,
                payload: "Failed to set imbalance ratio."
            })
            return 
        }
        dispatch({
            type: actionTypes.DAI_RATIO_IMBALANCE_RATIO_SETTING_SUCCESS,
            payload: "Imbalance ratio set successful."
        })
        console.log(`Err: ${err}`);
        console.log(`Res: ${res}`);
    }
    )
    }
};

export const closeSnackbar = (value) => dispatch => {
    return dispatch({
        type: actionTypes.CLOSE_SNACKBAR,
        payload: value
    })
}
