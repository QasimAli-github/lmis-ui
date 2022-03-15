import React, { useState, useEffect } from "react";
import AuthLayout from "../components/Auth/authLayout";
import UploadCV from "../components/Profile/uploadCV";
import AboutYourself from "../components/Profile/aboutYourself";
import AddEducation from "../components/Profile/education";
import AddExperience from "../components/Profile/experience";
import UploadDP from "../components/Profile/uploadPIcture";
import Link from "next/link";
import { Steps } from "antd";
import { useRouter } from "next/router";
import Style from "../styles/profile.module.scss";
import { userTypeAtom } from "../stores/atoms/app_config_atom";

const Profile = () => {
  const router = useRouter();
  // const userType = useRecoilValue(userTypeAtom);
  const [isFirstLogin, setFirstLogin] = useState(
    typeof window !== "undefined" &&
      sessionStorage.getItem("user_first_login_jobhop")
  );

  useEffect(() => {
    // if (userType != 1) {
    //     router.push('/');
    // }
    if (isFirstLogin) {
      router.push("/dashboard");
    }
    return () => {
      // cleanup
      typeof window !== "undefined" &&
        sessionStorage.setItem("user_first_login_jobhop", true);
    };
  }, []);
  const [stepStates, setStepStates] = useState([
    "process",
    "wait",
    "wait",
    "wait",
    "wait",
  ]);
  const { Step } = Steps;

  const [current, setCurrent] = useState(0);

  const changeSteps = (step) => {
    setCurrent(step);
    let _stepStates = stepStates;
    if (step > current) {
      for (let i = 0; i < step; i++) {
        if (_stepStates[i] !== "finish") {
          _stepStates[i] = "error";
        }
      }
    } else {
      for (let i = current; i > step; i--) {
        if (_stepStates[i] !== "finish") {
          _stepStates[i] = "error";
        }
      }
    }
    setStepStates(_stepStates);
  };

  const onSuccessChangeStep = () => {
    setCurrent(current + 1);
  };

  const onStepBackwards = () => {
    setCurrent(current - 1);
  };
  const isSuccessUpdated = (index, value) => {
    let _stepStates = stepStates;
    _stepStates[index] = value;
    setStepStates(_stepStates);
  };

  return (
    <div>
      <AuthLayout step={2} page="profile">
        <div className={Style.authWrapper}>
          {current !== 0 && (
            <Link href="/dashboard">
              <span className={Style.skiptodashboard}>Skip to Dashboard</span>
            </Link>
          )}
          <Steps
            type="navigation"
            current={current}
            onChange={changeSteps}
            size="small"
          >
            {stepStates.map((item, index) => (
              <Step key={index} status={item} />
            ))}
          </Steps>
        </div>
        <div className={Style.showStepsFields}>
          {current === 0 && (
            <UploadCV
              isSuccessUpdated={isSuccessUpdated}
              onSuccessAction={onSuccessChangeStep}
              stepBack={onStepBackwards}
            />
          )}
          {current === 1 && (
            <AboutYourself
              isSuccessUpdated={isSuccessUpdated}
              onSuccessAction={onSuccessChangeStep}
              stepBack={onStepBackwards}
            />
          )}
          {current === 2 && (
            <AddEducation
              isSuccessUpdated={isSuccessUpdated}
              onSuccessAction={onSuccessChangeStep}
              stepBack={onStepBackwards}
            />
          )}
          {current === 3 && (
            <AddExperience
              isSuccessUpdated={isSuccessUpdated}
              onSuccessAction={onSuccessChangeStep}
              stepBack={onStepBackwards}
            />
          )}
          {current === 4 && (
            <UploadDP
              isSuccessUpdated={isSuccessUpdated}
              onSuccessAction={onSuccessChangeStep}
              stepBack={onStepBackwards}
            />
          )}
        </div>
      </AuthLayout>
    </div>
  );
};

export default Profile;
