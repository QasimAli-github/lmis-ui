import React, { useEffect } from "react";
import { Form, Button, Row, Col, DatePicker } from "antd";
import Profile from "../../styles/profile.module.scss";
import { LeftOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { addEducation } from "../../stores/interfaces/profile";
import { addEducationApi } from "../../stores/apis/auth_apis";
import { useToasts } from "react-toast-notifications";
import { FetchSelectLookup } from "../../shared/fetch_select_lookup";
import Educationadded from "./EducationAdded";
import moment from "moment";
import { getCandidatesEducation } from "../../stores/apis/candidates_api";

const AddEducation = (props) => {

  const queryClient = useQueryClient();
  const [form] = Form.useForm();
  const { addToast } = useToasts();

  const { data } = useQuery(
    "getCandidatesEducation",
    () =>
      getCandidatesEducation(
        props.candiID
          ? props.candiID
          : sessionStorage.getItem("jobhop_loggedin_candidate_id")
      ),
    {}
  );

  const { mutateAsync, isLoading, isSuccess } = useMutation(addEducationApi);

  useEffect(() => {

    if (props.editMode) {
      form.setFieldsValue({
        ...form.getFieldsValue(),
        instituteID: props.record_to_edit.instituteID,
        degreeID: props.record_to_edit.degreeID,
        startDate: moment(props.record_to_edit.startDate),
        endDate: moment(props.record_to_edit.endDate),
      });
    } else {
      form.resetFields();
    }
  }, [props]);

  const experienceInt = addEducation();

  const onEducationSubmit = (values) => {

    if (values.startDate > values.endDate) {
      addToast("Start Date cannot be greater than End Date", {
        appearance: "error",
        autoDismiss: true,
      });
      return false;
    }

    values = { ...experienceInt, ...values };
    values = {
      ...values,
      startDate: new Date(values["startDate"]),
      endDate: new Date(values["endDate"]),
    };

    if (props.editMode) {
      values.educationalRecordsID = props.record_to_edit.educationalRecordsID;
    }
    values.isEducationAdded = true;
    values.FK_UserId = parseInt(
      sessionStorage.getItem("jobhop_loggedin_user_id")
    );

    mutateAsync(values, {
      onSuccess: async () => {
        addToast("Information added successfully", {
          appearance: "success",
          autoDismiss: true,
        });
        sessionStorage.setItem("isEducationAdded", true);
        queryClient.invalidateQueries("getCandidatesEducation");
        form.resetFields();
        if (props.onCancel) props.onCancel();
        props.editMode && props.onSuccessAction();
        if (props.isSuccessUpdated) props.isSuccessUpdated(2, "finish");
      },
    });
  };


  const onSelectInstitute = (institute) => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      instituteID: institute,
    });
  };

  const onSelectDegree = (degree) => {
    form.setFieldsValue({
      ...form.getFieldsValue(),
      degreeID: degree,
    });
  };

  const handleIncomplete = () => {
    if (props.isSuccessUpdated) props.isSuccessUpdated(2, "error");
  };

  const handleNext = () => {
    props.onSuccessAction();
    if (data?.length === 0) {
      if (props.isSuccessUpdated) props.isSuccessUpdated(2, "error");
    }
  };

  return (
    <div
      className={Profile.BiggerForms}
      style={
        props.type === "inDashboard" ? { width: "auto", marginTop: "0" } : {}
      }
    >
      {props.type != "inDashboard" && (
        <p className={`title_size_text mt-3`}>Add your education details</p>
      )}
      <Form
        name="basic"
        layout="vertical"
        onFinish={onEducationSubmit}
        onFinishFailed={() => { }}
        autoComplete="off"
        form={form}
      >
        <Row gutter={30}>
          <Col span={12}>
            <Form.Item
              label="School"
              name="instituteID"
              rules={[{ required: true }]}
              hasFeedback
            >
              <FetchSelectLookup
                typeID={13}
                onOptionSelect={onSelectInstitute}
                selectedValue={
                  props.editMode && props.record_to_edit.instituteName
                }
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Degree"
              name="degreeID"
              rules={[{ required: true }]}
              hasFeedback
            >
              <FetchSelectLookup
                typeID={14}
                onOptionSelect={onSelectDegree}
                selectedValue={
                  props.editMode && props.record_to_edit.degreeName
                }
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={30}>
          
          <Col span={12}>
            <Form.Item name="startDate" label="Start Date"
              rules={[
                {
                  required: true, message: "Please select start month"
                },
              ]}
              hasFeedback
            >
              <DatePicker style={{ width: "100%" }} size="large" picker="month" 
              disabledDate={(current) => {
                return moment().add(-1, 'days') < current
              }}></DatePicker>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="endDate" label="End Date"
              dependencies={['startDate']}
              rules={[
                {
                  required: true, message: "Please select end month"
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('startDate') < value) {
                      return Promise.resolve();
                    }
                    return Promise.reject("start date must be greater than end date")
                  }
                })

              ]}
              hasFeedback
            >
              <DatePicker picker="month" size="large"
                // defaultValue={moment(new Date())}
                style={{ width: "100%" }} placeholder="select end month"
                disabledDate={(current) => {
                  return moment().add(-1, 'days') < current
                }}>
              </DatePicker>
            </Form.Item>
          </Col>

        </Row>
        <Form.Item>
          <Button
            type="primary"
            loading={isLoading}
            htmlType="submit"
            style={{ marginBottom: "15px" }}
          >
            {props.editMode ? "Edit" : "Add"} Education
          </Button>
          {props.type != "inDashboard" && (
            <Educationadded
              type="inProcessProfile"
              isIncomplete={handleIncomplete}
            />
          )}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {props.type != "inDashboard" && (
              <div className="skip_back_options" style={{ paddingTop: "10px" }}>
                <span onClick={() => props.stepBack()}>
                  <LeftOutlined /> Back
                </span>
              </div>
            )}
            <div>
              {props.type != "inDashboard" && (
                <Button onClick={handleNext} type="primary">
                  Next
                </Button>
              )}
            </div>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddEducation;
