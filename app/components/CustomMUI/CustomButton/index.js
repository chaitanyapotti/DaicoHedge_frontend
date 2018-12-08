import React, { Component } from 'react';
import { Button } from '@material-ui/core';

export const CustomButton = props => (
  <Button
    className="btn bg--primary txt-p-vault txt-dddbld text--white"
    {...props}
  >
    {props.children}
  </Button>
);
