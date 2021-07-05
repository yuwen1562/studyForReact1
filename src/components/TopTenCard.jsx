import React from "react";
import _ from "lodash";
import { Card, Col } from "react-bootstrap";
import { Carousel } from "antd";
import BarChartComponent from "./BarChartComponent";

/**
 * 前十名資料之卡片元件
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
const TopTenCard = (props) => {
  const { title, data, itemKey, pageName, itemColor } = props;

  return (
    <>
      <Col md={4}>
        <Card>
          <Card.Header className="flex-between">{title}</Card.Header>
          <Card.Body>
            <Carousel>
              {!_.isEmpty(data[0]) ? (
                <BarChartComponent
                  buildBarChartData={data[0]}
                  yAxisLabelTextAlign={
                    _.isEqual(itemKey, "expenseType") ? "end" : "start"
                  }
                  itemKey={itemKey}
                  itemColor={itemColor}
                />
              ) : (
                <div className="flex-center w-100 BarChartHeight">
                  <div className="chartNoData-text">無資料</div>
                </div>
              )}
              {_.isEmpty(data[1]) ? (
                ""
              ) : (
                <BarChartComponent
                  buildBarChartData={data[1]}
                  yAxisLabelTextAlign={
                    _.isEqual(itemKey, "expenseType") ? "end" : "start"
                  }
                  itemKey={itemKey}
                  itemColor={itemColor}
                />
              )}
            </Carousel>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default TopTenCard;
