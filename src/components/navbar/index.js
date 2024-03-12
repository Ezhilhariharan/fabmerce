import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import FlexBox from "components/FlexBox";
import NavLink from "components/nav-link/NavLink";
import Scrollbar from "components/Scrollbar";
import { H6 } from "components/Typography";
import { useState } from "react";
import { paste } from "theme/themeColors";
import {
  CategoryList,
  CategoryListItem,
  MenusContainer,
  StyledCard,
  SubCategoryList,
  SubCategoryListItem,
  Wrapper,
} from "./styles";

const MoreMenu = ({ menuList, setClose, setCloseOnClick, closeOnClickLink }) => {
  //const { settings } = useSettings();
  const [openList, setOpenList] = useState(menuList[0]?.name);
  const categories = menuList?.reduce((prev, curr) => [...prev, curr.name], []);
  const subMenus = menuList?.find((item) => item.name === openList);
  const [saveIndex, setSaveIndex] = useState(0);
  const [open, setOpen] = useState({
    0: true
  });

  const iconHandler = (item, index) => {
    setOpenList(item);
    switch (index) {
      case index:
        setSaveIndex(index);
        setOpen({ [index]: !open[index] })
        break;
      default:
        setOpen({ 0: true })
    }
  }

  return (
    <Wrapper>
      <FlexBox alignItems="flex-end" gap={0.3}>
        <Button
          sx={{ fontWeight: 400, color: paste.black }}
          onMouseEnter={() => {
            setClose({});
            setCloseOnClick(true);
          }}
          onClick={() => {
            setClose({});
            setCloseOnClick(true);
          }}
        >
          More Categories
          <ExpandMore fontSize="small" />
        </Button>
      </FlexBox>

      {closeOnClickLink && <MenusContainer className="menu-list">
        <StyledCard sx={{paddingBottom: "10px"}}>
          <CategoryList>
            {categories?.map((item, index) => (
              <CategoryListItem
                key={index}
                active={openList === item ? 1 : 0}
                onMouseEnter={() => iconHandler(item, index)}
                onClick={() => iconHandler(item, index)}
              >
                {item}
                {open[index] ? <ExpandMore /> : <ExpandLess sx={{ transform: "rotate(90deg)" }} />}
              </CategoryListItem>
            ))}
          </CategoryList>

          <Scrollbar
            autoHide={false}
            style={{
              width: "100%",
            }}
          >
            <Box px={6} py={2} height="auto">
              { subMenus?.children?.length>0 &&subMenus?.children?.map((item, key) => {
                return (
                  <Box key={key}>
                    <Box mb={2}>
                      <a onClick={() => setCloseOnClick(false)}>
                        <NavLink
                          href={`/product/search/${item.slug}`}
                          sx={{ fontWeight: "600" }}
                        >
                          {item.name}
                        </NavLink>
                      </a>
                    </Box>

                    <SubCategoryList>
                      {item?.children?.map((sub, key) => {
                        return (
                          <NavLink
                            href={`/product/search/${sub.slug}`}
                            key={key}
                          >
                            <SubCategoryListItem onClick={() => setCloseOnClick(false)}>
                              {sub.name}
                            </SubCategoryListItem>
                          </NavLink>
                        );
                      })}
                    </SubCategoryList>
                  </Box>
                );
              })}
            </Box>
          </Scrollbar>
        </StyledCard>
      </MenusContainer>}
    </Wrapper>
  );
};

export default MoreMenu;
