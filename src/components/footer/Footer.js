import BazarIconButton from "components/BazarIconButton";
import Image from "components/BazarImage";
import Facebook from "components/icons/Facebook";
import Google from "components/icons/Google";
import Instagram from "components/icons/Instagram";
import Twitter from "components/icons/Twitter";
import Youtube from "components/icons/Youtube";
import { Paragraph } from "components/Typography";
import { Box, Container, Grid, styled, Typography } from "@mui/material";
import Link from "next/link";
import React from "react";
import MailOutline from "@mui/icons-material/MailOutline";
import FlexBox from "../FlexBox"; // styled component
import Bottom from "./Bottom";
import { useSelector } from "react-redux";
import { Chat } from "@mui/icons-material";
import useWindowSize from "hooks/useWindowSize";
import Search from "./Search";
import LazyImage from "components/LazyImage";
import NavLink from "components/nav-link/NavLink";
import { FontFamilyBox } from "../../../pages";

const Boxs1 = styled(Box)((Grid) => ({
  backgroundColor: "white",
  marginLeft: "2px",
  paddingLeft: "10px",
  borderRadius: "5px",
  paddingTop: "13px",
}));
const Boxs2 = styled(Box)((Grid) => ({
  backgroundColor: "white",
  marginLeft: "2px",
  paddingLeft: "10px",
  borderRadius: "5px",
  paddingTop: "0px",
}));
const Boxs3 = styled(Box)((Grid) => ({
  backgroundColor: "white",
  marginLeft: "2px",
  paddingLeft: "15px",
  borderRadius: "5px",
  paddingTop: "8px",
}));

const StyledLink = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  //padding: "0.3rem 0rem",
  margin: "0rem",
  color: "white",
  "& .styles": {
    fontWeight: "400",
    lineHeight: "150%",
    borderRadius: 4,
    letterSpacing: " 0.5px",
    color: "#FFFFFF",
  },
  "& .title": {
    fontWeight: "600",
    lineHeight: "150%",
    borderRadius: 4,
    letterSpacing: " 0.5px",
    color: "#FFFFFF",
    fontSize: "16px",
  },
  "& .card": {
    backgroundColor: "white",
    paddingTop: "2px",
    marginLeft: "2px",
  },
}));

