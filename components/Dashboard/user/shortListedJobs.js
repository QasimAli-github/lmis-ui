import React, { useState } from "react";
import JobCardSingle from "../../Jobs/jobCardSingle";
import DataNotFound from "../dataNotFound";
import Style from "../../../styles/dashboard.module.scss";
import { Empty, Spin } from "antd";
import { useQuery } from "react-query";
import { getCandidateShortlistedJobs } from "../../../stores/apis/candidates_api";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

const ShortListedJobs = ({ shortListedJobs }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const handleClick = (jobId) => {
    router.push(`/singlejob/${jobId}`);
  };
  return (
    <div className={Style.dashApprovedJobsMain}>
      <div className={Style.dashJobCategoryTitle}>
        <p>{t("shortlisted").toUpperCase()}</p>
      </div>
      {shortListedJobs?.length > 0 ? (
        shortListedJobs.map((job) => {
          return (
            <JobCardSingle
              key={Math.random()}
              title={job?.jobtitleNameEn}
              company={job?.companyName}
              location={job?.cityName}
              handleClick={() => handleClick(job?.fk_JobVacancyID)}
              type="recomended_jobs"
            />
          );
        })
      ) : (
        <Empty description={t("data_not_found")} />
      )}
    </div>
  );
};
export default ShortListedJobs;
