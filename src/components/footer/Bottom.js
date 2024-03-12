import React from "react";
import { Box,Grid,Typography } from "@mui/material";
import Image from "next/image";
import useWindowSize from "hooks/useWindowSize";
const Bottom = () => {
  const window = useWindowSize();
  const year = new Date().getFullYear();
  return (
    <>
      <Box
        bgcolor="#072255"
        sx={{ flexGrow: 1, color: "white" ,mt:"20px",heigt:"30px",borderTop:"1px solid white"}}
      >
        <Grid container spacing={3} sx={{fontSize:"15px",mt:"20px"}}> 
          <Grid item xs={12}>
            <Box sx={{textAlign:window<1000?"center":"start",paddingRight:"10px"}}>Copyright &copy; {year} Apton Works Private Limited</Box>
          </Grid> 
         {/* <Grid item xs={4}>
          <Image src={
                "https://assets.preprod.aptonshops.com/assets/payements.svg"
              }
              width={400}
              height={20}
              alt="payment"
            />
            </Grid>*/}
        </Grid>
      </Box>
    </>
  );
};

export default Bottom;