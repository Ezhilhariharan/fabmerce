import { Box, Grid, ListItem, styled, Divider } from "@mui/material";
import BazarCard from "components/BazarCard";
import FlexBox from "components/FlexBox";
import NavLink from "components/nav-link/NavLink";
import React from "react";
import BrandsSearchBar from "./BrandsSearchBar";
import { Paragraph } from "components/Typography";
import { paste, grey } from "theme/themeColors";
import useWindowSize from "hooks/useWindowSize";

const Wrapper = styled(Box)(({ theme }) => ({
  cursor: "pointer",
  position: "relative",
  transition: "color 150ms ease-in-out",
  ":hover": {
    color: theme.palette.primary.main,
    "& .menu-list": {
      display: "block",
    },
  },
}));
const MenusContainer = styled(ListItem)(({ theme }) => ({
  zIndex: 2,
  top: "100%",
  minWidth: 1000,
  display: "none",
  position: "absolute",
  transform: `translate(-75%, 0%)`,
  [theme.breakpoints.down(1070)]: {
    minWidth: 800,
  },
}));

const BrandMegaMenu = ({ title, menuList }) => {
  const windowSize = useWindowSize();
  return (
    <Wrapper sx={{ "&:hover": { color: paste.contrastText} }}>
      <FlexBox alignItems="flex-end" gap={0.3}>
        {title}
      </FlexBox>

      <MenusContainer className="menu-list">
        <BazarCard
          elevation={3}
          sx={{
            overflow: "hidden",
          }}
        >
          <div>
            <Box mt={2}><BrandsSearchBar /></Box>
            <Divider
              sx={{
                my: "1rem",
              }}
            />
            <Paragraph
              fontWeight="600"
              textAlign="left"
              flex="1 1 0"
              ml={4}
              color="grey.600"
            >
              Top Brands
            </Paragraph>
            <Grid
              container
              sx={{
                margin:3,
                maxHeight: windowSize < 1070 ? "350px" : "450px", overflow: "auto",
                "::-webkit-scrollbar": {
                  width: "6px",
                  height: "10px",
                },
                "::-webkit-scrollbar-thumb": {
                  background: grey[600]
                }
                
              }}>
              {menuList?.map((category, key) => {
                return (
                  <Grid
                    item
                    md={3}
                    lg={3}
                    key={key}
                    sx={{
                      ":nth-of-type(odd)": {
                        backgroundColor: "grey.100",
                      },
                      fontWeight: "400",
                      fontSize: "14px",
                    }}
                  >
                    <NavLink href={`/store/${category?.slug}`} sx={{marginLeft:"20px"}}>{category?.name}</NavLink>
                  </Grid>
                )
              })}
            </Grid>
          </div>
        </BazarCard>
      </MenusContainer>
    </Wrapper >
  );
};

export default BrandMegaMenu;
