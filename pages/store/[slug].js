import NavbarLayout from "components/layout/NavbarLayout";
import StoreProductCard from "components/products/StoreProductCard";
import ProductFilterCard from "components/products/ProductFilterCard";
import ShopIntroCard from "components/shop/ShopIntroCard";
import Sidenav from "components/sidenav/Sidenav";
import useWindowSize from "hooks/useWindowSize";
import FilterList from "@mui/icons-material/FilterList";
import { Card, Grid, IconButton, Typography } from "@mui/material";
import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  getBrandproductlist,
  getBrandProfile,
  getcategoryLevels,
} from "utils/api/related-products/products";
import FlexBox from "components/FlexBox";
import CustomPagination from "components/pagination/CustomPagination";
import { useDispatch } from "react-redux";
import { updateCartCount } from "../../src/store/cartSlice";
import { clearOrderState } from "../../src/store/orderSlice";
const Shop = (props) => {
  const width = useWindowSize();
  const isTablet = width < 1025;
  const { productList, brandProfile, page, limit, slug, categoriesLevel } =
    props;
  const dispatch = useDispatch();
  const [brandProductList, setBrandProductList] = useState(productList?.data);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();

  useEffect(() => {
    dispatch(updateCartCount(true));
    dispatch(clearOrderState("PURGE"));
  }, []);

  const updateBrandProductList = useCallback(() => {
    const collectionSlug = null
    const res = getBrandproductlist(slug, page, limit, minPrice, maxPrice,collectionSlug);
    res
      .then((data) => {
        if (data.data) {
          setBrandProductList(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [maxPrice, minPrice, slug, page, limit, productList]);

  useEffect(() => {
    updateBrandProductList();
  }, [maxPrice, minPrice, slug, page, limit, productList]);
  return (
    <NavbarLayout>
      <ShopIntroCard brandinfo={brandProfile?.data} />
      {brandProductList?.count >= 1 ? (
        <Card sx={{ mb: "2rem", p: "1rem" }}>
          <Typography>
            {brandProductList?.count}{" "}
            {brandProductList?.count === 1
              ? " product found"
              : " products found"}
          </Typography>
        </Card>
      ) : null}

      <Grid container spacing={3}>
        <Grid
          item
          md={3}
          xs={12}
          sx={{
            "@media only screen and (max-width: 1024px)": {
              display: "none",
            },
          }}
        >
          <ProductFilterCard
            setMaxPrice={setMaxPrice}
            setMinPrice={setMinPrice}
            categoriesLevel={categoriesLevel}
            productList={productList}
          />
        </Grid>

        <Grid item md={9} xs={12}>
          {isTablet && (
            <Sidenav
              position="left"
              handle={
                <IconButton
                  sx={{
                    marginLeft: "auto",
                    display: "block",
                  }}
                >
                  <FilterList fontSize="small" />
                </IconButton>
              }
            >
              <ProductFilterCard 
                setMaxPrice={setMaxPrice}
                setMinPrice={setMinPrice}
                categoriesLevel={categoriesLevel}
                productList={productList}
              />
            </Sidenav>
          )}
          {brandProductList?.data?.length > 0 && (
            <StoreProductCard productList={brandProductList?.data} />
          )}
          {brandProductList?.data?.length === 0 && (
            <div>
              <Typography sx={{ mt: "50px", ml: "18rem", fontSize: "20px" }}>
                No products Found
              </Typography>
            </div>
          )}
          <FlexBox
            flexWrap="wrap"
            justifyContent="center"
            alignItems="center"
            mt={4}
          >
            <CustomPagination
              page={page}
              count={brandProductList?.count}
              limit={limit}
            />
          </FlexBox>
        </Grid>
      </Grid>
    </NavbarLayout>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  let minPrice = 0;
  let maxPrice = 0;
  let collectionSlug = null;
  const page = parseInt(context?.query?.page) || 1;
  const limit = parseInt(context?.query?.limit) || 18;
  const productList =
    slug && (await getBrandproductlist(slug, page, limit, minPrice, maxPrice,collectionSlug));
  const brandProfile = slug && (await getBrandProfile(slug));
  const categoriesLevel = slug && (await getcategoryLevels("","", slug));
  return {
    props: {
      productList,
      brandProfile,
      page,
      limit,
      slug,
      categoriesLevel,
    },
  };
}
export default Shop;
