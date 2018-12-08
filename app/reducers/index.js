// @flow
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import TradeCardData from './tradeCardReducer';
import CrowdSaleReducer from './crowdSaleReducer';
import PollFactoryReducer from './pollFactoryReducer';

export default function createRootReducer(history: History) {
  return combineReducers({
    router: connectRouter(history),
    TradeCardData,
    CrowdSaleReducer,
    PollFactoryReducer
  });
}
