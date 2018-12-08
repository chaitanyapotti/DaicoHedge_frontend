import React, { Component } from 'react';
import { Grid, Tabs, Tab, Input, Button, Divider } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import HomePage from './HomePage';
import InvestorPage from './InvestorPage';
import RefundPage from '../components/RefundPage';

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  },
  tabRoot: {
    minWidth: '80px',
    textTransform: 'initial'
  }
});

class AppContainer extends Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state || {};
    const { classes } = this.props || {};
    return (
      <div>
        <Tabs value={value} onChange={this.handleChange}>
          <Tab className={classes.tabRoot} label="Issuer Page" />
          <Tab className={classes.tabRoot} label="Investors Page" />
          <Tab className={classes.tabRoot} label="Refund Page" />
        </Tabs>

        <div style={{ padding: '20px 40px 40px' }}>
          {value === 0 && <HomePage />}
          {value === 1 && <InvestorPage />}
          {value === 2 && <RefundPage />}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AppContainer);
