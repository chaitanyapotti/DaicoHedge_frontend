import React, { Component } from 'react';
import { Grid, Tabs, Tab, Input, Button, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { CustomCard } from '../CustomMUI/CustomCardComponent';
import { CustomButton } from '../CustomMUI/CustomButton';
import { CustomTextField } from '../CustomMUI/CustomTextField';
import RCSlider from '../Common/RCSlider';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  tabRoot: {
    minWidth: '80px'
  }
});
class DAIRatio extends Component {
  render() {
    return (
      <div className="push--top">
        <Grid container>
          <Grid item lg={9}>
            <RCSlider />
          </Grid>
          <Grid className="text--center" item lg={3}>
            <span>
              <CustomButton>Confirm Trade</CustomButton>
            </span>
          </Grid>
        </Grid>

        <div className="push-half--top">1 Eth = 84.24 DAI </div>
        <div className="push-half--top">
          Your portfolio will gradually get rebalanced until 20 % of its value
          is in DAI
        </div>
      </div>
    );
  }
}

class ManualData extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  ConvertDai = props => (
    <div className="push--top">
      <Grid container>
        <Grid item lg={6}>
          <CustomTextField
            label="Amount of ETH"
            value=""
            fullWidth
            onChange={() => this.handleTextChange()}
          />
        </Grid>
        <Grid className="text--center" item lg={6}>
          <span>
            <CustomButton>Confirm Trade</CustomButton>
          </span>
        </Grid>
      </Grid>
    </div>
  );

  ConvertEth = props => (
    <div className="push--top">
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
            <CustomButton>Confirm Trade</CustomButton>
          </span>
        </Grid>
      </Grid>

      <div className="push-half--top">1 Eth = 84.24 DAI </div>
    </div>
  );

  render() {
    const { value } = this.state || {};
    // const { classes } = this.props || {};
    // console.log('classes', classes, this.props);
    return (
      <div className="push--top">
        <Tabs
          // classes={classes.scrollButtons}
          value={value}
          onChange={this.handleChange}
        >
          <Tab label="Convert to DAI" />
          <Tab label="Convert to ETH" />
        </Tabs>
        {value === 0 && this.ConvertDai()}
        {value === 1 && this.ConvertEth()}
      </div>
    );
  }
}

class TradeCard extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    const { classes } = this.props || {};
    return (
      <Grid container>
        <CustomCard className="card-brdr" style={{ width: '100%' }}>
          <Grid style={{ padding: '40px' }} item lg={12}>
            <Grid container>
              <Grid item lg={2}>
                <span
                  style={{ top: '8px' }}
                  className="text--primary txt-xl pos-rel"
                >
                  Trade
                </span>
              </Grid>
              <Grid item lg={10}>
                <Tabs value={value} onChange={this.handleChange}>
                  <Tab className={classes.tabRoot} label="Manual" />
                  <Tab className={classes.tabRoot} label="DAI Ratio" />
                  <Tab className={classes.tabRoot} label="Market Making" />
                </Tabs>
              </Grid>
            </Grid>
          </Grid>
          <Divider />
          <div style={{ padding: '0 40px 40px' }}>
            {value === 0 && <ManualData />}
            {value === 1 && <DAIRatio />}
          </div>
        </CustomCard>
      </Grid>
    );
  }
}

export default withStyles(styles)(TradeCard);
