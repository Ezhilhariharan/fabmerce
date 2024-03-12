import React, { useState, useCallback } from "react";
import { H6, Paragraph } from "../Typography";
import Card1 from "components/Card1";
// import Delete from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import FlexBox from "components/FlexBox";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import BazarIconButton from "components/BazarIconButton";
import CustomizedSnackbars from "components/Snackbar";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Avatar,
  Card,
  Grid,
  IconButton,
  Typography,
  Container,
} from "@mui/material";
import { deleteAPI } from "utils/api/orders-api/ordersAPI";
import EditAddressForm from "../checkout/EditAddressForm";
import {
  updateBillingAddressId,
  updateShippingAddressId,
} from "store/orderSlice";
import { useDispatch, useSelector } from "react-redux";

const AddressCards = ({ locationsList }) => {
  const [shippingId, setShippingId] = useState();
  const [billingId, setBillingId] = useState();
  const [openEditForm, setOpenEditForm] = useState(false);
  const [selected, setSelected] = useState(false);
  const dispatch = useDispatch();
  const { asPath, reload, router } = useRouter();
  const refreshData = useCallback(() => reload(asPath), [asPath]);
  const [message, setMessage] = useState("");
  const [openSnackbar, setSnackbar] = useState(false);
  const { billingAddress, shippingAddress } = useSelector(
    (state) => state?.orderSlice
  );
  const authToken = useSelector((state) => state?.authSlice.authToken);

  const editHandler = (value) => {
    const data = locationsList.find((item) => item.location_id === value);
    setSelected(data);
    openEditForm ? setOpenEditForm(false) : setOpenEditForm(true);
  };

  const setIds = (addressType, id) => {
    if (addressType === "billing") {
      setBillingId(id);
      dispatch(updateBillingAddressId(id));
    } else {
      setShippingId(id);
      dispatch(updateShippingAddressId(id));
    }
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
    <Container
      sx={{
        mb: "70px",
      }}
    >
      {locationsList?.filter((i) => i.location_type === "SHIPPING")?.length >
        0 && (
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
          <FlexBox alignItems="center" sx={{ mb: "1rem" }}>
            <Avatar
              sx={{
                backgroundColor: "primary.main",
                color: "primary.text",
                mr: "0.875rem",
                height: 32,
                width: 32,
              }}
              alt="Shipping"
            >
              1
            </Avatar>
            <Typography fontSize="20px">Delivery Address</Typography>{" "}
          </FlexBox>
          <Grid container spacing={3}>
            {locationsList
              ?.filter((i) => i.location_type === "SHIPPING")
              ?.map((item, ind) => (
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
                    </FlexBox>
                    <H6 mb={0.5}>
                      {item?.contact_firstname} {item?.contact_lastname}{" "}
                    </H6>
                    <Paragraph color="grey.700">
                      {item?.address_line_1}
                    </Paragraph>
                    {item?.address_line_2 && (
                      <Paragraph color="grey.700">
                        {item?.address_line_2}
                      </Paragraph>
                    )}
                    <Paragraph color="grey.700">{item?.city}</Paragraph>
                    {item?.province && (
                      <Paragraph color="grey.700">{item?.province}</Paragraph>
                    )}
                    <Paragraph color="grey.700">{item?.country}</Paragraph>
                    {item?.postal_index_code && (
                      <Paragraph color="grey.700">
                        {item?.postal_index_code}
                      </Paragraph>
                    )}
                    <Paragraph color="grey.700">
                      {item?.contact_number}
                    </Paragraph>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Card1>
      )}
      {locationsList?.filter((i) => i.location_type === "BILLING")?.length >
        0 && (
        <Card1
          sx={{
            mb: "1.5rem",
          }}
        >
          <FlexBox alignItems="center" sx={{ mb: "1rem" }}>
            <Avatar
              sx={{
                backgroundColor: "primary.main",
                color: "primary.text",
                mr: "0.875rem",
                height: 32,
                width: 32,
              }}
              alt="Billing"
            >
              2
            </Avatar>
            <Typography fontSize="20px">Billing Address</Typography>{" "}
          </FlexBox>
          <Grid container spacing={3}>
            {locationsList
              ?.filter((i) => i.location_type === "BILLING")
              ?.map((item, ind) => (
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
                        item.location_id === billingId ||
                        item.location_id === billingAddress
                          ? "primary.main"
                          : "transparent",
                    }}
                    onClick={() => {
                      setIds("billing", item.location_id);
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
                    </FlexBox>
                    <H6 mb={0.5}>
                      {item?.contact_firstname} {item?.contact_lastname}{" "}
                    </H6>
                    <Paragraph color="grey.700">
                      {item?.address_line_1}
                    </Paragraph>
                    {item?.address_line_2 && (
                      <Paragraph color="grey.700">
                        {item?.address_line_2}
                      </Paragraph>
                    )}
                    <Paragraph color="grey.700">{item?.city}</Paragraph>
                    {item?.province && (
                      <Paragraph color="grey.700">{item?.province}</Paragraph>
                    )}
                    <Paragraph color="grey.700">{item?.country}</Paragraph>
                    {item?.postal_index_code && (
                      <Paragraph color="grey.700">
                        {item?.postal_index_code}
                      </Paragraph>
                    )}
                    <Paragraph color="grey.700">
                      {item?.contact_number}
                    </Paragraph>
                  </Card>
                </Grid>
              ))}
          </Grid>{" "}
        </Card1>
      )}
      {selected && (
        <EditAddressForm
          openEditForm={openEditForm}
          setOpenEditForm={setOpenEditForm}
          selected={selected}
        />
      )}
    </Container>
  );
};
export default AddressCards;
