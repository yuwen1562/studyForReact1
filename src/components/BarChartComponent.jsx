import React, { useState } from 'react';
import _ from 'lodash';
import { Bar } from '@ant-design/charts';

const BarChartComponent = (props) => {
  const {
    buildBarChartData,
    yAxisLabelTextAlign,
    itemKey,
    itemColor,
  } = props;

  const [testLength, setTestLength] = useState('');
  
  let textLen = 0; // for yAxis label textAlign 為 start 時的寬度
  
  // 條形圖參數
  const BarChart = () => {
    const config = {
      data: buildBarChartData,
      // autoFit: true,
      height: _.isEqual(itemKey, 'carAgeAndFuelConsumption') ? 400 : buildBarChartData.length * 50,
      color: _.isEqual(itemKey, 'expenseType') ? ({ ranked }) => {
        if (_.isEmpty(itemColor)) {
          return '#4289c7';
        }

        let showColor = '#4289c7';
        _.map(itemColor, (item) => {
          if (ranked == item.name) {
            showColor = item.color;
          }
        });
        return showColor;
      } : '#4289c7',
      maxBarWidth: 15,
      appendPadding: [0, 20, 0, 0],
      xField: 'count',
      yField: 'ranked',
      meta: {
        ranked: { alias: '名次' },
        count: { alias: '數量' },
      },
      label: {
        position: 'right',
        offset: 5,
        style: {
          fill: '#4289c7',
          fontSize: 12,
          fontWeight: 700,
        },
        formatter: (item) => {
          if (_.isEqual(itemKey, 'expenseType')) {
            return `${item.count}%`;
          }
          return item.count.toLocaleString();
        },
      },
      xAxis: {
        label: null,
        grid: null,
      },
      yAxis: {
        line: null,
        tickLine: null,
        label: {
          style: {
            fill: 'black',
            textAlign: ((yAxisLabelTextAlign) || 'end'),
            fontSize: 14,
          },
          offset: (testLength || 8),
          formatter: (text) => {
            const oldLabel = text;
            const labelLength = oldLabel.replace(/[^\x00-\xff]/g, 'xx').length;

            if (yAxisLabelTextAlign == 'start') {
              if (_.ceil(labelLength / 2) > textLen) {
                textLen = _.ceil(labelLength / 2);
                if (textLen >= 6) {
                  setTestLength(95);
                } else if (textLen == 5) {
                  setTestLength(82);
                } else if (textLen == 4) {
                  setTestLength(66);
                } else if (textLen == 3) {
                  setTestLength(52);
                } else if (textLen == 2) {
                  setTestLength(38);
                } else {
                  setTestLength(24);
                }
              }
            }

            let newLabel = '';
            if (labelLength > 12) {
              let strLen = 0;
              let firstStr = '';
              let lastStr = '';
              for (let i = 0; i < labelLength; i++) {
                if (oldLabel.charCodeAt(i) > 128) {
                  strLen += 2;
                } else {
                  strLen++;
                }
                if (strLen <= 12) {
                  firstStr += oldLabel.charAt(i);
                } else {
                  lastStr += oldLabel.charAt(i);
                }
              }
              newLabel = `${firstStr}\n${lastStr}`;
            } else {
              newLabel = oldLabel;
            }
            return newLabel;
          },
        },
      },
      tooltip: {
        showContent: false,
      },
    };

    return (
      <Bar {...config} />
    );
  };

  return (
    <BarChart />
  );
};

export default BarChartComponent;
