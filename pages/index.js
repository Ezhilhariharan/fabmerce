import Promotion from "components/superstore-shop/Promotion";
import MoreProduct from "components/superstore-shop/MoreProduct";
import Section12 from "components/superstore-shop/Section12";
import TrendingProducts from "components/superstore-shop/TrendingProducts";
import NewArrivals from "components/superstore-shop/NewArrivals";
import NewChecklist from "components/section/NewChecklist";
import BeautyAndCosmetics from "components/section/BeautyAndCosmetics";
import {
  getMoreItems,
  getNewArrivalList,
  getTrendingProduct,
  getBanners,
} from "utils/api/superstore-shop/sections";
import { Fragment, useEffect } from "react";
import { getCookie, setCookies } from "cookies-next";
import AppLayout from "components/layout/AppLayout";
import { uid } from "../helper/randomId";
import { NumberFormat } from "../src/components/comma-separator/NumberFormat";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBrands } from "utils/api/superstore-shop/sections";
import { getCategories2 } from "utils/api/superstore-shop/carousels";
import { updateBrands, updateCatagories } from "store/brandSlice";
import { updateCartCount } from "../src/store/cartSlice";
import { clearOrderState } from "../src/store/orderSlice";
import PromotionOne from "../src/components/Promotions/PromotionOne";
import MettaTags from "utils/OpenGraphTags";
import { FeaturedCategories } from "components/featured-categories/FeaturedCategories";
import { GadgetsAndHousehold } from "components/featured-categories/GadgetsAndHousehold";
import KidsWear from "../src/components/section/KidsWear"
import UnmissableTrends from "./../src/components/unmissable-trends/UnmissabelTrends"
import { Container, styled, Box } from "@mui/material";
import { FoodsAndNuts } from "components/Food&Nuts/FoodsAndNuts";
import { PopoverPromotion } from "../src/components/Promotions/PopoverPromotion";
import useWindowSize from "hooks/useWindowSize";
import "@fontsource/poppins";

const HomeLayout = styled("div")(() => ({
  width: "100%",
  background: "white",
}));
const StyledContainer = styled(Container)(() => ({
  pb: "1rem",
  "@media (min-width: 1280px)": {
    maxWidth: "2000px",
    background: "white",
    // border: "1px solid red"
  },
}));
const Divider = styled("div")(() => ({
  width: "100%",
  height: "4px",
  backgroundColor: "#F4F4F5",
}));
export const FontFamilyBox = styled(Box)(() => ({
  fontFamily: "Poppins, sans-serif"
}));

const Index = (props) => {
  const dispatch = useDispatch();
  const {
    newArrivalsProduct,
    moreItems,
    trendingProduct,
    promotionBanners,
    format,
    currency,
  } = props;
  const [numberFormat, setNumberFormat] = useState(format);
  const [selectedCurrency, setSelectedCurrency] = useState(currency);
  const featuredCategories = useSelector(state => state?.brandSlice?.catagoriesList);
  const categories = useSelector(state => state?.brandSlice?.catagoriesList);
  const gadgets = categories?.filter(data => data?.name === "Electronics")[0]?.children;
  const gadgetChildrens = gadgets?.map(data => data?.children)?.flat()?.flat();
  const houseHold = categories?.filter(data => data?.name === "Household")[0]?.children;
  const houseHoldChildrens = houseHold?.map(data => data?.children)?.flat()?.flat();
  const combinedHouseHold = houseHold?.concat(houseHoldChildrens);
  const gadgetTitle = "Gadgets & Accessories";
  const houseHoldTitle = "House Essentials";
  const Grocery = useSelector(state => state?.brandSlice?.catagoriesList)
  useEffect(() => {
    dispatch(updateCartCount(true));
    const originURL = window.location.hostname;
    const domain_name = originURL.substring(originURL.indexOf(".") + 1);
    NumberFormat?.filter((data) => data?.domain_name === domain_name).map(
      (location) => {
        setNumberFormat(location?.code);
        setSelectedCurrency(location?.currency);
      }
    );
  }, []);

  // fetchBrandList
  useEffect(() => {
    const res = getBrands();
    res
      .then((data) => {
        dispatch(updateBrands(data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // fetchCategories
  useEffect(() => {
    const res = getCategories2();
    res
      .then((data) => {
        dispatch(updateCatagories(data));
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    dispatch(clearOrderState("PURGE"));
  }, []);
  const screenWidth = useWindowSize();
  return (
    <AppLayout>
      <MettaTags />
      <FontFamilyBox>
        <HomeLayout>
          <StyledContainer bgcolor="white">
            <Box pt={"9px"} px={"5px"} mt={screenWidth < 960 && "5px"}>
              <Promotion promotionBanners={promotionBanners} />
            </Box>
          </StyledContainer>
          <Divider />
          <StyledContainer>
            <PromotionOne />
          </StyledContainer>
          <Divider />
          <StyledContainer>
            <FeaturedCategories featuredCategories={featuredCategories} />
            <UnmissableTrends />
            {/* <NewArrivals
        newArrivalsProduct={newArrivalsProduct}
        format={numberFormat}
        currency={selectedCurrency}
      />
      <TrendingProducts
        trendingProduct={trendingProduct}
        format={numberFormat}
        currency={selectedCurrency}
      /> */}
          </StyledContainer>
          <Divider />
          {screenWidth > 1920 ? <StyledContainer><KidsWear /></StyledContainer> : <KidsWear headerMargin={"20px"}/>}
          <Divider />
          <StyledContainer>
            <BeautyAndCosmetics />
          </StyledContainer>
          <Divider />
          <StyledContainer>
            <GadgetsAndHousehold subChildrens={gadgetChildrens} title={gadgetTitle} />
          </StyledContainer>
          <Divider />
          <StyledContainer>
            <NewChecklist />
          </StyledContainer>
          <Divider />
          <StyledContainer>
            <GadgetsAndHousehold subChildrens={combinedHouseHold} title={houseHoldTitle} />
          </StyledContainer>
          <Divider />
          <StyledContainer>
            <FoodsAndNuts Grocery={Grocery} />
          </StyledContainer>
        </HomeLayout>
        {/* {screenWidth > 960 && <PopoverPromotion />} */}
        {/* <MoreProduct moreItems={moreItems} /> */}
        {/* <Section12 /> */}
      </FontFamilyBox>
    </AppLayout >
  );
};

export async function getServerSideProps({ req, res }) {
  const sessionLogin = getCookie("token", { req, res }) || null;
  const sessionId = getCookie("sessionId", { req, res }) || null;
  if (sessionLogin === null && sessionId === null) {
    const randomId = uid();
    setCookies("sessionId", randomId, { req, res });
  }
  const newArrivalsProduct = await getNewArrivalList();
  const moreItems = await getMoreItems(12, 1);
  const trendingProduct = await getTrendingProduct();
  const promotionBanners = await getBanners();
  let format = "en-IN",
    currency = "INR";
  return {
    props: {
      newArrivalsProduct,
      moreItems,
      sessionLogin,
      trendingProduct,
      promotionBanners,
      format,
      currency,
    },
  };
}

export default Index;
