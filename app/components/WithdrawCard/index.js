import React from 'react';
import { Grid } from '@material-ui/core';
import { CustomCard } from '../CustomMUI/CustomCardComponent';
import { CustomTextField } from '../CustomMUI/CustomTextField';
import { CustomButton } from '../CustomMUI/CustomButton';

class WithdrawCard extends React.Component {
  render() {
    return (
      <Grid container>
        <CustomCard
          className="card-brdr"
          style={{ padding: '50px', width: '100%' }}
        >
          <div className="text--primary txt-xl">Your Balance</div>
          <Grid container>
            <Grid item lg={6}>
              <CustomTextField
                label="Amount of DAI"
                value=""
                fullWidth
                onChange={() => this.handleTextChange()}
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

export default WithdrawCard;
