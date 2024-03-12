import { StyledContainer } from "components/StyledContainer";
import React from "react";
import CategoriesCards from "components/product-cards/CategoriesCards";
import { Grid, Box, styled, Container, useTheme } from "@mui/material";
import CategorySectionCreator from "../CategorySectionCreator";
import LazyImage from "components/LazyImage";
import FlexBox from "components/FlexBox";
import { H4 } from "components/Typography";
import { Sensors, TrendingUp, Verified } from "@mui/icons-material";
import useWindowSize from "hooks/useWindowSize";
import Link from "next/link";
import VideoCarousel from "./VideoCarousel";
import Image from 'next/image'

const StyledHeaderFour = styled(H4)(() => ({
  margin: "13px 0",
  display: "flex",
  alignItems: "center",
  fontWeight: 400,
  fontSize: "22px",
  lineHeight: "33px",
  color: " #072255"
}));

const StyledLine = styled("div")(() => ({
  width: "100%",
  height: "1px",
  backgroundColor: "#F4F4F5",
  marginBottom: "15px",
}));

const MultipleStyledContainer = styled("div")(() => ({
  background: "white",
  mb: 5,
  borderLeft: "none",
  borderRight: "none",
  overflow: "hidden",
  " .image": {
    borderRadius: "15px", cursor: "pointer"
  },
  padding:"0px"
}));

const PromotionOne = () => {
  const windowSize = useWindowSize();
  const { breakpoints } = useTheme();
  return (
    <MultipleStyledContainer>
      <Box sx={{ flexGrow: 2 }}>
        <Grid container spacing={2}>
          <Grid
            item
            xs={windowSize <= 1000 ? 12 : 8}
            md={windowSize <= 1000 ? 12 : 8}
            sx={{
              borderRight: windowSize <= 1000 ? "none" : "5px solid #F4F4F5",
            }}
          >
            <div
              style={{
                display: "flex",
                paddingRight: windowSize <= 1000 ? "0px" : "15px",
              }}
            >
              <Grid container spacing={2}>
                <Grid
                  item
                >
                  <StyledHeaderFour sx={{
                    [breakpoints.down("md")]: {
                      fontSize: 20,
                      lineHeight: "25px",
                    },
                    [breakpoints.down("sm")]: {
                      fontSize: 17,
                      lineHeight: "20px",
                    },
                  }}>
                    Explore
                  </StyledHeaderFour>
                  <StyledLine />
                  {PromotionSetOneList?.map((largeImage, largeInd) => {
                    return (
                      <Box key={largeInd}>
                        {largeImage?.id === 1 && (
                          <a href={largeImage.Navurl}>
                            <LazyImage
                              mx="auto"
                              alt={largeImage?.title}
                              src={largeImage?.imgUrl}
                              height={
                                windowSize < 1000 ? "430%" : largeImage?.height
                              }
                              width={largeImage?.width}
                              //objectFit="cover"
                              priority={true}
                              className="image"
                              fullWidth
                            ></LazyImage>
                          </a>
                        )}
                      </Box>
                    );
                  })}
                </Grid>
              </Grid>
            </div>
            <div style={{ display: "flex", paddingRight: windowSize <= 1000 ? "0px" : "15px" }}>
              <Grid container spacing={windowSize < 700 ? 1.5 : 2.5} >
                <Grid item sx={{ width: "100%" }}>
                  <StyledHeaderFour sx={{
                    [breakpoints.down("md")]: {
                      fontSize: 20,
                      lineHeight: "25px",
                    },
                    [breakpoints.down("sm")]: {
                      fontSize: 17,
                      lineHeight: "20px",
                    },
                  }}
                  >
                    New Trends
                  </StyledHeaderFour>
                  <StyledLine sx={{ marginBottom: "0px !important " }} /></Grid>
                <Grid
                  item
                  xs={4}
                  md={4}
                  sx={{ marginBottom: "15px !important" }}
                >
                  {PromotionSetOneList?.map((largeImage, largeInd) => {
                    return (
                      <Box key={largeInd}>
                        {largeImage?.id === 2 && (
                          <a href={largeImage.Navurl}>
                            <LazyImage
                              mx="auto"
                              alt={largeImage?.title}
                              src={largeImage?.imgUrl}
                              height={
                                windowSize <= 1300 ? "550%" : largeImage?.height
                              }
                              width={
                                windowSize <= 1300 ? "550%" : largeImage?.width
                              }
                              //objectFit="cover"
                              priority={true}
                              className="image"
                              fullWidth
                            ></LazyImage>
                          </a>
                        )}
                      </Box>
                    );
                  })}
                </Grid>
                <Grid
                  item
                  xs={4}
                  md={4}
                  sx={{ marginBottom: "15px !important" }}
                >
                  {PromotionSetOneList?.map((largeImage, largeInd) => {
                    return (
                      <Box key={largeInd} >
                        {largeImage?.id === 3 && (
                          <a href={largeImage.Navurl}>
                            <LazyImage
                              mx="auto"
                              alt={largeImage?.title}
                              src={largeImage?.imgUrl}
                              height={
                                windowSize <= 1300 ? "550%" : largeImage?.height
                              }
                              width={
                                windowSize <= 1300 ? "550%" : largeImage?.width
                              }
                              //objectFit="cover"
                              priority={true}
                              className="image"
                              fullWidth
                            ></LazyImage>
                          </a>
                        )}
                      </Box>
                    );
                  })}
                </Grid>
                <Grid
                  item
                  xs={4}
                  md={4}
                  sx={{ marginBottom: "15px !important" }}
                >
                  {PromotionSetOneList?.map((largeImage, largeInd) => {
                    return (
                      <Box key={largeInd} >
                        {largeImage?.id === 4 && (
                          <a href={largeImage.Navurl}>
                            <LazyImage
                              mx="auto"
                              alt={largeImage?.title}
                              src={largeImage?.imgUrl}
                              height={
                                windowSize <= 1300 ? "550%" : largeImage?.height
                              }
                              width={
                                windowSize <= 1300 ? "550%" : largeImage?.width
                              }
                              //objectFit="cover"
                              priority={true}
                              className="image"
                              fullWidth
                            ></LazyImage>
                          </a>
                        )}
                      </Box>
                    );
                  })}
                </Grid>
              </Grid>
            </div>
          </Grid>

          <Grid item md={windowSize < 1001 ? 12 : 4} xs={{ display: "none" }} >
            <div style={{
              display: "flex",
              justifyContent: "center"
            }}>
              <Image src={"/assets/images/icons/antennascreen.svg"} height={25} width={25} alt="tv" />
              <StyledHeaderFour sx={{ ml: "0.5rem", fontSize: "18px", marginTop: "20px", color: "#000000 " }}>
                FABROOM
              </StyledHeaderFour>
            </div>
            <StyledLine />
            <VideoCarousel promotion={promotionVideos} />
          </Grid>
        </Grid>
      </Box>
    </MultipleStyledContainer>
  );
};

