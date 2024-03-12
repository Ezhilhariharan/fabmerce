import Card1 from "components/Card1";
import FlexBox from "components/FlexBox";
import { Divider, Typography, Button, TextField } from "@mui/material";
import React, { useState } from "react";
import {
  validateCoupCode,
  getPriceSummary,
  removeCoupon,
} from "utils/api/orders-api/ordersAPI";
import { useSelector, useDispatch } from "react-redux";
import { updateCouponCodeVale, updatePriceSummery } from "store/orderSlice";
const PaymentSummary = () => {
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState();
  const [showBtn, setBtn] = useState(true);
  const [message, setMessage] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const authToken = useSelector((state) => state?.authSlice.authToken);
  const { paymentMethod, priceSummery, orderDraftResponse } = useSelector(
    (state) => state?.orderSlice
  );

  const shipping = priceSummery?.shipping_charges?.toFixed(2) || 0;
  const subTotal = priceSummery?.sub_total_price?.toFixed(2) || 0;
  const total = priceSummery?.total_price?.toFixed(2) || 0;
  const discount_amount = priceSummery?.discount_amount?.toFixed(2) || 0;
  const isDiscountCode = priceSummery?.is_discount_code;
  const dicountCode = priceSummery?.discount_code;
  const applyCoupon = () => {
    const res = validateCoupCode(
      authToken,
      orderDraftResponse?.reference_id,
      couponCode
    );
    res
      .then((data) => {
        if (data.status === 200) {
          savePriceSummery();
          setMessage({
            msg: "Coupon code applied successfully",
            color: "green",
          });
          setShowMessage(true);
          setBtn(false);
        }
      })
      .catch((error) => {
        setMessage({
          msg: "Coupon code is invalid or expired!!",
          color: "red",
        });
        setShowMessage(true);
        console.log(error);
      });
  };
  const savePriceSummery = () => {
    const res = getPriceSummary(authToken, orderDraftResponse.reference_id);
    res
      .then((data) => {
        dispatch(updatePriceSummery(data?.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateDraftCoupon = () => {
    const res = removeCoupon(orderDraftResponse?.reference_id, authToken);
    res
      .then((data) => {
        if (data.status === 200) {
          savePriceSummery();
          setMessage({
            msg: "Coupon code removed successfully",
            color: "green",
          });
          setShowMessage(true);
          setBtn(true);
        }
      })
      .catch((error) => {
        setMessage({
          msg: "Coupon code is invalid or expired!!",
          color: "red",
        });
        setShowMessage(true);
        console.log(error);
      });
  };

  return (
    <Card1>
      <FlexBox justifyContent="space-between" alignItems="center" mb={1}>
        <Typography color="grey.600">Subtotal:</Typography>
        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            ₹ &nbsp; {subTotal}
          </Typography>
        </FlexBox>
      </FlexBox>
      <FlexBox justifyContent="space-between" alignItems="center" mb={1}>
        <Typography color="grey.600">Shipping:</Typography>
        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            ₹ &nbsp; {shipping}
          </Typography>
        </FlexBox>
      </FlexBox>
      {/* {paymentMethod === "cod" && ( */}
      <div>
        <Divider
          sx={{
            borderColor: "grey.300",
            mb: "0.5rem",
          }}
        />
        <FlexBox alignItems="center" mb={1} justifyContent="space-between">
          <TextField
            color="info"
            size="small"
            label="Coupon code"
            variant="outlined"
            placeholder="Coupon code"
            onChange={(e) => {
              setCouponCode(e.target.value);
              dispatch(updateCouponCodeVale(e.target.value));
              setMessage("");
            }}
            disabled={isDiscountCode === true}
            defaultValue={isDiscountCode === true ? dicountCode : couponCode}
          />
          {isDiscountCode === false && (
            <Button
              variant="contained"
              color="secondary"
              sx={{
                mt: 2,
                mb: 2,
              }}
              onClick={applyCoupon}
              disabled={!couponCode}
            >
              Apply
            </Button>
          )}
          {isDiscountCode === true && (
            <Button
              variant="contained"
              color="secondary"
              sx={{
                mt: 2,
                mb: 2,
              }}
              onClick={updateDraftCoupon}
            >
              Remove
            </Button>
          )}
        </FlexBox>
        {showMessage === true && (
          <Typography color={message?.color}>{message?.msg}</Typography>
        )}
      </div>
      {/* )} */}
      {/* <FlexBox justifyContent="space-between" alignItems="center" mb={1}>
        <Typography color="grey.600">Tax:</Typography>
        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            -
          </Typography>
        </FlexBox>
      </FlexBox> */}
      <FlexBox justifyContent="space-between" alignItems="center" mb={2}>
        <Typography color="grey.600">Discount:</Typography>
        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            - &nbsp; ₹ &nbsp; {discount_amount}
          </Typography>
        </FlexBox>
      </FlexBox>

      <Divider
        sx={{
          mb: "1rem",
        }}
      />

      <FlexBox justifyContent="space-between" alignItems="center" mb={1}>
        <Typography color="grey.600">Total:</Typography>
        <FlexBox alignItems="flex-end">
          <Typography fontSize="18px" fontWeight="600" lineHeight="1">
            ₹ &nbsp;{total}
          </Typography>
        </FlexBox>
      </FlexBox>
    </Card1>
  );
};

export default PaymentSummary;
