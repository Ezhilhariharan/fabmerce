import FlexBox from "components/FlexBox";
import React, { useState } from "react";
import { Box, Card, Dialog, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import { H3, H6, Small } from "components/Typography";
import AuthPopUp from "components/sessions";
import { useTheme } from "@mui/material/styles";
import BazarButton from "components/BazarButton";
import Image from "components/BazarImage";

const StyledCard = styled(({ children, ...rest }) => (
  <Card {...rest}>{children}</Card>
))(({ theme }) => ({
  width: 500,
  [theme.breakpoints.down("sm")]: {
    width: "100%",
  },
  ".content": {
    textAlign: "center",
    padding: "3rem 3.75rem 0px",
    [theme.breakpoints.down("xs")]: {
      padding: "1.5rem 1rem 0px",
    },
  },
}));

const AuthorizationPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showLogin, setLoginDialog] = useState(true);
  const [showSignUp, setSignup] = useState(false);
  const [showForgetPasswordEmail, setShowForgetEmail] = useState(false);
  const [showSuccesStatus, setSuccessStatus] = useState(false);

  const toggleDialog = () => setDialogOpen(!dialogOpen);

  const toggleLogin = (value) => setLoginDialog(value);

  const toggleSignUp = (value) => setSignup(value);

  const toggleForgetPasswordEmail = (value) => setShowForgetEmail(value);

  const toggleSuccessStatus = (value) => setSuccessStatus(value);
  return (
    <FlexBox flexDirection="column" alignItems="center" justifyContent="center">
      <StyledCard>
        <FlexBox
          alignItems="center"
          justifyContent="center"
          mr={1}
          minWidth="170px"
          sx={{
            display: {
              xs: "flex",
              md: "flex",
              padding:20
            },
          }}
        >
          <Image
            height={50}
            width={200}
            mb={0.5}
            src="https://storage.googleapis.com/asp-pprd-images-bucket/assets/fabmerce-logo.png"
            alt="logo"
          />
        </FlexBox>

        <FlexBox
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          mr={1}
          minWidth="170px"
          sx={{
            display: {
              xs: "flex",
              md: "flex",
            },
          }}
        >
          <Small
            fontWeight="600"
            fontSize="11px"
            color="grey.800"
            textAlign="center"
            display="block"
            mb={2.5}
          >
            Fabmerce is a social commerce marketplace for all your shopping needs. 
          </Small>

          <H6
            fontWeight="600"
            fontSize="12px"
            color="grey.800"
            textAlign="center"
            display="block"
            mb={4.5}
          >
            Please login/Sign up before you place the order.
          </H6>
        </FlexBox>

        <Box p={2.5}>
          <BazarButton
            variant="contained"
            color="primary"
            sx={{
              mb: "0.75rem",
              height: "40px",
            }}
            fullWidth
            onClick={toggleDialog}
          >
            Log In / Sign Up
          </BazarButton>
        </Box>
      </StyledCard>
      <Dialog
        open={dialogOpen}
        fullWidth={isMobile}
        scroll="body"
        onClose={toggleDialog}
      >
        <AuthPopUp
          toggleDialog={toggleDialog}
          showLogin={showLogin}
          showSignUp={showSignUp}
          toggleLogin={toggleLogin}
          toggleSignUp={toggleSignUp}
          showForgetPasswordEmail={showForgetPasswordEmail}
          toggleForgetPasswordEmail={toggleForgetPasswordEmail}
          toggleSuccessStatus={toggleSuccessStatus}
          showSuccesStatus={showSuccesStatus}
        />
      </Dialog>
    </FlexBox>
  );
};

export default AuthorizationPage;
