import React,{useState,useEffect} from "react";
import { Container, Grid,Button,Box } from "@mui/material";
import CategorySectionHeader from "../CategorySectionHeader";
import MoreProductCard from "../product-cards/MoreProductCard";
import { Pagination } from "@mui/material";
import { paginationCount } from "../../../helper/filters";
import {
  getMoreItems,
} from "utils/api/superstore-shop/sections";
import { StyledContainer } from "components/StyledContainer";
const MoreProduct = ({ moreItems }) => {
  const [Products, setProducts] = useState(moreItems?.data);
  const pageCount = paginationCount(moreItems?.count,12 );
  const [page , setPage] = useState()
  const handleChange = (event, value) => {
    setPage(value)
  };
  useEffect(()=>{
    
    if(page !==undefined){
      const response = getMoreItems(12,page)
      response.then((data)=>{
        setProducts(data.data);
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  },[page])

  return (
    <StyledContainer
      sx={{
        mb: "70px",
      }}
    >
      <CategorySectionHeader title="More For You"  />
      <Grid container spacing={3}>
        {Products?.map((item, ind) => (
          <Grid item lg={3} md={4} sm={6} xs={12} key={ind}>
            <MoreProductCard off={25} hoverEffect {...item} />
          </Grid>
        ))}
      </Grid>
      <Box mt={6} display="flex" justifyContent="center">
        <Pagination 
          count={pageCount}
          page={parseInt(page)||1}
          onChange={handleChange}
        />
{/*         
        {Count < Products?.length && <Button color="primary" variant="contained" onClick={onClickDiscovermore}>
          Load More...
        </Button>} */}
      </Box>
    </StyledContainer>
  );
};

export default MoreProduct;
