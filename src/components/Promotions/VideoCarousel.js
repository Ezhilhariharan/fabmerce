import Carousel from "components/carousel/ReelsCarousel";
import { Box, Container, Card } from "@mui/material";
import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import LazyImage from "components/LazyImage";
import useWindowSize from "hooks/useWindowSize";
const VideoCarousel = ({ promotion }) => {
  const windowSize = useWindowSize();
  const [height, setHeight] = useState();
  useEffect(() => {
    switch (true) {
      case windowSize > 1919:
        setHeight("930px");
        break;
      case windowSize > 1750:
        setHeight("850px");
        break;
      case windowSize > 1599:
        setHeight("775px");
        break;
      case windowSize > 1439:
        setHeight("700px");
        break;
      case windowSize > 1359:
        setHeight("670px");
        break;
      case windowSize > 1279:
        setHeight("630px");
        break;
      case windowSize > 1149:
        setHeight("570px");
        break;
      case windowSize > 1049:
        setHeight("520px");
        break;
      case windowSize > 1000:
        setHeight("490px");
        break;
      default:
        setHeight("100%");
        break;
    }
  }, [windowSize])
  return (
    <Fragment>
      <Carousel
        totalSlides={promotion?.length}
        visibleSlides={1}
        infinite={true}
        autoPlay={true}
        showDots={true}
        showArrow={false}
        dotGroupMarginTop={"0rem"}
        interval={10000}
      >
        {promotion.map((item, ind) => {
          return (
            <Box key={ind} sx={{ padding: "0px 40px 0 40px", marginBottom: windowSize < 1001 && "20px" }} mr={windowSize < 400 && "-20px"}>
              <Link href={item.Navurl}><a>
                <video
                  autoPlay
                  muted
                  playsInline
                  loop={true}
                  style={{ width: "100%", height: height, objectFit: "cover", borderRadius: "20px", }}
                  src={item?.videoURL}
                />
              </a></Link>
            </Box>
          );
        })}
      </Carousel>
    </Fragment>
  );
};

export default VideoCarousel;
