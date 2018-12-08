import React from 'react';
import ReactEcharts from 'echarts-for-react';
import { Grid } from '@material-ui/core';

const getOption = () =>
  //   const { ETH } = prices || {};
  //   const { price: etherPrice } = ETH || {};
  //   const roundNumber = currentRoundNumber === "4" ? 3 : currentRoundNumber === "0" || currentRoundNumber === "" ? 1 : parseInt(currentRoundNumber, 10);
  //   const tokenData = [];
  //   const legendData = ["Round 1 Cap", "Round 2 Cap", "Round 3 Cap", "Round 1 Tokens", "Round 2 Tokens", "Round 3 Tokens"];
  //   const roundDollarData = [];
  //   let tokenSold = 0;
  //   let totalTokens = 0;
  //   let totalCollectableEther = 0;
  //   let etherCollected = 0;
  //   for (let index = 0; index < roundNumber - 1; index += 1) {
  //     const element = rounds[index];
  //     tokenSold += formatFromWei(element.tokenCount);
  //     etherCollected += (formatFromWei(parseFloat(element.tokenCount), 10) / parseFloat(element.tokenRate)) * etherPrice;
  //   }
  //   tokenSold += roundInfo ? formatFromWei(roundInfo.totalTokensSold) : 0;
  //   etherCollected +=
  //     typeof roundInfo !== "undefined"
  //       ? (formatFromWei(parseFloat(roundInfo.totalTokensSold), 10) / parseFloat(rounds[roundNumber - 1].tokenRate)) * etherPrice
  //       : 0;
  //   for (let index = 0; index < rounds.length; index += 1) {
  //     const element = rounds[index];
  //     totalTokens += formatFromWei(element.tokenCount);
  //     const etherAmount = formatFromWei(parseFloat(element.tokenCount) / parseFloat(element.tokenRate), 10);
  //     const price = etherAmount * etherPrice;
  //     totalCollectableEther += price;
  //     roundDollarData.push({ value: Math.round(price), name: `Round ${index + 1} Cap`, selected: false });
  //     // roundEtherData.push({value: etherAmount, name:  })
  //     tokenData.push({ value: formatFromWei(element.tokenCount), name: `Round ${index + 1} Tokens`, selected: false });
  //   }
  //   for (let index = 0; index < foundationDetails.length; index += 1) {
  //     const element = foundationDetails[index];
  //     totalTokens += formatFromWei(element.amount);
  //     legendData.push(element.description);
  //     tokenData.push({ value: formatFromWei(element.amount), name: element.description, selected: false });
  //   }
  //   const tokenUnsold = totalTokens - tokenSold;
  //   etherCollected = Math.round(etherCollected);
  //   const etherUnCollected = Math.round(totalCollectableEther) - etherCollected;
  //   // formatter: "{a} <br/>{b}: {c} ({d}%)",
  ({
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
      data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
      {
        name: '访问来源',
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
        name: '访问来源',
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
        name: '访问来源',
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

export default PieChart;
