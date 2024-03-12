import Accordion from "components/accordion/Accordion";
import AccordionHeader from "components/accordion/AccordionHeader";
import FlexBox from "components/FlexBox";
import { H5, H6, Paragraph, Span } from "components/Typography";
import {
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  Rating,
  TextField,
  InputAdornment,
  Slider,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import TreeviewCategories from "components/Treeview";
import { FlexContainer, RightMarginSpan, LeftMarginSpan } from "components/SliderContainers";
import { valueText } from "./ProductFilterCard";

const SearchProductFilterCard = ({
  setMaxPrice, 
  setMinPrice,
  categoriesLevel,
  searchKey,
  searchProductList,
}) => {
  const [priceRange, setPriceRange] = useState(
    [
      searchProductList?.min_price === searchProductList?.max_price ? 0 : searchProductList?.min_price, 
      searchProductList?.max_price
    ]
  );
  const handleSlider = (event, value) => {
   setPriceRange(value);
   const range = value;
   setMinPrice(searchProductList?.min_price === searchProductList?.max_price ? 0 : range[0]);
  setMaxPrice(searchProductList?.min_price === searchProductList?.max_price ? 0 : range[1]);
  };
  return (
    <Card
      sx={{
        p: "18px 27px",
        overflow: "auto",
      }}
      elevation={1}
    >
      {searchKey==="new-arrivals" || searchKey==="trending-products" ?<H6 mb={1.25}>Filters</H6> :<H6 mb={1.25}>Categories</H6>}
      {categoriesLevel?.length>0&&
      <TreeviewCategories data={categoriesLevel} searchKey={searchKey}/>
      }

      <Divider
        sx={{
          mt: "18px",
          mb: "24px",
        }}
      />

      <H6 mb={2}>Price Range</H6>
      <FlexBox justifyContent="center" alignItems="center">
        <FlexContainer>
          <RightMarginSpan>
            {searchProductList?.min_price===searchProductList?.max_price ? 0 : searchProductList?.min_price}
          </RightMarginSpan>
          <Slider
            step={1}
            onChange={handleSlider}
            value={priceRange}
            valueLabelDisplay="auto"
            min={searchProductList?.min_price===searchProductList?.max_price ? 0 : searchProductList?.min_price}
            max={searchProductList?.max_price}
            disabled={searchProductList?.min_price === searchProductList?.max_price}
            getAriaValueText={valueText}
            color="info"
          />
          <LeftMarginSpan>{searchProductList?.max_price}</LeftMarginSpan>
        </FlexContainer>
      </FlexBox>
      <Divider
        sx={{
          my: "1.5rem",
        }}
      />

      {/* <H6 mb={2}>Brands</H6>
      {brandList.map((item) => (
        <FormControlLabel
          control={<Checkbox size="small" color="secondary" />}
          label={<Span color="inherit">{item}</Span>}
          sx={{
            display: "flex",
          }}
          key={item}
        />
      ))}

      <Divider
        sx={{
          my: "1.5rem",
        }}
      /> */}

      {/* {otherOptions.map((item) => (
        <FormControlLabel
          control={<Checkbox size="small" color="secondary" />}
          label={<Span color="inherit">{item}</Span>}
          sx={{
            display: "flex",
          }}
          key={item}
        />
      ))}

      <Divider
        sx={{
          my: "1.5rem",
        }}
      />

      <H6 mb={2}>Ratings</H6>
      {[5, 4, 3, 2, 1].map((item) => (
        <FormControlLabel
          control={<Checkbox size="small" color="secondary" />}
          label={<Rating size="small" value={item} color="warn" readOnly />}
          sx={{
            display: "flex",
          }}
          key={item}
        />
      ))}

      <Divider
        sx={{
          my: "1.5rem",
        }}
      />

      <H6 mb={2}>Colors</H6>
      <FlexBox mb={2}>
        {colorList.map((item) => (
          <Box
            sx={{
              bgcolor: item,
              height: "25px",
              width: "25px",
              mr: "10px",
              borderRadius: 300,
              cursor: "pointer",
            }}
            key={item}
          />
        ))}
      </FlexBox> */}
    </Card>
  );
};

const otherOptions = ["On Sale", "In Stock", "Featured"];
const colorList = [
  "#1C1C1C",
  "#FF7A7A",
  "#FFC672",
  "#84FFB5",
  "#70F6FF",
  "#6B7AFF",
];
export default SearchProductFilterCard;
