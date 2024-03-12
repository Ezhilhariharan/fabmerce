import BazarCard from "components/BazarCard";
import BazarRating from "components/BazarRating";
import LazyImage from "components/LazyImage";
import { H3, Span } from "components/Typography";
import { useAppContext } from "contexts/app/AppContext";
import Close from "@mui/icons-material/Close";
import { H4 } from "components/Typography";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import {
  Box,
  Chip,
  Dialog,
  DialogContent,
  IconButton,
  styled,
  Tooltip,
} from "@mui/material";
import Link from "next/link";
import React, { Fragment, useCallback, useState } from "react";
import FlexBox from "../FlexBox";
import {
  addToCart,
  sessionAddToCart,
} from "utils/api/checkout-apis/checkoutAPI";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import CustomizedSnackbars from "components/Snackbar";
import { useSelector, useDispatch } from "react-redux";
import { updateCartCount } from "store/cartSlice";
import { primary } from "theme/themeColors";

const StyledBazarCard = styled(BazarCard)(() => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
  margin: "auto",
  overflow: "hidden",
  transition: "all 250ms ease-in-out",
  borderRadius: "8px",
  "&:hover": {
    "& .css-1i2n18j": {
      display: "flex",
    },
  },
}));
const ImageWrapper = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    display: "block",
  },
}));
const ContentWrapper = styled(Box)(() => ({
  padding: "1rem",
  "& .title, & .categories": {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
}));

const ProductCard1 = ({
  id,
  title,
  min_price,
  max_price,
  profile_photo,
  brand_id,
  brand_name,
  rating,
  hideRating,
  hoverEffect,
  showProductSize,
  discount_price,
  brand_slug,
  slug,
  pricings,
}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state.authSlice.authToken);
  const [message, setMessage] = useState();
  const [openSnackbar, setSnackbar] = useState(false);

  const toggleDialog = useCallback(() => {
    setOpen((open) => !open);
  }, []);

  const addCartItems = (amount) => {
    const details = {
      product_id: id,
      guest_user: 0,
      quantity: amount,
    };
    const res = addToCart(details);
    res
      .then((data) => {
        if (data.status === 200) {
          if (data.status === 200) {
            setMessage("Successfully added to your cart");
            setSnackbar(true);
            dispatch(updateCartCount(true));
          }
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addtoSessionCart = (amount) => {
    const sessionId = getCookie("sessionId");
    const details = {
      session_id: sessionId,
      product_id: id,
      guest_user: 1,
      quantity: amount,
    };
    const res = sessionAddToCart(details);
    res
      .then((data) => {
        if (data.status === 200) {
          setMessage("Successfully added to your cart");
          setSnackbar(true);
          dispatch(updateCartCount(true));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleCartAmountChange = useCallback(
    (amount) => () => {
      if (authToken) {
        addCartItems(amount);
      } else {
        addtoSessionCart(amount);
      }
    },
    []
  );
  return (
    <Fragment>
      <CustomizedSnackbars
        open={openSnackbar}
        duration={1000}
        message={message}
        setSnackbar={setSnackbar}
      />
      {profile_photo && (
        <StyledBazarCard hoverEffect={hoverEffect}>
          <ImageWrapper>
            {/* <HoverIconWrapper>
          <IconButton
            sx={{
              p: "6px",
            }}
            onClick={toggleDialog}
          >
            <RemoveRedEye color="secondary" fontSize="small" />
          </IconButton>
          <IconButton
            sx={{
              p: "6px",
            }}
            onClick={toggleIsFavorite}
          >
            {isFavorite ? (
              <Favorite color="primary" fontSize="small" />
            ) : (
              <FavoriteBorder fontSize="small" />
            )}
          </IconButton>
        </HoverIconWrapper> */}

            <Link
              href={{
                pathname: `/product/${slug}`,
              }}
            >
              <a>
                <LazyImage
                  src={profile_photo}
                  width={0}
                  height={0}
                  layout="responsive"
                  alt={title}
                />
              </a>
            </Link>
          </ImageWrapper>

          <ContentWrapper>
            <FlexBox>
              <Box flex="1 1 0" minWidth="0px" mr={1}>
                <Link
                  href={{
                    pathname: `/product/${slug}`,
                  }}
                >
                  <a>
                    <H3
                      className="title"
                      fontSize="14px"
                      textAlign="left"
                      fontWeight="600"
                      color="text.secondary"
                      mb={1}
                      title={title}
                      sx={{ textAlign: "center" }}
                    >
                      {title}
                    </H3>
                  </a>
                </Link>

                {/* {!hideRating && (
                  <FlexBox justifyContent="center">
                    <BazarRating value={rating || 0} color="warn" readOnly />
                  </FlexBox>
                )} */}
                {showProductSize && (
                  <Span
                    color="grey.600"
                    mb={1}
                    display="block"
                    sx={{ textAlign: "center" }}
                  >
                    300ml
                  </Span>
                )}
                {pricings?.max_price !== 0 && (
                  <FlexBox alignItems="center" mt={0.5} justifyContent="center">
                    {pricings?.discount_price === "undefined" ||
                    pricings?.discount_price === "null" ||
                    !pricings?.discount_price ||
                    !!pricings?.is_primary ? (
                      <H4 sx={{ color: primary[500] }} mb={0.5} lineHeight="1">
                        ₹ {max_price?.toFixed(2)}
                      </H4>
                    ) : (
                      <H4 mb={0.5} lineHeight="1" sx={{ color: primary[500] }}>
                        ₹ {pricings?.discount_price?.toFixed(2)}&nbsp;&nbsp;
                        <span style={{ fontSize: "13px" }}>
                          <del style={{ fontWeight: "600", color: "#7D879C" }}>
                            ₹ {max_price?.toFixed(2)}
                          </del>
                          <span style={{ color: "#388e3c", fontWeight: "800" }}>
                            {`(-${pricings?.discount_value}%)`}
                          </span>
                        </span>
                      </H4>
                    )}
                  </FlexBox>
                )}
              </Box>

              {/* <FlexBox
                className="add-cart"
                flexDirection="column-reverse"
                alignItems="center"
                justifyContent="flex-start"
                width="30px"
              >
                <Tooltip title="Add to cart">
                  <IconButton onClick={handleCartAmountChange(1)}>
                    <AddShoppingCartIcon color="grey.600" />
                  </IconButton>
                </Tooltip>
              </FlexBox> */}
            </FlexBox>
          </ContentWrapper>

          <Dialog open={open} maxWidth={false} onClose={toggleDialog}>
            <DialogContent
              sx={{
                paddingBottom: "1.25rem",
              }}
            >
              <IconButton
                sx={{
                  position: "absolute",
                  top: "0",
                  right: "0",
                }}
                onClick={toggleDialog}
              >
                <Close className="close" fontSize="small" color="primary" />
              </IconButton>
            </DialogContent>
          </Dialog>
        </StyledBazarCard>
      )}
    </Fragment>
  );
};

export default ProductCard1;
