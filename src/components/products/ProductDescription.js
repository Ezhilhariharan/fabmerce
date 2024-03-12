import { H3 } from "components/Typography";
import { Box, styled } from "@mui/material";
import React from "react";
import { StyledList } from "./ProductIntro";


const ProductDescription = ({ description }) => {
  const removeTag = /(<([^>]+)>)/ig;
  const descriptionWithTagRemoved = description?.replace(removeTag, '');
  const descriptionArray = descriptionWithTagRemoved?.split(".");
  return (
    <Box>
      <H3 mb={2}>Specification:</H3>
      <Box fontSize="16px">
        <ul>
          {descriptionArray?.slice(0, descriptionArray.length - 1).map((resolvedDescription, ind) =>
            <StyledList key={ind}>{resolvedDescription}{"."}</StyledList>
          )}
        </ul>
      </Box>
    </Box>
  );
};

export default ProductDescription;
