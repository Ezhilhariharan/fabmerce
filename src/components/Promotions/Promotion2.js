import { Box, Grid, styled, useTheme } from "@mui/material";
import LazyImage from "components/LazyImage";
import { H6 } from "components/Typography";
import Link from "next/link";
import { useRouter } from "next/router";
import { Sensors, TrendingUp, Verified } from "@mui/icons-material";
import React from "react";

const StyledHeaderFour = styled(H6)(() => ({
  fontWeight: "700",
  fontSize: "22px",
  display: "flex",
  alignItems: "center",
  //verticalAlign: "middle",
}));

const Promotion2 = () => {
  const router = useRouter();
  const { breakpoints } = useTheme();
  return (
    <Box
      sx={{
        background: "rgba(255, 255, 255, 0.75);",
        paddingLeft: 4,
        paddingRight: 4,
        marginBottom: 2,
      }}
    >
      <Grid
        container
        spacing={2}
        mt={0}
        sx={{
          [breakpoints.down("sm")]: {
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Grid item xs={8}>
          <Grid container spacing={2}>
            {/* New Section */}
            <Grid
              container
              spacing={3}
              sx={{
                p: "20px",
              }}
            >
              {PromotionSetOneList?.slice(0, 2).map((promotion, ind) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={promotion.title === "Men's Fashion" ? 8 : 4}
                    md={promotion.title === "Men's Fashion" ? 8 : 4}
                    key={ind}
                    sx={{
                        marginTop:promotion.title === "Women's Fashion" ? "30px":"0px",
                      }}
                  >
                    {promotion?.title === "Men's Fashion" && (
                      <StyledHeaderFour
                        sx={{
                          [breakpoints.down("sm")]: {
                            fontSize: 20,
                            fontWeight: 600,
                          },
                          [breakpoints.down("md")]: {
                            fontSize: 12,
                            fontWeight: 600,
                          },
                        }}
                      >
                        Explore Discounts
                        <Verified sx={{ color: "#FC3131" }} />
                      </StyledHeaderFour>
                    )}

                    <Link href={promotion.Navurl}>
                      <a>
                        <LazyImage
                          src={promotion.imgUrl}
                          width={"100%"}
                          height={
                            promotion.title === "Men's Fashion" ? "48%" : "100%"
                          }
                          layout="responsive"
                          alt={promotion.title}
                        />
                      </a>
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {/* New Section */}
            <Grid
              container
              spacing={3}
              sx={{
                p: "20px",
              }}
            >
              {PromotionSetOneList?.slice(3, 5).map((promotion, ind) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sm={promotion.title === "Freedom sale" ? 8 : 4}
                    md={promotion.title === "Freedom sale" ? 8 : 4}
                    key={ind}
                  >
                    {promotion?.title === "Gadgets" && (
                      <StyledHeaderFour
                        sx={{
                          [breakpoints.down("sm")]: {
                            fontSize: 20,
                            fontWeight: 600,
                          },
                          [breakpoints.down("md")]: {
                            fontSize: 12,
                            fontWeight: 600,
                          },
                        }}
                      >
                        New Trends
                        <TrendingUp sx={{ color: "#FD5FB2" }} />
                      </StyledHeaderFour>
                    )}

                    <Link href={promotion.Navurl}>
                      <a>
                        <LazyImage
                          src={promotion.imgUrl}
                          width={"100%"}
                          height={
                            promotion.title === "Freedom sale" ? "48%" : "90%"
                          }
                          layout="responsive"
                          alt={promotion.title}
                        />
                      </a>
                    </Link>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={4}
          sx={{
            [breakpoints.down("sm")]: {
              display: "none",
            },
          }}
        >
          {PromotionSetOneList?.map((largeImage, largeInd) => {
            return (
              <Grid container xs={12} key={largeInd}>
                {largeImage?.title === "Fab Room" && (
                  <Grid item xs={12} sm={12} md={12}>
                    <StyledHeaderFour
                      sx={{
                        [breakpoints.down("sm")]: {
                          fontSize: 12,
                          fontWeight: 600,
                        },
                      }}
                    >
                      Fab Room
                      <Sensors
                        sx={{
                          color: "#FF0000",
                        }}
                      />
                    </StyledHeaderFour>
                    <Link href={largeImage.Navurl}>
                      <a>
                        <LazyImage
                          src={largeImage.imgUrl}
                          width={"90%"}
                          height={"115%"}
                          layout="responsive"
                          sx={{
                            [breakpoints.down("sm")]: {
                              width: "100%",
                              height: "90%",
                            },
                          }}
                          alt={largeImage?.title}
                        />
                      </a>
                    </Link>
                  </Grid>
                )}
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Box>
  );
};

export const PromotionSetOneList = [
  {
    imgUrl: "/assets/images/PromotionOne/Mens_wear.png",
    Navurl: "/product/search/Men",
    title: "Men's Fashion",
    width: 500,
    height: 250,
  },
  {
    imgUrl: "/assets/images/PromotionOne/Womens_wear.png",
    Navurl: "/product/search/Women",
    title: "Women's Fashion",
    width: 350,
    height: 250,
  },
  {
    imgUrl: "/assets/images/PromotionOne/Intersect.png",
    Navurl: "/product/search/Accessories",
    title: "Fab Room",
    width: 400,
    height: 735,
  },
  {
    imgUrl: "/assets/images/PromotionOne/Group_10.png",
    Navurl: "/product/search/Accessories",
    title: "Gadgets",
    width: 200,
    height: 250,
  },
  {
    imgUrl: "/assets/images/PromotionOne/Sale_sections.png",
    Navurl: "/product/search/Accessories",
    title: "Freedom sale",
    width: 550,
    height: 300,
  },
];

export default Promotion2;
