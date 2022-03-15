import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import {
  EyeOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  FileTextOutlined,
  TableOutlined,
  BarsOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Style from "../../../styles/dashboard.module.scss";
import {
  sidebarToggleBtn,
  language,
} from "../../../stores/atoms/app_config_atom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useRouter } from "next/router";
import { permissionsEnum } from "../../../shared/permissionsEnum";

const EmpDashSidebar = () => {
  const { t } = useTranslation();
  const [sidebar, setSidebar] = useRecoilState(sidebarToggleBtn);
  const showSidebar = () => setSidebar(!sidebar);
  const { SubMenu } = Menu;
  const [isUserManagement, setIsUserManagement] = useState(true);
  const [isRoleManagement, setIsRoleManagement] = useState(true);
  const lan = useRecoilValue(language);
  const { asPath } = useRouter();
  useEffect(() => {
    let _permissions = JSON.parse(sessionStorage.getItem("permissions")) || [];
    setIsUserManagement(
      _permissions.some((item) => item === permissionsEnum.userManagement)
    );
    setIsRoleManagement(
      _permissions.some((item) => item === permissionsEnum.roleManagement)
    );
  }, []);
  return (
    <>
      <div
        className={
          sidebar
            ? lan == "ar"
              ? Style.dBoardSidebarRtl
              : Style.dBoardSidebar
            : lan == "ar"
            ? Style.dBoardSidebarActiveRtl
            : Style.dBoardSidebarActive
        }
      >
        <Menu
          defaultSelectedKeys={[`${asPath}`]}
          className={Style.sidebarList}
          mode="inline"
          onClick={showSidebar}
        >
          <Menu.Item
            key="/employboard"
            className={Style.overLay}
            icon={<EyeOutlined />}
          >
            <Link href="/employboard">{t("overview")}</Link>
          </Menu.Item>
          <Menu.Item
            key="/employboard-jobs"
            className={Style.overLay}
            icon={<AppstoreOutlined />}
          >
            <Link href="/employboard-jobs">{t("all_jobs")}</Link>
          </Menu.Item>
          <Menu.Item
            key="/employboard-candidates"
            className={Style.overLay}
            icon={<UserOutlined />}
          >
            <Link href="/employboard-candidates">{t("candidate")}</Link>
          </Menu.Item>
          <Menu.Item
            key="4"
            className={Style.overLay}
            icon={<FileTextOutlined />}
          >
            {t("reports")}
          </Menu.Item>
          <SubMenu
            key="sub1"
            className={Style.overLay}
            icon={<TableOutlined />}
            title={t("lookup_tables")}
          >
            <Menu.Item className={Style.overLay} key="/lkp/company">
              <Link href="/lkp/company">{t("company")}</Link>
            </Menu.Item>
            <Menu.Item className={Style.overLay} key="/lkp/company-type">
              <Link href="/lkp/company-type">{t("company_type")}</Link>
            </Menu.Item>
            <Menu.Item className={Style.overLay} key="/lkp/experience-company">
              <Link href="/lkp/experience-company">
                {t("experience_companies")}
              </Link>
            </Menu.Item>
            <Menu.Item className={Style.overLay} key="/lkp/gender">
              <Link href="/lkp/gender">{t("gender")}</Link>
            </Menu.Item>
            <Menu.Item className={Style.overLay} key="/lkp/job-type">
              <Link href="/lkp/job-type">{t("job_types")}</Link>
            </Menu.Item>
            <Menu.Item className={Style.overLay} key="/lkp/job-title">
              <Link href="/lkp/job-title">{t("job_titles")}</Link>
            </Menu.Item>
            <Menu.Item className={Style.overLay} key="/lkp/job-category">
              <Link href="/lkp/job-category">{t("job_categories")}</Link>
            </Menu.Item>
            <Menu.Item className={Style.overLay} key="/lkp/education">
              <Link href="/lkp/education">{t("education")}</Link>
            </Menu.Item>
            <Menu.Item className={Style.overLay} key="/lkp/university">
              <Link href="/lkp/university">{t("university")}</Link>
            </Menu.Item>
            <Menu.Item className={Style.overLay} key="/lkp/industry">
              <Link href="/lkp/industry">{t("industry")}</Link>
            </Menu.Item>
            <Menu.Item className={Style.overLay} key="/lkp/city">
              <Link href="/lkp/city">{t("city")}</Link>
            </Menu.Item>
            <Menu.Item className={Style.overLay} key="/lkp/degree">
              <Link href="/lkp/degree">{t("degree")}</Link>
            </Menu.Item>
            <Menu.Item className={Style.overLay} key="/lkp/experience">
              <Link href="/lkp/experience">{t("years_of_experience")}</Link>
            </Menu.Item>
          </SubMenu>
          {(isUserManagement || isRoleManagement) && (
            <SubMenu
              key="sub2"
              className={Style.overLay}
              icon={<SettingOutlined />}
              title={t("settings")}
            >
              {isUserManagement && (
                <Menu.Item className={Style.overLay} key="/users-roles">
                  <Link href="/users-roles">{t("user_management")}</Link>
                </Menu.Item>
              )}
              {isRoleManagement && (
                <Menu.Item className={Style.overLay} key="/roles">
                  <Link href="/roles">Role Management</Link>
                </Menu.Item>
              )}
            </SubMenu>
          )}
          <Menu.Item className={Style.overLay} key="6" icon={<BarsOutlined />}>
            {t("system_logs")}
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
};

export default EmpDashSidebar;
