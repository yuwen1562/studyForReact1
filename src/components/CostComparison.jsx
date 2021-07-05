import React from "react";
import _ from "lodash";
import { Card, Col, Row } from "react-bootstrap";
import { Line } from "@ant-design/charts";

const CostComparison = (props) => {
  const { bimonthlyCostStatistic } = props;

  // 折線圖資料
  const buildLineChartData = () => {
    if (_.isEmpty(bimonthlyCostStatistic)) {
      return [];
    }

    const costItems = bimonthlyCostStatistic.detail.expenseType;
    let costItemList = [];
    // 遍歷從api取回之花費項目的資料
    _.forOwn(costItems, (costItem, costKey) => {
      const type = _.get(bimonthlyCostStatistic, costKey);

      // 調整資料結構以符合柱狀圖
      const costItemDataList = _.map(costItem, (item) => ({
        item: item.name,
        value: item.value,
        type
      }));
      costItemList = _.concat(costItemList, costItemDataList);
    });
    return costItemList;
  };

  // 折線圖參數
  const LineChart = () => {
    const config = {
      data: buildLineChartData(),
      autoFit: true,
      appendPadding: [17, 0, 0, 0],
      color: ["#ff5556", "#a4e057"],
      xField: "item",
      yField: "value",
      seriesField: "type",
      meta: {
        value: { alias: "千元" },
        item: { alias: "項目" }
      },
      xAxis: {
        title: {
          text: "項目",
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
          },
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
          formatter: (text) => _.round(_.divide(text, 1000), 2).toLocaleString()
        }
      },
      tooltip: {
        showTitle: false,
        formatter: (datum) => ({
          name: `${datum.type}`,
          value: `${datum.value.toLocaleString()}元`
        })
      },
      legend: {
        position: "right",
        marker: {
          symbol: "square"
        }
      }
    };

    return <Line {...config} />;
  };

  return (
    <>
      <Row className="costComparison mb-3 m-0">
        <Col>
          <Card>
            <Card.Header>雙月歷史花費比較</Card.Header>
            <Card.Body>
              <div className="chartAxisTitle">千元</div>
              <LineChart />
            </Card.Body>
            <Card.Footer></Card.Footer>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CostComparison;
