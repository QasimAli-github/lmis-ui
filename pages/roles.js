import React, { useState } from "react";
import { Row, Col } from "antd";

import CompanyTable from "../components/Lookups/companyTable";
import { useTranslation } from "react-i18next";
import Style from "../styles/empDashLookups.module.scss";
import Navigation from "../components/Layout/header";
import EmpDashSidebar from "../components/Dashboard/employer/empDashSidebar";
import RolesManagement from "../components/Roles/rolesManagement";
import RoleTable from "../components/Roles/roleTable";

const Roles = () => {
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(false);
  const [role, setRole] = useState({});
  const [searchKeywords, setSearchKeywords] = useState("");
  const handleSearch = (value) => {
    setSearchKeywords(value);
  };
  const handleEditRecord = (role) => {
    setEditMode(true);
    setRole(role);
  };

  const handleEditMode = () => {
    setEditMode(false);
  };
  return (
    <div>
      <Navigation />
      <Row style={{ gap: "30px" }}>
        <Col lg={4} xs={24}>
          <EmpDashSidebar />
        </Col>
        <Col
          lg={{ span: 18, offset: 0 }}
          xs={{ span: 22, offset: 1 }}
          className={Style.lookupsTableCol}
        >
          <Row>
            <RolesManagement
              pageTitle={"Role Management"}
              handleSearch={handleSearch}
              editMode={editMode}
              handleEditMode={handleEditMode}
              role={role}
            />
          </Row>
          <Row>
            <RoleTable
              searchKeywords={searchKeywords}
              handleEditRecord={handleEditRecord}
            />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Roles;