export default PromotionOne;

export const PromotionSetOneList = [
  {
    imgUrl:
      "https://storage.googleapis.com/asp-pprd-images-bucket/promotionvideos/1.png",
    Navurl: "/collections/skin-care-14",
    title: "Onam Mens Sale",
    width: "1300%",
    height: "480px",
    id: 1
  },
  {
    imgUrl: "https://storage.googleapis.com/asp-pprd-images-bucket/promotionvideos/2.png",
    Navurl: "/product/search/hand-bags-737",
    title: "Onam Sale",
    width: "450%",
    height: "458%",
    id: 2
  },
  {
    imgUrl:
      "https://storage.googleapis.com/asp-pprd-images-bucket/promotionvideos/3.png",
    Navurl: "/store/sonu-jewellery-34",
    title: "Gadgets",
    width: "450%",
    height: "458%",
    id: 3,
  },
  {
    imgUrl:
      "https://storage.googleapis.com/asp-pprd-images-bucket/promotionvideos/4.png",
    Navurl: "/collections/saree-collection-16",
    title: "Onam Womens Sale",
    width: "450%",
    height: "458%",
    id: 4
  },
];

const promotionVideos = [
  {
    videoURL:
      "https://storage.googleapis.com/asp-pprd-images-bucket/promotionvideos/fab3.mp4",
    Navurl: "/store/vishara-skin-care-28",
  },
  {
    videoURL:
      "https://storage.googleapis.com/asp-pprd-images-bucket/promotionvideos/fab2.mp4",
    Navurl: "/store/vishara-skin-care-28",
  },
  {
    videoURL:
      "https://storage.googleapis.com/asp-pprd-images-bucket/promotionvideos/Holi.mp4",
    Navurl: "/store/teemaja-1",
  },
  {
    videoURL:
      "https://storage.googleapis.com/asp-pprd-images-bucket/promotionvideos/fab1.mp4",
    Navurl: "/product/search/couple-collection-657",
  },
  {
    videoURL:
      "https://storage.googleapis.com/asp-pprd-images-bucket/promotionvideos/Valentine.mp4",
    Navurl: "/product/search/couple-collection-657",
  },
];