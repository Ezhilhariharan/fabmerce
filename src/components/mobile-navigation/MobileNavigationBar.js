import CategoryOutlined from "components/icons/CategoryOutline";
import Home from "components/icons/Home";
import ShoppingBagOutlined from "components/icons/ShoppingBagOutlined";
import User2 from "components/icons/User2";
import NavLink from "components/nav-link/NavLink";
import { useAppContext } from "contexts/app/AppContext";
import useWindowSize from "hooks/useWindowSize";
import { Badge, Box, styled, Dialog, Button } from "@mui/material";
import { layoutConstant } from "utils/constants";
import React, { Fragment, useState } from "react"; // styled components
import { Login, Logout } from "@mui/icons-material";
import { useTheme, useMediaQuery } from "@mui/material";
import AuthPopUp from "components/sessions";
import { removeCookies } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { updateAuthToken } from "store/authSlice";
import { clearOrderState } from "store/orderSlice";
import { clearCartSlice } from "store/cartSlice";
import DottedStar from "components/icons/DottedStar"
const Wrapper = styled(Box)(({ theme }) => ({
  display: "none",
  position: "fixed",
  bottom: 0,
  left: 0,
  right: 0,
  height: layoutConstant.mobileNavHeight,
  justifyContent: "space-around",
  backgroundColor: theme.palette.background.paper,
  boxShadow: "0px 1px 4px 3px rgba(0, 0, 0, 0.1)",
  zIndex: 999,
  "@media only screen and (max-width: 900px)": {
    display: "flex",
    width: "100vw",
  },
}));
const StyledNavLink = styled(NavLink)(() => ({
  flex: "1 1 0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "13px",
}));
const StyledButton = styled(Button)(({ theme }) => ({
  flex: "1 1 0",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "13px",
  fontWeight: "400",
  px: -8,
  padding: 0,
  minHeight: 0,
  minWidth: 0,
  "&:hover": {
    color: `${theme.palette.primary.main} !important`,
  },
  "&:active": {
    color: `${theme.palette.primary.main} !important`,
  },
}));

const MobileNavigationBar = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showLogin, setLoginDialog] = useState(true);
  const [showSignUp, setSignup] = useState(false);
  const [showForgetPasswordEmail, setShowForgetEmail] = useState(false);
  const [showSuccesStatus, setSuccessStatus] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));

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

  const router = useRouter();
  const width = useWindowSize();
  const dispatch = useDispatch();
  let authToken = useSelector((state)=>state.authSlice.authToken);
  let cartlistCount = useSelector((state) => state?.cartSlice?.cartList?.length);
  const iconStyle = {
    marginBottom: "4px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${process.env.ASP_API_URL}/api/logout`,
        {},
        { headers: { Authorization: authToken } }
      );
      if (response.status == 200) {
        dispatch(updateAuthToken(null));
        removeCookies("token");
        removeCookies("sessionId");
        toggleLogin(true);
        toggleSignUp(false);
        dispatch(clearOrderState("PURGE"));
        dispatch(clearCartSlice("PURGE"));
        router.push("/")
      }
    } catch (error) {
      console.log(error);
    }
  };

  return width <= 900 ? (
    <Fragment>
      <Wrapper>
        {list?.map((item) => (
          item?.title !== "Account" ? <StyledNavLink href={item.href} key={item.title}>
            {item?.title === "Cart" ? (
              <Badge badgeContent={cartlistCount} color="primary">
                <item.icon fontSize="small" sx={iconStyle} />
              </Badge>
            ) : (
              <item.icon sx={iconStyle} fontSize="small" />
            )}

            {item.title}
          </StyledNavLink> : (authToken && <StyledNavLink href={item.href} key={item.title}>
            <item.icon sx={iconStyle} fontSize="small" />
            {item.title}
          </StyledNavLink>)
        ))}
        {authToken ? <StyledButton sx={{ verticalAlign: "middle" }} onClick={handleLogout}>
          <Logout fontSize="small" sx={iconStyle} />
          Logout
        </StyledButton> : <StyledButton onClick={toggleDialog}>
          <Login fontSize="small" sx={iconStyle} />
          Login
        </StyledButton>}
      </Wrapper>
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
    </Fragment>
  ) : null;
};

const list = [
  {
    title: "Home",
    icon: Home,
    href: "/",
  },
  {
    title: "Category",
    icon: CategoryOutlined,
    href: "/Allcategories",
  },
  {
    title: "Cart",
    icon: ShoppingBagOutlined,
    href: "/cart",
  },
  {
    title: "Brands",
    icon: DottedStar,
    href: "/mobile-brands",
  },
  {
    title: "Account",
    icon: User2,
    href: "/profile",
  },
];
export default MobileNavigationBar;
