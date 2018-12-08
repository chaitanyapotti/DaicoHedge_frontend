import actionTypes from '../../action_types';

const initialStates = {
  killConsensus: 0,
  tapConsensus: 0,
  currentTap: 0,
  etherBalance: 0,
  daiBalance: 0,
  voteHistogramData: {},
  spendingCurveData: {},
  killRefund: false,
  crowdSaleRefund: false
};

export default (state = initialStates, action) => {
  switch (action.type) {
    case actionTypes.KILL_CONSENSUS_RECEIVED: {
      const { rec } = action.payload;
      return {
        ...state,
        killConsensus: rec
      };
    }
    case actionTypes.TAP_CONSENSUS_RECEIVED: {
      const { rec } = action.payload;
      return {
        ...state,
        tapConsensus: rec
      };
    }
    case actionTypes.CURRENT_TAP_RECEIVED: {
      const { rec } = action.payload;
      return {
        ...state,
        currentTap: rec
      };
    }
    case actionTypes.REMAINING_BALANCE_RECEIVED: {
      const { etherBalance, daiBalance } = action.payload;
      return {
        ...state,
        etherBalance,
        daiBalance
      };
    }
    case actionTypes.VOTE_HISTOGRAM_RECEIVED: {
      const { rec } = action.payload;
      return {
        ...state,
        voteHistogramData: rec
      };
    }

    case actionTypes.SPENDING_CURVE_RECEIVED: {
      const { rec } = action.payload;
      console.log('spend rdeucer', rec);
      return {
        ...state,
        spendingCurveData: rec
      };
    }

    case actionTypes.KILL_REFUND: {
      return {
        ...state,
        killRefund: true
      };
    }

    case actionTypes.CROWD_SALE_REFUND: {
      return {
        ...state,
        crowdSaleRefund: true
      };
    }

    default: {
      return { ...state };
    }
  }
};
