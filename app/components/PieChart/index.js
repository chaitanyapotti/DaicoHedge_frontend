import React from 'react';
import { connect } from 'react-redux';
import ReactEcharts from 'echarts-for-react';
import { Grid } from '@material-ui/core';

const getOption = () => ({
  color: [
    '#4CA9FC',
    '#FF839B',
    '#A288FF ',
    '#FFBE55',
    '#ffffff',
    '#666666',
    '#ffffff'
  ],
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    x: 'left',
    data: ['', '', '', '', '']
  },
  series: [
    {
      name: 'Target Values',
      type: 'pie',
      radius: ['70%', '80%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '30',
            fontWeight: 'bold'
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [
        { value: 33, name: 'Target ETH' },
        { value: 67, name: 'Target DAI' }
      ]
    },
    {
      name: 'Current Values',
      type: 'pie',
      radius: ['47%', '57%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '30',
            fontWeight: 'bold'
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [
        { value: 39, name: 'Current ETH' },
        { value: 61, name: 'Current DAI' }
      ]
    },
    {
      tooltip: {
        show: false
      },
      name: 'Shortfall',
      type: 'pie',
      radius: ['63%', '64%'],
      avoidLabelOverlap: false,
      label: {
        normal: {
          show: false,
          position: 'center'
        },
        emphasis: {
          show: true,
          textStyle: {
            fontSize: '30',
            fontWeight: 'bold'
          }
        }
      },
      labelLine: {
        normal: {
          show: false
        }
      },
      data: [
        { value: 33, name: '' },
        {
          value: 6,
          name: 'Shortfall',
          tooltip: {
            show: true
          }
        },
        { value: 61, name: '' }
      ]
    }
  ]
});
const PieChart = props => {
  const { rounds, foundationDetails, prices, currentRoundNumber, roundInfo } =
    props || {};
  return (
    <div>
      <div className="txt-xxxl text--primary">Your Balances</div>
      <Grid container>
        <Grid item xs={12} lg={6}>
          <div>
            <ReactEcharts
              option={getOption(
                rounds,
                foundationDetails,
                prices,
                currentRoundNumber,
                roundInfo
              )}
              notMerge
              lazyUpdate
              style={{ height: '30em', width: '30em', padding: '0px' }}
              opts={{ renderer: 'svg' }}
            />
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

const mapStatesToProps = state => {
  const {
    spreadPercentage,
    balanceRatio,
    balancingAggressionFactor,
    avgPrice,
    manualAggressionFactor,
    botStartedSuccessfully,
    currentStrategy,
    currentStrategyCode,
    manualEthAmount,
    manualDaiAmount,
    current_ask,
    current_bid
  } = state.TradeCardData || {};
  const { etherBalance, daiBalance } = state.PollFactoryReducer || {};
  return {
    spreadPercentage,
    balanceRatio,
    balancingAggressionFactor,
    avgPrice,
    manualAggressionFactor,
    etherBalance,
    daiBalance,
    botStartedSuccessfully,
    currentStrategy,
    currentStrategyCode
  };
};

const myConnector = connect(mapStatesToProps);
const PieChartConnected = myConnector(PieChart);

export default PieChartConnected;
