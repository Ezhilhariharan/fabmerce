/* eslint-disable react-hooks/exhaustive-deps */
import Image from "components/BazarImage";
import FlexBox from "components/FlexBox";
import { Span } from "components/Typography";
import { useAppContext } from "contexts/app/AppContext";
import Add from "@mui/icons-material/Add";
import { Delete } from "@mui/icons-material";
import Remove from "@mui/icons-material/Remove";
import { Button, IconButton, Tooltip } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import ProductCard7Style from "./ProductCard7Style";
import { Grid } from "@mui/material";
import {
  removeCart,
  updateCartItem,
  sessionRemoveCart,
  sessionUpdateCartItem
} from "utils/api/checkout-apis/checkoutAPI";
import { useRouter } from "next/router";
import Checkbox from "@mui/material/Checkbox";
import {
  handleCartIds,
  handleProductIds,
  handleSummery,
} from "../../../helper/randomId";
import CustomizedSnackbars from "components/Snackbar";
import { useSelector} from "react-redux";

const ProductCard7 = ({ product }) => {
  const {
    product_id,
    product_name,
    quantity,
    profile_photo,
    stock_status,
    cart_id,
    short_description,
    max_price,
    varient
  } = product;
  const router = useRouter();
  const  authToken  = useSelector((state)=> state?.authSlice.authToken)
  const [openSnackbar, setSnackbar] = useState(false);
  const [message, setMessage] = useState();
  // const [checked, setChecked] = useState(true);

  const removeCartItems = (cart_id) => {
    const res = removeCart(cart_id);
    res
      .then((data) => {
        if (data.status === 200) {
          setMessage("Successfully removed from your cart");
          setSnackbar(true);
          router.reload(router.asPath);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const removeSessionItems = (cart_id) => {
    const res = sessionRemoveCart(cart_id);
    res
      .then((data) => {
        if (data.status === 200) {
          setMessage("Successfully removed from your cart");
          setSnackbar(true);
          router.reload(router.asPath);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateCarts = (cart_id, type) => {

    const res = updateCartItem(cart_id, type);
    res
      .then((data) => {
        if (data.status === 200) {
          router.reload(router.asPath);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const updateSessionCarts = (cart_id,type)=>{
    const res = sessionUpdateCartItem(cart_id, type);
    res
      .then((data) => {
        if (data.status === 200) {
          router.reload(router.asPath);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const handleCartAmountChange = useCallback(
    (cart_id, type) => () => {
      if (authToken) {
        updateCarts(cart_id, type);
      } else {
        updateSessionCarts(cart_id,type)
      }
    },
    []
  );

  const handleRemoveCart = useCallback(
    (cart_id) => () => {
      if (authToken) {
        removeCartItems(cart_id);
      } else {
        removeSessionItems(cart_id);
      }
    },
    []
  );

  // feature use

  // const handleSelectCartItem = () => {
  //   setChecked(!checked);
  //   const response = handleCartIds(cartItemIds, cart_id);
  //   const response2 = handleProductIds(productIds, {
  //     product_id: product_id,
  //     quantity: quantity,
  //   });
  //   const response3 = handleSummery(orderSummery, product);
  //   dispatch({ type: "SUMMERY_LIST", payload: response3 });
  //   dispatch({ type: "CART_ITEM_IDS", payload: response });
  //   dispatch({ type: "PRODUCT_IDS", payload: response2 });
  // };

  return (
    <ProductCard7Style sx={{ display: "flex", alignItems: "center" }}>
      <CustomizedSnackbars
        open={openSnackbar}
        duration={1000}
        message={message}
        setSnackbar={setSnackbar}
      />
      {/* <Box>
        <Checkbox
          aria-label={`cart-item-${product_id}`}
          size="small"
          color="secondary"
          onChange={handleSelectCartItem}
          checked={checked}
        />
      </Box> */}

      <Image
        src={profile_photo || ""}
        height={200}
        width={200}
        display="block"
        alt={product_name}
      />
      <FlexBox
        className="product-details"
        flexDirection="column"
        justifyContent="space-between"
        minWidth="0px"
        width="100%"
      >
        {/* <Link href={`/product/${product_id}`}>
          <a style={{ display: "flex", flexDirection: "column" }}>
          </a>
        </Link> */}
        <Grid item xs={11} md={11} sm={11} lg={11} xl={11}>
          <Span
            className="title"
            fontWeight="600"
            fontSize="18px"
            mb={1}
            sx={{ "&.MuiBox-root": { whiteSpace: "normal" } }}
          >
            {product_name}
          </Span>
        </Grid>
        <Span>
          <Box color="green">{stock_status}</Box>
        </Span>

        <Box position="absolute" right="1rem" top="1rem">
          <IconButton
            size="small"
            sx={{
              padding: "4px",
              ml: "12px",
            }}
            onClick={handleRemoveCart(cart_id)}
          >
            <Tooltip title="Remove from cart">
              <Delete fontSize="small" />
            </Tooltip>
          </IconButton>
        </Box>
        <Grid container>
          {varient?.map((item, ind) => {
            const camelCaseAttribute = item?.product_attribute_type?.toLowerCase().split(' ').map((s) =>
              s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
            const camelCaseVariant = item?.value?.toLowerCase().split(' ').map((s) =>
              s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
            return (
              <Grid item mb={2} key={ind} xs={12} md={6} lg={6} xl={6} sm={6}>
                <Box>{camelCaseAttribute}{": "}
                  <b>{item?.product_attribute_type !== "SIZE" && !/\d/.test(item?.value) ? camelCaseVariant : item?.value}</b>
                </Box>
              </Grid>
            );
          })}
        </Grid>

        {/* <FlexBox alignItems="center" mb={2}>
          <Box>{short_description}</Box>
        </FlexBox> */}

        <FlexBox // width="100%"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <FlexBox flexWrap="wrap" alignItems="center">
            <Span color="grey.600" mr={1}>
            ₹  {max_price?.toFixed(2)} x {quantity}
            </Span>
            <Span fontWeight={600} color="primary.main" mr={2}>
            ₹  {(max_price * quantity).toFixed(2)}
            </Span>
          </FlexBox>

          <FlexBox alignItems="center">
            <Button
              variant="outlined"
              color="primary" // padding="5px"
              // size="none"
              // borderColor="primary.light"
              disabled={quantity === 1}
              sx={{
                p: "5px",
              }}
              onClick={handleCartAmountChange(cart_id, false)}
            >
              <Remove fontSize="small" />
            </Button>
            <Span mx={1} fontWeight="600" fontSize="15px">
              {quantity}
            </Span>
            <Button
              variant="outlined"
              color="primary" // padding="5px"
              // size="none"
              // borderColor="primary.light"
              sx={{
                p: "5px",
              }}
              onClick={handleCartAmountChange(cart_id, true)}
            >
              <Add fontSize="small" />
            </Button>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </ProductCard7Style>
  );
};

export default ProductCard7;
