import Card1 from "components/Card1";
import {
  Button,
  Divider,
  FormControlLabel,
  Grid,
  Radio,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { orderDraftAPI } from "utils/api/orders-api/ordersAPI";
import { Small } from "components/Typography";
import {
  updatePaymentMethod,
  clearOrderState,
} from "store/orderSlice";
import { useDispatch, useSelector } from "react-redux";

const PaymentForm = ({ orderType }) => {
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const [paymentTitle, setPaymentTitile] = useState("Credit Card/Debit Card");
  const router = useRouter();
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state?.authSlice.authToken);
  const { cartItemIds, shippingAddress } = useSelector(
    (state) => state?.orderSlice
  );

  const handlePaymentMethodChange = (name) => {
    setPaymentMethod(name);

    if (name === "stripe") {
      setPaymentTitile("Credit Card/Debit Card");
    } else {
      setPaymentTitile("Cash on delivery");
    }
  };

  const orderCreation = () => {
    const type =
      orderType === "buy-now" ? 1 : cartItemIds?.length === 0 ? 3 : 2;
    const orderDetails = {
      order_type: type,
      payment_method: paymentMethod,
      payment_method_title: paymentTitle,
      checkout_status: 3,
    };
    if (paymentMethod === "stripe") {
      cardsMethod(orderDetails);
    }
    if (paymentMethod === "cod") {
      codMethod(orderDetails);
    }
  };

  const codMethod = (orderDetails) => {
    const res = orderDraftAPI(orderDetails, authToken);
    res
      .then((data) => {
        if (data.msg === "Order Created Successfully") {
          router.push({
            pathname: "/orders/orders-status",
            query: { status: 200, msg: "success" },
          });
        }
      })
      .catch((error) => {
        console.error(error);
        router.push({
          pathname: "/orders/orders-status",
          query: { status: 200, msg: "cancel" },
        });
      });
  };

  const cardsMethod = (orderDetails) => {
    const res = orderDraftAPI(orderDetails, authToken);
    res
      .then((data) => {
        if (data.status === 200) {
          // dispatch(clearOrderState("PURGE"));
          router.push(data.url);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Fragment>
      <Small
        fontWeight="600"
        fontSize="15px"
        color="grey.600"
        display="block"
        mb={2.5}
      >
        Choose Payment Mode
      </Small>
      <Card1
        sx={{
          mb: "2rem",
        }}
      >
        <FormControlLabel
          name="stripe"
          label={
            <Typography fontWeight="600">
              Pay with credit / debit card
            </Typography>
          }
          control={
            <Radio
              checked={paymentMethod === "stripe"}
              color="secondary"
              size="small"
            />
          }
          sx={{
            mb: "1.5rem",
          }}
          onChange={() => {
            dispatch(updatePaymentMethod("stripe"));
            handlePaymentMethodChange("stripe");
          }}
        />

        <Divider
          sx={{
            mb: "1.25rem",
            mx: "-2rem",
          }}
        />
        <FormControlLabel
          name="cod"
          label={<Typography fontWeight="600">Cash On Delivery</Typography>}
          control={
            <Radio
              checked={paymentMethod === "cod"}
              color="secondary"
              size="small"
            />
          }
          onChange={() => {
            dispatch(updatePaymentMethod("cod"));
            handlePaymentMethodChange("cod");
          }}
        />
      </Card1>
      <Grid container spacing={7}>
        <Grid item sm={6} xs={12}>
          <Link href="/checkout" passHref>
            <Button variant="outlined" color="primary" type="button" fullWidth>
              Back to checkout details
            </Button>
          </Link>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            onClick={orderCreation}
            disabled={
              paymentMethod === null ||
              paymentMethod === undefined ||
              shippingAddress === null ||
              shippingAddress === undefined
            }
          >
            Place Order
          </Button>
          {(shippingAddress === null || shippingAddress === undefined) && (
            <Typography color="grey.600" fontSize={"12px"} mt={"0.5rem"}>
              Select shipping address and proceed
            </Typography>
          )}
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default PaymentForm;
