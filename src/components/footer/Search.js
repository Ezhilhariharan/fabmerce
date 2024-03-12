import React, {useState} from "react";
import { Box, Dialog, useMediaQuery,Grid } from "@mui/material";
import { grey } from "theme/themeColors";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import AuthPopUp from "components/sessions";
import { useSelector } from "react-redux";
import { useTheme } from "@mui/material/styles";
import BazarTextField from "components/BazarTextField";
import useWindowSize from "hooks/useWindowSize";
import TextField from '@mui/material/TextField';
const Search = () => {
  const authToken = useSelector((state) => state.authSlice.authToken);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showLogin, setLoginDialog] = useState(true);
  const [showSignUp, setSignup] = useState(false);
  const [showForgetPasswordEmail, setShowForgetEmail] = useState(false);
  const [showSuccesStatus, setSuccessStatus] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const [data, setData] = useState();
  const toggleLogin = (value) => setLoginDialog(value);
  const window = useWindowSize();
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
  const handleChange = (e) => {
    setData(e.target.value);
  };
  return (
    <Box
      position="relative"
      flex="1 1 0"
      maxWidth="670px"
      mt={2}

    >
     <Grid container>
      <Grid item xs={12}  marginRight={window<1000?"10px":"0px"}>
      <TextField
        color={grey.searchFocus}
        variant="outlined"
        placeholder="Enter Mobile or E-mail"
        onChange={handleChange}
        value={data}
        fontSize="5px"
        fullWidth
        autoComplete="off"
        InputProps={{
         
          sx: {
            fontSize:"9px",
            border: "1px solid white",
            borderRadius: "5px",
            paddingRight: 0,
            color: "#F4F4F5",
            overflow: "hidden",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "primary.secondary",
            },

          height:30
          },
          endAdornment: (
            <Stack
              spacing={2}
              direction="row"
              width="90px"
              height="50px"
              color="black"
              fontSize="5px"
              bgcolor="#FFFFFF"
             
            >
              {authToken === undefined ||
              authToken === null ||
              authToken === "" ? (
                <>
                <Button variant="texts" onClick={toggleDialog}>
                
                  <svg
                    width="57"
                    height="17"
                    viewBox="0 0 57 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.792 13.084C3.176 13.084 2.624 12.984 2.136 12.784C1.648 12.584 1.256 12.288 0.96 11.896C0.672 11.504 0.52 11.032 0.504 10.48H2.688C2.72 10.792 2.828 11.032 3.012 11.2C3.196 11.36 3.436 11.44 3.732 11.44C4.036 11.44 4.276 11.372 4.452 11.236C4.628 11.092 4.716 10.896 4.716 10.648C4.716 10.44 4.644 10.268 4.5 10.132C4.364 9.996 4.192 9.884 3.984 9.796C3.784 9.708 3.496 9.608 3.12 9.496C2.576 9.328 2.132 9.16 1.788 8.992C1.444 8.824 1.148 8.576 0.9 8.248C0.652 7.92 0.528 7.492 0.528 6.964C0.528 6.18 0.812 5.568 1.38 5.128C1.948 4.68 2.688 4.456 3.6 4.456C4.528 4.456 5.276 4.68 5.844 5.128C6.412 5.568 6.716 6.184 6.756 6.976H4.536C4.52 6.704 4.42 6.492 4.236 6.34C4.052 6.18 3.816 6.1 3.528 6.1C3.28 6.1 3.08 6.168 2.928 6.304C2.776 6.432 2.7 6.62 2.7 6.868C2.7 7.14 2.828 7.352 3.084 7.504C3.34 7.656 3.74 7.82 4.284 7.996C4.828 8.18 5.268 8.356 5.604 8.524C5.948 8.692 6.244 8.936 6.492 9.256C6.74 9.576 6.864 9.988 6.864 10.492C6.864 10.972 6.74 11.408 6.492 11.8C6.252 12.192 5.9 12.504 5.436 12.736C4.972 12.968 4.424 13.084 3.792 13.084ZM9.15881 5.608C8.79881 5.608 8.50281 5.504 8.27081 5.296C8.04681 5.08 7.93481 4.816 7.93481 4.504C7.93481 4.184 8.04681 3.92 8.27081 3.712C8.50281 3.496 8.79881 3.388 9.15881 3.388C9.51081 3.388 9.79881 3.496 10.0228 3.712C10.2548 3.92 10.3708 4.184 10.3708 4.504C10.3708 4.816 10.2548 5.08 10.0228 5.296C9.79881 5.504 9.51081 5.608 9.15881 5.608ZM10.1788 6.304V13H8.12681V6.304H10.1788ZM14.2099 6.208C14.6819 6.208 15.0939 6.304 15.4459 6.496C15.8059 6.688 16.0819 6.94 16.2739 7.252V6.304H18.3259V12.988C18.3259 13.604 18.2019 14.16 17.9539 14.656C17.7139 15.16 17.3419 15.56 16.8379 15.856C16.3419 16.152 15.7219 16.3 14.9779 16.3C13.9859 16.3 13.1819 16.064 12.5659 15.592C11.9499 15.128 11.5979 14.496 11.5099 13.696H13.5379C13.6019 13.952 13.7539 14.152 13.9939 14.296C14.2339 14.448 14.5299 14.524 14.8819 14.524C15.3059 14.524 15.6419 14.4 15.8899 14.152C16.1459 13.912 16.2739 13.524 16.2739 12.988V12.04C16.0739 12.352 15.7979 12.608 15.4459 12.808C15.0939 13 14.6819 13.096 14.2099 13.096C13.6579 13.096 13.1579 12.956 12.7099 12.676C12.2619 12.388 11.9059 11.984 11.6419 11.464C11.3859 10.936 11.2579 10.328 11.2579 9.64C11.2579 8.952 11.3859 8.348 11.6419 7.828C11.9059 7.308 12.2619 6.908 12.7099 6.628C13.1579 6.348 13.6579 6.208 14.2099 6.208ZM16.2739 9.652C16.2739 9.14 16.1299 8.736 15.8419 8.44C15.5619 8.144 15.2179 7.996 14.8099 7.996C14.4019 7.996 14.0539 8.144 13.7659 8.44C13.4859 8.728 13.3459 9.128 13.3459 9.64C13.3459 10.152 13.4859 10.56 13.7659 10.864C14.0539 11.16 14.4019 11.308 14.8099 11.308C15.2179 11.308 15.5619 11.16 15.8419 10.864C16.1299 10.568 16.2739 10.164 16.2739 9.652ZM23.8904 6.232C24.6744 6.232 25.2984 6.488 25.7624 7C26.2344 7.504 26.4704 8.2 26.4704 9.088V13H24.4304V9.364C24.4304 8.916 24.3144 8.568 24.0824 8.32C23.8504 8.072 23.5384 7.948 23.1464 7.948C22.7544 7.948 22.4424 8.072 22.2104 8.32C21.9784 8.568 21.8624 8.916 21.8624 9.364V13H19.8104V6.304H21.8624V7.192C22.0704 6.896 22.3504 6.664 22.7024 6.496C23.0544 6.32 23.4504 6.232 23.8904 6.232ZM32.4913 4.576V13H30.4393V4.576H32.4913ZM38.0584 6.232C38.8424 6.232 39.4664 6.488 39.9304 7C40.4024 7.504 40.6384 8.2 40.6384 9.088V13H38.5984V9.364C38.5984 8.916 38.4824 8.568 38.2504 8.32C38.0184 8.072 37.7064 7.948 37.3144 7.948C36.9224 7.948 36.6104 8.072 36.3784 8.32C36.1464 8.568 36.0304 8.916 36.0304 9.364V13H33.9784V6.304H36.0304V7.192C36.2384 6.896 36.5184 6.664 36.8704 6.496C37.2224 6.32 37.6184 6.232 38.0584 6.232Z"
                      fill="#072255"
                    />
                    <path
                      d="M52.1425 12.8579C52.3319 13.0474 52.6373 13.0474 52.8267 12.8579L56.0388 9.64586C56.1895 9.49511 56.1895 9.25159 56.0388 9.10085L52.8267 5.88875C52.6373 5.69935 52.3319 5.69935 52.1425 5.88875C51.9531 6.07815 51.9531 6.38352 52.1425 6.57292L54.941 9.37528L52.1387 12.1777C51.9531 12.3632 51.9531 12.6724 52.1425 12.8579Z"
                      fill="#072255"
                      stroke="#072255"
                    />
                  </svg>
                 
                </Button>
                
                </>
              ) : (
                <Button variant="texts">
                  <svg
                    width="57"
                    height="17"
                    viewBox="0 0 57 17"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3.792 13.084C3.176 13.084 2.624 12.984 2.136 12.784C1.648 12.584 1.256 12.288 0.96 11.896C0.672 11.504 0.52 11.032 0.504 10.48H2.688C2.72 10.792 2.828 11.032 3.012 11.2C3.196 11.36 3.436 11.44 3.732 11.44C4.036 11.44 4.276 11.372 4.452 11.236C4.628 11.092 4.716 10.896 4.716 10.648C4.716 10.44 4.644 10.268 4.5 10.132C4.364 9.996 4.192 9.884 3.984 9.796C3.784 9.708 3.496 9.608 3.12 9.496C2.576 9.328 2.132 9.16 1.788 8.992C1.444 8.824 1.148 8.576 0.9 8.248C0.652 7.92 0.528 7.492 0.528 6.964C0.528 6.18 0.812 5.568 1.38 5.128C1.948 4.68 2.688 4.456 3.6 4.456C4.528 4.456 5.276 4.68 5.844 5.128C6.412 5.568 6.716 6.184 6.756 6.976H4.536C4.52 6.704 4.42 6.492 4.236 6.34C4.052 6.18 3.816 6.1 3.528 6.1C3.28 6.1 3.08 6.168 2.928 6.304C2.776 6.432 2.7 6.62 2.7 6.868C2.7 7.14 2.828 7.352 3.084 7.504C3.34 7.656 3.74 7.82 4.284 7.996C4.828 8.18 5.268 8.356 5.604 8.524C5.948 8.692 6.244 8.936 6.492 9.256C6.74 9.576 6.864 9.988 6.864 10.492C6.864 10.972 6.74 11.408 6.492 11.8C6.252 12.192 5.9 12.504 5.436 12.736C4.972 12.968 4.424 13.084 3.792 13.084ZM9.15881 5.608C8.79881 5.608 8.50281 5.504 8.27081 5.296C8.04681 5.08 7.93481 4.816 7.93481 4.504C7.93481 4.184 8.04681 3.92 8.27081 3.712C8.50281 3.496 8.79881 3.388 9.15881 3.388C9.51081 3.388 9.79881 3.496 10.0228 3.712C10.2548 3.92 10.3708 4.184 10.3708 4.504C10.3708 4.816 10.2548 5.08 10.0228 5.296C9.79881 5.504 9.51081 5.608 9.15881 5.608ZM10.1788 6.304V13H8.12681V6.304H10.1788ZM14.2099 6.208C14.6819 6.208 15.0939 6.304 15.4459 6.496C15.8059 6.688 16.0819 6.94 16.2739 7.252V6.304H18.3259V12.988C18.3259 13.604 18.2019 14.16 17.9539 14.656C17.7139 15.16 17.3419 15.56 16.8379 15.856C16.3419 16.152 15.7219 16.3 14.9779 16.3C13.9859 16.3 13.1819 16.064 12.5659 15.592C11.9499 15.128 11.5979 14.496 11.5099 13.696H13.5379C13.6019 13.952 13.7539 14.152 13.9939 14.296C14.2339 14.448 14.5299 14.524 14.8819 14.524C15.3059 14.524 15.6419 14.4 15.8899 14.152C16.1459 13.912 16.2739 13.524 16.2739 12.988V12.04C16.0739 12.352 15.7979 12.608 15.4459 12.808C15.0939 13 14.6819 13.096 14.2099 13.096C13.6579 13.096 13.1579 12.956 12.7099 12.676C12.2619 12.388 11.9059 11.984 11.6419 11.464C11.3859 10.936 11.2579 10.328 11.2579 9.64C11.2579 8.952 11.3859 8.348 11.6419 7.828C11.9059 7.308 12.2619 6.908 12.7099 6.628C13.1579 6.348 13.6579 6.208 14.2099 6.208ZM16.2739 9.652C16.2739 9.14 16.1299 8.736 15.8419 8.44C15.5619 8.144 15.2179 7.996 14.8099 7.996C14.4019 7.996 14.0539 8.144 13.7659 8.44C13.4859 8.728 13.3459 9.128 13.3459 9.64C13.3459 10.152 13.4859 10.56 13.7659 10.864C14.0539 11.16 14.4019 11.308 14.8099 11.308C15.2179 11.308 15.5619 11.16 15.8419 10.864C16.1299 10.568 16.2739 10.164 16.2739 9.652ZM23.8904 6.232C24.6744 6.232 25.2984 6.488 25.7624 7C26.2344 7.504 26.4704 8.2 26.4704 9.088V13H24.4304V9.364C24.4304 8.916 24.3144 8.568 24.0824 8.32C23.8504 8.072 23.5384 7.948 23.1464 7.948C22.7544 7.948 22.4424 8.072 22.2104 8.32C21.9784 8.568 21.8624 8.916 21.8624 9.364V13H19.8104V6.304H21.8624V7.192C22.0704 6.896 22.3504 6.664 22.7024 6.496C23.0544 6.32 23.4504 6.232 23.8904 6.232ZM32.4913 4.576V13H30.4393V4.576H32.4913ZM38.0584 6.232C38.8424 6.232 39.4664 6.488 39.9304 7C40.4024 7.504 40.6384 8.2 40.6384 9.088V13H38.5984V9.364C38.5984 8.916 38.4824 8.568 38.2504 8.32C38.0184 8.072 37.7064 7.948 37.3144 7.948C36.9224 7.948 36.6104 8.072 36.3784 8.32C36.1464 8.568 36.0304 8.916 36.0304 9.364V13H33.9784V6.304H36.0304V7.192C36.2384 6.896 36.5184 6.664 36.8704 6.496C37.2224 6.32 37.6184 6.232 38.0584 6.232Z"
                      fill="#072255"
                    />
                    <path
                      d="M52.1425 12.8579C52.3319 13.0474 52.6373 13.0474 52.8267 12.8579L56.0388 9.64586C56.1895 9.49511 56.1895 9.25159 56.0388 9.10085L52.8267 5.88875C52.6373 5.69935 52.3319 5.69935 52.1425 5.88875C51.9531 6.07815 51.9531 6.38352 52.1425 6.57292L54.941 9.37528L52.1387 12.1777C51.9531 12.3632 51.9531 12.6724 52.1425 12.8579Z"
                      fill="#072255"
                      stroke="#072255"
                    />
                  </svg>
                </Button>
              )}
            </Stack>
          ),
        }}
      />
      </Grid>

     </Grid>
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
          data={data}
        />
      </Dialog>
    </Box>
  );
};

export default Search;
