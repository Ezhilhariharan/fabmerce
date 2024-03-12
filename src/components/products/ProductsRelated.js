import { Grid, Box,Card ,styled} from "@mui/material";
import Carousel from "components/carousel/Carousel";
import React, { useEffect, useState } from "react";
import useWindowSize from "hooks/useWindowSize";
import ProductCard1 from "components/product-cards/ProductCard1";
import { H2} from "components/Typography";

const ProductsRelated = ({ productList}) => {
  const [visibleSlides, setVisibleSlides] = useState(6);
  const width = useWindowSize();
  useEffect(() => {
    if (width < 464) setVisibleSlides(1);
    else if (width < 710) setVisibleSlides(2);
    else if (width < 950) setVisibleSlides(3);
    else setVisibleSlides(4);
  }, [width]);
  return (
      <Card  sx={{maxHeight:450}}>
      <H2 sx={{m:"5px 0px 5px 30px"}}>Similar Products</H2>
      <Box>
        <Carousel
          totalSlides={productList?.data?.count}
          visibleSlides={visibleSlides}
        >
          {productList?.data.map((item, ind) => {
            return (
              <Box>
                <Grid item lg={3} md={4} sm={6} xs={12} key={ind}> 
                  <ProductCard1 {...item} />
                </Grid>
              </Box>
            );
          })}
        </Carousel>
      </Box>
    
    </Card>
    
  );
};

export default ProductsRelated;
