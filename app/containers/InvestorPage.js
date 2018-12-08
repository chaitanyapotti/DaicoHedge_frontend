// @flow
import React, { Component } from 'react';
import Investor from '../components/Investor';
import { getVoteHistogram } from '../actions/pollFactoryActions';

type Props = {};

class InvestorPage extends Component<Props> {
  props: Props;

  componentDidMount() {
    const { getVoteHistogram } = this.props || {};
    getVoteHistogram();
  }

  render() {
    return (
      <div className="push--top">
        <Investor />
      </div>
    );
  }
}

export default InvestorPage;
