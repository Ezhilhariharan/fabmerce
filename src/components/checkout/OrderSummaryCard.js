import FlexBox from "components/FlexBox";
import { Span } from "components/Typography";
import { Box, Button, Card, Divider, Grid,Typography } from "@mui/material";
import { Fragment } from "react";
import { useSelector } from "react-redux";

const orderSummaryCard = (props) => {
  const { orderSummery, buttonName, handleFunction, disabled } = props;
  const { priceSummery } = useSelector((state)=>state.orderSlice);

  const shipping = priceSummery?.shipping_charges?.toFixed(2) || 0;
  const subTotal = priceSummery?.sub_total_price?.toFixed(2) || 0;
  const total = priceSummery?.total_price?.toFixed(2) || 0;
  const discount_amount = priceSummery?.discount_amount?.toFixed(2) || 0;

  return (
    <Fragment>
      <Card
        sx={{
          padding: "1.5rem 1.75rem",
          "@media only screen and (max-width: 678px)": {
            padding: "1rem",
          },
        }}
      >
        <FlexBox justifyContent="space-between" alignItems="center" mb={2}>
          <Span color="grey.600">Total Cart Items:</Span>
          <FlexBox alignItems="flex-end">
            <Span fontSize="18px" fontWeight="600" lineHeight="1">
              {orderSummery?.length}
            </Span>
          </FlexBox>
        </FlexBox>
        <FlexBox justifyContent="space-between" alignItems="center" mb={4}>
          <Typography color="grey.600">Subtotal:</Typography>
          <Typography fontWeight="700">₹ &nbsp; {subTotal}</Typography>
        </FlexBox>

        <FlexBox justifyContent="space-between" alignItems="center" mb={4}>
          <Typography color="grey.600">Shipping:</Typography>
          <Typography fontWeight="700"> ₹ &nbsp; {shipping}</Typography>
        </FlexBox>
        <FlexBox justifyContent="space-between" alignItems="center" mb={2}>
          <Span color="grey.600">Total:</Span>
          <FlexBox alignItems="flex-end">
            <Span fontSize="18px" fontWeight="600" lineHeight="1">
              ₹ &nbsp; {total}
            </Span>
          </FlexBox>
        </FlexBox>

        <Divider
          sx={{
            mb: "1rem",
          }}
        />
        {disabled && <Box color="grey.600" my={"0.5rem"}>* Select both the address to proceed</Box>}
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={disabled}
          onClick={handleFunction}
        >
          {buttonName}
        </Button>
      </Card>
    </Fragment>
  );
};
export default orderSummaryCard;
