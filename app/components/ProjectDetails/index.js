import React from 'react';
import { Grid } from '@material-ui/core';
import { CustomCard } from '../CustomMUI/CustomCardComponent';
import { CustomButton } from '../CustomMUI/CustomButton';

class ProjectDetails extends React.Component {
  render() {
    return (
      <Grid container>
        <CustomCard
          className="card-brdr"
          style={{ padding: '50px', width: '100%' }}
        >
          <div className="txt-xl">Project Details</div>
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
                <div className="txt-bold">
                  Initial Fund Release:{' '}
                  <span className="text--secondary">1200 ETH/person</span>
                </div>
              </Grid>
            </Grid>
          </Grid>
          <CustomButton>Kill Project</CustomButton>
        </CustomCard>
      </Grid>
    );
  }
}

export default ProjectDetails;
