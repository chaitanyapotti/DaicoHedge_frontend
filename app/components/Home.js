// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
// import { Header } from './Common';
import ProjectName from './ProjectName';
import SampleC from './SampleC';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <SampleC />
        {/* <Header /> */}
        <ProjectName />
        <h2>Home</h2>
      </div>
    );
  }
}
