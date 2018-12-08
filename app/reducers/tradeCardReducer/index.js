import actionTypes from "../../action_types"

const initialStates = {
    spreadPercentage : 0,
    balanceRatio: 0,
    balancingAggressionFactor: 1, 
}

export default function TradeCardData(state=initialStates, action) {
  
  switch (action.type) {
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

    default: {return {...state}};
  }
}