// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid, Row, Col } from '@material-ui/core';
import routes from '../constants/routes';
// import { Header } from './Common';
import ProjectName from './ProjectName';
import TradeCard from './TradeCard';
import PieChart from './PieChart';
import MasonaryLayout from './Common/MasonaryLayout';
import { CustomCard } from './CustomMUI/CustomCardComponent';
import WithdrawCard from './WithdrawCard';
import VoteHistogram from './VoteHistogram';

type Props = {};

class Home extends Component<Props> {
  props: Props;

  render() {
    const { voteHistogramData, spendingCurveData } = this.props || {};
    return (
      <Grid container>
        <MasonaryLayout>
          <ProjectName />
          <TradeCard />
          <WithdrawCard />
          <CustomCard className="card-brdr" style={{ padding: '50px' }}>
            <PieChart />
          </CustomCard>
          <CustomCard className="card-brdr" style={{ padding: '50px' }}>
            <VoteHistogram voteHistogramData={voteHistogramData} />
          </CustomCard>
        </MasonaryLayout>
      </Grid>
    );
  }
}

const mapStatesToProps = state => {
  const { PollFactoryReducer } = state || {};
  const { voteHistogramData, spendingCurveData } = PollFactoryReducer || {};

  return {
    voteHistogramData,
    spendingCurveData
  };
};

export default connect(mapStatesToProps)(Home);
