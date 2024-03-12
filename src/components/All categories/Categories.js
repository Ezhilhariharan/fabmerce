import React, { useState } from "react";
import {
  Grid,
  styled,
  Typography,
  IconButton,
  Card,
  Box,
} from "@mui/material";
import CategoryBreadcrumbs from "./CategoryBreadcrumbs";
import { useSelector } from "react-redux";
import FlexBox from "components/FlexBox";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import MuiToggleButton from "@mui/material/ToggleButton";
import useWindowSize from "hooks/useWindowSize";
import FilterList from "@mui/icons-material/FilterList";
import Sidenav from "components/sidenav/Sidenav";
import LazyImage from "components/LazyImage";
import { FontFamilyBox } from "../../../pages/index";
import "@fontsource/poppins";
const ToggleButton = styled(MuiToggleButton)(({ selectedColor }) => ({
  border: "none",
  backgroundColor: selectedColor,
  "&.Mui-selected, &.Mui-selected:hover": {
    color: "#072255",
    backgroundColor: selectedColor,
    border: "none",
  },
  "&:hover": {
    backgroundColor: "transparent"
  }
}));
const Title = styled(Box)(() => ({
  fontWeight: "500",
  fontSize: "24px",
  color: "#000000",
  paddingLeft: "22px",
  paddingBottom: "15px",
}));
const SubTitle = styled(Box)(() => ({
  fontWeight: "400",
  fontSize: "16px",
  color: "#999999",
  paddingLeft: "22px",
  paddingBottom: "15px",
}));
const Title2 = styled(Box)(() => ({
  fontWeight: "500",
  fontSize: "20px",
  color: "#000000",
  paddingTop: "15px",
  // paddingLeft: "0px",
  // paddingRight: "10px",
}));
const Content = styled(Box)(() => ({
  fontWeight: "350",
  fontSize: "18px",
  color: "#000000",
  paddingBottom: "0px",
  paddingTop: "0px",
}));
const Boxes = styled(Box)(() => ({
  paddingLeft: "22px",
  width: "328px",
  minHeight: "419px",
  paddingRight: "22px",
  paddingTop: "22px",
  paddingBottom: "150px",
}));

