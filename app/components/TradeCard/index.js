import React, { Component } from 'react';
import {connect} from "react-redux";
// import  {bindActionCreators } from "redux";
import { Grid, Tabs, Tab, Input, Button, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { CustomCard } from '../CustomMUI/CustomCardComponent';
import { CustomButton } from '../CustomMUI/CustomButton';
import { CustomTextField } from '../CustomMUI/CustomTextField';
import RCSlider from '../Common/RCSlider';
import { marketMakingSpreadChanged, startTradingBot, balanceRatios, balanceRatioChanged, balancingAggressionChanged, fetchDaiRate } from "../../actions/tradeActions";
 

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  tabRoot: {
    minWidth: '80px'
  }
});

class MarketMaking extends Component {

  handleTextChange= (event) => {
    this.props.dispatch(marketMakingSpreadChanged(event.target.value))
  }

  startTradingBotAction = () => {
    this.props.dispatch(startTradingBot(this.props.spreadPercentage)) 
  }

  render() {
    return (
      <div>
          <Grid container>
            <Grid item lg={6}>
              <CustomTextField
                label="Spread Percentage"
                value= {this.props.spreadPercentage}
                fullWidth
                onChange={this.handleTextChange}
              />
            </Grid>
            <Grid className="text--center" item lg={6}>
              <span>
                <CustomButton onClick={this.startTradingBotAction}>Start Bot</CustomButton>
              </span>
            </Grid>
          </Grid>
      </div>
    )
  }
}

class DAIRatio extends Component {

  onChangeBalanceRatio = (value) => {
    this.props.dispatch(balanceRatioChanged(value))
  }

  startBalancingRatio = () => {
    this.props.dispatch(balanceRatios(this.props.balanceRatio))
  }


  onChangeBalancingAggression = (value) => {
    this.props.dispatch(balancingAggressionChanged(value))
  }

  render() {
    return (
      <div className="push--top">
        <Grid container>
          <Grid item lg={9}>
            <div>Balance Ratio</div>
            <span> <RCSlider onChange={this.onChangeBalanceRatio} value={this.props.balanceRatio} /> {this.props.balanceRatio}</span> 
          </Grid>
          <Grid item lg={9}>
          <div>Aggression Factor</div>
          <span>
          <RCSlider onChange={this.onChangeBalancingAggression} value={this.props.balancingAggressionFactor} min={1} max={5} step={1} dots/>
          {this.props.balancingAggressionFactor}
          </span>
            
          </Grid>
          <Grid className="text--center" item lg={3}>
            <span>
              <CustomButton onClick={this.startBalancingRatio}>Confirm Trade</CustomButton>
            </span>
          </Grid>
        </Grid>

        <div className="push-half--top">1 Eth = 84.24 DAI </div>
        <div className="push-half--top">
          Your portfolio will gradually get rebalanced until {this.props.balanceRatio}% of its value
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
    value: 1
  };

  componentDidMount(){
    this.props.dispatch(fetchDaiRate())
  }

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
            {value === 1 && <DAIRatioConnected />}
            {value ===2 && <MarketMakingConnected />}
          </div>
        </CustomCard>
      </Grid>
    );
  }
}

// const mapDispatchToProps = dispatch =>
//   bindActionCreators(
//     {
//       marketMakingSpreadChanged
//     },
//     dispatch
//   );

const mapStatesToProps = state => {
  const {
    spreadPercentage,
    balanceRatio,
    balancingAggressionFactor
  } = state.TradeCardData || {};
  return {
    spreadPercentage,
    balanceRatio,
    balancingAggressionFactor
  };
};

const myConnector = connect(mapStatesToProps);
const MarketMakingConnected = myConnector(MarketMaking);
const DAIRatioConnected = myConnector(DAIRatio);

export default withStyles(styles)(connect(mapStatesToProps)(TradeCard));
