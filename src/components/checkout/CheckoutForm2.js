/* eslint-disable react-hooks/exhaustive-deps */
import Card1 from "components/Card1";
import FlexBox from "components/FlexBox";
import { H6, Paragraph } from "components/Typography";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { Avatar, Card, Grid, IconButton, Typography } from "@mui/material";
import React, { Fragment, useEffect, useState, useCallback } from "react";
import NewAddressForm from "./NewAddressForm";
import EditAddressForm from "./EditAddressForm"; // date types
import PaymentForm from "components/payment/PaymentForm";
import {
  getshippingCharge,
  orderDraftAPI,
  getPriceSummary,
} from "utils/api/orders-api/ordersAPI";
import BazarIconButton from "components/BazarIconButton";
import CustomizedSnackbars from "components/Snackbar";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { deleteAPI } from "utils/api/orders-api/ordersAPI";
import {
  updateBillingAddressId,
  updateOrderDraftResponse,
  updatePriceSummery,
  updateShippingAddressId,
  updateShippingCharge,
} from "store/orderSlice";
import { useRouter } from "next/router";

const CheckoutForm2 = ({ locationsList }) => {
  const [shippingId, setShippingId] = useState();
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selected, setSelected] = useState(false);
  const { asPath, reload, router } = useRouter();
  const refreshData = useCallback(() => reload(asPath), [asPath]);
  const [message, setMessage] = useState("");
  const [openSnackbar, setSnackbar] = useState(false);
  const {
    buyNowProduct,
    shippingAddress,
    orderType,
    shippingCharge,
    billingAddress,
    orderDraftResponse,
  } = useSelector((state) => state.orderSlice);
  const authToken = useSelector((state) => state?.authSlice.authToken);
  const dispatch = useDispatch();
  const editHandler = (value) => {
    const data = locationsList.find((item) => item.location_id === value);
    setSelected(data);
    openEditForm ? setOpenEditForm(false) : setOpenEditForm(true);
  };

  const saveBillingAddress = () => {
    const data = locationsList.find(
      (item) => item?.location_type === "BILLING"
    );
    const shipdata = locationsList.find(
      (item) => item?.location_type === "SHIPPING"
    );
    dispatch(updateBillingAddressId(data?.location_id));
    dispatch(updateShippingAddressId(shipdata?.location_id))
  };

  const setIds = (addressType, id) => {
    if (addressType === "shipping") {
      setShippingId(id);
      dispatch(updateShippingAddressId(id));
    }
  };

  useEffect(() => {
    saveBillingAddress();
  }, []);

  const saveShippingCharge = () => {
    if (buyNowProduct && shippingAddress) {
      const details = {
        product_details: [
          {
            product_id: buyNowProduct?.id,
            quantity: buyNowProduct?.qty,
          },
        ],
        shipping_id: shippingAddress,
      };
      const res = getshippingCharge(details, authToken);
      res
        .then((data) => {
          if (data) {
            if (data.status !== "ERROR") {
              dispatch(updateShippingCharge(data));
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const saveOrderDraft = () => {
    const details = {
      order_type: orderType,
      billing_id: billingAddress,
      shipping_id: shippingAddress,
      shipping_charge_id: shippingCharge?.shipping_id,
      checkout_status: 2,
    };
    const res = orderDraftAPI(details, authToken);
    res
      .then((data) => {
        if (data.status === 200) {
          if (data?.data?.reference_id) {
            dispatch(updateOrderDraftResponse(data?.data));
            savePriceSummery();
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (shippingAddress) {
      saveShippingCharge();
    }
  }, [shippingAddress]);

  useEffect(() => {
    if (shippingCharge?.shipping_id) {
      saveOrderDraft();
    }
  }, [shippingCharge?.shipping_id]);

  const savePriceSummery = () => {
    const res = getPriceSummary(authToken, orderDraftResponse?.reference_id);
    res
      .then((data) => {
        dispatch(updatePriceSummery(data.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDelete = (item) => {
    const id = {
      id: item.location_id,
    };
    const customer_location_id = {
      customer_location_id: item.customer_location_id,
    };
    const res = deleteAPI(id, customer_location_id, authToken);
    res
      .then((data) => {
        if (data) {
          setMessage("Successfully deleted the address"), setSnackbar(true);
          refreshData();
        }
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <Fragment>
      <Card1
        sx={{
          mb: "1.5rem",
        }}
      >
        <CustomizedSnackbars
          open={openSnackbar}
          duration={1000}
          message={message}
          setSnackbar={setSnackbar}
        />
        <FlexBox mb={3.5} alignItems="center" justifyContent="space-between">
          <FlexBox alignItems="center">
            <Avatar
              sx={{
                backgroundColor: "primary.main",
                color: "primary.text",
                mr: "0.875rem",
                height: 32,
                width: 32,
              }}
            >
              1
            </Avatar>
            <Typography fontSize="20px">Delivery Address</Typography>
          </FlexBox>

          <NewAddressForm locationtype={"shipping"} />
        </FlexBox>

        <Typography mb={1.5}>Delivery Address</Typography>
        <Grid container spacing={3}>
          {locationsList
            ?.filter((i) => i?.location_type === "SHIPPING")
            .map((item, ind) => (
              <Grid item md={4} sm={6} xs={12} key={ind}>
                <Card
                  sx={{
                    backgroundColor: "grey.100",
                    p: "1rem",
                    position: "relative",
                    boxShadow: "none",
                    border: "1px solid",
                    cursor: "pointer",
                    borderColor:
                      item.location_id === shippingId ||
                      item.location_id === shippingAddress
                        ? "primary.main"
                        : "transparent",
                  }}
                  onClick={() => {
                    setIds("shipping", item.location_id);
                  }}
                >
                  <FlexBox
                    justifyContent="flex-end"
                    sx={{
                      position: "absolute",
                      top: 5,
                      right: 5,
                    }}
                  >
                    <IconButton
                      size="small"
                      sx={{
                        mr: 1,
                      }}
                      onClick={() => editHandler(item.location_id)}
                    >
                      <ModeEditOutlineIcon
                        sx={{
                          fontSize: 20,
                        }}
                      />
                    </IconButton>
                    <BazarIconButton
                      size="small"
                      onClick={() => handleDelete(item)}
                    >
                      <DeleteIcon fontSize="small" />
                    </BazarIconButton>
                    {/* <IconButton
                        onClick={() => deleteAddress(item.location_id)}
                        color="error"
                        size="small"
                      >
                        <DeleteOutlineIcon
                          sx={{
                            fontSize: 20,
                          }}
                        />
                      </IconButton> */}
                  </FlexBox>
                  <H6 mb={0.5}>
                    {item?.contact_firstname} {item?.contact_lastname}{" "}
                  </H6>
                  <Paragraph color="grey.700">
                    {item?.address_line_1} {item?.address_line_2}
                  </Paragraph>
                  <Paragraph color="grey.700">{item?.city}</Paragraph>
                  {item?.province && (
                    <Paragraph color="grey.700">{item?.province}</Paragraph>
                  )}
                  <Paragraph color="grey.700">
                    {item?.country} , {item?.postal_index_code}
                  </Paragraph>
                  <Paragraph color="grey.700">{item?.contact_number}</Paragraph>
                </Card>
              </Grid>
            ))}
          {selected && (
            <EditAddressForm
              openEditForm={openEditForm}
              setOpenEditForm={setOpenEditForm}
              selected={selected}
            />
          )}
        </Grid>
      </Card1>

      <Card1
        sx={{
          mb: "1.5rem",
        }}
      >
        <FlexBox alignItems="center" mb={3.5}>
          <Avatar
            sx={{
              backgroundColor: "primary.main",
              color: "primary.text",
              mr: "0.875rem",
              height: 32,
              width: 32,
            }}
          >
            2
          </Avatar>
          <Typography fontSize="20px">Payment Details</Typography>
        </FlexBox>
        <PaymentForm orderType={"buy-now"} />
      </Card1>
    </Fragment>
  );
};

export default CheckoutForm2;