const Title1 = styled(Box)(() => ({
  fontWeight: "500",
  fontSize: "18px",
  padding: "22px",
  borderBottom: "1px solid black",
  borderColor: "#F2F3F5",
}));
const StyledToggleButton = styled(ToggleButton)(() => ({
  textTransform: "capitalize",
  fontSize: "18px",
  lineHeight: "27px",
  fontFamily: "Poppins,sans-serif",
  "&.Mui-selected": {
    fontWeight: 600
  }
}));
const Categories = () => {
  const width = useWindowSize();
  const isTablet = width < 1024;
  const catagoriesList = useSelector(
    (state) => state?.brandSlice?.catagoriesList
  );
  const datas = catagoriesList?.map((a) => a);
  const val = datas[0]?.name;
  const [categories, setCategories] = useState(catagoriesList[0]);
  const [alignment, setAlignment] = useState(val);
  const totalCategories = catagoriesList
    ?.map(
      (category) =>
        category.name === val && category?.children?.map((b) => b?.children)
    )
    ?.flat()
    ?.flat();
  const totalCategories2 = catagoriesList
    ?.map(
      (category) =>
        category.name === val && category?.children?.map((b) => b?.name)
    )
    ?.flat()
    ?.flat();
  const result2 = totalCategories2?.filter(Boolean);
  const result = totalCategories?.filter(Boolean);
  const filterResult = (catItem) => {
    setCategories(catItem);
  };
  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };
  return (
    <FontFamilyBox mt={"5px"} mx={"20px"}>
      <Card sx={{ marginBottom: "5px" }}>
        <Grid container>
          <Grid xs={12}>
            <Title pt={"20.11px"}>Products For You</Title>
            <SubTitle>Showing Results</SubTitle>
            <CategoryBreadcrumbs />
            <FlexBox alignItem="end" justifyContent="end" pr={2}>
              {!!isTablet && (
                <Sidenav
                  pt={2}
                  pb={2}
                  handle={
                    <IconButton>
                      <FilterList fontSize="small" />
                    </IconButton>
                  }
                >
                  <Card
                    sx={{ width: "auto", height: "670px", display: "flex", overflowY: "auto" }}
                  >
                    <Grid container>
                      <Grid xs={12}>
                        <Title1>Categories</Title1>
                        <Boxes>
                          {catagoriesList?.map((category) => {
                            return (
                              <>
                                <Content
                                  sx={{
                                    border: "1px solid black",
                                    borderColor: "#F2F3F5",
                                  }}
                                  key={category?.id}
                                >
                                  <ToggleButtonGroup
                                    value={alignment}
                                    exclusive
                                    onChange={handleAlignment}
                                    aria-label="platform"
                                    key={category?.id}
                                    onClick={() => filterResult(category)}
                                  >
                                    <StyledToggleButton
                                      value={category?.name}
                                      selectedColor="#FFFFFF"
                                      aria-label="Platform"
                                      disableRipple
                                    >
                                      {category?.name}
                                    </StyledToggleButton>
                                  </ToggleButtonGroup>
                                </Content>
                              </>
                            );
                          })}
                        </Boxes>
                      </Grid>
                    </Grid>
                  </Card>
                </Sidenav>
              )}
            </FlexBox>
          </Grid>
        </Grid>
      </Card>
      <Box sx={{ display: "flex" }}>
        {width > 1024 && (
          <Box sx={{ width: "372px", minHeight: "670px", display: "flex", backgroundColor: "#FFFFFF" }}>
            <Grid container>
              <Grid xs={12}>
                <Title1>Categories</Title1>
                <Boxes>
                  {catagoriesList?.map((category) => {
                    return (
                      <>
                        <Content
                          sx={{
                            border: "1px solid black",
                            borderColor: "#F2F3F5",
                          }}
                          key={category?.id}
                        >
                          <ToggleButtonGroup
                            value={alignment}
                            exclusive
                            onChange={handleAlignment}
                            aria-label="platform"
                            key={category?.id}
                            onClick={() => filterResult(category)}
                          >
                            <StyledToggleButton
                              value={category?.name}
                              selectedColor="#FFFFFF"
                              aria-label="Platform"
                              disableRipple
                            >
                              {category?.name}
                            </StyledToggleButton>
                          </ToggleButtonGroup>
                        </Content>
                      </>
                    );
                  })}
                </Boxes>
              </Grid>
            </Grid>
          </Box>
        )}
        <Card sx={{ width: "100%", marginLeft: "3px" }}>
          <Grid container>
            <Grid xs={12}>
              <Box pl={"20px"} bgcolor="#FFFFFF" pt={"20px"} ml={3}>
                <Box>
                  {categories?.children?.length > 0 &&
                    categories?.children?.map((data, ind) => {
                      const childrenLength = data?.children?.length;
                      return (
                        <Box key={ind}>
                          {childrenLength > 0 &&
                            <Grid
                              container
                              columnSpacing={4}
                              display={width < 601 && "flex"}
                              justifyContent={width < 601 && "center"}
                            >
                              {width > 600 && <Grid item sm={4.5} pt={3} mx={1}>
                                <hr color="#000000" start="left" />
                              </Grid>}
                              <Grid
                                item
                                xs={2}
                                display="flex"
                                justifyContent="center"
                                alignContent="center"
                                pb={3}
                              >
                                <Title2><span className="horizontalLine">{data.name?.toUpperCase()}</span></Title2>
                              </Grid>
                              {width > 600 && <Grid item sm={4.5} pt={3}>
                                <hr color="#000000" start="right" />
                              </Grid>}
                            </Grid>}
                          <Grid container rowSpacing={1} columnSpacing={4}>
                            {data?.children?.map(child => {
                              return (
                                <Grid item>
                                  <a
                                    href={`/product/search/${child?.slug}`}
                                    key={child?.id}
                                  >
                                    {child?.profile_photo && <LazyImage
                                      src={child.profile_photo}
                                      width={"150px"}
                                      height={"199.53px"}
                                      alt={child.name}
                                    />}
                                    <Content sx={{ marginBottom: "30px", textAlign: "center", px: width < 600 && "5px" }}>
                                      {child.name}
                                    </Content>
                                  </a>
                                </Grid>
                              )
                            })}
                          </Grid>
                        </Box>
                      );
                    })}
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Card>
      </Box >
    </FontFamilyBox >
  );
};

export default Categories;
