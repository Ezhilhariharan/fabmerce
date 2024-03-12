import Accordion from "components/accordion/Accordion";
import AccordionHeader from "components/accordion/AccordionHeader";
import Header from "components/header/Header";
import MobileCategoryImageBox from "components/mobile-category-nav/MobileCategoryImageBox";
import MobileCategoryNavStyle from "components/mobile-category-nav/MobileCategoryNavStyle";
import MobileNavigationBar from "components/mobile-navigation/MobileNavigationBar";
import navigations from "data/navigations";
import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const MobileCategoryNav = () => {
  const [category, setCategory] = useState(null);
  const [subCatagories, setSubCatagories] = useState([]);

  const categories = useSelector((state) => state?.brandSlice?.catagoriesList);

  useEffect(() => {
    setSubCatagories(categories.filter((data, index) => index === 0));
  }, []);

  const handleCategoryClick = (clicked) => () => {
    setSubCatagories(categories.filter((data, index) => index === clicked));
    setCategory(clicked);
  };

  return (
    <MobileCategoryNavStyle>
      <Header className="header" />
      <div className="main-category-holder">
        {categories?.map((item, index) => (
          <Box
            className="main-category-box"
            borderLeft={`${category?.href === item.href ? "3" : "0"}px solid`}
            onClick={handleCategoryClick(index)}
            key={item.id}
          >
            <Typography
              className="ellipsis"
              textAlign="center"
              fontSize="11px"
              lineHeight="1"
            >
              {item.name}
            </Typography>
          </Box>
        ))}
      </div>
      <Box className="container">
        <Typography fontWeight="600" fontSize="15px" mb={2}>
          Recommended Categories
        </Typography>
        <Box mb={4}>
          <Grid container>
            {subCatagories?.map((item) =>
              item?.children?.map((child, childIndex) => {
                return (
                  <Grid item lg={12} md={12} sm={12} xs={12} key={child.id}>
                    {child?.children?.length > 0 ? (
                      <MobileCategoryImageBox
                        subMenus={child}
                        index={childIndex}
                      />
                    ) : (
                      <Link href={`/product/search/${child.slug}`}>
                        <div>
                          <MobileCategoryImageBox
                            subMenus={child}
                            index={childIndex}
                          />
                        </div>
                      </Link>
                    )}
                  </Grid>
                );
              })
            )}
          </Grid>
        </Box>
      </Box>

      <MobileNavigationBar />
    </MobileCategoryNavStyle>
  );
};

export default MobileCategoryNav;
