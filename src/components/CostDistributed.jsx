import React from "react";
import moment from "moment";
import _ from "lodash";
import { Card, Col, Row } from "react-bootstrap";
import { Column } from "@ant-design/charts";

const CostDistributed = (props) => {
  const { detail, summary }=props;
  const total = summary ? summary.total.toLocaleString() : 0;

  // 堆疊柱狀圖資料
  const buildColumnChartData = () => {
    if (_.isEmpty(detail)) {
      return [];
    }
    let costList = [];
    // 遍歷從api取回之花費項目的資料
    _.forOwn(detail, (costItem) => {
      // 調整資料結構以符合柱狀圖
      const itemName = costItem.name;
      const costDataList = _.map(costItem.data, (item) => ({
        date: moment(item.date).format("D"),
        value: item.value,
        type: itemName
      }));
      costList = _.concat(costList, costDataList);
    });
    return costList;
  };

  // 平均值計算
  const chartData = _.isEmpty(buildColumnChartData())
    ? []
    : _.map(buildColumnChartData(), (item) => item.value);
  const averageValue = _.isEmpty(chartData)
    ? 0
    : _.sum(chartData) / chartData.length;

  // 堆疊柱狀圖參數
  const ColumnChart = () => {
    const config = {
      data: buildColumnChartData(),
      isStack: true,
      autoFit: true,
      appendPadding: [17, 0, 0, 0],
      color: [
        "#ff5556",
        "#ff9255",
        "#ffe455",
        "#a4e057",
        "#12a75f",
        "#50daed",
        "#5085ed",
        "#a850ed",
        "#fba3e7",
        "#a4a4a4"
      ],
      xField: "date",
      yField: "value",
      seriesField: "type",
      meta: {
        value: { alias: "千元" },
        date: { alias: "日期" }
      },
      legend: {
        position: "right-top",
        offsetY: 17,
        itemName: {
          formatter: (text) => {
            const oldLabel = text;
            const labelLength = oldLabel.replace(/[^x00-xff]/g, "xx").length;
            let newLabel = "";
            if (labelLength > 12) {
              let strLen = 0;
              let firstStr = "";
              let lastStr = "";
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
          }
        }
      },
      xAxis: {
        title: {
          text: "日期",
          position: "end",
          offset: 0,
          spacing: 8,
          style: {
            fontSize: 11,
            fontWeight: 900,
            textAlign: "start"
          }
        },
        line: {
          style: {
            stroke: "black"
          }
        },
        tickLine: {
          style: {
            stroke: "black"
          }
        },
        label: {
          style: {
            fill: "black"
          }
        }
      },
      yAxis: {
        line: {
          style: {
            lineWidth: 2
          }
        },
        label: {
          style: {
            fill: "black"
          },
          offset: 15,
          formatter: (text) => {
            return _.round(_.divide(text, 1000), 2).toLocaleString();
          }
        }
      },
      tooltip: {
        showTitle: false,
        formatter: (datum) => {
          return {
            name: `${datum.type}`,
            value: `${datum.value.toLocaleString()}元`
          };
        }
      },
      annotations: [
        {
          type: "line",
          start: ["min", averageValue],
          end: ["max", averageValue],
          style: {
            lineDash: [4, 4]
          }
        }
      ]
    };

    return <Column {...config} />;
  };

  return (
    <>
      <Row className="costDistributed mb-3 m-0">
        <Col>
          <Card>
            <Card.Header>
              <Card className="monthTatolCost mb-3">
                <Card.Header>本月總成本(元)</Card.Header>
                <Card.Body>
                  <div className="value">{total}</div>
                </Card.Body>
                <Card.Footer></Card.Footer>
              </Card>
              {"本月成本分佈"}
            </Card.Header>
            <Card.Body>
              <div className="chartAxisTitle">千元</div>
              <ColumnChart />
            </Card.Body>
            <Card.Footer></Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CostDistributed;
