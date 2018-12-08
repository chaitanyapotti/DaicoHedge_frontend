// @flow
import React, { Component } from 'react';
import Investor from '../components/Investor';

type Props = {};

class InvestorPage extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className="push--top">
        <Investor />
      </div>
    );
  }
}

export default InvestorPage;
