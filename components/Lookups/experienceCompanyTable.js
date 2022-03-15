import React, { useEffect, useState } from "react";
import { Table, Popconfirm, Spin ,Button} from "antd";
import { DeleteOutlined ,EditOutlined } from "@ant-design/icons";

import { getLookups } from "../../stores/apis/lookup_api";
import { useQuery, useMutation, useQueryClient } from "react-query";

import Style from "./lookupTables.module.scss";

import { DeleteLookup } from "../../stores/apis/lookup_api";
import { useToasts } from "react-toast-notifications";
import objectArraySearch from "../../shared/objectArraySearch";
import { permissionsEnum } from "../../shared/permissionsEnum";
import { LoadingOutlined } from "@ant-design/icons";

const ExperienceCompanyTable = (props) => {
  const { searchKeywords } = props;

  const { isLoading, error, data } = useQuery("getLookups", () =>
    getLookups(15)
  );
  const [filterData, setFilterData] = useState([]);
  const { addToast } = useToasts();
  const { mutateAsync } = useMutation(DeleteLookup);
  const queryClient = useQueryClient();
  const [isEditCategory, setIsEditCategory] = useState(true);
  const [isDeleteCategory, setIsDeleteCategory] = useState(true);
  const [language, setLanguage] = useState("en");
  let appLanguage =
    typeof window !== "undefined" && sessionStorage.getItem("i18nextLng");
  useEffect(() => {
    setLanguage(appLanguage);
  }, [appLanguage]);
  useEffect(() => {
    let _permissions = JSON.parse(sessionStorage.getItem("permissions")) || [];
    setIsDeleteCategory(
      _permissions.some((item) => item === permissionsEnum.deleteCategory)
    );
    setIsEditCategory(
      _permissions.some((item) => item === permissionsEnum.editCategory)
    );

  }, []);
  useEffect(() => {
    updateTableData(data);
  }, [data]);

  useEffect(() => {
    let _filterArray = objectArraySearch(searchKeywords, data, "lookUpValue");
    updateTableData(_filterArray);
  }, [searchKeywords]);

  const updateTableData = (filterData) => {
    setFilterData(filterData);
  };
  const handleEditRecord = (lookupData) => {
    props.handleEditRecord(lookupData);
  };
  const handleDelete = (key) => {
    mutateAsync(
      { lookUpValueId: key },
      {
        onSuccess: async () => {
          addToast("Deleted Successfully", {
            appearance: "success",
            autoDismiss: true,
          });
          queryClient.invalidateQueries("getLookups");
        },
      }
    );
  };

  const columns = [
    {
      title: "Experience Companies",
      dataIndex: `${language === "en" ? "lookUpValue" : "lookUpValue_Ar"}`,
    },
    {
      title: "",
      dataIndex: "",
      width: 60,
      render: (record) => (
        <>
          <div className={Style.actionContaienr}>
          {isEditCategory && (
              <Button
                className={Style.editButton}
                onClick={() => handleEditRecord(record)}
              >
                <EditOutlined />
              </Button>
            )}
            {isDeleteCategory && (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => handleDelete(record.lookUpValueId)}
              >
                <DeleteOutlined className={Style.trashIcon} />
              </Popconfirm>
            )}
          </div>
        </>
      ),
    },
  ];

  return (
    <div className={Style.degreeTable}>
      {!isLoading ? (
        <Table
          className={Style.tableStyles}
          pagination={false}
          columns={columns}
          dataSource={filterData}
          size="middle"
        />
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "30px",
          }}
        >
          <Spin
            size="large"
            indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
          />
        </div>
      )}
    </div>
  );
};

export default ExperienceCompanyTable;
