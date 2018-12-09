// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { CustomCard } from '../CustomMUI/CustomCardComponent';
import { CustomButton } from '../CustomMUI/CustomButton';
import { getRefund } from '../../actions/pollFactoryActions';
import CustomSnackBar from '../CustomMUI/CustomSnackBar';
import {
  getUserTokenBalance,
  getPollFactoryDai,
  getPollFactoryEther,
  getRemainingBalance
} from '../../actions/pollFactoryActions';

type Props = {};

class RefundPage extends Component<Props> {
  props: Props;

  componentDidMount() {
    this.props.dispatch(getUserTokenBalance());
    this.props.dispatch(getPollFactoryDai());
    this.props.dispatch(getPollFactoryEther());
    this.props.dispatch(getRemainingBalance());
  }

  render() {
    const {
      crowdSaleRefund,
      killRefund,
      pollFactDai,
      pollFactEther,
      userTokenBalance,
      totalTokenSupply
    } = this.props || {};
    console.log('props', this.props);
    return (
      <div className="push--top">
        <CustomCard className="card-brdr" style={{ padding: '50px' }}>
          <div>
            This Contract has been destroyed. By the virtue of holding www
            tokens You are eligible for receiving xxx DAI and PQR ETH
          </div>
          <div className="push--top">
            <CustomButton onClick={() => this.props.dispatch(getRefund())}>
              Refund
            </CustomButton>
          </div>
        </CustomCard>
        <CustomSnackBar
          open={crowdSaleRefund || killRefund}
          onClose={() => this.props.dispatch(closeSnackbar())}
          message="Succ Message"
        />
      </div>
    );
  }
}
const mapStatesToProps = state => {
  const {
    crowdSaleRefund,
    killRefund,
    pollFactEther,
    pollFactDai,
    userTokenBalance,
    totalTokenSupply
  } = state.PollFactoryReducer || {};
  return {
    crowdSaleRefund,
    killRefund,
    pollFactDai,
    pollFactEther,
    userTokenBalance,
    totalTokenSupply
  };
};

export default connect(mapStatesToProps)(RefundPage);
