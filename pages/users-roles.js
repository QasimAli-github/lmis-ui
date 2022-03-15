import React, { useState } from "react";
import { Row, Col } from "antd";

import { useTranslation } from "react-i18next";
import Style from "../styles/empDashLookups.module.scss";
import Navigation from "../components/Layout/header";
import EmpDashSidebar from "../components/Dashboard/employer/empDashSidebar";
import UsersManagement from "../components/userManagements/usersManagement";
import UsersManagementsTable from "../components/userManagements/usersManagementsTable";

const UserRoles = () => {
  const { t } = useTranslation();
  const [searchKeywords, setSearchKeywords] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [assignRole, setAssignRole] = useState({});
  const handleSearch = (value) => {
    setSearchKeywords(value);
  };
  const handleEditRecord = (assignRole) => {
    setEditMode(true);
    setAssignRole(assignRole);
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
            <UsersManagement
              pageTitle={"User Management"}
              handleSearch={handleSearch}
              editMode={editMode}
              handleEditMode={handleEditMode}
              assignRole={assignRole}
            />
          </Row>
          <Row>
            <UsersManagementsTable
              searchKeywords={searchKeywords}
              handleEditRecord={handleEditRecord}
            />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default UserRoles;
