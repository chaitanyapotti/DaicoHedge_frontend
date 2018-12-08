import React from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import { CustomCard } from '../CustomMUI/CustomCardComponent';
import { CustomTextField } from '../CustomMUI/CustomTextField';
import { CustomButton } from '../CustomMUI/CustomButton';
import { withdrawalAmountChanged } from '../../actions/tradeActions';

class WithdrawCard extends React.Component {
  handleWithdrawalAmountChange = event => {
    this.props.dispatch(withdrawalAmountChanged(event.target.value));
  };

  render() {
    return (
      <Grid container>
        <CustomCard
          className="card-brdr"
          style={{ padding: '50px', width: '100%' }}
        >
          <div className="text--primary txt-xl">Withdrawal Management</div>
          <Grid className="push--top" container>
            <Grid item lg={6}>
              <CustomTextField
                label="Enter ETH"
                value={this.props.withdrawalAmount}
                fullWidth
                onChange={this.handleWithdrawalAmountChange}
              />
            </Grid>
            <Grid className="text--center" item lg={6}>
              <span>
                <CustomButton>Withdraw</CustomButton>
              </span>
            </Grid>
          </Grid>
          <div className="push-half--top">
            Equivalent to{' '}
            <span className="text--secondary">
              {this.props.withdrawalAmount *
                (1 / this.props.avgPrice).toFixed(2)}{' '}
              DAI
            </span>{' '}
          </div>
          <br />
          <div>
            You will get{' '}
            <span className="text--secondary">
              {this.props.withdrawalAmount - 0.2 * this.props.withdrawalAmount}{' '}
              ETH
            </span>{' '}
            and{' '}
            <span className="text--secondary">
              {' '}
              {(
                0.2 *
                this.props.withdrawalAmount *
                (1 / this.props.avgPrice)
              ).toFixed(2)}{' '}
              DAI
            </span>
            .
          </div>
        </CustomCard>
      </Grid>
    );
  }
}

const mapStatesToProps = state => {
  const { withdrawalAmount, avgPrice } = state.TradeCardData || {};
  return {
    withdrawalAmount,
    avgPrice
  };
};

export default connect(mapStatesToProps)(WithdrawCard);
