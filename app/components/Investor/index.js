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
import { getVoteHistogram } from '../../actions/pollFactoryActions';

type Props = {};

class Investor extends Component<Props> {
  props: Props;

  componentDidMount() {
    this.props.dispatch(getVoteHistogram());
  }

  render() {
    const { voteHistogramData } = this.props || {};
    console.log('djdssdsdsds', voteHistogramData);
    return (
      <Grid container>
        <MasonaryLayout>
          <ProjectName />
          <ProjectDetails />
          <VoteHistogram voteHistogramData={voteHistogramData} />
        </MasonaryLayout>
      </Grid>
    );
  }
}

const mapStatesToProps = state => {
  const { PollFactoryReducer } = state || {};
  const { voteHistogramData } = PollFactoryReducer || {};
  return {
    voteHistogramData
  };
};
export default connect(mapStatesToProps)(Investor);
