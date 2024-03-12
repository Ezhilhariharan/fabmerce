import React, { useEffect, useState, useCallback } from "react";
import NavbarLayout from "components/layout/NavbarLayout";
import StoreProductCard from "components/products/StoreProductCard";
import ProductFilterCard from "components/products/ProductFilterCard";
import ShopIntroCard from "components/shop/CollectionBanner";
import Sidenav from "components/sidenav/Sidenav";
import useWindowSize from "hooks/useWindowSize";
import FilterList from "@mui/icons-material/FilterList";
import { Card, Grid, IconButton, Typography } from "@mui/material";
import FlexBox from "components/FlexBox";
import CustomPagination from "components/pagination/CustomPagination";
import { useDispatch } from "react-redux";
import {
  getBrandproductlist,
  getCollections,
  getcategoryLevels,
  getCollectionCategories,
  getCollectionsProduct,
  getBrandsBasedOnSubCategoryId
} from "utils/api/related-products/products";
import { updateCartCount } from "../../src/store/cartSlice";
import { clearOrderState } from "../../src/store/orderSlice";
import MettaTags from "utils/OpenGraphTags";
import { useRouter } from "next/router";
const Collections = (props) => {
  const width = useWindowSize();
  const isTablet = width < 1025;
  const {
    page,
    limit,
    brandSlug,
    collectionSlug,
    collectionInfo,
    categoriesLevel,
    conditionalSeoResponse,
    collectionCategories,
    collectionProducts,
    brandsBasedOnSubCategory,
  } = props;
  const [brandProductList, setBrandProductList] = useState(collectionProducts?.data);
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [brandsId, setBrandsId] = useState();
  const [subCatgoryId, setSubCategoryId] = useState();
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(updateCartCount(true));
    dispatch(clearOrderState("PURGE"));
  }, []);

  useEffect(() => {
    const brandsFilteredId = selectedBrands?.map(brand => brand.id);
    setBrandsId(brandsFilteredId);
  }, [selectedBrands]);
  useEffect(() => {
    const subCategoryIds = selectedCategory?.map(categories => categories.id);
    setSubCategoryId(subCategoryIds);
  }, [selectedCategory]);

  const updateCollectionProducts = useCallback(() => {
    const res = getCollectionsProduct(collectionSlug, subCatgoryId, minPrice, maxPrice, brandsId, page, limit);
    res.then(data => {
      if(data?.data !== undefined) {
        setBrandProductList(data);
      }
    }).catch(err => {
      console.log(err);
    });
  }, [maxPrice, minPrice, collectionSlug, page, limit, brandsId, subCatgoryId]);

  useEffect(() => {
    updateCollectionProducts();
  }, [maxPrice, minPrice, collectionSlug, page, limit, brandsId, subCatgoryId]);
  return (
    <NavbarLayout>
      <MettaTags
        PageTitle={conditionalSeoResponse?.title}
        url={`https://www.fabmerce.in${router.asPath}`}
        imageUrl={collectionInfo?.banner_url}
        description={conditionalSeoResponse?.description}
        keyWords={conditionalSeoResponse?.keywords}
      />
      <ShopIntroCard collectionInfo={collectionInfo} />
      {brandProductList?.count >= 1 ? (
        <Card sx={{ mb: "2rem", p: "1rem" }}>
          <Typography>
            {brandProductList?.count}{" "}
            {brandProductList?.count === 1 ? " product found" : " products found"}
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
            collectionCategories={collectionCategories}
            selectedBrands={selectedBrands}
            setSelectedBrands={setSelectedBrands}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            productList={collectionProducts}
            collectionSlug={collectionSlug}
            brandsId={brandsId}
            brandsBasedOnSubCategory={brandsBasedOnSubCategory}
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
                collectionCategories={collectionCategories}
                selectedBrands={selectedBrands}
                setSelectedBrands={setSelectedBrands}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                productList={collectionProducts}
                collectionSlug={collectionSlug}
                brandsId={brandsId}
                brandsBasedOnSubCategory={brandsBasedOnSubCategory}
              />
            </Sidenav>
          )}
          {brandProductList?.data?.length > 0 && (
            <StoreProductCard productList={brandProductList?.data} />
          )}
          {brandProductList?.count === 0 && (
            <div>
              <FlexBox justifyContent="center" alignItems="center" mt={5} fontSize={20}>
                No products Found
              </FlexBox>
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
  let brandSlug = null;
  let collectionSlug = slug;
  const page = parseInt(context?.query?.page) || 1;
  const limit = parseInt(context?.query?.limit) || 18;
  const collections = await getCollections();
  const collectionInfo = findBannerImage(collections, collectionSlug) || null;
  const categoriesLevel = slug && (await getcategoryLevels("", ""));
  const seoResponse = findSEO(collectionSlug);
  const conditionalSeoResponse = seoResponse ? seoResponse : "";
  const collectionCategories = await getCollectionCategories(collectionSlug || null);
  const sub_category_id = "";
  const brandIdArray = "";
  const collectionProducts = await getCollectionsProduct(
    collectionSlug || null,
    sub_category_id,
    minPrice,
    maxPrice,
    brandIdArray,
    page,
    limit
  );
  const brandsBasedOnSubCategory = await getBrandsBasedOnSubCategoryId(collectionSlug || null, sub_category_id);
  return {
    props: {
      brandSlug,
      minPrice,
      maxPrice,
      page,
      limit,
      slug,
      collectionSlug,
      collectionInfo,
      categoriesLevel,
      conditionalSeoResponse,
      collectionCategories,
      collectionProducts,
      brandsBasedOnSubCategory,
    },
  };
}

const findBannerImage = (collections, collectionSlug) => {
  const response = collections?.find((item) => item.slug === collectionSlug);
  return response;
};

const findSEO = (collectionSlug) => {
  const response = onamSEO?.find((item) => item.slug === collectionSlug);
  return response;
};

const onamSEO = [
  {
    slug:"navratri-sale",
    title:"Navratri Special Sale 2022 | Exclusive Dussehra Sale - Fabmerce",
    keywords:"navratri sale, dussehra sale, dussehra offers, navratri special sale, navarathri sale, navaratri sale, navratri sale online shopping, navratri sale 2022, navratri special kurti, navratri outfits, navratri traditional dress, navratri outfits online, navratri special dress for ladies",
    description:"Buy Navratri special sale 2022 traditional dress online in India at best prices. The best online store for various collections of Navratri special dress sarees & kurtis for ladies."
  },
  {
    slug:'ponniyin-selvan',
    title:"Ponniyin Selvan Tshirt Collections | Epic Movie T-shirt | Fabmerce",
    keywords:"ponniyin selvan tshirt, ponniyin selvan men's t-shirt, ponniyin selvan epic tshirt, ponniyin selvan movie fans tshirt, movie tshirt, ponni nathi tshirt, ps 1 tshirt, graphic printed tshirt, ponniyin selvan movie, ps 1 movie",
    description:"Heading to a PS-1 movie? Grab some friends, movie tickets, and the Ponniyin Selvan Tshirt, and enjoy the historical Kollywood movie, Ponniyin Selvan part 1. The classic red, black, and white Ponniyin Selvan Epic T-shirt from Fabmerce is printed on a durable cotton tee for fans of this interesting Cholas movie.",
  },
  {
    slug:'diwali-sale',
    title:"Diwali Sale 2022 | Diwali Dhamaka Offer & Deals - Fabmerce",
    keywords:"indian festival, diwali sale, diwali dhamaka offer, deepavali offer, diwali sale 2022, diwali dress online shopping, big diwali sale, diwali discount, diwali sale online, diwali shopping dress, trending traditional dresses for diwali, diwali offer 2022, diwali outfits",
    description:"Enjoy the big Diwali sale 2022 with Fabmerce. Get amazing Diwali discounts, offers & deals on trending traditional dresses, makeup products, jewellery sets & more. Bring home happiness today with this exclusive deepavali offer",

  },
  {
    slug:'diwali-skin-care',
    title:"Diwali Sale 2022 | Deepavali Offer On Skin Care Products - Fabmerce",
    keywords:"indian festival, diwali sale, diwali dhamaka offer, deepavali offer, diwali sale 2022, diwali dress online shopping, big diwali sale, diwali discount, diwali sale online, diwali shopping dress, trending traditional dresses for diwali, diwali offer 2022, diwali outfits",
    description:"Enjoy the big Diwali sale 2022 with Fabmerce. Get amazing Diwali discounts, offers & deals on trending traditional dresses, skin care makeup products, & more. Bring home happiness today with this exclusive deepavali offer.",

  },
  {
    slug:'diwali-deals',
    title:"Diwali Sale 2022 | Deepavali Offers, Discounts & Deals - Fabmerce",
    keywords:"indian festival, diwali sale, diwali dhamaka offer, deepavali offer, diwali sale 2022, diwali dress online shopping, big diwali sale, diwali discount, diwali sale online, diwali shopping dress, trending traditional dresses for diwali, diwali offer 2022, diwali outfits",
    description:"Enjoy the big Diwali sale 2022 with Fabmerce. Get amazing Diwali discounts, offers & deals on trending traditional dresses, makeup products, fashion accessories & more. Bring home happiness today with this exclusive deepavali offer.",

  },
  {
    slug:'diwali-apparels',
    title:"Trending Traditional Dresses For Diwali Sale 2022 - Fabmerce",
    keywords:"indian festival, diwali sale, diwali dhamaka offer, deepavali offer, diwali sale 2022, diwali dress online shopping, big diwali sale, diwali discount, diwali sale online, diwali shopping dress, trending traditional dresses for diwali, diwali offer 2022, diwali outfits",
    description:"Enjoy the big Diwali sale 2022 with Fabmerce. Get amazing Diwali discounts, offers & deals on trending traditional dresses, makeup products & more. Bring home happiness today with this exclusive deepavali offer online shopping.",

  }

];

export default Collections;
