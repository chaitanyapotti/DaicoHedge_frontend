// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from '@material-ui/core';
import routes from '../../constants/routes';
import MasonaryLayout from '../Common/MasonaryLayout';
import ProjectName from '../ProjectName';
import ProjectDetails from '../ProjectDetails';
import VoteHistogram from '../VoteHistogram';
import {
  getVoteHistogram,
  getSpendCurve
} from '../../actions/pollFactoryActions';
import { CustomCard } from '../CustomMUI/CustomCardComponent';

type Props = {};

class Investor extends Component<Props> {
  props: Props;

  componentDidMount() {
    // this.props.dispatch(getVoteHistogram());
    this.props.dispatch(getSpendCurve());
  }

  render() {
    const { voteHistogramData, spendingCurveData } = this.props || {};
    console.log('spendingCurveData', spendingCurveData);
    return (
      <Grid container>
        <MasonaryLayout>
          <ProjectName />
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
export default connect(mapStatesToProps)(Investor);
