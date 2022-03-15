import React from "react";
import {
  ReadOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  FlagOutlined,
} from "@ant-design/icons";
import { Row } from "antd";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import user from "../../../../public/img/user.png";
import Image from "next/image";
import Style from "./candidatesComponents.module.scss";
import dashboardStyle from "../../../../styles/dashboard.module.scss";
import { JobApplicationsID_ATOM } from "../../../../stores/atoms/job_atom";
import { useRecoilState } from "recoil";
import { useRouter } from "next/router";

const CandidatesProfileCard = (props) => {
  const { t } = useTranslation();
  const [jobApplicationsID, setJobApplicationsID] = useRecoilState(
    JobApplicationsID_ATOM
  );
  const router = useRouter();
  const addImageOnError = (event) => {
    event.target.src =
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt0yboM1y3PKIke01cHJpc0V7j-LAmoZ4PkQ&usqp=CAU";
  };

  const setJobApplication = () => {
    console.log("props.jobApplicationID", props.jobApplicationID);
    setJobApplicationsID(props.jobApplicationID);
    typeof window !== "undefined" &&
      sessionStorage.setItem(
        "job_hop_jobApplicationID",
        props.jobApplicationID
      );
  };

  const viewApplication = () => {
    if (props.jobid) {
      setJobApplication();
      router.push(`/applicant/${props.candiid}/${props.jobid}`);
    }
  };

  return (
    <div
      className={`${Style.candidatesProfileCard} ${dashboardStyle.overLay}`}
      onClick={() => {
        viewApplication();
      }}
    >
      <Row>
        <Row>
          <div className={Style.cardHeader}>
            {props.pictureExtention ? (
              <span
                style={{
                  minWidth: "40px",
                  minHeight: "40px",
                  maxWidth: "40px",
                  maxHeight: "40px",
                  borderRadius: "30px",
                  border: "solid 1px #ddd",
                  overflow: "hidden",
                }}
              >
                <img src={`${props.pictureExtention}`} />
              </span>
            ) : (
              <span
                style={{
                  minWidth: "40px",
                  minHeight: "40px",
                  maxWidth: "40px",
                  maxHeight: "40px",
                  borderRadius: "30px",
                  border: "solid 1px #ddd",
                  overflow: "hidden",
                }}
              >
                <Image src={user} alt="search" />
              </span>
            )}
            <div className={Style.profile}>
              <h3>{props.name}</h3>
              <h4>
                {props?.resumePath?.length > 0 && (
                  <a
                    href={`data:application/pdf;base64,${props.resumePath}`}
                    download="file.pdf"
                  />
                )}
                {props.islinkedInUser && (
                  <>
                    <span> </span>
                    <a href="">LinkedIn</a>
                  </>
                )}
              </h4>
            </div>
            {/* <p>For {props.designation}</p> */}
          </div>
        </Row>
        <Row>
          <div className={Style.cardInfo}>
            <ul className={Style.locationList}>
              {props.college && (
                <li>
                  <ReadOutlined className={Style.icons} />{" "}
                  <p>{props.college}</p>
                </li>
              )}
              {props.salary && (
                <li>
                  <DollarOutlined className={Style.icons} />{" "}
                  <p>{props.salary}</p>
                </li>
              )}

              <li>
                {props.location && (
                  <>
                    <EnvironmentOutlined className={Style.icons} />{" "}
                    <p>{props.location}</p>
                  </>
                )}
              </li>

              {props.experience && (
                <li>
                  <FlagOutlined className={Style.icons} />{" "}
                  <p>{props.experience}</p>
                </li>
              )}
            </ul>
          </div>
        </Row>
        <Row>
          {/* <div className={Style.cardTags}>
                        <ul>
                            <li><p>{props.tags[0]}</p></li>
                            <li><p>{props.tags[1]}</p></li>
                            <li><p>{props.tags[2]}</p></li>
                            <li><p>{props.tags[3]}</p></li>
                        </ul>
                    </div> */}
        </Row>
        <Row>
          <div className={Style.cardFooter}>
            {props.jobid ? (
              <Link href={`/applicant/${props.candiid}/${props.jobid}`}>
                <span style={{ cursor: "pointer" }} onClick={setJobApplication}>
                  View Application
                </span>
              </Link>
            ) : (
              <Link href={`/applicant/${props.candiid}`}>
                <span style={{ cursor: "pointer" }} onClick={setJobApplication}>
                  {t("view_application")}
                </span>
              </Link>
            )}
            {props.status && <span>{props.status}</span>}
          </div>
        </Row>
      </Row>
    </div>
  );
};

export default CandidatesProfileCard;
