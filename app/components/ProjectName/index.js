import React from 'react';
import { Grid } from '@material-ui/core';
import { CustomCard } from '../CustomMUI/CustomCardComponent';

class ProjectName extends React.Component {
  render() {
    return (
      <Grid spacing={16} container>
        <CustomCard style={{ padding: '50px' }}>
          <Grid item lg={8}>
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
          <Grid item lg={4}>
            <span>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit,sed diam
              nonummy nibh euismod tincidunt.
            </span>
          </Grid>
          <Grid item lg={6}>
            <div className="txt-bold">Tap Amount:</div>
            <div className="text--secondary">120 ETH</div>
          </Grid>
          <Grid item lg={6}>
            <div className="txt-bold">Initial Fund Release:</div>
            <div className="text--secondary">1200 ETH/person</div>
          </Grid>
          {/* <Row>
            <Col xs={12} lg={8}>
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
            </Col>
            <Col lg={4} className="push-half--top text-right">
              <span>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit,sed
                diam nonummy nibh euismod tincidunt.
              </span>
            </Col>
          </Row>
          <Row className="push-top--35">
            <Col lg={6} className="txt">
              <div className="txt-bold">Tap Amount:</div>
              <div className="text--secondary">120 ETH</div>
            </Col>
            <Col lg={6} className="txt">
              <div className="txt-bold">Initial Fund Release:</div>
              <div className="text--secondary">1200 ETH/person</div>
            </Col>
          </Row> */}
        </CustomCard>
      </Grid>
    );
  }
}

export default ProjectName;
