import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Logout from "@mui/icons-material/Logout";
import { removeCookies } from "cookies-next";
import axios from "axios";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { updateAuthToken } from "store/authSlice";
import { clearOrderState } from "store/orderSlice";
import { Button } from "@mui/material";
import useWindowSize from "hooks/useWindowSize";
import { clearCartSlice } from "store/cartSlice";
import Icons from "./Person";
import "@fontsource/poppins";

export default function AccountMenu({ toggleLogin, toggleSignUp }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const router = useRouter();
  const window = useWindowSize();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.authSlice.authToken);
  const LogOut = async () => {
    let token = authToken;
    try {
      const response = await axios.post(
        `${process.env.ASP_API_URL}/api/logout`,
        {},
        { headers: { Authorization: token } }
      );
      if (response.status == 200) {
        dispatch(updateAuthToken(null));
        removeCookies("token");
        removeCookies("sessionId");
        toggleLogin(true);
        toggleSignUp(false);
        dispatch(clearOrderState("PURGE"));
        dispatch(clearCartSlice("PURGE"));
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <React.Fragment>
      <Box width="24px" marginLeft="18px">
                <Button
                  bgcolor="grey.200"
                  onClick={handleClick}
                  aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
                  sx={{display:"block", "&:hover": { backgroundColor: "transparent" }}} 
                >
                  <Tooltip title="Account">
                  <Icons
                    sx={{
                      width: "24px",
                      height: "23.53px",
                      left: "0px",
                      top: "0px",
                    }}
                  />
                  </Tooltip>
                   {window>900 && 
                <Box className="font">Profile</Box>}
                </Button>
               
              </Box>
     

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            fontFamily: "Poppins,sans-serif",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem
          onClick={() => {
            router.push({ pathname: "/profile", query: { slug: "true" } });
          }}
        >
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem onClick={LogOut}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
}
