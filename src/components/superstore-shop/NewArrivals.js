import Link from "next/link";
import { Box } from "@mui/material";
import FlexBox from "components/FlexBox";
import HoverBox from "components/HoverBox";
import { H4 } from "components/Typography";
import BazarCard from "components/BazarCard";
import LazyImage from "components/LazyImage";
import NewArrival from "components/icons/NewArrival";
import useWindowSize from "hooks/useWindowSize";
import Carousel from "components/carousel/Carousel";
import React, { Fragment, useEffect, useState } from "react";
import CategorySectionCreator from "../CategorySectionCreator";
import { Grid } from "@mui/material";
import { primary } from "theme/themeColors";

const NewArrivals = ({ newArrivalsProduct, format, currency }) => {
  const [visibleSlides, setVisibleSlides] = useState(6);
  const width = useWindowSize();
  useEffect(() => {
    if (width < 464) setVisibleSlides(1);
    else if (width < 710) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(4);
  }, [width]);

  const formatter = new Intl.NumberFormat(format, {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return ( 
    <CategorySectionCreator
      icon={<NewArrival />}
      title="New Arrivals"
      seeMoreLink="/product/search/new-arrivals"
    >
      <Box my="-0.25rem">
        <Carousel
          totalSlides={newArrivalsProduct?.data?.count}
          visibleSlides={visibleSlides}
        >
          {newArrivalsProduct?.data?.map((item, ind) => (
            <Fragment key={ind}>
              {item.profile_photo && (
                <Box py={0.5} key={item.id}>
                  <BazarCard
                    sx={{
                      p: "1rem",
                    }}
                  >
                    <Link
                      href={{
                        pathname: `/product/${item?.slug}`,
                      }}
                      key={item.id}
                    >
                      <a>
                        <HoverBox borderRadius="8px" mb={1}>
                          <LazyImage
                            src={item.profile_photo}
                            width={100}
                            height={100}
                            layout="responsive"
                            alt={item.title}
                            priority
                          />
                        </HoverBox>
                        <H4
                          fontWeight="600"
                          fontSize="14px"
                          mb={0.5}
                          ellipsis
                          sx={{ textAlign: "center" }}
                        >
                          {item.title}
                        </H4>
                        {item?.pricings?.max_price !== 0 && (
                          <FlexBox justifyContent={"center"}>
                            <Fragment>
                              {/*<H4
                            fontWeight="600"
                            fontSize="14px"
                            color="primary.main"
                            mr={1}
                          >
                            {formatter?.format(item?.max_price).replace(/^(\D+)/, '$1 ')}
                          </H4>
                          {item?.discount_price && 
                            <H4 fontWeight="600" fontSize="14px" color="grey.600" sx={{textAlign: "center"}}>
                            <del>
                              {formatter?.format(item?.discount_price).replace(/^(\D+)/, '$1 ')}
                            </del>
                          </H4>}*/}
                              {item?.pricings?.discount_price === "undefined" ||
                              item?.pricings?.discount_price === "null" ||
                              !item?.pricings?.discount_price || !!item?.pricings?.is_primary ? (
                                <H4
                                  sx={{ color: primary[500] }}
                                  mb={0.5}
                                  lineHeight="1"
                                >
                                  ₹ {item?.max_price?.toFixed(2)}
                                </H4>
                              ) : (
                                <FlexBox sx={{ verticalAlign: "middle" }}>
                                  <H4 sx={{ color: primary[500] }} mt={-0.5}>
                                    ₹{" "}
                                    {item?.pricings?.discount_price?.toFixed(2)}
                                    &nbsp;&nbsp;
                                    <span style={{ fontSize: "13px" }}>
                                      <del
                                        style={{
                                          fontWeight: "600",
                                          color: "#7D879C",
                                        }}
                                      >
                                        ₹ {item?.max_price.toFixed(2)}
                                      </del>
                                      <span
                                        style={{
                                          color: "#388e3c",
                                          fontWeight: "800",
                                        }}
                                      >
                                        (-{item?.pricings?.discount_value}%)
                                      </span>
                                    </span>
                                  </H4>
                                </FlexBox>
                              )}
                            </Fragment>
                          </FlexBox>
                        )}
                      </a>
                    </Link>
                  </BazarCard>
                </Box>
              )}
            </Fragment>
          ))}
        </Carousel>
      </Box>
    </CategorySectionCreator>
  );
};

export default NewArrivals;
