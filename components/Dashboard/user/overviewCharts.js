import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import ChartOfPie from "./chartOfPie";
import ChartOfBars from "./chartOfBars";
import ChartInfo from "./chartInfo";
import { useTranslation } from "react-i18next";

import Style from "../../../styles/dashboard.module.scss";
import weekDaysEnum from "../../../shared/weekDaysEnum";

const COLORS = ["#06D6A0", "#EF476F", "#FFAD3D"];

const OverviewCharts = ({
  approvedApplicationsCount = 0,
  rejectedApplicationsCount = 0,
  shortListedApplicationsCount = 0,
  allJobApplicationsCount = 0,
  applicationsRateGraph,
  perDayCount = 0,
}) => {
  const { t } = useTranslation();
  const [graphData, setGraphData] = useState([]);
  const data = [
    { name: "Approved", value: approvedApplicationsCount },
    { name: "Rejected", value: rejectedApplicationsCount },
    { name: "Shortlisted", value: shortListedApplicationsCount },
  ];

  useEffect(() => {
    let _data = applicationsRateGraph?.map((item) => {
      let _labelIndex = Object.keys(weekDaysEnum).indexOf(item.name);
      let _labelName = Object.values(weekDaysEnum)[_labelIndex];
      return {
        name: _labelName,
        uv: item.uv,
        pv: item.amt,
        amt: Math.max.apply(
          Math,
          applicationsRateGraph.map(function (item) {
            return item.amt;
          })
        ),
      };
    });
    setGraphData(_data);
  }, [applicationsRateGraph]);

  return (
    <div className={Style.overviewChartsMain}>
      <Row>
        <Col lg={15} sm={13} xs={24}>
          <div className={Style.dashChartsLeft}>
            <div className={Style.dashJobCategoryTitle}>
              <p>{t("job_applications")}</p>
            </div>
            <h3>
              {allJobApplicationsCount}
              {/* <span className={Style.red}>+1.2%</span> */}
            </h3>

            <div
              style={{
                display: "flex",
                gridGap: '10px',
                alignItems: "center",
                padding: "0px 10px",
              }}
            >
              <ChartOfPie data={data} COLORS={COLORS} />
              <ChartInfo
                approved={approvedApplicationsCount}
                shortlisted={shortListedApplicationsCount}
                rejected={rejectedApplicationsCount}
              />
            </div>
          </div>
        </Col>
        <Col lg={9} sm={11} xs={24}>
          <div className={Style.dashChartsRight}>
            <div className={Style.dashJobCategoryTitle}>
              <p>{t("applications_rate")}</p>
            </div>
            <h3>
              {perDayCount} <sup>{t("per_day")}</sup>
              {/* <span className={Style.green}>-0.2%</span> */}
            </h3>
            <ChartOfBars data={graphData} />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default OverviewCharts;
