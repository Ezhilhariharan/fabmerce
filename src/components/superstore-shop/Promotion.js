import CarouselBanner from "components/carousel-cards/CarouselBanner";
import Carousel from "components/carousel/Carousel";
import { Box, Container, styled } from "@mui/material";
import { Fragment } from "react";
const StyledBox = styled(Box)(() => ({
  backgroundColor: "#FFFFFF",
  width: "100%",
 }));
const Promotion = ({ promotionBanners }) => {
  return (
    <Fragment>
        <StyledBox>
        <Carousel
            totalSlides={promotionBanners?.length}
            visibleSlides={1}
            infinite={true}
            autoPlay={true}
            showDots={true}
            showArrow={false}
            dotGroupMarginTop= {"1rem"}
          >
            {promotionBanners &&
              promotionBanners?.map((data, ind) => (
                <CarouselBanner carousel={data} key={ind} />
              ))}
          </Carousel>
        </StyledBox>
    </Fragment>
  );
};

export default Promotion;
