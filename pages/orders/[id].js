import DashboardLayout from "components/layout/CustomerDashboardLayout";
import FlexBox from "components/FlexBox";
import CustomerDashboardNavigation from "components/layout/CustomerDashboardNavigation";
import DashboardPageHeader from "components/layout/DashboardPageHeader";
import TableRow from "components/TableRow";
import { H5, H6 } from "components/Typography";
import useWindowSize from "hooks/useWindowSize";
import ShoppingBag from "@mui/icons-material/ShoppingBag";
import {
  Avatar,
  Card,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box, useTheme } from "@mui/system";
import { format } from "date-fns";
import React from "react";
import { getOrderDetails } from "utils/api/orders-api/ordersAPI";
import StatusSteppers from "components/stepper/StatusSteppers";
import LazyImage from "components/LazyImage";
import { useSelector } from "react-redux";
const StyledFlexbox = styled(FlexBox)(({ theme }) => ({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  marginTop: "2rem",
  marginBottom: "2rem",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
  "& .line": {
    flex: "1 1 0",
    height: 4,
    minWidth: 50,
    [theme.breakpoints.down("sm")]: {
      flex: "unset",
      height: 50,
      minWidth: 4,
    },
  },
}));

const OrderText = styled("div")(() => ({
  display: "flex",
  fontSize: "20px",
  justifyContent: "center",
  fontWeight: 700,
  color: "#888d99",
}));

