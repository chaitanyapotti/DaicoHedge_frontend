import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { CustomButton } from '../../CustomMUI/CustomButton';

const styles = {
  root: {
    flexGrow: 1
  },
  colorDefault: {
    backgroundColor: 'white'
  }
};

function Header(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <AppBar className={classes.colorDefault} position="static">
        <Toolbar>
          <div className="txt-xl text--primary">DAICO Hedge</div>
        </Toolbar>
        {/* <Link to="/investor">
          <CustomButton>Investor Page</CustomButton>
        </Link> */}
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
