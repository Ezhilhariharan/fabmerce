import CheckoutForm3 from "components/checkout/CheckoutForm3";
import CheckoutForm from "components/checkout/CheckoutForm";
import CheckoutSummary from "components/checkout/OrderSummaryCard";
import { Grid } from "@mui/material";
import React, { Fragment, useEffect } from "react";
import CheckoutNavLayout from "components/layout/CheckoutNavLayout";
import {
  getCustomerLocations,
  getCountries,
} from "utils/api/profile-apis/profileAPI";
import { useRouter } from "next/router";
import AuthorizationPage from "components/auth-page";
import { filterCartIds } from "../helper/filters";
import { orderDraftAPI, getPriceSummary } from "utils/api/orders-api/ordersAPI";

import { useDispatch, useSelector } from "react-redux";
import { updateCartCount } from "../src/store/cartSlice";
import {
  updateCardItemIds,
  updateOpenMiniDrawer,
  updateOrderDraftResponse,
  updateOrderType,
  updatePriceSummery,
  updateProductIds,
} from "../src/store/orderSlice";
import EmptyCart from "../src/components/product-cards/EmptyCart";
import MettaTags from "utils/OpenGraphTags";

const Checkout = (props) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { locationsList, countryList, page, limit, showLocation, auth_token } =
    props;

  const cartList = useSelector((state) => state?.cartSlice.cartList);
  const authToken = useSelector((state) => state?.authSlice.authToken);
  const { billingAddress, shippingAddress, cartItemIds, miniDrawer } =
    useSelector((state) => state?.orderSlice);

  const disable =
    billingAddress === null ||
    shippingAddress === null ||
    cartList?.length === 0;
  useEffect(() => {
    dispatch(updateCartCount(true));
  }, []);

  useEffect(()=>{
    router.replace(router.asPath);
  },[])

  useEffect(() => {
    if (cartList?.length > 0) {
      const res = filterCartIds(cartList, 1);
      dispatch(updateCardItemIds(res));
      const res2 = filterCartIds(cartList, 2);
      dispatch(updateProductIds(res2));
    }
  }, [cartList]);

  useEffect( () => {
    if (cartItemIds?.length > 0) {
      if (authToken) {
        dispatch(updateOrderType(2));
        const details = {
          order_type: 2,
          cart_item_ids: cartItemIds,
          checkout_status: 1,
        };
        const res = orderDraftAPI(details, authToken);
        res
          .then((data) => {
            if (data.status === 200) {
              dispatch(updateOrderDraftResponse(data?.data));
              if (data?.data?.reference_id) {
                savePriceSummery(data?.data?.reference_id);
              }
              dispatch(updateOpenMiniDrawer(false));
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    }
  }, [miniDrawer, cartItemIds]);

  const savePriceSummery = (id) => {
    const res = getPriceSummary(auth_token, id);
    res
      .then((data) => {
        dispatch(updatePriceSummery(data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      <MettaTags
        PageTitle={"Checkout Page Shipping Options - Fabmerce"}
        url={"https://www.fabmerce.in/checkout"}
        description={
          "Fabmerce - The social commerce marketplace for all your shopping needs. Experience the new era of social shopping with us."
        }
      />
      <CheckoutNavLayout authToken={auth_token}>
        {auth_token ? (
          <div>
            {cartList?.length > 0 && (
              <Grid container flexWrap="wrap-reverse" spacing={3}>
                <Grid item lg={8} md={8} xs={12}>
                  {showLocation ? (
                    <CheckoutForm3
                      locationsList={locationsList}
                      countryList={countryList?.data}
                      cartListCount={cartList?.length}
                    />
                  ) : (
                    <CheckoutForm countryList={countryList?.data} />
                  )}
                </Grid>
                <Grid item lg={4} md={4} xs={12}>
                  <CheckoutSummary
                    orderSummery={cartList}
                    buttonName={"Proceed To Payment"}
                    disabled={disable}
                    handleFunction={() => {
                      router.push({pathname:"/payment"});
                    }}
                  />
                </Grid>
              </Grid>
            )}
            {(cartList?.length === 0 || cartList === null) && <EmptyCart />}
          </div>
        ) : (
          <AuthorizationPage />
        )}
      </CheckoutNavLayout>
    </Fragment>
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
      countryList,
      showLocation,
    },
  };
}
export default Checkout;
