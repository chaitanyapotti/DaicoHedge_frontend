import React from 'react';
import {connect} from "react-redux";
import { Grid } from '@material-ui/core';
import { CustomCard } from '../CustomMUI/CustomCardComponent';
import { CustomTextField } from '../CustomMUI/CustomTextField';
import { CustomButton } from '../CustomMUI/CustomButton';
import { withdrawalAmountChanged } from "../../actions/tradeActions";


class WithdrawCard extends React.Component {

  handleWithdrawalAmountChange = (event) => {
    this.props.dispatch(withdrawalAmountChanged(event.target.value))
  }

  render() {
    return (
      <Grid container>
        <CustomCard
          className="card-brdr"
          style={{ padding: '50px', width: '100%' }}
        >
          <div className="text--primary txt-xl">Withdrawal Management</div>
          <Grid container>
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
        </CustomCard>
      </Grid>
    );
  }
}


const mapStatesToProps = state => {
  const {
    withdrawalAmount
  } = state.TradeCardData || {};
  return {
    withdrawalAmount
  };
};

export default connect(mapStatesToProps)(WithdrawCard);
