import FlexBox from "components/FlexBox";
import ProductCard7 from "components/product-cards/ProductCard7";
import { Span } from "components/Typography";
import CheckoutNavLayout from "components/layout/CheckoutNavLayout";
import { Button, Card, Divider, Grid } from "@mui/material";
import Link from "next/link";
import { Fragment, useEffect } from "react";
import {
  getCartList,
  sessionGetCartList,
} from "utils/api/checkout-apis/checkoutAPI";
import { filterCartIds } from "../helper/filters";
import EmptyCart from "../src/components/product-cards/EmptyCart";
import { orderDraftAPI, getPriceSummary } from "utils/api/orders-api/ordersAPI";

import { useSelector, useDispatch } from "react-redux";
import { updateCartListItems } from "../src/store/cartSlice";
import {
  updateCardItemIds,
  updateOrderDraftResponse,
  updateOrderType,
  updatePriceSummery,
  updateProductIds,
} from "../src/store/orderSlice";
import { useRouter } from "next/router";
import MettaTags from "utils/OpenGraphTags";

const Cart = (props) => {
  const { cartListItem, auth_token } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.authSlice.authToken);
  const cartList = useSelector((state) => state.cartSlice.cartList);
  const { cartItemIds } = useSelector((state) => state.orderSlice);

  useEffect(() => {
    dispatch(updateCartListItems(cartListItem?.cart_items));
  }, [cartListItem]);

  useEffect(() => {
    if (cartList?.length > 0) {
      const res = filterCartIds(cartList, 1);
      dispatch(updateCardItemIds(res));
      const res2 = filterCartIds(cartList, 2);
      dispatch(updateProductIds(res2));
    }
  }, [cartList]);

  const getTotalPrice = () => {
    return (
      cartList?.reduce(
        (accumulator, item) => accumulator + item.max_price * item.quantity,
        0
      ) || 0
    );
  };

  useEffect(() => {
    if (cartItemIds?.length > 0 && authToken) {
      dispatch(updateOrderType(2));
      const details = {
        order_type: 2,
        cart_item_ids: cartItemIds,
        checkout_status: 1,
      };
      const res = orderDraftAPI(details, auth_token);
      res
        .then((data) => {
          if (data.status === 200) {
            if (data?.data?.reference_id) {
              dispatch(updateOrderDraftResponse(data?.data));
              savePriceSummery(data?.data?.reference_id);
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [cartItemIds]);

  const savePriceSummery = (id) => {
    const res = getPriceSummary(auth_token, id);
    res
      .then((data) => {
        dispatch(updatePriceSummery(data?.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Fragment>
      <MettaTags
        PageTitle={"Your Shopping Cart - Fabmerce"}
        url={"https://www.fabmerce.in/cart"}
        description={
          "Fabmerce - The social commerce marketplace for all your shopping needs. Experience the new era of social shopping with us."
        }
      />
      <CheckoutNavLayout authToken={authToken} cartListCount={cartList?.length}>
        <Grid container spacing={3}>
          <Grid item lg={8} md={8} xs={12}>
            {cartList?.map((item) => (
              <ProductCard7 key={item.id} product={item} />
            ))}
            {(cartList?.length === 0 || cartList === null) && <EmptyCart />}
          </Grid>
          <Grid item lg={4} md={4} xs={12}>
            <Card
              sx={{
                padding: "1.5rem 1.75rem",
                "@media only screen and (max-width: 678px)": {
                  padding: "1rem",
                },
              }}
            >
              <FlexBox
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Span color="grey.600">Total Cart Items:</Span>
                <FlexBox alignItems="flex-end">
                  <Span fontSize="18px" fontWeight="600" lineHeight="1">
                    {cartList?.length}
                  </Span>
                </FlexBox>
              </FlexBox>
              <FlexBox
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Span color="grey.600">Total:</Span>
                <FlexBox alignItems="flex-end">
                  <Span fontSize="18px" fontWeight="600" lineHeight="1">
                    ₹ {getTotalPrice().toFixed(2)}
                  </Span>
                </FlexBox>
              </FlexBox>

              <Divider
                sx={{
                  mb: "1rem",
                }}
              />

              {/* <FlexBox alignItems="center" mb={2}>
              <Span fontWeight="600" mr={1.25}>
                Additional Comments
              </Span>
              <Span
                fontSize="12px"
                color="primary.main"
                lineHeight="1"
                p="6px 10px"
                bgcolor="primary.light"
                borderRadius="3px"
              >
                Note
              </Span>
            </FlexBox> */}

              {/* <TextField
              variant="outlined"
              rows={6}
              fullWidth
              multiline
              sx={{
                mb: "1rem",
              }}
            /> */}
              {/* 
            <Divider
              sx={{
                mb: "1rem",
              }}
            /> */}

              {/* <TextField
              label="Voucher"
              placeholder="Voucher"
              size="small"
              variant="outlined"
              fullWidth
            /> */}

              {/* <Button
              variant="outlined"
              color="primary"
              fullWidth
              sx={{
                mt: "1rem",
                mb: "30px",
              }}
            >
              Apply Voucher
            </Button> */}

              {/* <Divider
              sx={{
                mb: "1rem",
              }}
            /> */}

              {/* <Span fontWeight="600" mb={2} display="block">
              Shipping Estimates
            </Span>

            <Autocomplete
              options={countryList}
              getOptionLabel={(option) => option.label}
              fullWidth
              sx={{
                mb: "1rem",
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country"
                  placeholder="Select Country"
                  variant="outlined"
                  size="small"
                />
              )}
            /> */}

              {/* <TextField
              label="State"
              placeholder="Select State"
              select
              variant="outlined"
              size="small"
              fullWidth
            >
              {stateList.map((item) => (
                <MenuItem value={item.value} key={item.label}>
                  {item.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              label="Zip Code"
              placeholder="3100"
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                mt: "1rem",
              }}
            /> */}

              {/* <Button
              variant="outlined"
              color="primary"
              fullWidth
              sx={{
                my: "1rem",
              }}
            >
              Calculate Shipping
            </Button> */}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                disabled={cartItemIds?.length === 0 || cartList?.length === 0}
                onClick={() => {
                  router.push({
                    pathname: "/checkout",
                    query: { slug: "true" },
                  });
                }}
              >
                Checkout Now
              </Button>
            </Card>
          </Grid>
        </Grid>
      </CheckoutNavLayout>
    </Fragment>
  );
};
export async function getServerSideProps(context) {
  const { req } = context;
  const auth_token = req?.cookies?.token || null;
  const session_id = req?.cookies?.sessionId || null;
  const page = parseInt(context?.query?.page) || 1;
  const limit = parseInt(context?.query?.limit) || 10;
  let cartListItem = [];
  if (auth_token) {
    cartListItem = await getCartList(auth_token, page, limit);
  } else {
    cartListItem = await sessionGetCartList(session_id);
  }
  return {
    props: {
      auth_token,
      cartListItem,
    },
  };
}

export default Cart;
