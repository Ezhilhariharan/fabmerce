import React from "react";
import FlexBox from "components/FlexBox";
import { Paragraph } from "components/Typography";
import { useSelector } from "react-redux";
import BrandMegaMenu from "./BrandMegaMenu";

const BrandContainer = ({ setCloseCategory }) => {
  const brandList = useSelector((state) => state?.brandSlice?.brandList);
  const brandData = [
    {
      title: "Brands",
      children: brandList,
    },
  ];

  const renderNestedNav = (list = [], isRoot = false) => {
    return list.map((nav) => {
      if (isRoot) {
        if (list) {
          return (
            <BrandMegaMenu
              key={nav?.title}
              title={nav?.title}
              menuList={nav?.children}
            />
          );
        }
      }
    });
  };

  return (
    <FlexBox
      position="relative"
      flexDirection="column"
      alignItems="center"
      sx={{
        "&:hover": {
          "& > .child-nav-item": {
            display: "block",
          },
          //background: "#f1f1f1",
        },
        cursor: "pointer",
        py: "0.4rem",
        ml: "0.5rem",
      }}
      onMouseEnter={() => setCloseCategory(true)}
      onMouseLeave={() => setCloseCategory(false)}
    >
      <Paragraph
        fontWeight="600"
        textAlign="left"
        flex="1 1 0"
        mx={1.25}
        color="#FFFFFF"
      >
        <div>{renderNestedNav(brandData, true)}</div>
      </Paragraph>
    </FlexBox>
  );
};

export default BrandContainer;
