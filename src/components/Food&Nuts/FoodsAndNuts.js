import LazyImage from "components/LazyImage";
import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, Card, styled } from "@mui/material";
import { StyledContainer } from "components/StyledContainer";
import useWindowSize from "hooks/useWindowSize";
import { useSelector } from "react-redux";
import FlexBox from "components/FlexBox";
import Carousel from "components/carousel/Carousel";
import { HeaderCategories } from "components/featured-categories/FeaturedCategories";

const TextBox = styled(Box)(({ screenWidth }) => ({
    font: "Poppins",
    fontWeight: "400",
    fontSize: screenWidth < 600 ? "12px" : "18px",
}));

export const FoodsAndNuts = ({ Grocery }) => {
    const [visibleSlides, setVisibleSlides] = useState(7);
    const [foodSlides, setFoodSlides] = useState(2);
    const totalCategories = Grocery?.map(
        (category) =>
            category.name === "Groceries" &&
            category?.children?.map((b) => b?.children)
    )?.flat()?.flat();
    const result = totalCategories?.filter(Boolean);
    const screenWidth = useWindowSize();
    useEffect(() => {
        switch (true) {
            case screenWidth < 1100:
                setFoodSlides(1);
                break;
            default:
                setFoodSlides(2);
                break;
        }
        switch (true) {
            case screenWidth < 350:
                setVisibleSlides(2);
                break;
            case screenWidth < 467:
                setVisibleSlides(3);
                break;
            case screenWidth < 600:
                setVisibleSlides(4);
                break;
            case screenWidth < 850:
                setVisibleSlides(3);
                break;
            case screenWidth < 1050:
                setVisibleSlides(4);
                break;
            case screenWidth < 1250:
                setVisibleSlides(5);
                break;
            case screenWidth < 1471:
                setVisibleSlides(6);
                break;
            default:
                setVisibleSlides(7);
                break;
        }
    }, [screenWidth]);
    return (
        <Box pt={"20px"}>
            <HeaderCategories pb={"15px"} mb={"15px"} screenWidth={screenWidth}>
                Food,  Nuts & Spices
            </HeaderCategories>
            <Box pb={"40px"} ml={"10px"}>
                <Carousel
                    totalSlides={FoodNutsArray?.length}
                    visibleSlides={foodSlides}
                    showArrow={false}
                    autoPlay={true}
                >
                    {FoodNutsArray?.map((data, foodInd) => {
                        return (
                            <a href={data.navUrl} key={foodInd}>
                                <Box mr={screenWidth < 1100 ? screenWidth < 800 ? "0px" : "10px" : "2rem"}>
                                    {data?.imgUrl && <LazyImage
                                        src={data.imgUrl}
                                        width={"682.93px"}
                                        height={"260px"}
                                        alt={data.alt}
                                        layout="responsive"
                                    />}
                                </Box>
                            </a>
                        )
                    })}
                </Carousel>
            </Box>
            <Box pb={"46px"} ml={screenWidth > 1280 && screenWidth < 1801 ? "-0.625rem" : screenWidth > 1800 ? "-25px" : "0px"}>
                <Carousel 
                    totalSlides={result?.length} 
                    visibleSlides={visibleSlides} 
                    showArrow={result?.length > visibleSlides}
                    arrowLeft={"1.3rem"}
                >
                    {result?.map((data, ind) => {
                        return (
                            <a href={`/product/search/${data.slug}`} key={ind}>
                                <FlexBox justifyContent="center" alignItems="center" flexDirection="column">
                                    {data?.profile_photo && <LazyImage
                                        src={data.profile_photo}
                                        alt={data.name}
                                        width={screenWidth < 600 ? "100px" : "180px"}
                                        height={screenWidth < 600 ? "128px" : "230px"}
                                    />}
                                    <TextBox mt={"20px"} screenWidth={screenWidth}>{data.name}</TextBox>
                                </FlexBox>
                            </a>
                        );
                    })}
                </Carousel>
            </Box>
        </Box>
    )
}

const FoodNutsArray = [
    {
        imgUrl: "https://storage.googleapis.com/asp-pprd-images-bucket/foodandspices%20/chocolates.png",
        navUrl: "/product/search/chocolates-700",
        alt: "Chocolates",
    },
    {
        imgUrl: "https://storage.googleapis.com/asp-pprd-images-bucket/foodandspices%20/nuts.png",
        navUrl: "product/search/nuts-spices-722",
        alt: "nuts",
    }
];