import Image from "components/BazarImage";
import FlexBox from "components/FlexBox";
import ShoppingBagOutlined from "components/icons/ShoppingBagOutlined";
import MiniCart from "components/mini-cart/MiniCart";
import PersonOutline from "@mui/icons-material/PersonOutline";
import {
  Badge,
  Box,
  Button,
  Container,
  Dialog,
  Drawer,
  IconButton,
  styled,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { layoutConstant } from "utils/constants";
import clsx from "clsx";
import Link from "next/link";
import React, { Fragment, useState } from "react";
import SearchBox from "../search-box/SearchBox"; // component props interface
import Account from "./Account";
import AuthPopUp from "components/sessions";
import { useSelector } from "react-redux";
import Navbar from "components/navbar/Navbar";
import useWindowSize from "hooks/useWindowSize";
import { StyledContainer } from "components/StyledContainer";
import Icons from "./Person";
import Carticon from "./Carticon";
import "@fontsource/poppins";
// styled component
export const HeaderWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 1,
  height:"100px",
  padding:"30px",
  height: layoutConstant.headerHeight,
  background: theme.palette.background.paper,
  transition: "height 250ms ease-in-out",
  [theme.breakpoints.down("sm")]: {
    height: layoutConstant.mobileHeaderHeight,
  },
  "& .font":{
    fontFamily: "Poppins,sans-serif",
    fontWeight: "400",
    fontSize: "14px",
    lineHeight: "21px"
  }
}));

const Header = ({ isFixed, className }) => {
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showLogin, setLoginDialog] = useState(true);
  const [showSignUp, setSignup] = useState(false);
  const [showForgetPasswordEmail, setShowForgetEmail] = useState(false);
  const [showSuccesStatus, setSuccessStatus] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

  const toggleSidenav = () => setSidenavOpen(!sidenavOpen);

  const toggleLogin = (value) => setLoginDialog(value);

  const toggleSignUp = (value) => setSignup(value);

  const toggleForgetPasswordEmail = (value) => setShowForgetEmail(value);

  const toggleSuccessStatus = (value) => setSuccessStatus(value);

  const toggleDialog = () => {
    setDialogOpen(!dialogOpen);
    setTimeout(() => {
      toggleSignUp(false);
      toggleLogin(true);
      toggleForgetPasswordEmail(false);
    }, 400);
  };

  const authToken = useSelector((state) => state.authSlice.authToken);
  const cartCount = useSelector((state) => state.cartSlice.cartList);
  const window = useWindowSize();
  const cartHandle = (
    <Badge badgeContent={cartCount?.length} color="primary">
      <Box width="24px" pl={window<1050 ? "20px":"0px"} pr={"2.5rem"}>
        <Button onClick={toggleSidenav} sx={{display:"block","&:hover": { backgroundColor: "transparent" }}}>
          <Carticon
            sx={{
              position: "absolute",
              width:"24px",  
              height: "23.53px",
              
            }}
          />
          {window >900 &&
        <Box className="font">Cart</Box> }
        </Button>
      </Box>
    </Badge>
  );
  return (
    <Fragment>
      <HeaderWrapper className={clsx(className)}>
        <StyledContainer
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            height: "100%",
            boxShadow: "none",
            border: "none",
            "@media (min-width: 1280px)": {
              maxWidth: "1400px",
            },
          }}
        >
         {window<900 ?(
           <FlexBox alignItems="start">
            <Link href="/" passHref>
            <Image
             sx={{
              width: "40px",
              height: "25px",
              justifyContent:"space-around",
              ml:"0px",
              mr:"10px"

            }}
              src={"/assets/images/applogo/fabmerce_mobile_logo.png"}
              alt="logo"
            />
          </Link>
          </FlexBox>):(
             <FlexBox
             alignItems="center"
             minWidth="200px"
             sx={{
               display: {
                 xs: "none",
                 md: "flex",
               },
             }}
           >
             <Link href="/">
               <a>
                 <Image
                   sx={{
                     width: "160px",
                     height: "75px",
                     left: "190px",
                     top: "16px",
                   }}
                   src="/assets/images/applogo/fabmerce logo animation_3 (1).gif"
                   alt="logo"
                 />
               </a>
             </Link>
             
           </FlexBox>
          )}
        
         
         
          
          <FlexBox
            justifyContent="center"
            flex="1 1 0"
            sx={{ maxWidth: window > 900 ? "560px" : "max"}}
          >
            <SearchBox />
          </FlexBox>

          <FlexBox
            alignItems="center"
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              mr:"50px"
            }}
          >
            {cartHandle}
            {(authToken === undefined ||
              authToken === null ||
              authToken === "") && (
              <Box width="24px" marginLeft="18px">
                <Button
                  bgcolor="grey.200"
                  onClick={toggleDialog}
                  sx={{display:"block", "&:hover": { backgroundColor: "transparent" }}} 
                >
                  <Icons
                    sx={{
                      width: "24px",
                      height: "23.53px",
                      left: "0px",
                      top: "0px",
                    }}
                  />
                   {window>900 && 
                <Box className="font">Profile</Box>}
                </Button>
               
              </Box>
            )}
            {authToken && (
              <Account toggleLogin={toggleLogin} toggleSignUp={toggleSignUp} />
            )}
          </FlexBox>
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
          <Drawer open={sidenavOpen} anchor="right" onClose={toggleSidenav}>
            <MiniCart />
          </Drawer>
        </StyledContainer>
      </HeaderWrapper>
      <Navbar />
    </Fragment>
  );
};

export default Header;
