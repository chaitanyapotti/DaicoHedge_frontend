// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { CustomCard } from '../CustomMUI/CustomCardComponent';
import { CustomButton } from '../CustomMUI/CustomButton';
import { getRefund } from '../../actions/pollFactoryActions';
import CustomSnackBar from '../CustomMUI/CustomSnackBar';

type Props = {};

class RefundPage extends Component<Props> {
  props: Props;

  render() {
    const { crowdSaleRefund, killRefund } = this.props || {};
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
  const { crowdSaleRefund, killRefund } = state.PollFactoryReducer || {};
  return {
    crowdSaleRefund,
    killRefund
  };
};

export default connect(mapStatesToProps)(RefundPage);
