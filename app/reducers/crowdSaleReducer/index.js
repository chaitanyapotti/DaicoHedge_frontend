import actionTypes from '../../action_types';

const initialStates = {
  roundInfo: {}
};

export default (state = initialStates, action) => {
  switch (action.type) {
    case actionTypes.ROUND_INFO_RECEIVED: {
      const { rec } = action.payload;
      return {
        ...state,
        roundInfo: rec
      };
    }

    default: {
      return { ...state };
    }
  }
};
