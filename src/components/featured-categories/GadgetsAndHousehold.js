import { styled, Box } from "@mui/material";
import Carousel from "components/carousel/Carousel";
import FlexBox from "components/FlexBox";
import LazyImage from "components/LazyImage";
import React, { useEffect, useState } from "react";
import { HeaderCategories } from "./FeaturedCategories";
import defaultGadgets from "../../../public/assets/images/featured-categories/smartWatch.svg";
import useWindowSize from "hooks/useWindowSize";

const GadgetBox = styled(Box)(() => ({
    backgroundColor: " #FFFFFF",
}));
const TextContainer = styled(Box)(({ screenWidth }) => ({
    font: "Poppins",
    fontWeight: "400",
    fontSize: screenWidth < 625 ? "12px" : "18px",
    lineHeight: "27px",
    textAlign: "center"
}));

export const GadgetsAndHousehold = ({ subChildrens, title }) => {
    const screenWidth = useWindowSize();
    const [gadgetSlides, setGadgetSlides] = useState(7);
    useEffect(() => {
        switch (true) {
            case screenWidth < 260:
                setGadgetSlides(1);
                break;
            case screenWidth < 365:
                setGadgetSlides(2);
                break;
            case screenWidth < 475:
                setGadgetSlides(3);
                break;
            case screenWidth < 600:
                setGadgetSlides(4);
                break;
            case screenWidth < 625:
                setGadgetSlides(5);
                break;
            case screenWidth < 850:
                setGadgetSlides(3);
                break;
            case screenWidth < 1025:
                setGadgetSlides(4);
                break;
            case screenWidth < 1300:
                setGadgetSlides(5);
                break;
            case screenWidth < 1450:
                setGadgetSlides(6);
                break;
            default:
                setGadgetSlides(7);
                break;
        }
    }, [screenWidth])
    return (
        <GadgetBox my={"5px"} pb={screenWidth < 625 ? "5px" : "55px"}>
            <HeaderCategories pb={"10px"} pt={"15px"} screenWidth={screenWidth}>{title}</HeaderCategories>
            <Box pr={"20px"} ml={screenWidth > 1600 && screenWidth < 1801 ? "-10px" : screenWidth > 1800 ? "-30px" : "0px"}>
                <Carousel
                    totalSlides={subChildrens?.length}
                    visibleSlides={gadgetSlides}
                    showArrow={subChildrens?.length > gadgetSlides}
                    arrowLeft={screenWidth > 1600 && screenWidth < 1801 ? "1.2rem" : screenWidth > 1800 ? "2rem" : "1rem"}
                >
                    {subChildrens?.map((gadget) => {
                        return (
                            <a href={`/product/search/${gadget.slug}`} key={gadget.slug}>
                                <FlexBox
                                    alignItems="center"
                                    justifyContent="center"
                                    flexDirection="column"
                                    mt={"20px"}
                                >
                                    {gadget?.profile_photo && <LazyImage
                                        src={gadget.profile_photo || defaultGadgets}
                                        width={screenWidth < 625 ? "100px" : "180px"}
                                        height={screenWidth < 625 ? "128px" : "230px"}
                                        alt={gadget.name}
                                    />}
                                    <TextContainer mt={"20px"} screenWidth={screenWidth}>{gadget.name}</TextContainer>
                                </FlexBox>
                            </a>
                        )
                    })}
                </Carousel>
            </Box>
        </GadgetBox>
    )
}