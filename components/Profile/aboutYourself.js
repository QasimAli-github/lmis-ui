import React, { useState, useEffect } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { Form, Input, Button, Select, DatePicker, Spin, Modal } from "antd";
import Profile from "../../styles/profile.module.scss";
import { FetchSelectLookup } from "../../shared/fetch_select_lookup";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { UpdateUserInterface } from "../../stores/interfaces/auth";
import { createCandidate } from "../../stores/apis/auth_apis";
import { useToasts } from "react-toast-notifications";
import { User_Info_atom } from "../../stores/atoms/profile_atom";
import { useRecoilState } from "recoil";
// import {getLookups} from '../../stores/apis/lookup_api';
import { getSingleCandidate } from "../../stores/apis/candidates_api";
import moment from "moment";
import { useTranslation } from "react-i18next";

import Image from "next/image";
import user from "../../public/img/user.png";
import pdf from "../../public/img/pdf.png";

import UploadDP from "./uploadPIcture";
import UploadCV from "./uploadCV";

const AboutYourself = (props) => {


  const { t } = useTranslation();
  const { Option } = Select;
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [state, setState] = useRecoilState(User_Info_atom);
  // const [showoptoins, setShowOptions] = useState([]);
  const { addToast } = useToasts();
  const { mutateAsync, isLoading, isSuccess } = useMutation(createCandidate);
  const createUserValues = UpdateUserInterface();
  const [showUplaodPicture, setProfileModal] = useState(false);
  const [resumeDialog, setResumeDialog] = useState(false);


  useEffect(() => {

    if (props.editMode) {

       
    } else {
      form.resetFields();
    }
  }, [props]);

  // const {error, data} = useQuery("getAllLookups", () => getLookups(3));
  const showGender = (gendername) => {
    if (gendername === "M") {
      return "Male";
    } else if (gendername === "F") {
      return "Female";
    }
  };
  const { data, isLoading: aboutYourLoading } = useQuery(
    "getSingleCandidate",
    () =>
      getSingleCandidate(
        sessionStorage.getItem("jobhop_loggedin_candidate_id")
      ),
    {
      onSuccess: async (response) => {

        if (!!response && response.length > 0) {
          let tempDOB = null;
          if (response[0].dob.split('T')[0] == '0001-01-01') {
            tempDOB = moment(new Date());
          }

          form.setFieldsValue({
            ...form.getFieldsValue(),

            city: response[0].city,
            gender: showGender(response[0].gender),
            remarks: response[0].remarks,
            dob: (tempDOB == null) ? moment(response[0].dob) : tempDOB
          });
        }
      },
    }
  );

  const citySelected = (city) => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      city: city,
    });
  };

  const onSelectGender = (gender) => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      gender: gender,
    });
  };

  const onSubmitInfo = (values) => {
    values = { ...createUserValues, ...values };

    values = {
      ...values,
      dob: new Date(values["dob"])
    };
    if (props.editMode) {
      values.candidateID = createUserValues.candidateID;
    }
    else
      values.candidateID = 0;

    values.isBioAdded = true;
    setState(values);
    mutateAsync(values, {
      onSuccess: async (response) => {
        addToast("Information added successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        sessionStorage.setItem("isBioAdded", true);
        if (props.isSuccessUpdated) props.isSuccessUpdated(1, "finish");
        !props.editMode && props.onSuccessAction();
        queryClient.invalidateQueries("getSingleCandidate");
      },
      onError: async (error) => {
        addToast("An Error Occured", {
          appearance: "error",
          autoDismiss: true,
        });
      },
    });
  };

  const disabledDate = (current) => {
    // Can not select days before today and today
    return current && current > moment().endOf("day");
  };

  return (
    <div
      className={Profile.authWrapper}
      style={props.editMode ? { margin: 0 } : {}}
    >
      {props.editMode && (
        <div>
          <h3 className={Profile.fontSmHead}>Update Profile Picture</h3>
          <div
            style={{
              display: "flex",
              gap: "50px",
              alignItems: "center",
              marginBottom: "30px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                height: "80px",
                width: "80px",
                borderRadius: "60px",
                border: "solid 1px #ddd",
                overflow: "hidden",
              }}
              className={Profile.profileImgContainer}
            >
              {data && data[0]?.picture ? (
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={`${data[0]?.picture}`}
                  alt=""
                />
              ) : (
                <Image
                  className={Profile.profileImgContainer}
                  width="100%"
                  height="100%"
                  src={user}
                  alt="search"
                />
              )}
            </div>
            <Button
              className={Profile.recordAdditionBtn}
              onClick={() => setProfileModal(true)}
              type="primary"
            >
              Upload Picture
            </Button>
            <Modal
              title={`Update Profile Picture`}
              visible={showUplaodPicture}
              onCancel={() => setProfileModal(false)}
              footer={null}
            >
              <UploadDP
                type="inDashboard"
                hideModal={() => setProfileModal(false)}
              />
            </Modal>
          </div>
          <hr style={{ borderColor: "#fff", margin: "20px 0" }} />

          <h3 className={Profile.fontSmHead}>Update Your Resume</h3>

          <a
            href={`data:application/pdf;base64,${data && data[0]?.resumePath}`}
            download="file.pdf"
          >
            <Image
              className={Profile.profileImgContainer}
              width="60"
              height="60"
              src={pdf}
              alt="search"
            />
            <span className={Profile.fontSm} style={{ display: "block" }}>
              Download Resume
            </span>
          </a>

          {/* <p style={{padding: '30px 0px'}}>You dont have resume, please uplaod</p>} */}

          <Button
            className={Profile.recordAdditionBtn}
            onClick={() => setResumeDialog(true)}
            type="primary"
            style={{ marginBottom: "10px" }}
          >
            Upload Resume
          </Button>
          <Modal
            title={`Update Resume`}
            visible={resumeDialog}
            onCancel={() => setResumeDialog(false)}
            footer={null}
          >
            <UploadCV
              type="inDashboard"
              onSuccessAction={() => { }}
              candiSavedInfo={data && data[0]}
              hideModal={() => setResumeDialog(false)}
            />
          </Modal>
        </div>
      )}

      <p className={[Profile.fontSmHead, "title_size_text mt-3"]}>
        {t("tell_us_a_bit_about_yourself")}
      </p>
      {!aboutYourLoading ? (
        <Form
          name="basic"
          layout="vertical"
          form={form}
          //  initialValues={{
          //     // location: { value: state && state.city },
          //     gender: state.gender,
          //     about: state.about,
          //     dob: state.dob
          // }}
          onFinish={onSubmitInfo}
          onFinishFailed={() => { }}
          autoComplete="off"
        >
          <Form.Item
            name="city"
            label={t("where_are_you_currently_located_at")}
            rules={[{ required: true }]}
          >
            {/* <Select
                      showSearch
                      placeholder="Please Select Location"
                      size="large"
                      // defaultValue={{ value: state && state.city }}
                      // onChange={citySelected}
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                      filterSort={(optionA, optionB) =>
                          optionA.children.toLowerCase().localeCompare(optionB.children.toLowerCase())
                      }
                  >
                          {data && data.length && data.map(option => {
                              return <Option key={Math.random()} value={option.lookUpValueId}>{option.lookUpValue}</Option>
                          })}
                  </Select> */}
            <FetchSelectLookup
              typeID={3}
              onOptionSelect={citySelected}
              defaultValue={data && data[0]?.cityName}
              selectedValue={
                props.editMode && data && data.length >= 1 && data[0].cityName
              }
            />
            {/* <Input size="large" placeholder="E.g. Tripoli, Libya" /> */}
          </Form.Item>

          <Form.Item
            name="dob"
            label={t("date_of_birth")}
            rules={[{ required: true }]}
          >
            <DatePicker
              // defaultValue={moment(new Date(), "yyyy/mm/dd")}
              placeholder={"yyyy/mm/dd"}
              // disabledDate={disabledDate}
              disabledDate={(current) => {
                return moment().add(-1, 'days') < current
              }}
              size="large"
              style={{ width: "100%" }}
              className="fontSm"
            />
          </Form.Item>

          <Form.Item
            name="gender"
            label={t("what_is_your_gender")}
            rules={[{ required: true }]}
          >
            <Select
              className={Profile.fontSm}
              placeholder={t("gender")}
              size="large"
            >
              <Option value="Male">{t("male")}</Option>
              <Option value="Female">{t("female")}</Option>
              <Option value="Others">{t("other")}</Option>
            </Select>
            {/* <FetchSelectLookup typeID={11} onOptionSelect={onSelectGender} /> */}
          </Form.Item>

          <Form.Item
            name="remarks"
            label={t("how_would_you_describe_yourself_professionally")}
            rules={[{ required: true }]}
          >
            <Input.TextArea
              className={Profile.fontSm}
              placeholder={t("add_your_message")}
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              loading={isLoading}
              style={{
                justifyContent: "flex-end",
                float: "right",
                width: "100%",
              }}
              className={Profile.recordAdditionBtn}
              htmlType="submit"
            >
              {props.editMode ? t("submit") : t("next")}
            </Button>
            {/* <span className={Style.goBack}><LeftOutlined /> Back</span> */}
          </Form.Item>
        </Form>
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

export default AboutYourself;
