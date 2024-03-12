import { Container, Grid, Box } from "@mui/material";
import React from "react";
import AppLayout from "./AppLayout";
import CustomerDashboardNavigation from "./CustomerDashboardNavigation";
import FlexBox from "components/FlexBox";

const CustomerDashboardLayout = ({ children, authToken }) => (
  <AppLayout>
    <Container
      sx={{
        my: "2rem",
      }}
    >
      <Grid container spacing={3} style={{display: "flex", justifyContent: "center"}}>
        {authToken && (
          <Grid
            item
            lg={3}
            xs={12}
            sx={{
              display: {
                xs: "none",
                sm: "none",
                md: "block",
              },
             
            }}
          >
            <CustomerDashboardNavigation />
          </Grid>
        )}
        <Grid item lg={9} xs={12}>
          {children}
        </Grid>
      </Grid>
    </Container>
  </AppLayout>
);

export default CustomerDashboardLayout;
