import React, { useState, useEffect, useCallback } from "react";
import NavbarLayout from "components/layout/NavbarLayout";
import ProductDescription from "components/products/ProductDescription";
import ProductIntro from "components/products/ProductIntro";
import ProductReview from "components/products/ProductReview";
import { Box, Tab, Tabs, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import { H2 } from "components/Typography";
import _ from "lodash";
import { getProductSearch } from "utils/api/layout-apis/layoutsAPI";
import {
  getProductDetails,
  getReviews,
  getBrandProfile
} from "utils/api/related-products/products";
import ProductsRelated from "../../src/components/products/ProductsRelated";
import {
  findAttributevalues,
  groupByVariants,
  varientsCompare,
  findImage,
} from "../../helper/filters";
import { useDispatch, useSelector } from "react-redux";
import { updateCartCount } from "../../src/store/cartSlice";
import MettaTags from "utils/OpenGraphTags";
import { useRouter } from "next/router";
const StyledTabs = styled(Tabs)(({ theme }) => ({
  marginTop: 80,
  marginBottom: 24,
  minHeight: 0,
  borderBottom: `1px solid ${theme.palette.text.disabled}`,
  "& .inner-tab": {
    fontWeight: 600,
    minHeight: 40,
    textTransform: "capitalize",
  },
}));

const ProductDetails = (props) => {
  const router = useRouter();
  const {
    productDetails,
    productReviews,
    page,
    limit,
    productList,
    breadcrumbDetails,
    brandInfo
  } = props;
  const [selectedOption, setSelectedOption] = useState(0);
  const [selectedValue, setSelectedValue] = useState();
  const [varientName, setVarientName] = useState();
  const dispatch = useDispatch();
  const authToken = useSelector((state) => state?.authSlice.authToken);
  const [productNotAvailable, setProductNotAvailable] = useState("");
  const [searchProductList, setBrandProductList] = useState(productList);
  let parentFilters = props.productDetails?.reduce(groupByVariants, []);
  parentFilters = parentFilters?.map((filter) => {
    const filterObj = filter;
    filterObj.data = filterObj?.data?.map((data) => ({
      value: data,
      display: false,
    }));
    return filterObj;
  });
  const [varients, setVarients] = useState(parentFilters || {});
  const [selectedVarient, setSelectedVarient] = useState(
    productDetails[0]?.varients?.reduce(
      (acc, current) => ({
        ...acc,
        [current?.product_attribute_type]: current?.value,
      }),
      {}
    )
  );

  const productImages = findImage(props?.productDetails);
  const key = productDetails[0]?.categories?.sub_category?.id;
  const selectedArray = Object.values(selectedVarient ? selectedVarient : {});
  const varientCheckArray = [];
  const selectedProduct = productDetails?.filter((product) => {
    for (let i = 0; i < selectedArray?.length; i++) {
      varientCheckArray[i] = product?.varients[i]?.value;
    }
    return selectedArray?.every((selected) =>
      varientCheckArray?.includes(selected)
    );
  });

  const handleOptionClick = (_event, newValue) => {
    setSelectedOption(newValue);
  };

  useEffect(() => {
    let filteredVariant = findAttributevalues(
      props?.productDetails,
      selectedValue
    );
    filteredVariant = filteredVariant?.reduce(groupByVariants, []);
    if (filteredVariant?.length > 0) {
      const res = varientsCompare(parentFilters, filteredVariant, varientName);
      setVarients(res);
    }
  }, [selectedValue]);

  useEffect(() => {
    if (selectedProduct.length === 0) {
      setProductNotAvailable("Selected product type not available");
    } else {
      setProductNotAvailable("");
    }
  }, [selectedProduct]);

  useEffect(() => {
    dispatch(updateCartCount(true));
  }, []);

  useEffect(() => {
    if (!authToken || productReviews?.data?.length > 0) {
      setSelectedOption(0);
    }
  }, [authToken]);
  return (
    <NavbarLayout>
      <MettaTags
        PageTitle={selectedProduct[0]?.name}
        url={`https://www.fabmerce.in${router.asPath}`}
        imageUrl={selectedProduct[0]?.profile_photo}
        description={selectedProduct[0]?.description}
      />
      {productDetails ? (
        <ProductIntro
          product={
            selectedArray?.length !== 0
              ? selectedProduct?.length > 0
                ? selectedProduct[0]
                : productDetails[0]
              : productDetails[0]
          }
          productNotAvailable={productNotAvailable}
          productDetails={productDetails}
          productVarients={varients}
          productImages={productImages}
          setSelectedVarient={setSelectedVarient}
          selectedVarient={selectedVarient}
          setVarientName={setVarientName}
          setSelectedValue={setSelectedValue}
          brandInfo={brandInfo}
          breadcrumbDetails={breadcrumbDetails}
        />
      ) : (
        <H2>Loading...</H2>
      )}
      <StyledTabs
        value={selectedOption}
        onChange={handleOptionClick}
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab className="inner-tab" label="Description" />
        {(authToken || productReviews?.data?.length > 0) && (
          <Tab
            className="inner-tab"
            label={`Review ${
              productReviews?.data?.length
                ? `(${productReviews?.data?.length})`
                : ""
            }`}
          />
        )}
      </StyledTabs>
      <Box mb={6}>
        {selectedOption === 0 && (
          <ProductDescription
            description={
              selectedArray?.length !== 0
                ? selectedProduct.length > 0
                  ? selectedProduct[0]?.description
                  : productDetails[0]?.description
                : productDetails[0]?.description
            }
          />
        )}
        {selectedOption === 1 && (
          <ProductReview
            reviewData={productReviews?.data}
            count={productReviews?.count}
            page={page}
            limit={limit}
            productDetails={productDetails}
          />
        )}
      </Box>
      {
        <ProductsRelated
          productList={searchProductList}
        />
      }
    </NavbarLayout>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug} = params;
  const page = parseInt(context?.query?.page) || 1;
  const limit = parseInt(context?.query?.limit) || 10;
  const res = await getProductDetails(slug);
  const productDetails = res?.data
  const breadcrumbDetails = res?.categories
  const productReviews = await getReviews(slug, page, limit);
  const brandInfo = productDetails[0]?.brand_slug && await getBrandProfile(productDetails[0]?.brand_slug)
  const catslug=breadcrumbDetails?.children?.slug;
  const searchKey="";
  let minPrice = 0;
  let maxPrice = 0;
  let shortBy = "New";
  const productList = await getProductSearch(
    searchKey,
    page,
    limit,
    minPrice,
    maxPrice,
    shortBy,
    catslug
  );
  return {
    props: {
      searchKey,
      productDetails,
      productReviews,
      page,
      limit,
      slug,
      productList,
      breadcrumbDetails,
      brandInfo
    },
  };
} 
export default ProductDetails;
