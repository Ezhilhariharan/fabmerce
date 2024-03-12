import Accordion from "components/accordion/Accordion";
import AccordionHeader from "components/accordion/AccordionHeader";
import FlexBox from "components/FlexBox";
import { H5, H6, Paragraph, Span } from "components/Typography";
import {
  Card,
  Checkbox,
  Divider,
  FormControlLabel,
  InputAdornment,
  Rating,
  TextField,
  Slider,
  Button
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import TreeviewCategories from "components/Treeview";
import { FlexContainer, RightMarginSpan, LeftMarginSpan } from "components/SliderContainers";
import { getCollectionCategories, getBrandsBasedOnSubCategoryId } from "utils/api/related-products/products";

export function valueText(value) {
  return value;
}

const ProductFilterCard = ({
  setMaxPrice,
  setMinPrice,
  categoriesLevel,
  collectionCategories,
  selectedBrands,
  setSelectedBrands,
  selectedCategory,
  setSelectedCategory,
  productList,
  collectionSlug,
  brandsId,
  brandsBasedOnSubCategory,
}) => {
  const [priceRange, setPriceRange] = useState(
    [productList?.min_price === productList?.max_price ? 0 : productList?.min_price, productList?.max_price]
  );
  const [brandsDisplay, setBrandsDisplay] = useState(brandsBasedOnSubCategory);
  const handleCategoryCheckBox = (event, category) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedCategory([
        ...selectedCategory,
        category
      ]);
      const subCategories = [...selectedCategory, category];
      const subCategoryId = subCategories?.map(cat => cat?.id);
      const res = getBrandsBasedOnSubCategoryId(collectionSlug, subCategoryId);
      res.then(data => {
        setBrandsDisplay(data);
      }).catch(err => console.log(err))
    }
    else {
      setSelectedCategory(selectedCategory?.filter(check => check?.id !== category?.id));
      const categoriesSelected = selectedCategory?.filter(check => check?.id !== category?.id);
      const subCategoryId = categoriesSelected?.map(cat => cat?.id);
      const res = getBrandsBasedOnSubCategoryId(collectionSlug, subCategoryId.length > 0 ? subCategoryId : "");
      res.then(data => {
        setBrandsDisplay(data);
      }).catch(err => console.log(err))
    }
  };

  const handleBrandsCheckBox = (event, brands) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedBrands([
        ...selectedBrands,
        brands
      ])
    }
    else {
      setSelectedBrands(selectedBrands?.filter(check => check?.id !== brands?.id))
    }
  };

  useEffect(() => {
    if (brandsId?.length > 0 && selectedCategory?.length>0) {
      const res = getCollectionCategories(collectionSlug, brandsId);
      res.then(data => {
        setSelectedCategory(data)
      }).catch(err => console.log(err));
    }
  }, [brandsId]);
  const handleSlider = (event, value) => {
    setPriceRange(value);
    const range = value;
    setMinPrice(productList?.min_price === productList?.max_price ? 0 : range[0]);
    setMaxPrice(productList?.min_price === productList?.max_price ? 0 : range[1]);
  };
  const resetAllCheckBox = () => {
    setSelectedCategory([]);
    setSelectedBrands([]);
    const categoriesSelected = []
    const subCategoryId = categoriesSelected?.map(cat => cat?.id);
    setPriceRange([productList?.min_price === productList?.max_price ? 0 : productList?.min_price, productList?.max_price]);
    setMaxPrice("");
    setMinPrice("");
    const res = getBrandsBasedOnSubCategoryId(collectionSlug, subCategoryId.length > 0 ? subCategoryId : "");
    res.then(data => {
      setBrandsDisplay(data);
    }).catch(err => console.log(err))
  };
  return (
    <Card
      sx={{
        p: "18px 27px",
        overflow: "auto",
      }}
      elevation={1}
    >

      {categoriesLevel?.length > 0 && !collectionCategories && (
        <div>
          <H6 mb={1.25}>Categories</H6>
          <TreeviewCategories data={categoriesLevel} />
        </div>
      )}

      {collectionCategories?.length > 0 &&
        <Box>
          <FlexBox alignItems="center" justifyContent="space-between" mb={2}>
            <H6>Categories</H6>
            <Button onClick={resetAllCheckBox}>Clear</Button>
          </FlexBox>
          {collectionCategories?.map(category => {
            let selected = !!selectedCategory?.filter(data => data.id === category.id)[0]?.id;
            return (
              <Box key={category?.id}>
                <Checkbox
                  color="info"
                  onChange={(event) => handleCategoryCheckBox(event, category)}
                  checked={selected}
                />
                <span>{category.name}</span>
              </Box>
            )
          }
          )}
        </Box>
      }

      <Divider
        sx={{
          mt: "18px",
          mb: "24px",
        }}
      />

      {brandsDisplay?.length > 0 && <Box>
        <H6 mb={2}>Brands</H6>
        {brandsDisplay?.map(brands => {
          let selected = !!selectedBrands?.filter(data => data.id === brands.id)[0]?.id;
          return (
            <Box key={brands?.name}>
              <Checkbox 
                color="info" 
                onChange={(event) => handleBrandsCheckBox(event, brands)}
                checked={selected}
              />
              <span>{brands.name}</span>
            </Box>
          )
        }
        )}
      </Box>}

      {brandsDisplay?.length > 0 && <Divider
        sx={{
          my: "1.5rem",
        }}
      />}

      <H6 mb={2}>Price Range</H6>
      <FlexBox justifyContent="center" alignItems="center">
        <FlexContainer>
          <RightMarginSpan>
            {productList?.min_price === productList?.max_price ? 0 : productList?.min_price}
          </RightMarginSpan>
          <Slider
            step={1}
            onChange={handleSlider}
            valueLabelDisplay="auto"
            value={priceRange}
            min={productList?.min_price === productList?.max_price ? 0 : productList?.min_price}
            max={productList?.max_price}
            color="info"
            getAriaValueText={valueText}
            disabled={productList?.min_price === productList?.max_price}
          />
          <LeftMarginSpan>{productList?.max_price}</LeftMarginSpan>
        </FlexContainer>
      </FlexBox>

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
      ))} */}

      {/* <Divider
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

export default ProductFilterCard;
