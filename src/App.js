import React from "react";
import _ from "lodash";
import CostDistributed from "./components/CostDistributed";
import CostTopTen from "./components/CostTopTen";
import CostComparison from "./components/CostComparison";
import PageBottom from "./components/PageBottom";
import { costStatistic, bimonthlyCostStatistic, color } from "./data/statistic";
import "./scss/index.scss";

const CostAnalysis = () => {
  const topTenColor = [];
  let i = 0;

  _.forOwn(costStatistic.detail, (costItem) => {
    topTenColor.push({
      name: costItem.name,
      color: color[i]
    });
    i++;
  });

  return (
    <>
      <div className="CostAnalysis my-3">
        <CostDistributed
          detail={costStatistic.detail}
          summary={costStatistic.summary}
        />
        <CostTopTen topTen={costStatistic.top} itemColor={topTenColor} />
        <CostComparison bimonthlyCostStatistic={bimonthlyCostStatistic} />
        <PageBottom lastJobDate={costStatistic.lastJobDate} />
      </div>
    </>
  );
};

export default CostAnalysis;
