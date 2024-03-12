import { Box, styled } from "@mui/material";
import { H4 } from "components/Typography";
import LazyImage from "components/LazyImage";
import useWindowSize from "hooks/useWindowSize";
import Carousel from "components/carousel/Carousel";
import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import { StyledContainer } from "./../StyledContainer"

const StyledHeaderFour = styled(H4)(({ theme }) => ({
    //margin: "23px 0",
    padding: "15px 0px 15px 0px",
    fontWeight: 400,
    fontSize: "22px",
    lineHeight: "33px",
    color: " #072255",
    borderBottom: "1px solid #F4F4F5",
    [theme.breakpoints.down("md")]: {
        fontSize: 20,
        lineHeight: "25px",
    },
    [theme.breakpoints.down("sm")]: {
        fontSize: 17,
        lineHeight: "20px",
    }
}));

const StyledBox = styled(Box)(({ theme }) => ({
    width: "100%",
    padding: "1%",
    height: "auto",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    [theme.breakpoints.down("sm")]: {
        width: "100%",
    },
    " .left": {
        padding: "0px !important",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    " .right": {
        padding: "0px !important",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        maxWidth:"100%",
        gap: "20px",
        [theme.breakpoints.down("md")]: {
            gap: "10px",
        },
        [theme.breakpoints.down("sm")]: {
            gap: "5px",
        }
    },
    " .productImage": {
        borderRadius: "20px",
        cursor: "pointer",
        [theme.breakpoints.down("md")]: {
            borderRadius: "15px",
        },
        [theme.breakpoints.down("sm")]: {
            borderRadius: "10px",
        }
    }
}));
const ChecklistBox = styled(Box)(() => ({
    backgroundColor: "#FFFFFF",
}));

const NewChecklist = () => {
    const width = useWindowSize();
    return (
        <ChecklistBox mt={"5px"} pb={"30px"} mb={"5px"}>
            <StyledHeaderFour>
                New Checklist For Lifestyle
            </StyledHeaderFour>
            <Carousel
                totalSlides={newCheckListLifestyle.length}
                showArrow={false}
                visibleSlides={1}
                infinite={true}
                autoPlay={true}
                showDots={false}
            >
                {
                    newCheckListLifestyle.map((item, index) => (
                        <a href={item.navUrl}>
                            <StyledBox key={index}>

                                <div className="left">
                                    {item?.children?.map((largeImage, largeInd) => {
                                        return (
                                            <>
                                                {largeImage?.id === 1 && (
                                                    <Box key={largeInd} maxWidth="100%">
                                                        <LazyImage
                                                            alt={largeImage?.title}
                                                            src={largeImage?.imgUrl}
                                                            height={
                                                                width < 600 ? 470 : width > 1599 ? "625px" : "488px"
                                                            }
                                                            width={width < 600 ? 700 : width > 1599 ? "625px" : "488px"}
                                                            //objectFit="cover"
                                                            priority={true}
                                                            className="productImage"
                                                            fullWidth
                                                        ></LazyImage>
                                                    </Box>
                                                )}
                                            </>
                                        );
                                    })}
                                </div>
                                {width > 600 &&
                                    <div className="right">
                                        <Grid item>
                                            {item?.children?.map((largeImage, largeInd) => {
                                                return (
                                                    <Box key={largeInd}>
                                                        {largeImage?.id === 2 && (<LazyImage
                                                            alt={largeImage?.title}
                                                            src={largeImage?.imgUrl}
                                                            height={width > 1599 ? `${23*13}px` : "230px"}
                                                            width={width < 600 ? 350 : width > 1599 ? `${78*13}px` : "780px"}
                                                            //objectFit="cover"
                                                            priority={true}
                                                            className="productImage"
                                                            fullWidth
                                                        ></LazyImage>
                                                        )}
                                                    </Box>
                                                );
                                            })}
                                        </Grid>
                                        <Grid item>
                                            {item?.children?.map((largeImage, largeInd) => {
                                                return (
                                                    <Box key={largeInd} maxWidth="100%">
                                                        {largeImage?.id === 3 && (
                                                            <LazyImage
                                                                alt={largeImage?.title}
                                                                src={largeImage?.imgUrl}
                                                                height={width > 1599 ? `${23*13}px` : "230px"}
                                                                width={width < 600 ? 350 : width > 1599 ? `${78*13}px` : "780px"}
                                                                //objectFit="cover"
                                                                priority={true}
                                                                className="productImage"
                                                                fullWidth
                                                            ></LazyImage>
                                                        )}
                                                    </Box>
                                                );
                                            })}
                                        </Grid>
                                    </div>
                                }

                            </StyledBox>
                        </a>
                    ))
                }

            </Carousel>
        </ChecklistBox>
    );
};

export default NewChecklist;

const newCheckListLifestyle = [
    {
        navUrl: "/product/search/jewellery-647",
        children: [
            {
                imgUrl:
                    "https://storage.googleapis.com/asp-pprd-images-bucket/lifestyle/image1.png",
                title: "Jewellery",
                id: 1
            },
            {
                imgUrl: "https://storage.googleapis.com/asp-pprd-images-bucket/lifestyle/image3.png",
                title: "Jewellery",
                id: 2
            },
            {
                imgUrl:
                    "https://storage.googleapis.com/asp-pprd-images-bucket/lifestyle/image2.png",
                title: "Jewellery",
                id: 3
            },
        ]
    }
    , {
        navUrl: "/product/search/hand-bags-737",
        children: [
            {
                imgUrl:
                    "https://storage.googleapis.com/asp-pprd-images-bucket/lifestyle/image6.png",
                title: "Handbag",
                id: 1
            },
            {
                imgUrl: "https://storage.googleapis.com/asp-pprd-images-bucket/lifestyle/image5.png",
                title: "Handbag",
                id: 2
            },
            {
                imgUrl:
                    "https://storage.googleapis.com/asp-pprd-images-bucket/lifestyle/image4.png",
                title: "Handbag",
                id: 3
            },
        ]
    }
    , {
        navUrl: "/product/search/mens-footwear-677",
        children: [
            {
                imgUrl:
                    "https://storage.googleapis.com/asp-pprd-images-bucket/lifestyle/image7.png",
                title: "Mensfootwear",
                id: 1
            },
            {
                imgUrl: "https://storage.googleapis.com/asp-pprd-images-bucket/lifestyle/image8.png",
                title: "Mensfootwear",
                id: 2
            },
            {
                imgUrl:
                    "https://storage.googleapis.com/asp-pprd-images-bucket/lifestyle/image9.png",
                title: "Mensfootwear",
                id: 3
            },
        ]
    }
];