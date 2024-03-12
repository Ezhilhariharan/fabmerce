import React, { useState, useEffect, useCallback } from "react";
import NavbarLayout from "components/layout/NavbarLayout";
import FlexBox from "components/FlexBox";
import SearchProductCardList from "components/products/SearchProductCardList";
import SearchProductFilterCard from "components/products/SearchProductFilterCard";
import Sidenav from "components/sidenav/Sidenav";
import { H5, Paragraph } from "components/Typography";
import useWindowSize from "hooks/useWindowSize";
import FilterList from "@mui/icons-material/FilterList";
import { Card, Grid, IconButton, MenuItem, TextField,Typography } from "@mui/material";
import { Box } from "@mui/system";
import { getProductSearch } from "utils/api/layout-apis/layoutsAPI";
import {getcategoryLevels} from "utils/api/related-products/products";
import { getCategories } from "utils/api/superstore-shop/sections";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
const ProductSearchResult = (props) => {
  const { productList, searchKey, page, limit, shortBy,categoriesLevel,catslug, parentCatSlug } = props;
  const [searchProductList, setBrandProductList] = useState(productList);
  const [shortby, setShortBy] = useState(shortBy);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const width = useWindowSize();
  const isTablet = width < 1024;
  const router = useRouter();
  const {category}=router.query
  const key = category ? category: searchKey;

  const allCategories = useSelector(data => data?.brandSlice?.catagoriesList);
  const flattenedCategory = allCategories?.map(data => data?.children)?.flat();
  const superParent = allCategories?.filter(data => data.slug === parentCatSlug)[0]?.name;
  const parentCategoryFinder=flattenedCategory?.filter(cat => cat?.slug === catslug)[0]?.name;
  const childrenCategoryFinder=flattenedCategory?.map(cat => cat?.children)?.flat()?.filter(data => data?.slug === catslug)[0]?.name;
  const searchedWord = superParent || parentCategoryFinder || childrenCategoryFinder || key;
  const updateBrandProductList = useCallback(() => {
    const res = getProductSearch(
      searchKey,
      page,
      limit,
      minPrice,
      maxPrice,
      shortby,
      catslug,
      parentCatSlug,
    );
    res
      .then((data) => {
        if (data.data) {
          setBrandProductList(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [searchKey, page, limit, minPrice, maxPrice, shortby, productList,catslug, parentCatSlug]);

  useEffect(() => {
    updateBrandProductList();
  }, [searchKey, page, limit, minPrice, maxPrice, shortby, productList,catslug,parentCatSlug]);

  return (
    <NavbarLayout>
      <Box pt={2.5}>
        <Card
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            mb: "55px",
            p: {
              xs: "1.25rem 1.25rem 0.25rem",
              sm: "1rem 1.25rem",
              md: "0.5rem 1.25rem",
            },
          }}
          elevation={1}
        >
          <div>
            <H5>Searching for "{searchedWord}" </H5>
            <Paragraph color="grey.600">
              {searchProductList?.count} results found
            </Paragraph>
          </div>
          <FlexBox alignItems="center" flexWrap="wrap" my="0.5rem">
            <FlexBox alignItems="center" flex="1 1 0">
              <Paragraph color="grey.600" mr={2} whiteSpace="pre">
                Sort by:
              </Paragraph>
              <TextField
                color="secondary"
                variant="outlined"
                size="small"
                placeholder="Short by"
                select
                defaultValue={sortOptions[0].value}
                fullWidth
                sx={{
                  flex: "1 1 0",
                  mr: "1.75rem",
                  minWidth: "150px",
                }}
              >
                {sortOptions.map((item, ind) => (
                  <MenuItem
                    value={item.value}
                    key={ind}
                    onClick={() => {
                      setShortBy(item.value);
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </TextField>
            </FlexBox>

            <FlexBox alignItems="center" my="0.25rem">
              {/* <Paragraph color="grey.600" mr={1}>
                  View:
                </Paragraph>
                <IconButton onClick={toggleView("grid")}>
                  <Apps
                    color={view === "grid" ? "primary" : "inherit"}
                    fontSize="small"
                  />
                </IconButton>
                <IconButton onClick={toggleView("list")}>
                  <ViewList
                    color={view === "list" ? "primary" : "inherit"}
                    fontSize="small"
                  />
                </IconButton> */}

              {!!isTablet && (
                <Sidenav
                  handle={
                    <IconButton>
                      <FilterList fontSize="small" />
                    </IconButton>
                  }
                >
                  <SearchProductFilterCard
                    setMaxPrice={setMaxPrice}
                    setMinPrice={setMinPrice}
                    categoriesLevel={categoriesLevel}
                    searchKey={key}
                    searchProductList={productList}
                  />
                </Sidenav> 
              )}
            </FlexBox>
          </FlexBox>
        </Card>

        <Grid container spacing={3} sx={{display:"flex"}}>
          <Grid
            item
            lg={3}
            xs={12}
            sx={{
              "@media only screen and (max-width: 1024px)": {
                display: "none",
              },
            }}
          >
            <SearchProductFilterCard
              setMaxPrice={setMaxPrice}
              setMinPrice={setMinPrice}
              categoriesLevel={categoriesLevel}
              searchKey={key}
              searchProductList={productList}
            />
          </Grid>

          <Grid item lg={9} xs={12}>
              <SearchProductCardList
                productList={searchProductList}
                page={page}
                limit={limit}
              />
          </Grid>
        </Grid>
      </Box>
    </NavbarLayout>
  );
};

const sortOptions = [
  {
    label: "New Arrivals", 
    value:"New"
  },
  {
    label: "Price Low to High",
    value: "ASC",
  },
  {
    label: "Price High to Low",
    value: "DESC",
  },
];

export async function getServerSideProps(context) {
  const { params } = context;       
  const { key } = params;
  const {is_search} = context.query
  const allCategories = await getCategories();
  const parentCategory = allCategories?.find(data => data.slug === key);
  const parentSlug = parentCategory?.slug;
  const searchKey = is_search === "true" ? key :"";
  const catslug = !!is_search? "" : (parentSlug === key ? "" : key);
  const parentCatSlug = !!is_search? "" : (parentSlug === key ? key : "");
  let minPrice = 0;
  let maxPrice = 0;
  let shortBy = "New";
  const page = parseInt(context?.query?.page) || 1;
  const limit = parseInt(context?.query?.limit) || 18;
  const productList = await getProductSearch(
    searchKey,
    page,
    limit,
    minPrice,
    maxPrice,
    shortBy,
    catslug,
    parentCatSlug,
  );
  const categoriesLevel = await getcategoryLevels(is_search,key,"", parentCatSlug)
  return {
    props: {
      productList,
      searchKey,
      page,
      limit,
      shortBy,
      categoriesLevel,
      catslug,
      parentCatSlug,
    },
  };
}

export default ProductSearchResult;
