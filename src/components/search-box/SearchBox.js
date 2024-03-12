/* eslint-disable react-hooks/exhaustive-deps */
import SearchOutlined from "@mui/icons-material/SearchOutlined";
import { Box, Card, MenuItem, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { debounce } from "@mui/material/utils";
import Link from "next/link";
import React, { useCallback, useEffect, useRef, useState } from "react"; // styled components
import { getProductSearch } from "utils/api/layout-apis/layoutsAPI";
import BazarButton from "components/BazarButton";
// also used in the GrocerySearchBox component
import { useRouter } from "next/router";
import { grey } from "theme/themeColors";
import useWindowSize from "hooks/useWindowSize";
import Searchicon from "./Searchicon";
import "@fontsource/poppins";
export const SearchOutlinedIcon = styled(SearchOutlined)(({ theme }) => ({
  color: theme.palette.grey[600],
  marginRight: 6,
})); // also used in the GrocerySearchBox component

export const SearchResultCard = styled(Card)(({ windowSize }) => ({
  position: "absolute",
  marginTop: "30px",
  top: windowSize < 500 ? "12px" : "25px",
  paddingTop: "0.5rem",
  paddingBottom: "0.5rem",
  width: "100%",
  zIndex: 99,
}));
const InputBox = styled(Box)(({ windowSize }) => ({
  position: "relative",
      flex: "1 1 0",
      maxWidth: "670px",
      width: windowSize < 900 ? windowSize < 360 ? "240px" :  `${windowSize-100}px` : "490px",
      background: "#FFFFFF",
      border: "1px solid #072255",
      borderRadius: "8px",
      fontFamily: "Poppins,sans-serif",
      "& .placeHolderText input::placeholder": {
        fontSize: windowSize < 460 && "12.1px",
      }
}));

const SearchBox = () => {
  const [resultList, setResultList] = useState([]);
  const [searchKey, setSearchKey] = useState();
  const parentRef = useRef();
  const router = useRouter();
  const windowSize = useWindowSize();

  const search = debounce((e) => {
    const value = e.target?.value;
    setSearchKey(value);
    if (!value) setResultList([]);
    else {
      const res = getProductSearch(value);
      res
        .then((data) => {
          setResultList(data.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, 200);
  const hanldeSearch = useCallback((event) => {
    event.persist();
    search(event);
  }, []);

  const handleDocumentClick = () => {
    setResultList([]);
  };

  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => {
      window.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const hadleSearchPage = () => {
    if (searchKey) {
      router.push({
        pathname: `/product/search/${searchKey}`,
        query: { is_search: true },
      });
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      hadleSearchPage();
    }
  };
  return (
    <InputBox
      m={0}
      //mx="auto"
      height= {windowSize<500?"40px":"50px"}
      windowSize={windowSize}
      {...{
        ref: parentRef,
      }}
    >
      <TextField
        color={grey.searchFocus}
        placeholder="Search for products,brands and more"
        fullWidth
        onChange={hanldeSearch}
        autoComplete="off"
        onKeyDown={handleKeyDown}
        className="placeHolderText"
        InputProps={{
          sx: {
            overflow: "hidden",
            fontWeight: "400",
            fontSize: "16px",
            lineHeight: "21px",
            fontFamily: "Poppins,sans-serif"
          },
          endAdornment: (
            <BazarButton
              color="secondary"
              variant="contained"
              disableElevation
              sx={{
                left: "14px",
                height:windowSize<500?"40px":"50px",
                width: windowSize<500?"50px":"80px",
                borderRadius: "0px 8px 8px 0px",
              }}
              onClick={hadleSearchPage}
            >
              <Searchicon   />
            </BazarButton>
          ),
        }}
      />

      {!!resultList?.length && (
        <SearchResultCard elevation={2} windowSize={windowSize}>
          {resultList?.map((item, ind) => (
            <Link
              href={{
                pathname: `/product/${item.slug}`,
              }}
              key={ind}
              passHref
            >
              <MenuItem key={item}>
                <div style={{ overflow: "hidden", textOverflow: "ellipsis", fontFamily: "Poppins,sans-serif" }}>
                  {item.title}
                </div>
              </MenuItem>
            </Link>
          ))}
        </SearchResultCard>
      )}
    </InputBox>
  );
};

export default SearchBox;
