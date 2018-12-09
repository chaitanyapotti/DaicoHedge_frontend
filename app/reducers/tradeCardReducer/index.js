import actionTypes from '../../action_types';

const initialStates = {
    spreadPercentage : 0,
    balanceRatio: 0,
    balancingAggressionFactor: 1, 
    manualAggressionFactor: 1,
    withdrawalAmount: 0,
    current_ask: 0,
    current_bid: 0,
    avgPrice: 0,
    botStartedSuccessfully: false,
    currentStrategy: "",
    currentStrategyCode: 0, 
    manualEthAmount: 0, 
    manualDaiAmount: 0,
    manualEthOffloadingStarted: false,
    manualDaiOffloadingStarted: false,
    daiRatioBalancingStarted: false
}

export default function TradeCardData(state = initialStates, action) {
  switch (action.type) {
    case actionTypes.WITHDRAWAL_AMOUNT_CHANGED: {
      return {
        ...state,
        withdrawalAmount: action.payload
      };
    }

    case actionTypes.DAI_PRICES: {
        console.log("DAI wla: ",  action.payload)
        const { current_ask, current_bid } = action.payload || {}
        let avgPrice = (current_ask + current_bid)/2
        return {
            ...state, avgPrice: avgPrice, current_ask: current_ask, current_bid: current_bid
        }
    }

    case actionTypes.MARKET_MAKING_SPREAD_CHANGED: {
      return {
        ...state,
        spreadPercentage: action.payload
      };
    }

    case actionTypes.BALANCE_RATE_CHANGED: {
      return {
        ...state,
        balanceRatio: action.payload
      };
    }

    case actionTypes.CLOSE_SNACKBAR: {
      return {
        ...state,
        manualEthOffloadingStarted: false,
        manualDaiOffloadingStarted: false,
        daiRatioBalancingStarted: false,
        botStartedSuccessfully: false
      };
    }

    case actionTypes.BALANCING_AGGRESSION_CHANGED: {
      return {
        ...state,
        balancingAggressionFactor: action.payload
      };
    }

    case actionTypes.MANUAL_AGGRESSION_CHANGED: {
      return {
        ...state,
        manualAggressionFactor: action.payload
      };
    }

    case actionTypes.IMBALANCE_RATIO_SETTING_SUCCESS: {
      return {
        ...state,
        botStartedSuccessfully: true,
        currentStrategy: `Bid-Ask spread: ${state.spreadPercentage}`,
        currentStrategyCode: 3
      };
    }

    case actionTypes.IMBALANCE_RATIO_SETTING_FAILED: {
      return {
        ...state,
        botStartedSuccessfully: false,
        currentStrategy: `Bid-Ask spread: ${state.spreadPercentage}`,
        currentStrategyCode: 3
      };
    }

    case actionTypes.MANUAL_ETH_IMBALANCE_RATIO_SETTING_SUCCESS: {
      return {
        ...state,
        manualEthOffloadingStarted: true,
        currentStrategy: `Manual ETH offload: ${state.manualEthAmount} ETH`,
        currentStrategyCode: 1
      };
    }

    case actionTypes.MANUAL_ETH_IMBALANCE_RATIO_SETTING_FAILED: {
      return {
        ...state,
        manualEthOffloadingStarted: false,
        currentStrategy: `Manual ETH offload: ${state.manualEthAmount} ETH`,
        currentStrategyCode: 1
      };
    }

    case actionTypes.MANUAL_DAI_IMBALANCE_RATIO_SETTING_SUCCESS: {
      return {
        ...state,
        manualDaiOffloadingStarted: true,
        currentStrategy: `Manual DAI offload: ${state.manualDaiAmount} DAI`,
        currentStrategyCode: 1
      };
    }

    case actionTypes.MANUAL_DAI_IMBALANCE_RATIO_SETTING_FAILED: {
      return {
        ...state,
        manualDaiOffloadingStarted: false,
        currentStrategy: `Manual DAI offload: ${state.manualDaiAmount} DAI`,
        currentStrategyCode: 1
      };
    }

    case actionTypes.DAI_RATIO_IMBALANCE_RATIO_SETTING_SUCCESS: {
      return {
        ...state,
        daiRatioBalancingStarted: true,
        currentStrategy: `DAI-ETH Ratio Balacing: ${state.balanceRatio} Ratio`,
        currentStrategyCode: 2
      };
    }

    case actionTypes.DAI_RATIO_IMBALANCE_RATIO_SETTING_FAILED: {
      return {
        ...state,
        daiRatioBalancingStarted: false,
        currentStrategy: `DAI-ETH Ratio Balacing: ${state.balanceRatio} Ratio`,
        currentStrategyCode: 2
      };
    }

    case actionTypes.MANUAL_ETHER_CHANGED: {
      return {
        ...state,
        manualEthAmount: action.payload
      };
    }

    case actionTypes.MANUAL_DAI_CHANGED: {
      return {
        ...state,
        manualDaiAmount: action.payload
      };
    }

    default: {
      return { ...state };
    }
  }
}
