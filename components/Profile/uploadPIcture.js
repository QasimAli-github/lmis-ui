import React, { useState } from "react";
import { Upload, Button } from "antd";
import Profile from "../../styles/profile.module.scss";
import { useMutation, useQuery } from "react-query";
import { createUserInterface } from "../../stores/interfaces/auth";
import { createUser } from "../../stores/apis/auth_apis";
import { useToasts } from "react-toast-notifications";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { getSingleUser } from "../../stores/apis/candidates_api";
const uploadFormat = [
  "jpeg"//, "jpg", "png"
]

const UploadDP = (props) => {

  const { Dragger } = Upload;

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const router = useRouter();
  const { t } = useTranslation();

  const { data } = useQuery("getSingleUser", () =>
    getSingleUser(sessionStorage.getItem("jobhop_loggedin_user_id"))
  );

  const { addToast } = useToasts();
  const { mutateAsync, isLoading, isSuccess } = useMutation(createUser);
  const createUserValues = createUserInterface();

  const fileToBase64 = (file, cb) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(null, reader.result);
    };
    reader.onerror = function (error) {
      cb(error, null);
    };
  };

  if (isLoading)
    return (
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
    );
  const dummyRequest = ({ file, onSuccess }) => {
    
    const fileExtension = file.name.split(".").pop();
    if (fileExtension != "jpeg") {
      addToast("Only jpeg format is allowed", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }
    else
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };
  const inner_props = {
    name: "file",
    multiple: false,
    listType: "picture",

    onChange(info) {
      let count = 0;
      let format = "";
      const fileExtension = info.file.name.split(".").pop();
      if (fileExtension != "jpeg") {
        addToast("Only jpeg format is allowed", {
          appearance: "error",
          autoDismiss: true,
        });
        return;
      }
      else{
        //if (info.file.status == "done") {
          // uploadFormat.map((formatExtension) => {
          //   if (formatExtension == fileExtension) {
          //     count++;
          //   }
          // });
          if (fileExtension = "jpeg" && info.file.status == "done") {
            fileToBase64(info.file.originFileObj, (err, result) => {
              if (result) {
                setFile(result);
                const ext = fileExtension;
                setFileName(ext);
              }
            });
          }
          else {
            addToast("Please choose a valid picture", {
              appearance: "error",
              autoDismiss: true,
            });
             return false;
          }
        //}
      }
      
 
    },
    onRemove() {
      setFile(null);
    }
  };

  const pictureUpload = () => {

    if (file === null) {
      addToast("Please select a profile picture", {
        appearance: "error",
        autoDismiss: true,
      });
      return;
    }
    const fileExtension = info.file.name.split(".").pop();
    if (fileExtension != "jpeg") {
      addToast("Only jpeg format is allowed", {
        appearance: "error",
        autoDismiss: true,
      });
    }
    else {
      let resumepath = {
        picture: file,
        pictureExt: fileName,
      };
      let userdata = data || {};
      Object.keys(userdata).length > 0 &&
        Object.keys(userdata).forEach(
          (k) => userdata[k] == null && delete userdata[k]
        );
      let _data = { ...createUserValues, ...userdata, ...resumepath };

      _data.isDpAdded = true;
      mutateAsync(_data, {
        onSuccess: async () => {
          addToast("Picture Uploaded Successfully", {
            appearance: "success",
            autoDismiss: true,
          });
          sessionStorage.setItem("isDpAdded", true);
          props.type !== "inDashboard"
            ? router.push("/job-preferences")
            : props.hideModal();
          if (props.isSuccessUpdated) props.isSuccessUpdated(4, "finish");
        },
        onError: async (error) => {
          addToast("An Error Occured", {
            appearance: "error",
            autoDismiss: true,
          });
        },
      });
    }

  };

  return (
    <div className={Profile.authWrapper}>
      {props.type != "inDashboard" && (
        <p className="title_size_text mt-3">{t("upload_profile_pic_text")}</p>
      )}

      <Dragger customRequest={dummyRequest} {...inner_props}>
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M28 28.5118V26.5271C28 25.4743 27.5786 24.4647 26.8284 23.7202C26.0783 22.9758 25.0609 22.5576 24 22.5576H16C14.9391 22.5576 13.9217 22.9758 13.1716 23.7202C12.4214 24.4647 12 25.4743 12 26.5271V28.5118"
            stroke="#D9D9D9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 18.5883C22.2091 18.5883 24 16.8112 24 14.6189C24 12.4266 22.2091 10.6494 20 10.6494C17.7909 10.6494 16 12.4266 16 14.6189C16 16.8112 17.7909 18.5883 20 18.5883Z"
            stroke="#D9D9D9"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="20" cy="20" r="19" stroke="#D9D9D9" strokeWidth="2" />
        </svg>

        <p className="ant-upload-text">{t("uplaod_profile_box_text")}</p>
      </Dragger>
      {/* <div className="skip_back_options" style={{ paddingTop: "10px" }}>
          <Link href="/jobpreferences"><span>
            Go to Preferences
          </span>
          </Link>
        </div> */}
      <div style={{ clear: "both", overflow: "hidden" }}>
        <Button
          type="primary"
          onClick={pictureUpload}
          loading={isLoading}
          style={{
            justifyContent: "flex-end",
            float: "right",
            marginTop: "30px",
          }}
          htmlType="submit"
        >
          {props.type === "inDashboard" ? "Upload" : t("upload_cv_button_text")}
        </Button>
        {props.type != "inDashboard" && (
          <Link href="/job-preferences">
            <Button
              type="secondary"
              style={{
                justifyContent: "flex-end",
                marginTop: "30px",
                marginRight: "10px",
                height: "40px",
              }}
            >
              {t("go_to_pref_text")}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default UploadDP;
