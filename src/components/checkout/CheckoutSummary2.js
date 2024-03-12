import FlexBox from "components/FlexBox";
import { Span } from "components/Typography";
import {
  Box,
  Divider,
  Typography,
  Button,
  TextField,
  Tooltip,
} from "@mui/material";
import React, { useState } from "react";
import LazyImage from "components/LazyImage";
import Card1 from "components/Card1";
import {
  validateCoupCode,
  getPriceSummary,
  removeCoupon,
} from "utils/api/orders-api/ordersAPI";
import { useSelector, useDispatch } from "react-redux";
import { updateCouponCodeVale, updatePriceSummery } from "store/orderSlice";
const CheckoutSummary2 = () => {
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState();
  const [message, setMessage] = useState();
  const [showMessage, setShowMessage] = useState(false);
  const authToken = useSelector((state) => state?.authSlice.authToken);
  const [showBtn, setBtn] = useState(true);
  const { buyNowProduct, priceSummery, orderDraftResponse, paymentMethod } =
    useSelector((state) => state?.orderSlice);
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
        dispatch(updatePriceSummery(data.data));
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
      <Box>
        <Typography color="secondary.900" fontWeight="700" mb={3}>
          Your order
        </Typography>
        <FlexBox justifyContent="space-between" alignItems="center" mb={2}>
          <div>
            {buyNowProduct?.profile_photo && (
              <LazyImage
                src={buyNowProduct?.profile_photo}
                alt={buyNowProduct?.name}
                height={200}
                width={200}
                loading="eager"
                objectFit="contain"
              />
            )}
          </div>

          <div style={{padding:10}}>
            <Typography>
              <Span fontWeight="600" fontSize="12px">
                {buyNowProduct?.name}
              </Span>
            </Typography>
          </div>
        </FlexBox>
        <FlexBox justifyContent="space-between" alignItems="center" mb={4}>
          <Typography color="grey.600">Quantity:</Typography>
          <Typography>{buyNowProduct?.qty}</Typography>
        </FlexBox>

        <Divider
          sx={{
            borderColor: "grey.300",
            mb: "1.5rem",
          }}
        />

        <FlexBox justifyContent="space-between" alignItems="center" mb={4}>
          <Typography color="grey.600">Subtotal:</Typography>
          <Typography fontWeight="700">₹ &nbsp; {subTotal}</Typography>
        </FlexBox>

        <FlexBox justifyContent="space-between" alignItems="center" mb={4}>
          <Typography color="grey.600">Shipping:</Typography>
          <Typography fontWeight="700"> ₹ &nbsp; {shipping}</Typography>
        </FlexBox>

        {/* <FlexBox justifyContent="space-between" alignItems="center" mb={1}>
        <Typography color="grey.600">Tax:</Typography>
        <Typography fontWeight="700">${(40).toFixed(2)}</Typography>
      </FlexBox> */}
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
                setMessage("");
                dispatch(updateCouponCodeVale(e.target.value));
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
        <Divider
          sx={{
            borderColor: "grey.300",
            mb: "0.5rem",
          }}
        />
        <FlexBox justifyContent="space-between" alignItems="center" mb={3}>
          <Typography color="grey.600">Discount:</Typography>
          <Typography fontWeight="700" fontSize="18px">
            - &nbsp; ₹ &nbsp; {discount_amount}
          </Typography>
        </FlexBox>

        <FlexBox
          fontWeight="700"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Typography>Total:</Typography>
          <Typography fontWeight="700">₹ &nbsp;{total}</Typography>
        </FlexBox>
      </Box>
    </Card1>
  );
};
export default CheckoutSummary2;
