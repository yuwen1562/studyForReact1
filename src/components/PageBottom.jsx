import React from "react";
import moment from "moment";
import _ from "lodash";
import { Col, Row } from "react-bootstrap";
import "../scss/PageBottom.scss";

const PageBottom = (props) => {
  const { lastJobDate } = props;
  return (
    <>
      <Row className="pageBottom">
        <Col className="d-flex flex-end">
          <dt className="font-weight-bold mr-4">最後更新時間點</dt>
          <dd>
            {_.isEmpty(lastJobDate)
              ? "無更新紀錄"
              : moment(lastJobDate).format("YYYY/MM/DD 23:59:59")}
          </dd>
        </Col>
      </Row>
    </>
  );
};

export default PageBottom;
