import React, { useState } from "react";
import FlexBox from "./FlexBox";
import BazarButton from "components/BazarButton";
import { Remove, Add } from "@mui/icons-material";
import { Box } from "@mui/material";
import { H3 } from "components/Typography";
const QuantityButtons = ({ quantity, setQuantity, products, productQuantityFromApi }) => {
  return (
    <Box alignItems="center" mb={4} display="flex">
      <Box>
        Quantity
      </Box>
      <FlexBox alignItems="center" sx={{
        p: "10px",
      }}>
        <BazarButton
          sx={{
            p: "5px",
          }}
          variant="outlined"
          size="small"
          color="primary"
          onClick={() => {
            setQuantity(quantity - 1);
          }}
          disabled={quantity === 1}
        >
          <Remove fontSize="small" />
        </BazarButton>
        <H3 fontWeight="600" mx={2.5} color={productQuantityFromApi ? "rgb(235,235,228)" : "black"}>
          {quantity.toString().padStart(2, "0")}
        </H3>
        <BazarButton
          sx={{
            p: "5px",
          }}
          variant="outlined"
          size="small"
          color="primary"
          onClick={() => {
            setQuantity(quantity + 1);
          }}
          disabled={
            productQuantityFromApi
              ? true
              : quantity === products
          }
        >
          <Add fontSize="small" />
        </BazarButton>
      </FlexBox>
    </Box>
  );
};

export default QuantityButtons;
