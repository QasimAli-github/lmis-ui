import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import Navigation from "../components/Layout/header";
import EmpDashSidebar from "../components/Dashboard/employer/empDashSidebar";
import EmpDashJobsFilters from "../components/Dashboard/employer/jobs/empDashJobsFilters";
import AllJobCards from "../components/Dashboard/employer/jobs/allJobCards";
import Link from "next/link";
// import SingleJob from '../components/Jobs/jobCardSingle';
import { userTypeAtom } from "../stores/atoms/app_config_atom";
import { useRouter } from "next/router";
import Style from "../styles/empDashJobs.module.scss";
import { useRecoilValue } from "recoil";
import { useTranslation } from "react-i18next";
import auth from "../shared/auth";
import { permissionsEnum } from "../shared/permissionsEnum";
const EmployboardJobs = () => {
  const [showFilters, setShowFilters] = useState(false);
  const router = useRouter();
  const [isPostJobVisible, setIsPostJobVisible] = useState(true);
  const userTYpe = useRecoilValue(userTypeAtom);
  useEffect(() => {
    if (!auth()) {
      router.push("/");
    }
    let _permissions = JSON.parse(sessionStorage.getItem("permissions")) || [];
    setIsPostJobVisible(
      _permissions.some((item) => item === permissionsEnum.postAJob)
    );
  }, []);
  const { t } = useTranslation();

  return (
    <div>
      <Navigation />
      <Row style={{ margin: "0" }}>
        <Col lg={4} xs={24}>
          <EmpDashSidebar />
        </Col>
        <Col lg={20} xs={24}>
          <Col lg={24}>
            <Row wrap={false} className={Style.empDashJobsTop}>
              <Col flex="none">
                <h2>{t("jobs")}</h2>
              </Col>
              <Col flex="auto">
                <div className={Style.btns}>
                  <Button
                    className={Style.filterBtn}
                    onClick={() => setShowFilters(!showFilters)}
                    size="large"
                    icon={<FilterOutlined />}
                  >
                    {t("filters")}
                  </Button>
                  {isPostJobVisible && (
                    <Button type="primary">
                      <Link href="/post-job">{t("post_a_job")}</Link>
                    </Button>
                  )}
                </div>
              </Col>
            </Row>
          </Col>

          {showFilters && (
            <Col lg={24}>
              <div className={Style.empDashJobsFiltersMain}>
                <Col lg={24}>
                  <EmpDashJobsFilters />
                </Col>
              </div>
            </Col>
          )}

          <Col lg={24} xs={24}>
            <div className={Style.empDashJobsMain}>
              <AllJobCards />
            </div>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default EmployboardJobs;
