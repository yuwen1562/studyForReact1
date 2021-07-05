import React from "react";
import _ from "lodash";
import { Row } from "react-bootstrap";
import TopTenCard from "./TopTenCard";

const CostTopTen = (props) => {
  const { topTen, itemColor } = props;

  const buildTopTenDataList = () => {
    if (_.isEmpty(topTen)) {
      return [];
    }

    // 該Component種類之資料陣列
    const topTenDataList = _.map(topTen, (list, key) => {
      const result = {};
      // 賦予component排序和標題
      switch (key) {
        case "expenseType":
          _.assign(result, {
            seq: 0,
            title: "本月項目花費比例"
          });
          break;
        case "group":
          _.assign(result, {
            seq: 1,
            title: "本月組織花費前十排名(元)"
          });
          break;
        case "car":
          _.assign(result, {
            seq: 2,
            title: "本月車輛花費前十排名(元)"
          });
          break;
        default:
          break;
      }

      const denominator = _.sum(
        _.map(list, (item) => {
          if (_.isEqual(key, "expenseType")) {
            return item.value;
          }
        })
      );

      // 資料陣列
      const dataList = _.chunk(
        _.map(list, (item) => {
          let rk = "";
          let percentValue = 0;
          // 產生長條圖左側文字
          switch (key) {
            case "expenseType":
              rk = `${item.name}`;
              percentValue = _.round(
                _.multiply(_.divide(item.value, denominator), 100),
                2
              );
              break;
            case "group":
              rk = `${item.seq} ${item.name}`;
              break;
            case "car":
              rk = `${item.seq} ${item.carNo}`;
              break;
            default:
              break;
          }

          return {
            ranked: rk,
            count: _.isEqual(key, "expenseType") ? percentValue : item.value
          };
        }),
        5
      );

      // dataList應包含兩個陣列 for 前十資料下方切換資料
      const dataListSize = dataList.length;
      if (dataListSize < 2) {
        for (let i = 0; i < 2 - dataListSize; i++) {
          dataList.push([]);
        }
      }

      _.assign(result, {
        key,
        data: dataList
      });
      return result;
    });

    // 根據賦予之seq排序
    return _.sortBy(topTenDataList, ["seq"]);
  };

  return (
    <Row className="costTopTen mb-3 m-0">
      {_.map(buildTopTenDataList(), (item) => (
        <TopTenCard
          title={item.title}
          data={item.data}
          itemKey={item.key}
          pageName="costTopTen"
          itemColor={itemColor}
        />
      ))}
    </Row>
  );
};

export default CostTopTen;
