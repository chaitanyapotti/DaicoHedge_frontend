import React from 'react';
import { Grid } from '@material-ui/core';
import { CustomCard } from '../CustomMUI/CustomCardComponent';

class ProjectName extends React.Component {
  render() {
    return (
      <Grid container>
        <CustomCard className="card-brdr" style={{ padding: '50px' }}>
          <Grid item lg={12}>
            <div className="hl">
              <span className="prjct-logo hli">
                <img
                  alt="logo"
                  width="50"
                  height="50"
                  className="prjct-logo hli"
                  src="https://image.shutterstock.com/z/stock-vector-bitcoin-icon-vector-stock-vector-illustration-flat-design-style-1199767786.jpg"
                />
              </span>
              <div className="hli push--left text--primary push-half--top">
                <div className="txt-xl">Beta (BTC)</div>
                <div className="txt opacity-75">0.005 ETH</div>
              </div>
            </div>
          </Grid>
          <Grid item lg={12} className="push--top">
            <span>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit,sed diam
              nonummy nibh euismod tincidunt.
            </span>
          </Grid>
          <Grid item lg={12} className="push--top">
            <Grid container>
              <Grid item lg={5}>
                <div className="txt-bold">
                  Tap Amount: <span className="text--secondary">120ETH</span>
                </div>
              </Grid>
              <Grid item lg={7}>
                {/* <div className="txt-bold">
                  Initial Fund Release:{' '}
                  <span className="text--secondary">1200 ETH/person</span>
                </div> */}
              </Grid>
            </Grid>
          </Grid>
        </CustomCard>
      </Grid>
    );
  }
}

export default ProjectName;
