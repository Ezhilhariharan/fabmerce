import { Box, styled } from "@mui/material";
import { H4 } from "components/Typography";
import LazyImage from "components/LazyImage";
import useWindowSize from "hooks/useWindowSize";
import React, { useEffect, useState } from "react";
import { StyledContainer } from "./../StyledContainer"

const StyledHeaderFour = styled(H4)(({ theme }) => ({
    //margin: "23px 0",
    padding: "15px 0px 15px 0",
    borderBottom: "1px solid #F4F4F5",
    marginBottom: "22px",
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

const Layout = styled(Box)(({ theme }) => ({
// border:"1px solid red",
    width: "100%",
    height: "auto",
    display: "flex",
      flexDirection: "row",
   justifyContent:"center",
//    alignContent
    " .body":{
        display: "flex",
        flexDirection: "row",
        gap: "40px",
        [theme.breakpoints.down("md")]: {
            gap: "20px",
        },
        [theme.breakpoints.down("sm")]: {
            gap: "20px",
            flexDirection: "column",
        },
    },
    " .left": {
        padding: "0px !important",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100% !important"
    },
    " .middle": {
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        [theme.breakpoints.down("md")]: {
            gap: "20px",
        },
        [theme.breakpoints.down("sm")]: {
            gap: "20px",
            flexDirection: "row",
        }
    },
    " .right": {
        padding: "0px !important",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        [theme.breakpoints.down("md")]: {
            gap: "20px",
        },
        [theme.breakpoints.down("sm")]: {
            gap: "20px",
            flexDirection: "row",
        }
    },
    " .productImage": {
        borderRadius: "20px",
        cursor: "pointer",
        [theme.breakpoints.down("md")]: {
            borderRadius: "20px",
        },
        [theme.breakpoints.down("sm")]: {
            borderRadius: "20px",
        }
    },
    " a": {
        padding: "0px !important"
    }
}));
const BeautyBox = styled(Box)(() => ({
    backgroundColor: "#FFFFFF",
}));

const BeautyAndCosmetics = () => {
    const width = useWindowSize();
    return (
        <BeautyBox mt={"5px"} pb={"50px"}>
            <StyledHeaderFour>
                Beauty & Cosmetics
            </StyledHeaderFour>
            <Layout>
                <div className="body">               
                <Box className="left">
                    {newCheckListLifestyle?.map((largeImage, largeInd) => {
                        return (
                            <>
                                <Box key={largeInd} >
                                    {largeImage?.id === 1 && (
                                        <a href={largeImage.Navurl}>
                                            <LazyImage
                                                alt={largeImage?.title}
                                                src={largeImage?.imgUrl}
                                                height={
                                                    width < 600 ? 116*4.5 : width < 730 ? "760px" :
                                                        width < 960 ? "740px" :
                                                            width < 1100 ? "770px" : "740px"}
                                                width={width < 600 ? 95*6 : width > 1440 ? 620 : 500}
                                                //objectFit="cover"
                                                priority={true}
                                                className="productImage"
                                                fullWidth
                                            ></LazyImage>
                                        </a>
                                    )}
                                </Box>
                            </>
                        );
                    })}
                </Box>
                <Box className="middle">
                    {newCheckListLifestyle?.map((largeImage, largeInd) => {
                        return (
                            <>
                                {largeImage?.id === 2 && (
                                    <Box key={largeInd} >
                                        <a href={largeImage.Navurl}>
                                            <LazyImage
                                                mx="auto"
                                                alt={largeImage?.title}
                                                src={largeImage?.imgUrl}
                                                height={
                                                    width < 400 ? 480 : "345px"
                                                }
                                                width={width < 600 ? 600 : width > 1440 ? 590 : 500}
                                                //objectFit="cover"
                                                priority={true}
                                                className="productImage"
                                                fullWidth
                                            ></LazyImage>
                                        </a>
                                    </Box>
                                )}
                            </>
                        );
                    })}
                    {newCheckListLifestyle?.map((largeImage, largeInd) => {
                        return (
                            <>
                                {largeImage?.id === 3 && (
                                    <Box key={largeInd} >
                                        <a href={largeImage.Navurl}>
                                            <LazyImage
                                                mx="auto"
                                                alt={largeImage?.title}
                                                src={largeImage?.imgUrl}
                                                height={
                                                    width < 400 ? 480 : "345px"
                                                }
                                                width={width < 600 ? 600 : width > 1440 ? 590 : 500}
                                                //objectFit="cover"
                                                priority={true}
                                                className="productImage"
                                                fullWidth
                                            ></LazyImage>
                                        </a>
                                    </Box>
                                )}
                            </>
                        );
                    })}
                </Box>
                <Box className="right">
                    {newCheckListLifestyle?.map((largeImage, largeInd) => {
                        return (
                            <>
                                {largeImage?.id === 4 && (
                                    <Box key={largeInd} >
                                        <a href={largeImage.Navurl}>
                                            <LazyImage
                                                mx="auto"
                                                alt={largeImage?.title}
                                                src={largeImage?.imgUrl}
                                                height={
                                                    width < 400 ? 480 : "345px"
                                                }
                                                width={width < 600 ? 600 : width > 1440 ? 590 : 500}
                                                //objectFit="cover"
                                                priority={true}
                                                className="productImage"
                                                fullWidth
                                            ></LazyImage>
                                        </a>
                                    </Box>
                                )}
                            </>
                        );
                    })}
                    {newCheckListLifestyle?.map((largeImage, largeInd) => {
                        return (
                            <>
                                {largeImage?.id === 5 && (
                                    <Box key={largeInd} >
                                        <a href={largeImage.Navurl}>
                                            <LazyImage
                                                mx="auto"
                                                alt={largeImage?.title}
                                                src={largeImage?.imgUrl}
                                                height={
                                                    width < 400 ? 480 : "345px"
                                                }
                                                width={width < 600 ? 600 : width > 1440 ? 590 : 500}
                                                //objectFit="cover"
                                                priority={true}
                                                className="productImage"
                                                fullWidth
                                            ></LazyImage>
                                        </a>
                                    </Box>
                                )}
                            </>
                        );
                    })}
                </Box>
                </div>
            </Layout>
        </BeautyBox>
    );
};

export default BeautyAndCosmetics;

const newCheckListLifestyle = [

    {
        imgUrl:
            "https://storage.googleapis.com/asp-pprd-images-bucket/Beauty%26Cosmetics%20/beauty1.png",
        Navurl: "/product/search/beauty-3",
        title: "Onam Mens Sale",
        id: 1
    },
    {
        imgUrl: "https://storage.googleapis.com/asp-pprd-images-bucket/Beauty%26Cosmetics%20/beauty2.png",
        Navurl: "/product/search/organic-soap-672",
        title: "Onam Sale",
        id: 2
    },
    {
        imgUrl:
            "https://storage.googleapis.com/asp-pprd-images-bucket/Beauty%26Cosmetics%20/beauty3.png",
        Navurl: "/store/vishara-skin-care-28",
        title: "Gadgets",
        id: 3
    },
    {
        imgUrl: "https://storage.googleapis.com/asp-pprd-images-bucket/Beauty%26Cosmetics%20/beauty4.png",
        Navurl: "/store/vishara-skin-care-28",
        title: "Onam Sale",
        id: 4
    },
    {
        imgUrl:
            "https://storage.googleapis.com/asp-pprd-images-bucket/Beauty%26Cosmetics%20/beauty5.png",
        Navurl: "/product/search/beauty-3",
        title: "Gadgets",
        id: 5
    },

];