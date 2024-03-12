import CheckoutNavLayout from "components/layout/CheckoutNavLayout";
import PaymentForm from "components/payment/PaymentForm";
import PaymentSummary from "components/payment/PaymentSummary";
import { Grid } from "@mui/material";
import React, { Fragment } from "react";
import AuthorizationPage from "components/auth-page";
import { useSelector } from "react-redux";
import EmptyCart from "../src/components/product-cards/EmptyCart";
import MettaTags from "utils/OpenGraphTags";
const Checkout = () => {
  const authToken = useSelector((state) => state.authSlice.authToken);
  const cartList = useSelector((state) => state.cartSlice.cartList);

  return (
    <Fragment>
    <MettaTags
    PageTitle={"Your Payment Gateway - Fabmerce"}
    url={"https://www.fabmerce.in/payment"}
    description={
      "Fabmerce - The social commerce marketplace for all your shopping needs. Experience the new era of social shopping with us."
    }
  />
    <CheckoutNavLayout authToken={authToken}>
      
        {cartList?.length>0&&
        <div>
           {authToken ? (
        <Grid container flexWrap="wrap-reverse" spacing={3}>
          <Grid item lg={8} md={8} xs={12}>
            <PaymentForm />
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
            <PaymentSummary />
          </Grid>
        </Grid>
      ) : (
        <AuthorizationPage />
      )}
        </div>
        }
       {(cartList?.length === 0 || cartList === null) && <EmptyCart />}
    </CheckoutNavLayout>
    </Fragment>
  );
};

export default Checkout;
