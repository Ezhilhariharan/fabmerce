import React from "react";
import { TextField, Container } from "@mui/material";
import { Box } from "@mui/system";
import BazarButton from "components/BazarButton";
import { SearchOutlinedIcon } from "components/search-box/SearchBox";

import { getBrands } from "utils/api/superstore-shop/sections";
import { useDispatch } from "react-redux";
import { updateBrands } from "store/brandSlice";
import { grey } from "theme/themeColors";

const BrandsSearchBar = () => {
  const dispatch = useDispatch();
  const searchBrand = (key) => {
    const res = getBrands(key);
    res
      .then((data) => {
        if (data.length > 0) {
          dispatch(updateBrands(data));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <Container>
      <Box className="searchBox">
        <TextField
          placeholder="Searching for..."
          fullWidth
          color={grey.searchFocus}
          InputProps={{
            sx: {
              height: 35,
              paddingRight: 0,
              width: 450,
              color: "grey.700",
              background: "grey.700",
              borderRadius: "300px"
              // "& fieldset": {
              //   border: "none",
              // },
            },
            endAdornment: (
              <BazarButton
              color="secondary"
              //variant="contained"
              disableElevation
              sx={{
                px: "1rem",
                height: "100%",
                borderRadius: "0 300px 300px 0",
                cursor: "default",
                "&:hover": {
                  background: "transparent"
                }
              }}
              disableRipple
            >
              <SearchOutlinedIcon fontSize="small" />
            </BazarButton>),
          }}
          onChange={(e) => {
            searchBrand(e.target.value);
          }}
        />
      </Box>
    </Container>
  );
};

export default BrandsSearchBar;
