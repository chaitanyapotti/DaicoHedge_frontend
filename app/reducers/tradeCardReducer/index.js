import actionTypes from "../../action_types"

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
    currentStrategyCode: 0 
}

export default function TradeCardData(state=initialStates, action) {
  
  switch (action.type) {

    case actionTypes.WITHDRAWAL_AMOUNT_CHANGED: {
        return {
            ...state, withdrawalAmount: action.payload 
        }
    }

    case actionTypes.DAI_PRICES: {
        console.log("DAI wla: ",  action.payload)
        const { current_ask, current_bid } = action.payload || {}
        let avgPrice = (current_ask + current_bid)/2
        return {
            ...state, avgPrice: avgPrice 
        }
    }

    case actionTypes.MARKET_MAKING_SPREAD_CHANGED:{
        return {
            ...state, spreadPercentage: action.payload
        }
    }
      
    case actionTypes.BALANCE_RATE_CHANGED:{
        return {
            ...state, balanceRatio: action.payload
        }
    }

    case actionTypes.BALANCING_AGGRESSION_CHANGED: {
        return {
            ...state, balancingAggressionFactor: action.payload
        }
    }

    case actionTypes.MANUAL_AGGRESSION_CHANGED: {
        return {
            ...state, manualAggressionFactor: action.payload
        }
    }

    case actionTypes.IMBALANCE_RATIO_SETTING_SUCCESS: {
        return {
            ...state, botStartedSuccessfully: true, currentStrategy: "Bid-Ask spread: " + state.spreadPercentage, currentStrategyCode: 3
        }
    }

    case actionTypes.IMBALANCE_RATIO_SETTING_FAILED: {
        return {
            ...state, botStartedSuccessfully: false, currentStrategy: "Bid-Ask spread: " + state.spreadPercentage, currentStrategyCode: 3
        }
    }

    default: {return {...state}};
  }
}