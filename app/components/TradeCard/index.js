import React, { Component } from "react";
import { CustomCard } from '../CustomMUI/CustomCardComponent';
import { Grid, Tabs, Tab, Input, Button } from "@material-ui/core";


class DAIRatio extends Component {
  render() {
    return (
        <div> 
            <Input> DAI Percentage</Input> 
            <span><Button>Confirm Trade</Button></span>
            <div>1 Eth = 84.24 DAI </div>
            Your portfolio will gradually get rebalanced until 20 % of its value is in DAI
        </div>
    )
  }
}


class ManualData extends Component {
    state = {
        value: 0,
    }

    handleChange = (event, value) => {
        this.setState({ value });
      };


      render(){
        const { value } = this.state;
    
        return (
            <div>
                <Tabs value={value} onChange={this.handleChange}>
                    <Tab label="Convert to DAI">
                    </Tab>
                    <Tab label="Convert to ETH">
                        
                    </Tab>
                </Tabs>
                {value === 0 && <div> 
                        <Input> Amount of ETH</Input> 
                        <span><Button>Confirm Trade</Button></span>
                        <div>1 Eth = 84.24 DAI </div> 
                        </div>}
            </div>
        )
        }
}



class TradeCard extends Component {
    state = {
        value: 0,
      };

      handleChange = (event, value) => {
        this.setState({ value });
      };

  render() {
    const { value } = this.state;
    return (
      <Grid spacing={16} container>
        <CustomCard style={{ padding: '50px' }}>
            <Grid item lg={8}>
                <span>
                <div className="hli push--left text--primary push-half--top">
                    <div className="txt-xl">Trade</div>
                </div>
                </span>
                <Tabs value={value} onChange={this.handleChange}>
                <Tab label="Manual" />
            <Tab label="DAI Ratio" />
            <Tab label="Market Making" />
                </Tabs>
                {value === 0 && <ManualData/>}
                {value === 1 && <DAIRatio/>}
                {/* {value === 1 && <TabContainer>Item Two</TabContainer>}
                {value === 2 && <TabContainer>Item Three</TabContainer>} */}
            </Grid>
          </CustomCard>
      </Grid>
    )
  }
}

export default TradeCard