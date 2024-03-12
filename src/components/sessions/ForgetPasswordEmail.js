import { styled } from "@mui/material/styles";
import { Box, Card, FormHelperText } from "@mui/material";
import { useFormik } from "formik";
import BazarTextField from "components/BazarTextField";
import React from "react";
import * as yup from "yup";
import { H3, Small, H6 } from "components/Typography";
import FlexBox from "components/FlexBox";
import useWindowSize from "hooks/useWindowSize";
import BazarButton from "components/BazarButton";
import request from "utils/api/request";

const StyledCard = styled(({ children, ...rest }) => (
    <Card {...rest}>{children}</Card>
))(({ theme, window }) => ({
    width: 500,
    [theme.breakpoints.down("sm")]: {
        width: "100%",
    },
    ".content": {
        textAlign: "center",
        padding: window < 800 ? "1.5rem 1.5rem 0px" : "3rem 3.75rem 0px",
    },
}));

const ForgetPasswordEmail =
    ({
        toggleSignUp,
        toggleLogin,
        toggleForgetPasswordEmail,
        toggleSuccessStatus,
        setDataStatus,
    }) => {
        const window = useWindowSize();

        const handleFormSubmit = async (values) => {
            try {
                const response = await request.post(
                    `${process.env.ASP_API_URL}/api/forgot_password`,
                    {
                        email: values.email,
                    },
                )
                console.log(response);
                setDataStatus(response?.data?.msg);
                if (response.data) {
                    toggleSuccessStatus(true);
                    toggleSignUp(false);
                    toggleLogin(false);
                    toggleForgetPasswordEmail(false);
                }
            } catch (error) {
                console.log(error);
            }
        }

        const initialValues = {
            email: "",
        };

        const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
            useFormik({
                onSubmit: handleFormSubmit,
                initialValues,
                validationSchema: formSchema,
            });

        return (
            <StyledCard elevation={3} window={window}>
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
                        Reset your password
                    </Small>
                    <BazarTextField
                        mb={1.5}
                        name="email"
                        label="Enter your registered email"
                        placeholder="exmple@mail.com"
                        variant="outlined"
                        size="small"
                        type="email"
                        fullWidth
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.email || ""}
                        error={!!touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                    />
                    <BazarButton
                        variant="contained"
                        color="secondary"
                        type="submit"
                        fullWidth
                        sx={{
                            mb: "1.65rem",
                            height: 44,
                        }}
                    >
                        Reset Password
                    </BazarButton>
                </form>
                <FlexBox justifyContent="center" alignItems="center" my="1.25rem">
                    <Box>Already have account?</Box>
                    <Box
                        component={"div"}
                        onClick={() => {
                            toggleLogin(true);
                            toggleSignUp(false);
                            toggleForgetPasswordEmail(false);
                        }}
                        sx={{ cursor: "pointer" }}
                    >
                        <a>
                            <H6 ml={1} borderBottom="1px solid" borderColor="grey.900">
                                Sign In
                            </H6>
                        </a>
                    </Box>
                </FlexBox>
            </StyledCard>
        )
    }

const formSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("${path} is required"),
});

export default ForgetPasswordEmail;