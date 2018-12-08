import 'rc-slider/assets/index.css';

import React from 'react';
import Slider from 'rc-slider';

const Range = Slider.Range;

const style = { width: 350, margin: 20 };

function log(value) {
  console.log('slider', value); //eslint-disable-line
}

class RCSlider extends React.Component {
  render() {
    return (
      <div style={style}>
        <Range allowCross={false} defaultValue={[0, 20]} onChange={log} />
      </div>
    );
  }
}

export default RCSlider;
