import BazarCard from "components/BazarCard";
import BazarIconButton from "components/BazarIconButton";
import { Container, Grid } from "@mui/material";
import React from "react";
import { H4, Span } from "../Typography";
import appIcons from "components/icons";

const Section12 = () => {
  return (
    <Container
      sx={{
        mb: "70px",
      }}
    >
      <Grid container spacing={3}>
        {serviceList.map((item, ind) => {
          const Icon = appIcons[item.icon];
          return (
            <Grid item lg={3} md={6} xs={12} key={ind}>
              <BazarCard
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: "3rem",
                  height: "100%",
                  borderRadius: "8px",
                }}
                hoverEffect
              >
                <BazarIconButton
                  fontSize="1.75rem"
                  height="64px"
                  width="64px"
                  bgcolor="grey.200"
                >
                  <Icon fontSize="inherit" />
                </BazarIconButton>
                <H4 mt={2.5} mb={1.25} textAlign="center">
                  {item.title}
                </H4>
                <Span textAlign="center" color="grey.600">
                  {item.description}
                </Span>
              </BazarCard>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export const serviceList = [
  {
    icon: "Truck",
    title: "Free Delivery",
    description: "Above ₹400"
  },
  {
    icon: "CreditCardVerified",
    title: "Safe Payment",
    description: "100% secured"
  },
  {
    icon: "CustomerService",
    title: "24/7 Support",
    description: 'Dedicated support'
  },
  {
    icon: "Gift",
    title: "Gift Service",
    description: "Gift service available"
  },
];

export default Section12;
