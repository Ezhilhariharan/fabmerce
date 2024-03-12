import React from "react";
import FlexBox from "components/FlexBox";
import ProductCard1 from "components/product-cards/ProductCard1";
import { Grid,Typography } from "@mui/material";
import CustomPagination from "components/pagination/CustomPagination";

const SearchProductCardList = ({ productList, page, limit }) => {
  return (
    <div>
      
      <Grid container spacing={3}>
        {productList?.data?.map((item, ind) => (
          <Grid item lg={4} sm={6} xs={12} key={ind}>
            {item?.profile_photo && <ProductCard1 {...item} />}
          </Grid>
        ))}
      </Grid>
     {productList.count===0 &&(
      <Typography sx={{ mt:"50px",ml: "18rem" ,fontSize:"20px"}}>
      No products Found
    </Typography>
     )}
      <FlexBox
        flexWrap="wrap"
        justifyContent="center"
        alignItems="center"
        mt={4}
      >
        <CustomPagination
          page={page}
          count={productList?.count}
          limit={limit}
        />
      </FlexBox>
    </div>
  );
};

export default SearchProductCardList;
