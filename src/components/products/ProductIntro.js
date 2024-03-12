import Link from "next/link";
import { useRouter } from "next/router";
import { Box, Button, Grid, styled, Tooltip } from "@mui/material";
import LazyImage from "components/LazyImage";
import BazarAvatar from "components/BazarAvatar";
import BazarButton from "components/BazarButton";
import { H1, H2, H6, H4 } from "components/Typography";
import React, {
  Fragment,
  useCallback,
  useState,
  useEffect,
  Children,
} from "react";
import ImageViewer from "react-simple-image-viewer";
import FlexBox from "../FlexBox";
import QuantityButtons from "components/QuantityButtons";
import {
  addToCart,
  sessionAddToCart,
} from "utils/api/checkout-apis/checkoutAPI";
import { getCookie } from "cookies-next";
import CustomizedSnackbars from "components/Snackbar";
import { CheckCircle } from "@mui/icons-material";
import { instock, error, primary } from "theme/themeColors";
import useWindowSize from "hooks/useWindowSize";
import ReactImageMagnify from "react-image-magnify";
import BasicBreadcrumbs from "components/breadcrumbs/BasicBreadcrumbs";
import { useSelector, useDispatch } from "react-redux";
import { updateCartCount } from "store/cartSlice";
import { updateBuyNowProduct } from "store/orderSlice";
import SearchProductCardList from "./SearchProductCardList";
// import BazarRating from "components/BazarRating";
export const StyledList = styled("li")(() => ({
  listStyleType: "initial",
  color: "black",
}));
const ProductIntro = ({
  product,
  productVarients,
  productImages,
  setSelectedVarient,
  selectedVarient,
  setVarientName,
  setSelectedValue,
  productNotAvailable,
  productDetails,
  breadcrumbDetails,
  brandInfo,
}) => {
  const {
    id,
    max_price,
    name,
    gallary_photos,
    stock_status,
    sku_name,
    pricings,
    brand_name,
    brand_slug,
  } = product;
  const [selectedImage, setSelectedImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [colorImage, setColorImage] = useState(0);
  const [colorButton, setColorButtton] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const [visibleSlides, setVisibleSlides] = useState(6);
  useEffect(() => {
    if (window < 464) setVisibleSlides(1);
    else if (window < 710) setVisibleSlides(2);
    else if (window < 950) setVisibleSlides(3);
    else setVisibleSlides(4);
  }, [window]);

  const router = useRouter();
  const authToken = useSelector((state) => state?.authSlice?.authToken);
  const [openSnackbar, setSnackbar] = useState(false);
  const [message, setMessage] = useState();
  const actionButton =
    product.quantity === 0 ||
    product.quantity === null ||
    product.quantity === undefined
      ? true
      : false;
  const buynowButton =
    product.quantity === 0 ||
    product.quantity === null ||
    product.quantity === undefined;
  const [productSizeReverseVarient] = useState(productVarients);
  const window = useWindowSize();
  const [isOpen, setIsOpen] = useState(true);
  const handleImageClick = (ind) => () => {
    setSelectedImage(ind);
  };
  const handleColorImageClick = (ind, value, name) => () => {
    setColorImage(ind);
    setSelectedVarient({
      ...selectedVarient,
      [name]: value,
    });
    setVarientName(name);
    setSelectedValue(value);
  };

  const handleButtonColors = (ind, value, name) => () => {
    setColorButtton(ind);
    setSelectedVarient({
      ...selectedVarient,
      [name]: value,
    });
    setVarientName(name);
    setSelectedValue(value);
  };

  const openImageViewer = useCallback((gallary_photos) => {
    setCurrentImage(gallary_photos?.indexOf(gallary_photos[selectedImage]));
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const addCartItems = (qty) => {
    const details = {
      product_id: id,
      guest_user: 0,
      quantity: qty,
    };
    const res = addToCart(details);
    res
      .then((data) => {
        if (data.status === 200) {
          setMessage("Successfully added to your cart");
          setSnackbar(true);
          dispatch(updateCartCount(true));
          // router.push("/");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const addtoSessionCart = (qty) => {
    const sessionId = getCookie("sessionId");
    const details = {
      session_id: sessionId,
      product_id: id,
      guest_user: 1,
      quantity: qty,
    };
    const res = sessionAddToCart(details);
    res
      .then((data) => {
        if (data.status === 200) {
          setMessage("Successfully added to your cart");
          setSnackbar(true);
          dispatch(updateCartCount(true));
          // router.push("/");
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
    [id, authToken, quantity]
  );

  // direct buynow product
  const productBuyNow = () => {
    findbuyNowProduct();
    router.push({
      pathname: "/checkout-alternative",
      query: {
        slug: product?.slug,
      },
    });
  };
  const findbuyNowProduct = () => {
    const res = productDetails?.find((item) => item.id === id);
    dispatch(updateBuyNowProduct({ ...res, qty: quantity }));
  };

  const removeTag = /(<([^>]+)>)/gi;
  const shortDescriptionWithoutTags = product?.short_description?.replace(
    removeTag,
    ""
  );
  const shortDescriptionArray = shortDescriptionWithoutTags?.split(".");
  return (
    <Box width="100%">
      <CustomizedSnackbars
        open={openSnackbar}
        duration={1000}
        message={message}
        setSnackbar={setSnackbar}
      />
      <FlexBox
        sx={{
          mb: "2rem",
        }}
      >
        <BasicBreadcrumbs product={breadcrumbDetails} />
      </FlexBox>
      <Grid container spacing={3} justifyContent="space-around">
        <Grid item md={6} xs={12} alignItems="center">
          <FlexBox
            flexDirection={window > 800 ? "row-reverse" : "column"}
            justifyContent="space-around"
            overflow="auto"
          >
            <FlexBox justifyContent="center" mb={6}>
              {window > 800 ? (
                <div
                  onMouseEnter={() => setIsOpen(false)}
                  onMouseLeave={() => setIsOpen(true)}
                  style={{
                    width: "400px",
                    height: "420px",
                    overflow: "hidden",
                  }}
                >
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: name,
                        isFluidWidth: true,
                        src:
                          product?.gallary_photos[selectedImage] ||
                          product?.profile_photo,
                      },
                      largeImage: {
                        alt: name,
                        src:
                          product?.gallary_photos[selectedImage] ||
                          product?.profile_photo,
                        width: 1400,
                        height: 1800,
                      },
                      enlargedImagePortalId: "myPortal",
                      enlargedImageContainerDimensions: {
                        width: "150%",
                        height: "100%",
                      },
                      shouldUsePositiveSpaceLens: true,
                    }}
                  />
                </div>
              ) : (
                <LazyImage
                  src={
                    product?.gallary_photos[selectedImage] ||
                    product?.profile_photo
                  }
                  onClick={() => openImageViewer(gallary_photos)}
                  alt={name}
                  height={420}
                  width={420}
                  loading="eager"
                  objectFit="contain"
                />
              )}

              {isViewerOpen && gallary_photos.length > 0 && (
                <ImageViewer
                  src={gallary_photos || []}
                  currentIndex={currentImage}
                  onClose={closeImageViewer}
                  backgroundStyle={{
                    backgroundColor: "#b8b2b2",
                    marginTop: "107px",
                    height: "500px",
                  }}
                  closeOnClickOutside={true}
                  alt={name}
                />
              )}
            </FlexBox>
            {gallary_photos?.length > 0 && (
              <FlexBox
                overflow="auto"
                flexDirection={window > 800 ? "column" : "row"}
              >
                {gallary_photos?.map((url, ind) => (
                  <Box
                    height={64}
                    width={64}
                    minWidth={64}
                    bgcolor="white"
                    borderRadius="10px"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    border="1px solid"
                    style={{
                      cursor: "pointer",
                    }}
                    ml={ind === 0 ? "auto" : 0}
                    mr={ind === gallary_photos?.length - 1 ? "auto" : "10px"}
                    mb={ind === gallary_photos?.length - 1 ? "auto" : "10px"}
                    borderColor={
                      selectedImage === ind ? "primary.main" : "grey.400"
                    }
                    onClick={handleImageClick(ind)}
                    key={ind}
                  >
                    <BazarAvatar
                      src={url}
                      variant="square"
                      alt={name}
                      height={40}
                    />
                  </Box>
                ))}
              </FlexBox>
            )}
          </FlexBox>
        </Grid>

        <Grid item md={6} xs={12} alignItems="center">
          <div
            id="myPortal"
            style={{
              position: "absolute",
              zIndex: "100",
            }}
          />
          <Box>
            <H1 mb={2} sx={{ fontSize: "25px" }}>
              {name}
            </H1>
            {/* <FlexBox alignItems="center" mb={2}>
            <Box lineHeight="1">Rated:</Box>
            <Box mx={1} lineHeight="1">
              <BazarRating color="warn" fontSize="1.25rem" value={4} readOnly />
            </Box>
          </FlexBox> */}
            {pricings?.max_price !== 0 && (
              <Box mb={3}>
                {pricings?.discount_price === "undefined" ||
                pricings?.discount_price === "null" ||
                !pricings?.discount_price ||
                !!pricings?.is_primary ? (
                  <H2 sx={{ color: primary[500] }} mb={0.5} lineHeight="1">
                    ₹ {max_price?.toFixed(2)}
                  </H2>
                ) : (
                  <Grid>
                    <Grid item xs={12}>
                      <H2 sx={{ color: primary[500] }} mb={0.5} lineHeight="1">
                        ₹ {pricings?.discount_price?.toFixed(2)}
                      </H2>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      color="primary.main"
                      mb={0.5}
                      mt={1.5}
                      lineHeight="1"
                      fontSize={16}
                    >
                      <span>
                        <del style={{ fontWeight: "600", color: "#7D879C" }}>
                          ₹ {max_price.toFixed(2)}
                        </del>
                        &nbsp;&nbsp;
                        <span style={{ color: "#388e3c", fontWeight: "500" }}>
                          ({pricings?.discount_value}%)
                        </span>
                      </span>
                    </Grid>
                  </Grid>
                )}

                <Box>
                  {product?.quantity > 0 ? (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        color: instock?.available,
                      }}
                    >
                      <CheckCircle sx={{ fontSize: "14px" }} />
                      &nbsp;In stock
                    </div>
                  ) : (
                    <div style={{ color: instock?.unavailable }}>
                      Out of stock
                    </div>
                  )}
                  <Box mt={1}>
                    {product?.quantity <= 3 && product?.quantity !== 0 ? (
                      <span style={{ color: instock?.unavailable }}>
                        Hurry! only <span>{product?.quantity}</span> left
                      </span>
                    ) : null}
                  </Box>
                </Box>
              </Box>
            )}
            <FlexBox alignItems="center" mb={2}>
              <Box sx={{ fontSize: "16px" }}>
                <ul>
                  {shortDescriptionArray
                    ?.slice(0, shortDescriptionArray?.length - 1)
                    .map((tagRemovedDescription, index) => (
                      <StyledList key={index}>
                        {tagRemovedDescription}
                        {"."}
                      </StyledList>
                    ))}
                </ul>
              </Box>
            </FlexBox>
            {productNotAvailable && (
              <div
                style={{
                  color: error.main,
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                {productNotAvailable}
              </div>
            )}
            <Box alignItems="center" mb={2}>
              {productSizeReverseVarient.map((i, ind) => {
                return (
                  <Box alignItems="center" mb={3} key={ind}>
                    <Box lineHeight={2}> {i.name}</Box>
                    <Box>
                      <Grid
                        container
                        spacing={1}
                        sx={{
                          display: "flex",
                          flexDirection:
                            i.name === "SIZE" ||
                            i.name === "MALE SIZE" ||
                            i.name === "FEMALE SIZE"
                              ? "row-reverse"
                              : "row",
                          justifyContent:
                            i.name === "SIZE" ||
                            i.name === "MALE SIZE" ||
                            i.name === "FEMALE SIZE"
                              ? "flex-end"
                              : "flex-start",
                        }}
                      >
                        {i?.data?.map((item, ind) => {
                          return (
                            <Grid item key={ind}>
                              {i.name === "COLOR" ? (
                                <FlexBox overflow="auto">
                                  <Tooltip title={item.value} arrow>
                                    <Box
                                      height={64}
                                      width={64}
                                      minWidth={64}
                                      bgcolor="white"
                                      borderRadius="10px"
                                      display="flex"
                                      justifyContent="center"
                                      alignItems="center"
                                      border="1px solid"
                                      style={{
                                        cursor: "pointer",
                                      }}
                                      ml={ind === 0 ? "auto" : 0}
                                      borderColor={
                                        selectedVarient[i.name] &&
                                        item.value === selectedVarient[i.name]
                                          ? "primary.main"
                                          : "grey.400"
                                      }
                                      onClick={handleColorImageClick(
                                        ind,
                                        item.value,
                                        i.name
                                      )}
                                      key={ind}
                                    >
                                      <BazarAvatar
                                        src={productImages[0][item.value]}
                                        variant="square"
                                        height={40}
                                        alt={item.value}
                                      />
                                    </Box>
                                  </Tooltip>
                                </FlexBox>
                              ) : (
                                <Button
                                  key={ind}
                                  variant="outlined"
                                  disabled={item.display}
                                  style={{
                                    borderColor:
                                      selectedVarient[i.name] &&
                                      item.value === selectedVarient[i.name]
                                        ? "#D23F57"
                                        : "#DAE1E7",
                                  }}
                                  onClick={handleButtonColors(
                                    ind,
                                    item.value,
                                    i.name
                                  )}
                                >
                                  {item?.value}
                                </Button>
                              )}
                            </Grid>
                          );
                        })}
                      </Grid>
                    </Box>
                  </Box>
                );
              })}
            </Box>
            {/* {productNotAvailable && <FormHelperText>{productNotAvailable}</FormHelperText>} */}
            {pricings?.max_price !== 0 && (
              <>
                <QuantityButtons
                  quantity={quantity}
                  setQuantity={setQuantity}
                  products={product.quantity}
                  productQuantityFromApi={actionButton}
                />
                <Grid container spacing={3}>
                  <Grid item>
                    <BazarButton
                      variant="contained"
                      color="secondary"
                      sx={{
                        mb: "36px",
                        px: "1.75rem",
                        height: "40px",
                      }}
                      disabled={buynowButton || !!productNotAvailable}
                      onClick={productBuyNow}
                    >
                      Buy Now
                    </BazarButton>
                  </Grid>

                  <Grid item>
                    <BazarButton
                      variant="contained"
                      color="primary"
                      sx={{
                        mb: "36px",
                        px: "1.75rem",
                        height: "40px",
                      }}
                      onClick={handleCartAmountChange(quantity)}
                      disabled={actionButton || !!productNotAvailable}
                    >
                      Add to Cart
                    </BazarButton>
                  </Grid>
                </Grid>
              </>
            )}
            {pricings?.max_price === 0 && (
              <FlexBox alignItems="center" mb={2}>
                <H4>To buy this product contact us:</H4>
                <Link href={`/store/${brand_slug}`}>
                  <a>
                    <H6 ml={1} color="primary.main">
                      {brandInfo?.data?.contact_number}
                    </H6>
                  </a>
                </Link>
              </FlexBox>
            )}
            <FlexBox alignItems="center">
              <Box>Brand:</Box>
              <Link href={`/store/${brand_slug}`}>
                <a>
                  <H6 ml={1}>{brand_name}</H6>
                </a>
              </Link>
            </FlexBox>
            <FlexBox>
              <Box>SKU:</Box>&nbsp;<H6>{sku_name}</H6>
            </FlexBox>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductIntro;
