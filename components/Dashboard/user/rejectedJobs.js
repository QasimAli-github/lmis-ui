import React, { useState } from "react";
import JobCardSingle from "../../Jobs/jobCardSingle";
import DataNotFound from "../dataNotFound";
import Style from "../../../styles/dashboard.module.scss";
import { Empty, Spin } from "antd";
import { useQuery } from "react-query";
import { getCandidateRejectedJobs } from "../../../stores/apis/candidates_api";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

const RejectedJobs = ({ rejectedJobs }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const handleClick = (jobId) => {
    router.push(`/singlejob/${jobId}`);
  };
  return (
    <div className={Style.dashApprovedJobsMain}>
      <div className={Style.dashJobCategoryTitle}>
        <p>{t("rejected").toUpperCase()}</p>
      </div>
      {rejectedJobs && rejectedJobs?.length > 0 ? (
        rejectedJobs.map((job) => {
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

export default RejectedJobs;
