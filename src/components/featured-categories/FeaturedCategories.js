import { Box, styled } from "@mui/material";
import { H2 } from "components/Typography";
import useWindowSize from "hooks/useWindowSize";
import React, { Fragment, useEffect, useState } from "react";
import viewAll from "../../../public/assets/images/trending-brands/View-all.svg";
import viewAllCategories from "../../../public/assets/images/featured-categories/allCategoreis.png";
import Carousel from "components/carousel/Carousel";
import FlexBox from "components/FlexBox";
import { useSelector } from "react-redux";
import LazyImage from "components/LazyImage";
const BackgroundImage = styled(Box)(({ categoryImage }) => ({
    backgroundImage: `url(${categoryImage})`,
    backgroundSize: "150.21px 190px",
    width: "150.21px",
    height: "190px",
    backgroundRepeat: "no-repeat",
    borderRadius: "20px",
}));
const TextBox = styled(Box)(() => ({
    width: "100%",
    height: "47px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: "0px 0px 20px 20px",
    position: "relative",
    top: "143px"
}));
export const HeaderCategories = styled(Box)(({ screenWidth }) => ({
    borderBottom: "1px solid #F4F4F5",
    fontSize: screenWidth < 625 ? "16px" : "22px",
}));
export const FeaturedCategories = ({ featuredCategories }) => {
    const screenWidth = useWindowSize();
    const [visibleSlides, setVisibleSlides] = useState(9);
    const [brandSlides, setBrandSlides] = useState(6);
    useEffect(() => {
        switch (true) {
            case screenWidth < 350:
                setVisibleSlides(1);
                break;
            case screenWidth < 510:
                setVisibleSlides(2);
                break;
            case screenWidth < 700:
                setVisibleSlides(3)
                break;
            case screenWidth < 900:
                setVisibleSlides(4);
                break;
            case screenWidth < 1100:
                setVisibleSlides(5);
                break;
            case screenWidth < 1300:
                setVisibleSlides(6);
                break;
            case screenWidth < 1744:
                setVisibleSlides(7);
                break;
            default:
                setVisibleSlides(9);
                break;
        }
        switch (true) {
            case screenWidth < 580:
                setBrandSlides(1);
                break;
            case screenWidth < 825:
                setBrandSlides(2);
                break;
            case screenWidth < 1100:
                setBrandSlides(3);
                break;
            case screenWidth < 1400:
                setBrandSlides(4);
                break;
            case screenWidth < 1660:
                setBrandSlides(5);
                break;
            default:
                setBrandSlides(6);
                break;
        }
    }, [screenWidth]);
    const totalCategories = featuredCategories?.map(a => a?.children?.map(b => b?.children))?.flat()?.flat();
    const firstTwelveCategories = totalCategories?.slice(0, 12);
    const brands = useSelector(state => state?.brandSlice?.brandList);
    const firstSixBrands = brands?.slice(0, 6);
    return (
        <Box bgcolor="#FFFFFF" pt={"20px"} mt={"5px"}>
            <HeaderCategories pb={"15px"} mb={"15px"} screenWidth={screenWidth}>Featured Categories</HeaderCategories>
            <Box pb={"52px"} ml={screenWidth > 600 && "-10px"}>
                <Carousel
                    totalSlides={firstTwelveCategories?.length + 1}
                    visibleSlides={visibleSlides}
                    showArrow={firstTwelveCategories?.length + 1 > brandSlides ? true : false}
                    arrowLeft={"0.625rem"}
                >
                    {firstTwelveCategories?.map((data) => {
                        return (
                            <a href={`/product/search/${data.slug}`} key={data.slug}>
                                {data?.profile_photo && <FlexBox justifyContent="center" alignItems="center">
                                    <BackgroundImage
                                        categoryImage={data.profile_photo}
                                        title={data.name}
                                    >
                                        <TextBox>{data.name}</TextBox>
                                    </BackgroundImage>
                                </FlexBox>}
                            </a>
                        )
                    })}
                    <Box>
                        <a href="/Allcategories">
                            <FlexBox justifyContent="center" alignItems="center">
                                <LazyImage
                                    src={viewAllCategories}
                                    width={"150px"}
                                    height={"190px"}
                                    alt="view-all-categories"
                                />
                            </FlexBox>
                        </a>
                    </Box>
                </Carousel>
            </Box>
            <HeaderCategories pb={"15px"} mb={"15px"} screenWidth={screenWidth}>Fabmerce Trending brands</HeaderCategories>
            <Box pb={"42px"} ml={screenWidth > 1600 && "-10px"}>
                <Carousel
                    totalSlides={firstSixBrands?.length + 1}
                    visibleSlides={brandSlides}
                    showArrow={firstSixBrands?.length + 1 > brandSlides ? true : false}
                    arrowLeft={"0.625rem"}
                >
                    {firstSixBrands?.map((data) => {
                        return (
                            <a href={`/store/${data.slug}`} key={data.slug}>
                                {data?.icon_photo && <FlexBox justifyContent="center" alignItems="center">
                                    <LazyImage
                                        src={data.icon_photo}
                                        width={"249.8px"}
                                        height={"340px"}
                                        alt={data.name}
                                    />
                                </FlexBox>}
                            </a>
                        )
                    })}
                    <a href={`/allbrands`}>
                        <FlexBox justifyContent="center" alignItems="center">
                            <LazyImage
                                src={viewAll}
                                width="249.8px"
                                height="340px"
                                alt="viewAllBrands"
                            />
                        </FlexBox>
                    </a>
                </Carousel>
            </Box>
        </Box>
    )
}