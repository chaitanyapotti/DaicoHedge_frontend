// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../constants/routes';
import "../static/css/app.global.css";
import {Button} from "@material-ui/core";

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div className="testname">
        <Button>Hello</Button>
        <h2>Home</h2>
      </div>
    );
  }
}