const OrderDetails = (props) => {
  const { orderInfo, auth_token } = props;
  const width = useWindowSize();
  const theme = useTheme();
  const breakpoint = 350;
  const orderStatus = useSelector((state) => state?.orderSlice.statues);
  const findStatus = (statusId) => {
    const res = orderStatus?.find(({ id }) => id === statusId);
    return res?.name.toLowerCase();
  };
  const status = findStatus(orderInfo?.status);
  const str = status;
  const ordersStatus = str.charAt(0).toUpperCase() + str.slice(1);
  const stepperStatus = [
    "processing",
    "shipped",
    "on-hold",
    "design_created",
    "ready_to_pickup",
    "completed",
    "pending",
  ];
  return (
    <DashboardLayout authToken={auth_token}>
      <DashboardPageHeader
        title="Order Details"
        icon={ShoppingBag}
        navigation={<CustomerDashboardNavigation />}
      />

      <Card
        sx={{
          mb: "30px",
        }}
      >
        {(status === "cancelled" || status === "failed") && (
          <StyledFlexbox sx={{ justifyContent: "center" }}>
            <div style={{ width: 150 }}>
              <LazyImage
                src={"/assets/images/shoppingbag/cancel-order.png"}
                width={100}
                height={100}
                layout="responsive"
                alt="cancel_order"
              />
              <OrderText>{ordersStatus}</OrderText>
            </div>
          </StyledFlexbox>
        )}
        {status === "refunded" && (
          <StyledFlexbox sx={{ justifyContent: "center" }}>
            <div style={{ width: 120 }}>
              <LazyImage
                src={"/assets/images/shoppingbag/refund.png"}
                width={"100%"}
                height={"100%"}
                layout="responsive"
                alt="refund"
              />
              <OrderText>{ordersStatus}</OrderText>
            </div>
          </StyledFlexbox>
        )}
        {stepperStatus.includes(status) === true && (
          <StyledFlexbox>
            <StatusSteppers activeSetp={orderInfo?.status} />
          </StyledFlexbox>
        )}
      </Card>

      <Card
        sx={{
          p: "0px",
          mb: "30px",
        }}
      >
        <TableRow
          sx={{
            bgcolor: "grey.200",
            p: "12px",
            boxShadow: "none",
            borderRadius: 0,
          }}
        >
          <FlexBox className="pre" m={0.75} alignItems="center">
            <Typography fontSize="14px" color="grey.600" mr={0.5}>
              Order ID:
            </Typography>
            <Typography fontSize="14px">{orderInfo?.source_id}</Typography>
          </FlexBox>
          <FlexBox className="pre" m={0.75} alignItems="center">
            <Typography fontSize="14px" color="grey.600" mr={0.5}>
              Placed on:
            </Typography>
            <Typography fontSize="14px">
              {format(new Date(orderInfo?.order_confirmed_at), "dd MMM, yyyy")}
            </Typography>
          </FlexBox>
          {orderInfo?.status === 1 ? (
            <FlexBox className="pre" m={0.75} alignItems="center">
              <Typography fontSize="14px" color="grey.600" mr={0.5}>
                Delivered on:
              </Typography>
              <Typography fontSize="14px">
                {format(
                  new Date(orderInfo?.order_delivered_at),
                  "dd MMM, yyyy"
                )}
              </Typography>
            </FlexBox>
          ) : null}
        </TableRow>

        <Box py={1}>
          {orderInfo?.line_items?.map((item) => (
            <FlexBox
              px={2}
              py={1}
              flexWrap="wrap"
              alignItems="center"
              key={item.id}
            >
              <FlexBox
                flex="2 2 260px"
                m={0.75}
                alignItems="center"
                key={item.id}
              >
                <Avatar
                  src={item.product_image}
                  alt={item.product_name}
                  sx={{
                    height: 100,
                    width: 100,
                  }}
                />
                <Box ml={5}>
                  <H6 my="0px">{item.product_name}</H6>
                  <Typography fontSize="14px" color="grey.600">
                    ₹ {item.total_price}
                  </Typography>
                  <Typography fontSize="14px" color="grey.600">
                    quantity : {item.quantity}
                  </Typography>
                  <Typography fontSize="14px" color="grey.600">
                    soldby : {item.brand_name}
                  </Typography>
                </Box>
              </FlexBox>
              <FlexBox flex="1 1 260px" m={0.75} alignItems="center">
                <Typography fontSize="14px" color="grey.600">
                  {item.product_description}
                </Typography>
              </FlexBox>
            </FlexBox>
          ))}
        </Box>
      </Card>

      <Grid container spacing={3}>
        <Grid item lg={6} md={6} xs={12}>
          <Card
            sx={{
              p: "20px 30px",
            }}
          >
            <H5 mt={0} mb={2}>
              Shipping Address
            </H5>
            <Typography fontSize="14px" color="grey.600">
              {orderInfo?.shipping_address?.address_line_1}{" "}
              {orderInfo?.shipping_address?.address_line_1}
            </Typography>
            <Typography fontSize="14px" color="grey.600">
              {orderInfo?.shipping_address?.city}{" "}
              {orderInfo?.shipping_address?.province}
            </Typography>
            <Typography fontSize="14px" color="grey.600">
              {orderInfo?.shipping_address?.country} {"-"}
              {orderInfo?.shipping_address?.postal_index_code}
            </Typography>
          </Card>
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Card
            sx={{
              p: "20px 30px",
            }}
          >
            <H5 mt={0} mb={2}>
              Billing Address
            </H5>
            <Typography fontSize="14px" color="grey.600">
              {orderInfo?.billing_address?.address_line_1}{" "}
              {orderInfo?.billing_address?.address_line_1}
            </Typography>
            <Typography fontSize="14px" color="grey.600">
              {orderInfo?.billing_address?.city}{" "}
              {orderInfo?.billing_address?.province}
            </Typography>
            <Typography fontSize="14px" color="grey.600">
              {orderInfo?.billing_address?.country} {"-"}
              {orderInfo?.billing_address?.postal_index_code}
            </Typography>
          </Card>
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Card
            sx={{
              p: "20px 30px",
            }}
          >
            <H5 mt={0} mb={2}>
              Total Summary
            </H5>
            <FlexBox justifyContent="space-between" alignItems="center" mb={1}>
              <Typography fontSize="14px" color="grey.600">
                Subtotal:
              </Typography>
              <H6 my="0px">₹ {orderInfo?.sub_total_price}</H6>
            </FlexBox>
            <FlexBox justifyContent="space-between" alignItems="center" mb={1}>
              <Typography fontSize="14px" color="grey.600">
                Shipping fee:
              </Typography>
              <H6 my="0px">₹ {orderInfo?.total_shipping_price}</H6>
            </FlexBox>
            <FlexBox justifyContent="space-between" alignItems="center" mb={1}>
              <Typography fontSize="14px" color="grey.600">
                Discount :
              </Typography>
              <H6 my="0px">₹ {orderInfo?.discount_amount}</H6>
            </FlexBox>

            <Divider
              sx={{
                mb: "0.5rem",
              }}
            />

            <FlexBox justifyContent="space-between" alignItems="center" mb={2}>
              <H6 my="0px">Total</H6>
              <H6 my="0px">₹ {orderInfo?.total_price}</H6>
            </FlexBox>
            <Typography fontSize="14px">
              Paid by {orderInfo?.payment_type}
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { req } = context;
  const { id } = params;
  const auth_token = req?.cookies?.token;
  const orderInfo = await getOrderDetails(id, auth_token);
  return {
    props: {
      orderInfo,
      auth_token,
    },
  };
}

export default OrderDetails;
