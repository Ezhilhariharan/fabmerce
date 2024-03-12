import BazarButton from "components/BazarButton";
import BazarTextField from "components/BazarTextField";
import { H3, Small } from "components/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Card, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import * as yup from "yup";
import useWindowSize from "hooks/useWindowSize";
import CustomizedSnackbars from "components/Snackbar";
import request from "utils/api/request";
import SuccessMessage from "./SuccessMessage";

const StyledCard = styled(({ children, passwordVisibility, passwordVisibility2, ...rest }) => (
  <Card {...rest}>{children}</Card>
))(({ theme, passwordVisibility, passwordVisibility2, window }) => ({
  width: 500,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  ".content": {
    textAlign: "center",
    padding: window < 800 ? "1.5rem 1.5rem 0px" : "3rem 3.75rem 0px",
  },
  ".passwordEye": {
    color: passwordVisibility
      ? theme.palette.grey[600]
      : theme.palette.grey[400],
  },
  ".passwordEye2": {
    color: passwordVisibility2
      ? theme.palette.grey[600]
      : theme.palette.grey[400],
  }
}));

const Password = () => {
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [passwordVisibility2, setPasswordVisibility2] = useState(false);
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [openSnackbar, setSnackbar] = useState(false);
  const [showSuccesStatus, setSuccessStatus] = useState(false);
  const [dataStatus, setDataStatus] = useState();
  const [dialogOpen, setDialogOpen] = useState(false);

  const toggleDialog = () => setDialogOpen(!dialogOpen);
  const togglePasswordVisibility = useCallback(() => {
    setPasswordVisibility((visible) => !visible);
  }, []);
  const togglePasswordVisibility2 = useCallback(() => {
    setPasswordVisibility2((visible) => !visible);
  }, []);
  const window = useWindowSize();
  const token = router?.query?.reset_password_token;
  const handleFormSubmit = async (values) => {
    console.log(values);
    try {
      const response = await request.post(
        `${process.env.ASP_API_URL}/api/change_password`,
        {
          reset_password_token: token,
          password: values?.password,
          password_confirmation: values?.re_password
        },
      )
      console.log(response);
      setDataStatus(response?.data?.msg);
      if (response.data) {
        setSuccessStatus(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      onSubmit: handleFormSubmit,
      initialValues,
      validationSchema: formSchema,
    });
  return (
    <StyledCard
      elevation={3}
      passwordVisibility={passwordVisibility}
      passwordVisibility2={passwordVisibility2}
      window={window}
      sx={{
        margin: '0 auto'
      }}

    >
      <CustomizedSnackbars
        open={openSnackbar}
        duration={1000}
        message={message}
        setSnackbar={setSnackbar}
      />
      <form className="content" onSubmit={handleSubmit}>
        <H3 textAlign="center" mb={1}>
          Welcome To Fabmerce
        </H3>
        <Small
          fontWeight="600"
          fontSize="12px"
          color="grey.800"
          textAlign="center"
          mb={4.5}
          display="block"
        >
          Forgot Password
        </Small>
        <BazarTextField
          mb={1.5}
          name="password"
          label="New Password"
          placeholder="*********"
          autoComplete="on"
          type={passwordVisibility ? "text" : "password"}
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton
                size="small"
                type="button"
                onClick={togglePasswordVisibility}
              >
                {passwordVisibility ? (
                  <Visibility className="passwordEye" fontSize="small" />
                ) : (
                  <VisibilityOff className="passwordEye" fontSize="small" />
                )}
              </IconButton>
            ),
          }}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password || ""}
          error={!!touched.password && !!errors.password}
          helperText={touched.password && errors.password}
        />

        <BazarTextField
          name="re_password"
          label="Retype Password"
          placeholder="*********"
          autoComplete="on"
          type={passwordVisibility2 ? "text" : "password"}
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            endAdornment: (
              <IconButton
                size="small"
                type="button"
                onClick={togglePasswordVisibility2}
              >
                {passwordVisibility2 ? (
                  <Visibility className="passwordEye2" fontSize="small" />
                ) : (
                  <VisibilityOff className="passwordEye2" fontSize="small" />
                )}
              </IconButton>
            ),
          }}
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.re_password || ""}
          error={!!touched.re_password && !!errors.re_password}
          helperText={touched.re_password && errors.re_password}
        />

        <BazarButton
          variant="contained"
          color="secondary"
          type="submit"
          fullWidth
          sx={{
            mb: "1.65rem",
            mt: "1rem",
            height: 44,
          }}
        >
          Change Password

        </BazarButton>
      </form>
      {showSuccesStatus && 
        <SuccessMessage 
          message={dataStatus === "success" ? "Your password has been reset successfully" : "Link expired"} 
          dataStatus={dataStatus}
          toggleDialog={toggleDialog}
          resetPage={"reset"}
        />
      }
    </StyledCard>
  );
};
const initialValues = {
  password: "",
  re_password: "",
};
const formSchema = yup.object().shape({
  password: yup
    .string()
    .required("${path} is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
    ),
  re_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please re-type password"),
});

export default Password;