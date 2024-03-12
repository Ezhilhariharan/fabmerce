/* eslint-disable react-hooks/exhaustive-deps */
import BazarAvatar from "components/BazarAvatar";
import BazarButton from "components/BazarButton";
import BazarIconButton from "components/BazarIconButton";
import FlexBox from "components/FlexBox";
import ShoppingBagOutlined from "components/icons/ShoppingBagOutlined";
import LazyImage from "components/LazyImage";
import { H5, Tiny } from "components/Typography";
import { useAppContext } from "contexts/app/AppContext";
import Close from "@mui/icons-material/Close";
import { Box, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import React, { useCallback, useState } from "react";
import {
  removeCart,
  sessionRemoveCart,
} from "utils/api/checkout-apis/checkoutAPI";
import { useRouter } from "next/router";
import CustomizedSnackbars from "components/Snackbar";
import { useSelector, useDispatch } from "react-redux";
import { updateCartCount } from "store/cartSlice";
import { updateOpenMiniDrawer, updateOrderType } from "store/orderSlice";

const MiniCart = ({ toggleSidenav }) => {
  const { palette } = useTheme();
  const cartList = useSelector((state) => state.cartSlice.cartList);
  const authToken = useSelector((state) => state.authSlice.authToken);
  const dispatch = useDispatch();
  const router = useRouter();
  const [openSnackbar, setSnackbar] = useState(false);
  const [message, setMessage] = useState();

  const removeCartItems = (cart_id) => {
    const res = removeCart(cart_id);
    res
      .then((data) => {
        if (data.status === 200) {
          dispatch(updateCartCount(true));
          setMessage("Successfully removed from your cart");
          setSnackbar(true);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const sessionItemsRemove = (cart_id) => {
    const res = sessionRemoveCart(cart_id);
    res
      .then((data) => {
        if (data.status === 200) {
          setMessage("Successfully removed from your cart");
          setSnackbar(true);
          dispatch(updateCartCount(true));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCartAmountChange = useCallback(
    (product) => () => {
      if (authToken) {
        removeCartItems(product?.cart_id);
      } else {
        sessionItemsRemove(product?.cart_id);
      }
    },
    []
  );

  const getTotalPrice = () => {
    return (
      cartList.reduce(
        (accumulator, item) => accumulator + item.max_price * item.quantity,
        0
      ) || 0
    );
  };

  return (
    <Box width="380px">
      <CustomizedSnackbars
        open={openSnackbar}
        duration={1000}
        message={message}
        setSnackbar={setSnackbar}
      />
      <Box
        overflow="auto"
        height={`calc(100vh - ${
          !!cartList?.length ? "80px - 3.25rem" : "0px"
        })`}
      >
        <FlexBox
          alignItems="center"
          m="0px 20px"
          height="74px"
          color="secondary.main"
        >
          <ShoppingBagOutlined color="inherit" />
          <Box fontWeight={600} fontSize="16px" ml={1}>
            {cartList?.length} Item
          </Box>
        </FlexBox>

        <Divider />

        {!!!cartList?.length && (
          <FlexBox
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            height="calc(100% - 74px)"
          >
            <LazyImage
              src="/assets/images/shoppingbag/shopping-bag.svg"
              width={90}
              height={100}
              alt="shopping-bag"
            />
            <Box
              component="p"
              mt={2}
              color="grey.600"
              textAlign="center"
              maxWidth="200px"
            >
              Your shopping bag is empty. Start shopping
            </Box>
          </FlexBox>
        )}
        {cartList?.map((item) => (
          <FlexBox
            alignItems="center"
            py={2}
            px={2.5}
            borderBottom={`1px solid ${palette.divider}`}
            key={item.product_id}
          >
            {/* <Link href={`/product/${item?.product_id}`}>
              <a>
              </a>
            </Link> */}
            <BazarAvatar
              src={item?.profile_photo || ""}
              mx={2}
              alt={item?.product_name}
              height={76}
              width={76}
            />
            <Box flex="1 1 0">
              {/* <Link href={`/product/${item.id}`}>
                <a>
                </a>
              </Link> */}
              <H5 className="title" fontSize="14px">
                {item?.product_name}
              </H5>
              <Tiny color="grey.600">
                ₹ {item?.max_price.toFixed(2)} x {item?.quantity}
              </Tiny>
              <Box
                fontWeight={600}
                fontSize="14px"
                color="primary.main"
                mt={0.5}
              >
                ₹ {(item?.quantity * item?.max_price).toFixed(2)}
              </Box>
            </Box>
            <BazarIconButton
              ml={2.5}
              size="small"
              onClick={handleCartAmountChange(item)}
            >
              <Close fontSize="small" />
            </BazarIconButton> 
          </FlexBox>
        ))}
      </Box>

      {!!cartList?.length && (
        <Box p={2.5}>
              <BazarButton
                variant="contained"
                color="primary"
                sx={{
                  mb: "0.75rem",
                  height: "40px",
                }}
                fullWidth
                onClick={() => {
                  toggleSidenav;
                  dispatch(updateOpenMiniDrawer(true));
                  dispatch(updateOrderType(2));
                  router.push({pathname:"/checkout",query:{slug:"true"}})
                }}
              >
                Checkout Now (₹ {getTotalPrice().toFixed(2)})
              </BazarButton>
              <BazarButton
                color="primary"
                variant="outlined"
                sx={{
                  height: 40,
                }}
                fullWidth
                onClick={() => {
                  toggleSidenav;
                  router.push({pathname:"/cart",query:{slug:"true"}})
                }}
              >
                View Cart
              </BazarButton>
        </Box>
      )}
    </Box>
  );
};

MiniCart.defaultProps = {
  toggleSidenav: () => {},
};
export default MiniCart;
