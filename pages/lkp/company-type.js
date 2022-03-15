import React, { useState } from "react";
import { Row, Col } from "antd";

import Navigation from "../../components/Layout/header";
import EmpDashSidebar from "../../components/Dashboard/employer/empDashSidebar";
import CompanyTypeTable from "../../components/Lookups/companyTypeTable";
import LookupsForm from "../../components/Lookups/lookupsForm";

import Style from "../../styles/empDashLookups.module.scss";

const CompanyTypeLookup = () => {
  const [searchKeywords, setSearchKeywords] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [companyType, setCompanyType] = useState({});
  const handleSearch = (value) => {
    setSearchKeywords(value);
  };
  const handleEditRecord = (companyData) => {
    setEditMode(true);
    setCompanyType(companyData);
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
            <Col lg={12} xs={24}>
              <LookupsForm
                handleSearch={handleSearch}
                pageTitle="Company Type Lookups"
                btnText="Add a Category"
                formLookupId={9}
                editMode={editMode}
                handleEditMode={handleEditMode}
                editData={companyType}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={8} xs={24}>
              <CompanyTypeTable
                searchKeywords={searchKeywords}
                handleEditRecord={handleEditRecord}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default CompanyTypeLookup;
