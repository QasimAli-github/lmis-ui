import React, { useState } from "react";
import styles from "../../../styles/auth.module.scss";
import { Form, Input, Button, DatePicker, InputNumber } from "antd";
import Link from "next/link";
import { LeftOutlined } from "@ant-design/icons";
import { useMutation } from "react-query";
import { createUser } from "../../../stores/apis/auth_apis";
import { useTranslation } from "react-i18next";
import { useToasts } from "react-toast-notifications";
import { createUserInterface } from "../../../stores/interfaces/auth";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { isLoggedIn } from "../../../stores/atoms/app_config_atom";
import InputMask from "react-input-mask";

const SignupFields = ({ formTitle, userType = 1, closeModal, isModalVisible }) => {
  const { addToast } = useToasts();
  const { mutateAsync, isLoading, isSuccess } = useMutation(createUser);
  const router = useRouter();
  const [form] = Form.useForm();
  const createUserValues = createUserInterface();
  const [signin, setSignin] = useRecoilState(isLoggedIn);
  const { t } = useTranslation();
  
  const onFinish = (values) => {
    values = { ...createUserValues, ...values };
    values.userType = userType;
    mutateAsync(values, {
      onSuccess: async (response) => {
        if (response === "Error") {
          addToast("Error occur while creating account", {
            appearance: "error",
            autoDismiss: true,
          });
          return;
        }
        if (closeModal) closeModal();
        addToast("User Successfully Registered", {
          appearance: "success",
          autoDismiss: true,
        });
        if (userType === 0) return;
        typeof window !== "undefined" &&
          sessionStorage.setItem(
            "jobhop_loggedin_user_id",
            response.split("&")[0]
          );
        typeof window !== "undefined" &&
          sessionStorage.setItem(
            "jobhop_loggedin_candidate_id",
            response.split("&")[1]
          );
        typeof window !== "undefined" &&
          sessionStorage.setItem("jobhop_loggedin_user_type", 1);
        router.push("/profile");
        setSignin(true);
      },
      onError: (error) => {
        addToast(error, {
          appearance: "error",
          autoDismiss: true,
        });
      },
    });
  };
  return (
    <div
      className={[!isModalVisible && styles.auth_fields_wrapper, styles.signup_fields].join(" ")}
    >
      <p>{formTitle}</p>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        form={form}
        onFinishFailed={() => {}}
        autoComplete="off"
      >
        <Form.Item
          label={t("register_you_name")}
          name="userName"
          rules={[{ required: true, message: t("register_name_placeholder") }]}
        >
          <Input size="large" placeholder="Bruce Wayne" />
        </Form.Item>

        <Form.Item
          label={t("email")}
          name="userEmail"
          // validateTrigger='onSubmit'
          rules={[{ required: true, type: "email" }]}
        >
          <Input size="large" placeholder="bruce@wayne.com" />
        </Form.Item>

        <Form.Item
          name="userPwd"
          label={t("password")}
          // validateTrigger='onSubmit'
          rules={[
            {
              required: true,
              message: "Password must be atleast 8 charachters long!",
              min: 8,
            },
          ]}
        >
          <Input.Password size="large" placeholder="Atleast 8 charachters" />
        </Form.Item>
        <Form.Item
          label={t("phone")}
          name="mobileNo"
          rules={[
            {
              required: true,
              message: "Please enter valid phone number!",
              validator: async (_, mobileNo) => {
                let _mobileNumber = mobileNo.replace(/\s/g, "").length;
                if(mobileNo[6] == 0) throw new Error("Something wrong!");
                if (_mobileNumber < 14) throw new Error("Something wrong!");
              },
            },
          ]}
        >
          {/* <Input size="large" placeholder="+1-123-456-7890" /> */}
          <InputMask
            mask="0021\8 99 9999999"
            maskChar=" "
            placeholder="00218 XX XXXXXXX"
          />
        </Form.Item>

        {/* {isSuccess && <p>Email Verification Link hasbeen sent</p>} */}

        <Form.Item className={styles.frm_footer}>
          <Button type="primary" block loading={isLoading} htmlType="submit">
            {isModalVisible ? "Create" : "Signup for Free"}
          </Button>
          {/* <span className={styles.back_step}><LeftOutlined /> Back</span> */}
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignupFields;
