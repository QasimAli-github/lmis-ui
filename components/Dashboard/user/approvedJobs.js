import React, { useState ,useEffect} from "react";
import JobCardSingle from "../../Jobs/jobCardSingle";
import Style from "../../../styles/dashboard.module.scss";
import { Empty, Spin } from "antd";
import { useQuery } from "react-query";
import { getCandidateApprovedJobs } from "../../../stores/apis/candidates_api";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
const ApprovedJobs = ({ approvedJobs }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const handleClick = (jobId) => {
    router.push(`/singlejob/${jobId}`);
  };
  const [language, setLanguage] = useState("en");
  let appLanguage =
    typeof window !== "undefined" && sessionStorage.getItem("i18nextLng");
  useEffect(() => {
    setLanguage(appLanguage);
  }, [appLanguage]);
  return (
    <div className={Style.dashApprovedJobsMain}>
      <div className={Style.dashJobCategoryTitle}>
        <p>{t("approved").toUpperCase()}</p>
      </div>
      {approvedJobs?.length > 0 ? (
        approvedJobs.map((job) => {
          return (
            <JobCardSingle
              key={Math.random()}
              title={job?.jobtitleNameEn}
              company={job?.companyName}
              location={job?.cityName}
              type="recomended_jobs"
              handleClick={() => handleClick(job?.fk_JobVacancyID)}
            />
          );
        })
      ) : (
        <Empty description={t("data_not_found")} />
      )}
    </div>
  );
};

export default ApprovedJobs;
