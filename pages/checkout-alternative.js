import CheckoutForm2 from "components/checkout/CheckoutForm2";
import CheckoutSummary2 from "components/checkout/CheckoutSummary2";
import CheckoutForm from "components/checkout/CheckoutForm";
import { Container, Grid } from "@mui/material";
import React, { useEffect } from "react";
import AppLayout from "components/layout/AppLayout";
import {
  getCustomerLocations,
  getCountries,
} from "utils/api/profile-apis/profileAPI";
import { getPriceSummary, orderDraftAPI } from "utils/api/orders-api/ordersAPI";
import { useDispatch, useSelector } from "react-redux";
import {
  updatePriceSummery,
  updateOrderType,
  updateOrderDraftResponse,
} from "../src/store/orderSlice";
import EmptyCart from "../src/components/product-cards/EmptyCart";
import AuthorizationPage from "components/auth-page";
const CheckoutAlternative = (props) => {
  const { locationsList, showLocation, countryList, auth_token } = props;
  const dispatch = useDispatch();
  const { buyNowProduct } = useSelector((state) => state?.orderSlice);
  const authToken = useSelector((state) => state?.authSlice.authToken);

  useEffect(() => {
    if (authToken) {
      saveOrderDraft();
    }
  }, []);

  const saveOrderDraft = () => {
    dispatch(updateOrderType(1));
    const details = {
      order_type: 1,
      product_id: buyNowProduct?.id,
      checkout_status: 1,
      quantity: buyNowProduct?.qty,
    };

    const res = orderDraftAPI(details, authToken);
    res
      .then((data) => {
        if (data.status === 200) {
          dispatch(updateOrderDraftResponse(data?.data));
          getPriceDetails(data?.data?.reference_id);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getPriceDetails = (reference_id) => {
    if (reference_id) {
      const res = getPriceSummary(authToken, reference_id);
      res
        .then((data) => {
          dispatch(updatePriceSummery(data?.data));
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <AppLayout>
      <Container
        sx={{
          my: "1.5rem",
        }}
      >
        {authToken ? (
          <div>
            {auth_token && buyNowProduct !== null && (
              <Grid container spacing={3}>
                <Grid item lg={8} md={8} xs={12}>
                  {showLocation ? (
                    <CheckoutForm2 locationsList={locationsList} />
                  ) : (
                    <CheckoutForm countryList={countryList?.data} />
                  )}
                </Grid>
                <Grid item lg={4} md={4} xs={12}>
                  {buyNowProduct && <CheckoutSummary2 />}
                </Grid>
              </Grid>
            )}
            {(buyNowProduct === null) && <EmptyCart />}
          </div>
        ) : (
          <div>
            <AuthorizationPage />
          </div>
        )}
      </Container>
    </AppLayout>
  );
};

export async function getServerSideProps(context) {
  const { req } = context;
  const auth_token = req?.cookies?.token || null;
  const locationsList = auth_token && (await getCustomerLocations(auth_token));
  const countryList = auth_token && (await getCountries(auth_token));
  const showLocation = locationsList?.length > 0 ? true : false;
  return {
    props: {
      auth_token,
      locationsList,
      showLocation,
      countryList,
    },
  };
}

export default CheckoutAlternative;
