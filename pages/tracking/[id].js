import AppLayout from "components/layout/AppLayout";
import useWindowSize from "hooks/useWindowSize";
import React from "react";
import FlexBox from "components/FlexBox";
import { orderTracking } from "utils/api/orders-api/ordersAPI";
import { Card, Divider, Typography, Avatar } from "@mui/material";
import { Container, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import CustomizedSteppers from "../../src/components/stepper/CustomizedSteppers";
import { H5, H6 } from "components/Typography";
const Item = styled("div")(({ theme }) => ({
  backgroundColor: "#fff",
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const Span = styled("div")`
  font-weight: 500;
  font-size: 17px;
  line-height: 30px;
  color: #000000;
`;

const TitleSpan = styled(H5)((props) => ({
  fontWeight: 400,
  fontSize: props?.fontSize,
  lineHeight: props?.lineHeight,
  color: "#999999;",
  marginTop: props?.marginTop,
}));
const SpanText = styled("div")((props) => ({
  fontWeight: 400,
  fontSize: props?.fontSize,
  lineHeight: props?.lineHeight,
  color: props?.color || "#999999;",
}));
const TrackingOrder = (props) => {
  const { orderTrackingInfo } = props;

  return (
    <AppLayout>
      <Container
        sx={{
          my: "2rem",
        }}
      >
        <Grid container spacing={0.5}>
          <Grid item xs={8}>
            <Item>
              <Span>Ordered items</Span>
              <Divider sx={{ borderColor: "#f1f0f0" }} />
              <Card
                sx={{
                  p: "20px 30px",
                  m: 1,
                }}
              >
                {orderTrackingInfo?.data[0]?.order_details?.map((item) => (
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
                        src={item.profile_photo}
                        alt={item.product_name}
                        sx={{
                          height: 100,
                          width: 100,
                        }}
                      />
                      <Grid>
                        <div>
                          <SpanText my="0px">{item.product_name}</SpanText>
                        </div>
                        {item?.variations.map((items) => (
                          <div>
                            <SpanText fontSize="12px" lineHeight="21px">
                              {items?.product_attribute_type} :{items?.value}
                            </SpanText>
                          </div>
                        ))}
                      </Grid>
                    </FlexBox>
                  </FlexBox>
                ))}
              </Card>
              <Grid container spacing={3} direction="column">
                <Grid item lg={6} md={6} xs={12}>
                  <Span>Address</Span>
                  <Card
                    sx={{
                      p: "20px 30px",
                      m: 1,
                      marginTop: 3,
                    }}
                  >
                    <TitleSpan mt={0} fontSize="15px" lineHeight="27px">
                      Shipping Address
                    </TitleSpan>
                    <SpanText color="#000000">
                      {
                        orderTrackingInfo?.data[0]?.shipping_address
                          ?.contact_firstname
                      }{" "}
                      {
                        orderTrackingInfo?.data[0]?.shipping_address
                          ?.contact_lastname
                      }
                    </SpanText>
                    <SpanText fontSize="12px" lineHeight="21px">
                      {
                        orderTrackingInfo?.data[0]?.shipping_address
                          ?.address_line_1
                      }{" "}
                    </SpanText>
                    <SpanText fontSize="12px" lineHeight="21px">
                      {
                        orderTrackingInfo?.data[0].shipping_address
                          ?.address_line_2
                      }
                    </SpanText>
                    <SpanText fontSize="12px" lineHeight="21px">
                      {orderTrackingInfo?.data[0]?.shipping_address?.city}{" "}
                      {orderTrackingInfo?.data[0]?.shipping_address?.province}
                    </SpanText>
                    <SpanText fontSize="12px" lineHeight="21px">
                      {orderTrackingInfo?.data[0]?.shipping_address?.country}
                      {
                        orderTrackingInfo?.data[0]?.shipping_address
                          ?.postal_index_code
                      }
                    </SpanText>
                    <TitleSpan mt={0} fontSize="15px" marginTop="10px">
                      Billing Address
                    </TitleSpan>
                    <SpanText color="#000000">
                      {
                        orderTrackingInfo?.data[0]?.billing_address
                          ?.contact_firstname
                      }{" "}
                      {
                        orderTrackingInfo?.data[0]?.billing_address
                          ?.contact_lastname
                      }
                    </SpanText>
                    <SpanText fontSize="12px" lineHeight="21px">
                      {
                        orderTrackingInfo?.data[0]?.billing_address
                          ?.address_line_1
                      }{" "}
                    </SpanText>
                    <SpanText>
                      {
                        orderTrackingInfo?.data[0]?.billing_address
                          ?.address_line_2
                      }
                    </SpanText>
                    <SpanText fontSize="12px" lineHeight="21px">
                      {orderTrackingInfo?.data[0]?.city}{" "}
                      {orderTrackingInfo?.data[0]?.billing_address?.province}
                    </SpanText>
                    <SpanText fontSize="12px" lineHeight="21px">
                      {orderTrackingInfo?.data[0]?.billing_address?.country}
                      {
                        orderTrackingInfo?.data[0]?.billing_address
                          ?.postal_index_code
                      }
                    </SpanText>
                  </Card>
                </Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item>
              <Span>Order Tracking</Span>
              <Divider sx={{ borderColor: "#f1f0f0" }} />
              <FlexBox flexWrap="wrap" mt={4}>
                <CustomizedSteppers
                  shipmentStatus={orderTrackingInfo?.data[0]?.shipment_status}
                />
              </FlexBox>
              <Grid>
                <Card
                  sx={{
                    p: "20px 30px",
                    marginTop: 4,
                  }}
                >
                  <H5 mt={0} mb={2}>
                    Total Summary
                  </H5>
                  <FlexBox
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                  >
                    <Typography fontSize="14px" color="grey.600">
                      Subtotal:
                    </Typography>
                    <H6 my="0px">
                      ₹ {orderTrackingInfo?.pricings?.sub_total_price}
                    </H6>
                  </FlexBox>
                  <FlexBox
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                  >
                    <Typography fontSize="14px" color="grey.600">
                      Shipping fee:
                    </Typography>
                    <H6 my="0px">
                      ₹ {orderTrackingInfo?.pricings?.total_shipping_price}
                    </H6>
                  </FlexBox>
                  <FlexBox
                    justifyContent="space-between"
                    alignItems="center"
                    mb={1}
                  >
                    <Typography fontSize="14px" color="grey.600">
                      Discount :
                    </Typography>
                    <H6 my="0px">
                      ₹ {orderTrackingInfo?.pricings?.total_discount}
                    </H6>
                  </FlexBox>

                  <Divider
                    sx={{
                      mb: "0.5rem",
                    }}
                  />

                  <FlexBox
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <H6 my="0px">Total</H6>
                    <H6 my="0px">
                      ₹ {orderTrackingInfo?.pricings?.total_price}
                    </H6>
                  </FlexBox>
                </Card>
              </Grid>
            </Item>
          </Grid>
        </Grid>
      </Container>
    </AppLayout>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;
  const orderTrackingInfo = id && (await orderTracking(id));
  return {
    props: {
      orderTrackingInfo,
    },
  };
}
export default TrackingOrder;