const Footer = () => {
  const catagoriesList = useSelector(
    (state) => state?.brandSlice?.catagoriesList
  );
  const window = useWindowSize();
  return (
    <FontFamilyBox>
      <StyledLink>
        <Box bgcolor="#072255" mt="38px" pl="20px" color="white">
          <Box py={10} overflow="hidden" width="100%">
            <Grid container spacing={3}>
              <Grid item xs={window < 1000 ? 12 : 3}>
                <Link href="/">
                  <a>
                    <Image
                      mb={2.5}
                      src={"/assets/images/applogo/footerlogo.png"}
                      alt="logo"
                      width="108px"
                      height="24px"
                    />
                  </a>
                </Link>

                <Paragraph className="styles" mb={4}>
                Fabmerce is a social commerce marketplace
                for all your shopping needs. 
                Experience the new era of social shopping
                with us.
                </Paragraph>
                <Grid container display="flex">
                  <Grid xs={window < 1000 ? 1 : 2} mr={window > 900 ? "30px" : "40px"}>
                    <Boxs1
                      width={window < 1000 ? "60px" : "62.41px"}
                      height={window < 100 ? "40px" : "31.2px"}
                    >
                      <LazyImage
                        src={"/assets/images/applogo/upi.png"}
                        alt="logo"
                        width="40.3px"
                        height="16.65px"
                      />
                    </Boxs1>
                  </Grid>
                  <Grid xs={window < 1000 ? 1 : 2} mr={window > 900 ? "30px" : "40px"}>
                    <Boxs3 width={window < 1000 ? "60px" : "62.41px"}
                      height={window < 100 ? "40px" : "31.2px"}>
                      <LazyImage
                        src={"/assets/images/applogo/up1.png"}
                        alt="logo"
                        width="37.21px"
                        height="19.5px"
                      />
                    </Boxs3>
                  </Grid>
                  <Grid xs={window < 1000 ? 1 : 2}>

                    <Boxs2 width={window < 1000 ? "60px" : "62.41px"}
                      height={window < 100 ? "40px" : "31.2px"}>
                      <LazyImage
                        src={"/assets/images/applogo/image.png"}
                        alt="logo"
                        width="49px"
                        height="40px"
                      />
                    </Boxs2>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={window < 1000 ? 12 : 1.2}>
                <Box className="title" mb={window < 800 ? 1 : 2}>
                  Shop By
                </Box>
                {catagoriesList?.map((category, ind) => {
                  return (
                    <>
                      <NavLink
                        href={`/product/search/${category.slug}`}
                        passHref
                        key={ind}
                      >
                        <StyledLink
                          className="styles"
                          sx={{ paddingBottom: window < 800 ? "0px" : "5px" }}
                        >
                          {category?.name}
                        </StyledLink>
                      </NavLink>
                    </>
                  );
                })}
              </Grid>
              <Grid item xs={window < 1000 ? 12 : 1.8}>
                <Box className="title" mb={window < 800 ? 1 : 2}>
                  About Us
                </Box>
                <div>
                  {aboutLinks.map((item, ind) => {
                    return (
                      <Box mb={"10px"}>
                        <Link
                          href={`/${item}`
                            .toLocaleLowerCase()
                            .split(" ")
                            .join("-")}
                          key={ind}
                          passHref
                        >
                          <a
                            className="styles"
                            sx={{ paddingBottom: window < 800 ? "0px" : "5px" }}
                          >
                            {item}
                          </a>
                        </Link>
                      </Box>
                    );
                  })}
                </div>
                <div>
                  {Links.map((item, ind) => {
                    return (
                      <Link
                        href={`/${item}`
                          .toLocaleLowerCase()
                          .split(" ")
                          .join("-")}
                        key={ind}
                        passHref
                      >
                        <StyledLink
                          className="styles"
                          sx={{ paddingBottom: window < 800 ? "0px" : "5px" }}
                        >
                          {item}
                        </StyledLink>
                      </Link>
                    );
                  })}
                </div>
              </Grid>
              <Grid item xs={window < 1000 ? 12 : 2.3}>
                <Box className="title" mb={window < 800 ? 1 : 2}>
                  Contact Us
                </Box>
                <Box py={0.6} className="styles">
                  Chennai, Tamil Nadu.
                </Box>
                <Box py={0.6} className="styles">
                  <svg
                    width="17"
                    height="16"
                    viewBox="0 0 17 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5.65385 1.59947C5.52364 1.28796 5.35343 1.01145 5.11615 0.811298C4.86703 0.601164 4.57307 0.5 4.25318 0.5L4.2511 0.499999C4.244 0.499996 4.23297 0.499991 4.22214 0.500257C4.20972 0.500562 4.19848 0.501192 4.19248 0.501528L4.19093 0.501614L4.19035 0.501647C4.17701 0.502385 4.14816 0.503982 4.07067 0.507248L4.07065 0.507249C3.93565 0.512946 3.58992 0.555576 3.22278 0.632446C2.86846 0.70663 2.40381 0.830206 2.08455 1.03146L2.08452 1.03147C1.4294 1.4445 0.5 2.61756 0.5 4.55381C0.5 6.32509 1.60429 7.94571 2.04764 8.53061C2.04764 8.53061 2.04764 8.53062 2.04764 8.53062C2.048 8.53112 2.04854 8.53188 2.04928 8.53294L2.05937 8.54748L2.09502 8.59962L2.09523 8.59993C3.80064 11.0905 5.94928 12.9717 8.17083 13.8592L8.17084 13.8592C10.2377 14.6848 11.2618 14.7982 11.8889 14.7982H11.8889H11.8889H11.8889H11.8889H11.8889H11.8889H11.8889H11.8889H11.8889H11.8889H11.8889H11.889C12.1436 14.7982 12.3477 14.7781 12.5102 14.7621L12.5112 14.762L12.5127 14.7618L12.6106 14.7525C12.6112 14.7524 12.6118 14.7524 12.6124 14.7523C13.0732 14.7109 13.7104 14.4523 14.261 14.1015C14.8088 13.7526 15.3946 13.2345 15.626 12.5916C15.7776 12.1705 15.8747 11.7273 15.9084 11.3385C15.9252 11.1441 15.9271 10.953 15.9079 10.7789C15.8897 10.6134 15.8482 10.4218 15.7486 10.2568L15.7477 10.2554C15.543 9.91874 15.2014 9.75612 14.963 9.64258C14.9485 9.63567 14.9343 9.62893 14.9206 9.62235L14.9206 9.62233L14.9204 9.62224C14.9197 9.62192 14.9175 9.62081 14.9126 9.61843L14.8907 9.60771L14.815 9.57066L14.5584 9.44513C14.348 9.34241 14.0687 9.20645 13.7792 9.06704C13.2179 8.79673 12.5698 8.48941 12.3526 8.41122L12.3522 8.41111C12.2 8.35643 11.9643 8.27393 11.6957 8.27393C11.2142 8.27393 10.8335 8.52695 10.575 8.91358L10.9907 9.19144M5.65385 1.59947C5.67671 1.654 5.74529 1.81903 5.8368 2.03923C5.93555 2.27685 6.061 2.57871 6.1845 2.87527C6.3039 3.16199 6.42172 3.44434 6.5127 3.66102C6.55823 3.76945 6.59677 3.86079 6.62533 3.92778C6.64465 3.9731 6.65655 4.00046 6.66257 4.01431C6.66679 4.02401 6.66812 4.02707 6.66709 4.02501L6.21987 4.24861M5.65385 1.59947C5.65389 1.59957 5.65392 1.59966 5.65396 1.59975L5.19262 1.79253M5.65385 1.59947C5.65381 1.59938 5.65377 1.59928 5.65373 1.59919L5.19262 1.79253M6.21987 4.24861L6.66532 4.0215L6.66737 4.02552C6.73953 4.16692 7.02723 4.73068 6.69547 5.39106C6.69529 5.39142 6.69511 5.39179 6.69492 5.39215L6.64982 5.48281L6.64907 5.48432L6.64691 5.48871C6.55512 5.6748 6.45504 5.87769 6.24054 6.12724L6.23948 6.12848C6.18771 6.18831 6.1343 6.25258 6.07712 6.32144L6.07703 6.32155L6.0681 6.33231C5.99635 6.41867 5.91525 6.5163 5.83199 6.60933C6.03818 6.89796 6.42293 7.39098 6.94376 7.92722C7.65725 8.66181 8.59172 9.44141 9.63031 9.89256L9.63033 9.89256C9.65448 9.90306 9.69631 9.9207 9.74472 9.94079C10.0096 9.63265 10.4267 9.13404 10.5759 8.91234L10.9907 9.19144M6.21987 4.24861C6.18226 4.17338 5.6628 2.92342 5.37435 2.22933C5.28324 2.0101 5.21518 1.84632 5.19262 1.79253M6.21987 4.24861L5.19262 1.79253M10.9907 9.19144C11.1757 8.91478 11.4131 8.77393 11.6957 8.77393C11.8687 8.77393 12.0314 8.82715 12.1832 8.88168C12.5192 9.00258 14.259 9.85502 14.6341 10.0388C14.6743 10.0585 14.6988 10.0705 14.7042 10.0731M10.9907 9.19144C10.7816 9.50223 10.1487 10.2421 9.95312 10.4631C9.92758 10.4923 9.89272 10.5272 9.87183 10.5272C9.8531 10.5272 9.52917 10.3938 9.43111 10.3512C7.18579 9.37583 5.4815 7.03039 5.24781 6.63487M14.7042 10.0731L5.68832 6.76155C5.66788 6.78204 5.64887 6.80128 5.63447 6.81731C5.63029 6.82196 5.6285 6.82414 5.6285 6.82413C5.62849 6.82413 5.62969 6.82266 5.63174 6.81988C5.63408 6.81673 5.64164 6.80638 5.65093 6.79041C5.65576 6.78212 5.66258 6.7697 5.66985 6.75379C5.67068 6.75197 5.67155 6.75003 5.67246 6.74798L5.57691 6.6514L5.33291 6.58493L5.24781 6.63487M14.7042 10.0731L14.7044 10.0732C14.9784 10.2048 15.1949 10.3087 15.3206 10.5152C15.504 10.819 15.4313 11.6561 15.1556 12.4223C14.8055 13.395 13.2667 14.1924 12.5665 14.2544L12.4637 14.2642C12.3018 14.2802 12.1183 14.2982 11.889 14.2982H11.8889C11.3432 14.2982 10.3833 14.2046 8.35631 13.3949C6.25082 12.5538 4.17385 10.7506 2.50779 8.31744C2.50296 8.31038 2.49838 8.30368 2.49406 8.29735C2.47258 8.26589 2.45731 8.24352 2.44831 8.2315C2.01327 7.65812 1 6.15052 1 4.55381C1 2.7797 1.84921 1.7709 2.35118 1.45443L14.7042 10.0731ZM5.24781 6.63487L5.33252 6.58482L5.21276 6.55219C5.21278 6.55219 5.21282 6.55243 5.2129 6.55292C5.2136 6.55747 5.21766 6.5835 5.24781 6.63487ZM5.68785 6.39638C5.68492 6.38743 5.68139 6.37752 5.67723 6.36707C5.67126 6.35209 5.65242 6.30573 5.61458 6.25463C5.60065 6.23583 5.57786 6.20771 5.54466 6.17824C5.59386 6.12068 5.64332 6.06116 5.69211 6.00243L5.69245 6.00202C5.74903 5.93388 5.80571 5.86565 5.86136 5.80133C6.03457 5.59981 6.11177 5.44331 6.20115 5.26214L6.20142 5.2616L5.68785 6.39638Z"
                      stroke="white"
                    />
                  </svg>{" "}
                  <a href="tel:+91-7092134246">+91 7092134246</a>
                </Box>
                <Box
                  py={0.6}
                  className="styles"

                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.44217 1H13.9795C14.7727 1 15.4217 1.64898 15.4217 2.44217V11.0952C15.4217 11.8884 14.7727 12.5373 13.9795 12.5373H2.44217C1.64898 12.5373 1 11.8884 1 11.0952V2.44217C1 1.64898 1.64898 1 2.44217 1Z"
                      stroke="white"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M15.4217 2.44226L8.21084 7.48984L1 2.44226"
                      stroke="white"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>{" "}
                  <a
                    href={`mailto:help.fabmerce@aptonshops.com`}
                    target="_blank"
                  >
                    <span>help@fabmerce.com</span>
                  </a>
                </Box>
                <Box className="flex" display="flex">
                  {iconList.map((item, ind) => (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer noopenner"
                      key={ind}
                    >
                      <BazarIconButton
                        m={window < 800 ? 0 : 0.5}
                        fontSize="12px"
                        paddingLeft="0px"
                      >
                        <item.icon fontSize="inherit" />
                      </BazarIconButton>
                    </a>
                  ))}
                </Box>
              </Grid>
              <Grid item xs={window < 1000 ? 12 : 3.4}>
                <Box className="title" mb={window < 800 ? 1 : 2}>
                  Stay Connected
                </Box>
                <Box className="styles">
                Join over 10 million social commerce 
                shoppers who shop their products by
                entrusting their favourite KOLs, Influencer.
                Explore positive trends for social shopping.
                </Box>
                {window > 999 && <Search />}
              </Grid>
            </Grid>
            <Bottom />
          </Box>
        </Box>
      </StyledLink>
    </FontFamilyBox>
  );
};

const aboutLinks = ["FAQ", "Terms and Conditions"];
const Links = ["Privacy Policy"];
const customerCareLinks = [
  "HelpCenter",
  "Careers",
  "HowtoBuy",
  "OurStores",
  "OurCares",
  "TrackYourOrder",
  "Corporate&BulkPurchasing",
];
const iconList = [
  {
    icon: Facebook,
    url: "https://www.facebook.com/FabmerceOfficial",
  },
  {
    icon: Twitter,
    url: "https://twitter.com/fabmerce",
  },
  {
    icon: Youtube,
    url: "https://www.youtube.com/channel/UCmhTyMZXKBAce0E73gU8DbA/featured",
  },
  {
    icon: Instagram,
    url: "https://www.instagram.com/fabmerce/",
  },
];
export default Footer;
