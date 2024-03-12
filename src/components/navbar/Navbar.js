import BazarCard from "components/BazarCard";
import FlexBox from "components/FlexBox";
import NavLink from "components/nav-link/NavLink";
import {
  Box,
  Button,
  Card,
  Container,
  Divider,
  Grid,
  MenuItem,
  Paper,
  Popper,
  styled,
} from "@mui/material";
import React, { Fragment, useEffect, useRef, useState } from "react"; // component props interface
import MoreMenu from "./index";
import BrandContainer from "components/brands/BrandContainer";
import useWindowSize from "hooks/useWindowSize";
import { useSelector } from "react-redux";
import { ExpandMore } from "@mui/icons-material";
import { useRouter } from "next/router";
import {
  CategoryButton,
  CategoryPopover,
  CategoryPapper,
  CategoryMenu,
  SubCategoryParentBox,
  PopOverGridItem,
  BoxBorder,
  MatrixBorder,
  ChildBox,
} from "./CategoryContainersHeaders";
import { CategoryList } from "./styles";
import brandIcon from "../../../public/assets/images/shop.svg";
import { blue } from "theme/themeColors";
import CategoryIcon from "components/All categories/CategoryIcon";
import Link from "next/link";
import { FontFamilyBox } from "../../../pages";
import "@fontsource/poppins";
// const common css style

const NavBarWrapper = styled(BazarCard)(({ theme }) => ({
  display: "block",
  position: "relative",
  height: "80px",
  borderRadius: "0px",
  background: "#072255",
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));
const InnerContainer = styled(Container)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  height: "100%",
  width: "100%",
  //marginLeft: "305px",
}));
const BrandBox = styled(Box)(() => ({
  font: "Poppins",
  fontWeight: "500",
  lineHeight: "24px",
  fontSize: "16px",
  color: blue.contrastText,
}));
const AllCategoriesFlexBox = styled(FlexBox)(() => ({
  background: "#FFFFFF",
  borderRadius: "8px",
  height: "40px",
  justifyContent: "space-around",
  marginLeft: "30px",
}));

const Navbar = ({ navListOpen, hideCategories, ...props }) => {
  const catagoriesList = useSelector(
    (state) => state?.brandSlice?.catagoriesList
  );
  const [saveIndex, setSaveIndex] = useState("");
  const [open, setOpen] = useState({
    [saveIndex]: false,
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [closeSubCategoryWhenBrandHovered, setCloseCategory] = useState(false);
  const popoverRef = useRef(open[saveIndex]);
  popoverRef.current = open[saveIndex];
  const windowSize = useWindowSize();
  const router = useRouter();

  const collapseContent = (index) => {
    setSaveIndex(index);
    setOpen({ [index]: !open[index] });
  };

  const selectHandler = (e, index) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
    switch (index) {
      case index:
        collapseContent(index);
        break;
      default:
        setOpen({});
    }
  };

  const selectMouseLeave = ( index) => {
    switch (index) {
      case index:
        collapseContent(index);
        break;
      default:
        setOpen({});
    }
  };

  const handleDocumentClick = () => {
    if (popoverRef.current) {
      setOpen(false);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  useEffect(() => {
    window.addEventListener("click", handleDocumentClick);
    return () => {
      window.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  useEffect(() => {
    setOpen({});
  }, [closeSubCategoryWhenBrandHovered]);

  return (
    <FontFamilyBox>
      <NavBarWrapper
        elevation={2}
        hoverEffect={false}
      >
        <InnerContainer onMouseLeave={() => setOpen({})}>
          {catagoriesList?.slice(0, 7)?.map((category, index) => {
            return (
              <Fragment key={category.id}>
                <CategoryButton
                  className="categoryButton"
                  onClick={(e) => selectHandler(e, index)}
                  onMouseEnter={(e) => selectHandler(e, index)}
                  id={index === 1 ? "poppperButton" : null}
                >
                  {category.name}
                  <ExpandMore fontSize="small" />
                </CategoryButton>
                <CategoryPopover
                  open={open[index] || false}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  aria-labelledby="composition-button"
                  id="poppperButton"
                  disablePortal={true}
                  placement="bottom-start"
                >
                  <CategoryPapper open={open[index]} index={index}>
                    <Grid container>
                      {category?.children?.length > 0 &&
                        category?.children?.map((subMenu, subIndex) => {
                          const subMenuChild = subMenu?.children;
                          let matrix = [],
                            i;
                          let k = -1;
                          let totalLength = subMenuChild?.length;
                          let matrixLength = Math.ceil(totalLength / 8);
                          for (i = 0; i < totalLength; i++) {
                            if (i % 8 === 0) {
                              k++;
                              matrix[k] = [];
                            }
                            matrix[k].push(subMenuChild[i]);
                          }
                          return (
                            <PopOverGridItem item key={subMenu?.id}>
                              <BoxBorder
                                lesserLength={category?.children?.length === 1}
                              >
                                <NavLink
                                  href={`/product/search/${subMenu.slug}`}
                                >
                                  <SubCategoryParentBox
                                    ml="20px"
                                    matrixLength={matrix?.length}
                                  >
                                    {subMenu?.name}
                                  </SubCategoryParentBox>
                                </NavLink>
                              </BoxBorder>
                              <ChildBox evenColor={subIndex % 2 === 1}>
                                <Grid container pt="10px">
                                  {matrix?.map((mat, matIndex) => (
                                    <MatrixBorder item key={matIndex}>
                                      {mat?.map((child) => (
                                        <Box
                                          mb="11px"
                                          ml="20px"
                                          key={child?.id}
                                        >
                                          <a
                                            href={`/product/search/${child?.slug}`}
                                          >
                                            <CategoryMenu
                                              fontWeight="400"
                                              color={"#000000"}
                                              py="2px"
                                              disableRipple
                                              greaterLength={
                                                child?.name?.length > 16
                                              }
                                            >
                                              {child?.name}
                                            </CategoryMenu>
                                          </a>
                                        </Box>
                                      ))}
                                    </MatrixBorder>
                                  ))}
                                </Grid>
                              </ChildBox>
                            </PopOverGridItem>
                          );
                        })}
                    </Grid>
                  </CategoryPapper>
                </CategoryPopover>
              </Fragment>
            );
          })}
          {windowSize > 1050 && (
            <a href="/allbrands">
              <FlexBox
                pl={windowSize > 1400 && "39px"}
                sx={{
                  display: {
                    xs: "none",
                    md: "flex",
                  },
                }}
                onMouseEnter={() => setOpen({})}
              >
                <img src={brandIcon}></img>
                <BrandBox pl={"5px"}>Brands</BrandBox>
              </FlexBox>
            </a>
          )}
          {windowSize > 1050 && <AllCategoriesFlexBox onMouseEnter={() => setOpen({})}>
            {windowSize > 1250 ? (
              <Link href={"/Allcategories"}>
              <a>
              <Button sx={{ width: "170px", justifyContent: "space-evenly", fontFamily: "Poppins,sans-serif" }}>
                <CategoryIcon />
                All Categories
              </Button>
              </a>
              </Link>
            ) : (
              <Link href={"/Allcategories"}>
                <Button>
                  <CategoryIcon />
                </Button>
              </Link>
            )}
          </AllCategoriesFlexBox>}
        </InnerContainer>
      </NavBarWrapper>
    </FontFamilyBox>
  );
};

export default Navbar;
