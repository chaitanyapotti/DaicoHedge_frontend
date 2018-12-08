// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from '@material-ui/core';
import routes from '../constants/routes';
// import { Header } from './Common';
import ProjectName from './ProjectName';
import TradeCard from './TradeCard';
import PieChart from './PieChart';
import MasonaryLayout from './Common/MasonaryLayout';
import { CustomCard } from './CustomMUI/CustomCardComponent';
import WithdrawCard from './WithdrawCard';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <Grid container>
        <MasonaryLayout>
          <ProjectName />
          <TradeCard />
          <WithdrawCard />
          <CustomCard className="card-brdr" style={{ padding: '50px' }}>
            <PieChart />
          </CustomCard>
        </MasonaryLayout>
      </Grid>
    );
  }
}
