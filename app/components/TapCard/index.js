import React from 'react';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { CustomCard } from '../CustomMUI/CustomCardComponent';
import { CustomButton } from '../CustomMUI/CustomButton';
import {
  getCurrentTap,
  getKillConsensus,
  getRemainingBalance,
  getVoteHistogram,
  getTapConsensus
} from '../../actions/pollFactoryActions';

class TapCard extends React.Component {
  componentDidMount() {
    this.props.dispatch(getCurrentTap());
    this.props.dispatch(getKillConsensus());
    this.props.dispatch(getRemainingBalance());
    this.props.dispatch(getTapConsensus());
    this.props.dispatch(getVoteHistogram());
  }

  render() {
    console.log('aayush state', this.props);
    return (
      <Grid container>
        <CustomCard
          className="card-brdr"
          style={{ padding: '50px', width: '100%' }}
        >
          <div className="txt-xl">Tap Card</div>
          <Grid item lg={12} className="push--top">
            <Grid container>
              <Grid item lg={5}>
                <div className="txt-bold">
                  Tap Amount: <span className="text--secondary">120ETH</span>
                </div>
              </Grid>
              <Grid item lg={7}>
                <div className="txt-bold">
                  Initial Fund Release:{' '}
                  <span className="text--secondary">1200 ETH/person</span>
                </div>
              </Grid>
            </Grid>
          </Grid>

          <Grid item lg={12} className="push--top">
            <Grid container>
              <Grid item lg={5}>
                <div className="txt-bold">
                  Tap Amount: <span className="text--secondary">120ETH</span>
                </div>
              </Grid>
              <Grid item lg={7}>
                {/* <div className="txt-bold">
                  Initial Fund Release:{' '}
                  <span className="text--secondary">1200 ETH/person</span>
                </div> */}
              </Grid>
            </Grid>
          </Grid>
          <CustomButton>Approve</CustomButton>
        </CustomCard>
      </Grid>
    );
  }
}
const mapStatesToProps = state => {
  const { pollFactoryReducer } = state || {};
  const { killConsensus, tapConsensus, currentTap, etherBalance, daiBalance } =
    pollFactoryReducer || {};

  return {
    killConsensus,
    tapConsensus,
    currentTap,
    etherBalance,
    daiBalance
  };
};
export default connect(mapStatesToProps)(TapCard);
