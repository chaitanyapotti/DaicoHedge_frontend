// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from '@material-ui/core';
import routes from '../../constants/routes';
import MasonaryLayout from '../Common/MasonaryLayout';
import ProjectName from '../ProjectName';
import ProjectDetails from '../ProjectDetails';

type Props = {};

class Investor extends Component<Props> {
  props: Props;

  render() {
    return (
      <Grid container>
        <MasonaryLayout>
          <ProjectName />
          <ProjectDetails />
        </MasonaryLayout>
      </Grid>
    );
  }
}

export default Investor;
