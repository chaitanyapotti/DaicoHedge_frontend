// @flow
import React, { Component } from 'react';
import { Grid } from '@material-ui/core';
import { CustomCard } from '../CustomMUI/CustomCardComponent';
import { CustomButton } from '../CustomMUI/CustomButton';
import { getRefund } from '../../actions/pollFactoryActions';

type Props = {};

class RefundPage extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className="push--top">
        <CustomCard className="card-brdr" style={{ padding: '50px' }}>
          <div>Refund Message</div>
          <div className="push--top">
            <CustomButton onClick={() => this.props.dispatch(getRefund())}>
              Refund
            </CustomButton>
          </div>
        </CustomCard>
      </div>
    );
  }
}

export default RefundPage;
