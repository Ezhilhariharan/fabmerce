import React, { Fragment, useState } from "react";
import ForgetPasswordEmail from "./ForgetPasswordEmail";
import Login from "./Login";
import Signup from "./Signup";
import SuccessMessage from "./SuccessMessage";

const AuthPopUp = ({
  toggleDialog,
  showLogin,
  showSignUp,
  toggleLogin,
  toggleSignUp,
  showForgetPasswordEmail,
  toggleForgetPasswordEmail,
  toggleSuccessStatus,
  showSuccesStatus,
  data
}) => {
  const [dataStatus, setDataStatus] = useState();
  return (
    <Fragment>
      {showLogin === true && (
        <Login
          toggleDialog={toggleDialog}
          toggleSignUp={toggleSignUp}
          toggleLogin={toggleLogin}
          toggleForgetPasswordEmail={toggleForgetPasswordEmail}
          data={data}
        />
      )}
      {showSignUp === true && (
        <Signup
          toggleDialog={toggleDialog}
          toggleSignUp={toggleSignUp}
          toggleLogin={toggleLogin}
          toggleForgetPasswordEmail={toggleForgetPasswordEmail}
        />
      )}
      {showForgetPasswordEmail === true && (
        <ForgetPasswordEmail
          toggleDialog={toggleDialog}
          toggleSignUp={toggleSignUp}
          toggleLogin={toggleLogin}
          toggleForgetPasswordEmail={toggleForgetPasswordEmail}
          toggleSuccessStatus={toggleSuccessStatus}
          setDataStatus={setDataStatus}
        />
      )}
      {showSuccesStatus === true && (
        <SuccessMessage 
          message={dataStatus === "success" ? "We've successfully sent a password reset email" : "Entered email ID does not exist"}
          toggleDialog={toggleDialog}
          dataStatus={dataStatus}
          toggleSuccessStatus={toggleSuccessStatus}
        />
      )}
    </Fragment>
  );
};

export default AuthPopUp;
