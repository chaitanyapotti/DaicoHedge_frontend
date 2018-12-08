// @flow
import * as React from 'react';
import Header from '../components/Common/Header';

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    const { children } = this.props;
    return (
      <div>
        <Header />
        <React.Fragment>{children}</React.Fragment>
      </div>
    );
  }
}
