import React from 'react';
import Slider from 'rc-slider';

const Range = Slider.Range;

const style = { width: 350, margin: 20 };


class RCSlider extends React.Component {
  render() { 
    return (
      <div style={style}>
        <Slider onChange={this.props.onChange} {...this.props}/>
      </div>
    );
  }
}

export default RCSlider;
