import React, { useState } from "react";
import NewApplicationsSingle from "./newApplicaionsCardSingle";
import DataNotFound from "../dataNotFound";
import Style from "../../../styles/dashboard.module.scss";
import { useTranslation } from "react-i18next";
import EmpDashSingleCandidates from "./candidates/empDashSingleCandidates";

const NewApplications = ({title ,linkText, jobApplication,handleLinkClick}) => {
  const { t } = useTranslation();
  const [Applications, setapplications] = useState([
  ]);
  return (
    <div className={Style.empDashnewApplicationsMain}>
      <div className={Style.dashJobCategoryTitle}>
        <p className={`${Style.dFlex}`}>
          <span style={{ flex: 1 }}>{title}</span>{" "}
          <a onClick={()=>handleLinkClick()}>{linkText}</a>
        </p>
      </div>
      {jobApplication?.length > 0 ? (
        <EmpDashSingleCandidates data={jobApplication} />
      ) : (
        <DataNotFound title={t("data_not_found")} />
      )}
    </div>
  );
};

export default NewApplications;
