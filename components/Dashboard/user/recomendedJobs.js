import React, { useState ,useEffect} from "react";
import JobCardSingle from "../../Jobs/jobCardSingle";
import Style from "../../../styles/dashboard.module.scss";
import { Col, Empty, Row } from "antd";
import DataNotFound from "../dataNotFound";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

const RecomendedJobs = ({ jobs }) => {
  const { t } = useTranslation();
  const router = useRouter();
  const [language, setLanguage] = useState("en");
  let appLanguage =
    typeof window !== "undefined" && sessionStorage.getItem("i18nextLng");
  useEffect(() => {
    setLanguage(appLanguage);
  }, [appLanguage]);
  const handleClick = (jobId) => {
    router.push(`/singlejob/${jobId}`);
  };
  return (
    <div className={Style.dashRecomendedJobsMain}>
      <div className={Style.dashJobCategoryTitle}>
        <p>{t("recomended_jobs")}</p>
      </div>
      <Row gutter={30}>
        {jobs?.length > 0 ? (
          jobs.map((job) => {
            console.log("RECOMMENDED JOB",job);
            return (
              <Col key={Math.random()} span={8}>
                <JobCardSingle
                  key={Math.random()}
                  title={language === 'en' ?  job?.lookUpValue :  job?.lookUpValue_Ar}
                  company={language === 'en' ? job?.companyName : job?.companyName_Ar}
                  location={job?.cityName}
                  type="recomended_jobs"
                  handleClick={() => handleClick(job?.jobVacancyID)}
                />
              </Col>
            );
          })
        ) : (
          <Empty description={t("data_not_found")} />
        )}
      </Row>
    </div>
  );
};

export default RecomendedJobs;
