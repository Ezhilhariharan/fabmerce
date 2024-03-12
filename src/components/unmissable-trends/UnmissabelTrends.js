import { Box, Container, styled, Grid, useTheme } from "@mui/material";
import Link from "next/link";
import NextImage from "next/image";
import { H4, H1 } from "components/Typography";
import UnmissableCarousel from "./UnmissableCarousel";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

const StyledHeaderFour = styled(H4)(({ theme }) => ({
    margin: "23px 0",
    fontWeight: 400,
    fontSize: "22px",
    lineHeight: "33px",
    color: " #072255",
    [theme.breakpoints.down("md")]: {
        fontSize: 20,
        lineHeight: "25px",
    },
    [theme.breakpoints.down("sm")]: {
        fontSize: 17,
        lineHeight: "20px",
    }
}));
const StyledHeaderOne = styled(H1)(({ theme }) => ({
    marginLeft: "3%",
    color: "white",
    fontWeight: "600",
    fontSize: " 80px",
    lineHeight: "70px",
    borderBottom: "4px solid white",
    display: "inline-block",
    marginBottom: "25px",
    [theme.breakpoints.down("md")]: {
        fontSize: 45,
        lineHeight: "50px",
    },
    [theme.breakpoints.down("sm")]: {
        fontSize: 22,
        lineHeight: "20px",
        borderBottom: "2px solid white",
        marginBottom: "5px",
    },

}));

const StyledBox = styled(Box)(() => ({
    backgroundColor: "#FFFFFF",
    width: "100%",
}));
const ImageWrapper = styled("div")(({ theme }) => ({
    position: "relative",
    " .Dresswear": {
        borderRadius: "20px",
        [theme.breakpoints.down("sm")]: {
            width: "50px",
            borderRadius: "10px",
        },
        [theme.breakpoints.down("md")]: {
            marginRight: "20px"
        }
    },
    cursor: "pointer"
}));
const RedirectButton = styled("div")(({ theme }) => ({
    left: "0px",
    right: "0px",
    bottom: "5%",
    position: "absolute",
    marginLeft: "auto",
    marginRight: "auto",
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: " 10px",
    width: " 215px",
    height: "49px",
    fontWeight: "500",
    fontStyle: "normal",
    fontSize: "22px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    [theme.breakpoints.down("lg")]: {
        fontSize: 15,
        width: " 155px",
        height: "49px",
    },
    [theme.breakpoints.down("md")]: {
        fontSize: 10,
        width: " 100px",
        height: "38px",
    },
    [theme.breakpoints.down("sm")]: {
        fontSize: 7,
        width: " 60px",
        height: "18px",
        bottom: "10%",
    }
}));
const StyledGrid = styled(Grid)(({ theme }) => ({
    borderRadius: "20px",
    backgroundImage: "url(assets/images/ClothingBG.png) ",
    width: "100%",
    objectFit: "cover",
    backgroundPosition: "center",
    backgroundSize: "cover",
    display: "flex",
    overflow: "hidden",
    padding: "30px 50px 25px 50px",
    [theme.breakpoints.down("md")]: {
        padding: "20px 20px 15px 20px",
    },
    [theme.breakpoints.down("sm")]: {
        padding: "8px 5px 4px 5px",
        borderRadius: "10px",
    },
    " .left": {
        width: "48% !important",
        display: "flex",
        flexDirection: "column",
        alignItem: "center",
        justifyContent: "center",
        height: "auto !important",
        [theme.breakpoints.down("sm")]: {
            width: "40% !important",
        },
    },
    " .right": {
        display: "flex",
        width: "52%",
        height: "auto !important",
        justifyContent: "center",
        gap: "20px",
        [theme.breakpoints.down("md")]: {
            gap: "10px",
        },
        [theme.breakpoints.down("sm")]: {
            gap: "5px",
            width: "60% !important",
        },
    },
}));

const UnmissableTrends = () => {
    const catagoriesList = useSelector((state) => state?.brandSlice?.catagoriesList);
    const clothingList = catagoriesList?.filter((data) => data.name == "Clothing")[0]?.children?.map(subcategory => subcategory);
    const childClothingList = clothingList?.map(child => child?.children?.map(data => data))?.flat()?.flat();
    return (
        <StyledBox>
            <StyledHeaderFour >
                Unmissable Trends
            </StyledHeaderFour>
            <StyledGrid  >
                <div className="left">
                    <StyledHeaderOne >CLOTHING</StyledHeaderOne>
                </div>
                <div className="right">
                    <ImageWrapper>
                        <Link href={`/product/search/women-653`}>
                            <a>
                                <NextImage
                                    src={"/assets/images/unmissabletrends/Rectangle 219.svg"}
                                    objectFit="cover"
                                    width="250px"
                                    height="330px !important"
                                    className="Dresswear"
                                >
                                </NextImage>
                                <RedirectButton >WOMEN'S WEAR</RedirectButton>
                            </a>
                        </Link>

                    </ImageWrapper>
                    <ImageWrapper>
                        <Link href={`/product/search/men-655`}>
                            <a>
                                <NextImage
                                    src={"/assets/images/unmissabletrends/Rectangle 220.svg"}
                                    objectFit="cover"
                                    width="250px"
                                    height="330px !important"
                                    className="Dresswear">
                                </NextImage>
                                <RedirectButton >MEN'S WEAR</RedirectButton>
                            </a>
                        </Link>
                    </ImageWrapper>
                </div>
            </StyledGrid>
            <Box ml={"-8px"}>
                <UnmissableCarousel clothingList={childClothingList} />
            </Box>
        </StyledBox>
    );
}
export default UnmissableTrends;