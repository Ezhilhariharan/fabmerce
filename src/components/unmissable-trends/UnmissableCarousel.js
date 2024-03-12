import Link from "next/link";
import { Box, styled, Card } from "@mui/material";
import LazyImage from "components/LazyImage";
import useWindowSize from "hooks/useWindowSize";
import Carousel from "components/carousel/Carousel";
import React, { useEffect, useState } from "react";

const UnmissableCarousel = ({ clothingList }) => {
    const [visibleSlides, setVisibleSlides] = useState(5);
    const width = useWindowSize();
    useEffect(() => {
        if (width < 600) setVisibleSlides(2);
        else if (width < 801) setVisibleSlides(3);
        else if (width < 1100) setVisibleSlides(4);
        else if (width < 1500) setVisibleSlides(5);
        else if (width < 1700) setVisibleSlides(6);
        else setVisibleSlides(7);
    }, [width]);
    return (
        <Carousel
            totalSlides={clothingList?.length}
            visibleSlides={visibleSlides}
            arrowLeft={"0.625rem"}
        >
            {clothingList?.map((item) => (
                <Box py={0.5} key={item?.id} mt={3} mb={3} mx={2}>
                    <Link href={`/product/search/${item?.slug}`}>
                        <a>
                            {item?.profile_photo && <LazyImage
                                src={item?.profile_photo}
                                width={`${123 * 2}px`}
                                height={`${140 * 2}px`}
                                //layout={ "responsive"}
                                alt={item?.name}
                                priority
                                borderRadius="15px"
                            />}
                        </a>
                    </Link>
                </Box>
            ))}
        </Carousel>
    )
}

export default UnmissableCarousel;
