// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
// import { Header } from './Common';
import ProjectName from './ProjectName';
import SampleC from './SampleC';
import TradeCard from "./TradeCard";
import { Grid, Row, Col } from "@material-ui/core";

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        {/* <SampleC /> */}
        {/* <Header /> */}
        <Grid spacing={12}>
          <Grid item xs={6}>
            <ProjectName />
          </Grid>
          <Grid item xs={6}>
          <TradeCard/>
          </Grid>
        </Grid>
        
        <h2>Home</h2>
      </div>
    );
  }
}
