// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Home from '../components/Home';
import CustomSnackBar from '../components/CustomMUI/CustomSnackBar';
import { closeSnackbar } from '../actions/tradeActions';

type Props = {};

class HomePage extends Component<Props> {
  props: Props;

  render() {
    const {
      manualEthOffloadingStarted,
      manualDaiOffloadingStarted,
      daiRatioBalancingStarted
    } = this.props || {};
    console.log('homepage', this.props);
    return (
      <div className="push--top">
        <Home />
        <CustomSnackBar
          open={
            manualEthOffloadingStarted ||
            manualDaiOffloadingStarted ||
            daiRatioBalancingStarted
          }
          onClose={() => this.props.dispatch(closeSnackbar())}
        />
      </div>
    );
  }
}

const mapStatesToProps = state => {
  const {
    manualEthOffloadingStarted,
    manualDaiOffloadingStarted,
    daiRatioBalancingStarted
  } = state.TradeCardData || {};
  return {
    manualEthOffloadingStarted,
    manualDaiOffloadingStarted,
    daiRatioBalancingStarted
  };
};

export default connect(mapStatesToProps)(HomePage);
