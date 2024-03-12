import { Grid, Box, Typography } from "@mui/material";
import React from "react";
import { getBrands } from "utils/api/superstore-shop/sections";
import Link from "next/link";
import MobileBrandImage from "components/mobile-category-nav/MobileBrandsImage";
import NavbarLayout from "components/layout/NavbarLayout";
import Scrollbar from "components/Scrollbar";

const MobileBrands = (props) => {
  const { brandList } = props;
  return (
    <NavbarLayout>
      <Box className="container">
        <Typography fontWeight="600" fontSize="15px" mb={2}>
          Top Brands
        </Typography>
        <Scrollbar>
          <Box mb={3}>
            <Grid container spacing={2}>
              {brandList.map((item, ind) => (
                <Grid item lg={1} md={2} sm={3} xs={4} key={ind}>
                  <Link href={`/store/${item?.slug}`}>
                    <a href={`/store/${item?.slug}`}>
                      <MobileBrandImage {...item} />
                    </a>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Scrollbar>
      </Box>
    </NavbarLayout>
  );
};

export async function getStaticProps() {
  const brandList = await getBrands();
  return {
    props: {
      brandList,
    },
  };
}
export default MobileBrands;
