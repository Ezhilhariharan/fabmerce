import Stepper from "components/stepper/Stepper";
import { Container, Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import AppLayout from "./AppLayout";
import { useSelector } from "react-redux";

const CheckoutNavLayout = ({ children, authToken, cartListCount }) => {
  const [selectedStep, setSelectedStep] = useState(0);
  const router = useRouter();
  const { pathname } = router;
  const cartCount = useSelector((state) => state?.cartSlice?.cartList?.length);
  const { billingAddress, shippingAddress } = useSelector(
    (state) => state?.orderSlice
  );
  const stepperList = [
    {
      title: "Cart",
      disabled: false,
    },
    {
      title: "Details",
      disabled: false,
    },
    {
      title: "Payment",
      disabled: cartCount && billingAddress && shippingAddress ? false : true,
    },
  ];

  const handleStepChange = (step) => {
    switch (step) {
      case 0:
        router.push({ pathname: "/cart", query: { slug: "true" } });
        break;

      case 1:
        router.push({ pathname: "/checkout", query: { slug: "true" } });
        break;

      case 2:
        router.push({ pathname: "/payment", query: { slug: "true" } });
        break;

      case 3:
        router.push({ pathname: "/orders", query: { slug: "true" } });
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    switch (pathname) {
      case "/cart":
        setSelectedStep(1);
        break;

      case "/checkout":
        setSelectedStep(2);
        break;

      case "/payment":
        setSelectedStep(3);
        break;

      default:
        break;
    }
  }, [pathname]);
  return (
    <AppLayout>
      <Container
        sx={{
          my: "2rem",
        }}
      >
        {authToken && cartListCount !== 0 && (
          <Box mb={3}>
            <Grid container spacing={3}>
              <Grid item lg={8} md={8} xs={12}>
                <Stepper
                  stepperList={stepperList}
                  selectedStep={selectedStep}
                  onChange={handleStepChange}
                  disabled
                />
              </Grid>
            </Grid>
          </Box>
        )}
        {children}
      </Container>
    </AppLayout>
  );
};

export default CheckoutNavLayout;
