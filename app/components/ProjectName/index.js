import React from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { CustomCard } from '../CustomMUI/CustomCardComponent';
import {
  getCurrentTap,
  getKillConsensus,
  getRemainingBalance,
  getVoteHistogram,
  getTapConsensus
} from '../../actions/pollFactoryActions';

class ProjectName extends React.Component {
  componentDidMount() {
    this.props.dispatch(getCurrentTap());
    this.props.dispatch(getKillConsensus());
    this.props.dispatch(getRemainingBalance());
    this.props.dispatch(getTapConsensus());
    this.props.dispatch(getVoteHistogram());
  }

  render() {
    const {
      killConsensus,
      tapConsensus,
      currentTap,
      etherBalance,
      daiBalance
    } = this.props || {};
    const tapAmount = Math.round(
      (parseFloat(currentTap) * 86400 * 30) / 10 ** 18
    );
    return (
      <Grid container>
        <CustomCard className="card-brdr" style={{ padding: '50px' }}>
          <Grid item lg={12}>
            <div className="hl">
              <span className="prjct-logo hli">
                <img
                  alt="logo"
                  width="50"
                  height="50"
                  className="prjct-logo hli"
                  src="https://image.shutterstock.com/z/stock-vector-bitcoin-icon-vector-stock-vector-illustration-flat-design-style-1199767786.jpg"
                />
              </span>
              <div className="hli push--left text--primary push-half--top">
                <div className="txt-xl">Beta (BTC)</div>
                <div className="txt opacity-75">0.005 ETH</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={12} className="push--top">
            <span>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit,sed diam
              nonummy nibh euismod tincidunt.
            </span>
          </Grid>
          <Grid item lg={12} className="push--top">
            <Grid container>
              <Grid item lg={5}>
                <div className="txt-bold">
                  Current Tap Amount:{' '}
                  <span className="text--secondary">{tapAmount} ETH/month</span>
                </div>
              </Grid>
              <Grid item lg={7}>
                <div className="txt-bold">
                  Increment Approval:{' '}
                  <span className="text--secondary">
                    {(parseFloat(tapConsensus) / 100).toFixed(2)} %
                  </span>
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid item lg={12} className="push--top">
            <Grid container>
              <Grid item lg={5}>
                <div className="txt-bold">
                  Kill Consensus:{' '}
                  <span className="text--secondary">
                    {isNaN(killConsensus) ? 0 : parseFloat(killConsensus) / 100}{' '}
                    %
                  </span>
                </div>
              </Grid>
              <Grid item lg={7}>
                <div className="txt-bold">
                  Ether Balance:{' '}
                  <span className="text--secondary">{etherBalance}</span>
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid item lg={12} className="push--top">
            <Grid container>
              <Grid item lg={5}>
                <div className="txt-bold">
                  DAI Balance:{' '}
                  <span className="text--secondary">{daiBalance}</span>
                </div>
              </Grid>
              <Grid item lg={7}>
                {/* <div className="txt-bold">
                  Ether Balance:{' '}
                  <span className="text--secondary">{etherBalance}</span>
                </div> */}
              </Grid>
            </Grid>
          </Grid>
        </CustomCard>
      </Grid>
    );
  }
}

const mapStatesToProps = state => {
  const { PollFactoryReducer } = state || {};
  const { killConsensus, tapConsensus, currentTap, etherBalance, daiBalance } =
    PollFactoryReducer || {};

  return {
    killConsensus,
    tapConsensus,
    currentTap,
    etherBalance,
    daiBalance
  };
};
export default connect(mapStatesToProps)(ProjectName);
