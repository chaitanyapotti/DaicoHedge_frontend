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
      daiRatioBalancingStarted,
      botStartedSuccessfully
    } = this.props || {};
    console.log('homepage', this.props);
    return (
      <div className="push--top">
        <Home />
        <CustomSnackBar
          open={
            manualEthOffloadingStarted ||
            manualDaiOffloadingStarted ||
            daiRatioBalancingStarted ||
            botStartedSuccessfully
          }
          onClose={() => this.props.dispatch(closeSnackbar())}
          message="Successfully started market making"
        />
      </div>
    );
  }
}

const mapStatesToProps = state => {
  const {
    manualEthOffloadingStarted,
    manualDaiOffloadingStarted,
    daiRatioBalancingStarted,
    botStartedSuccessfully
  } = state.TradeCardData || {};
  return {
    manualEthOffloadingStarted,
    manualDaiOffloadingStarted,
    daiRatioBalancingStarted,
    botStartedSuccessfully
  };
};

export default connect(mapStatesToProps)(HomePage);
