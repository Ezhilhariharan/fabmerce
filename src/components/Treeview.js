import { Box } from "@mui/material";
import Accordion from "components/accordion/Accordion";
import AccordionHeader from "components/accordion/AccordionHeader";
import { FlexBox } from "components/flex-box";
import NavLink from "components/nav-link/NavLink";
import Scrollbar from "components/Scrollbar";
import { Span } from "components/Typography";
import { Fragment, useEffect, useState } from "react";

const TreeviewCategories = ({ data, searchKey }) => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 180) setScrolled(true);
      else setScrolled(false);
    });
  }, []);

  const renderChild = (childList, type = "parent") => {
    if (type === "parent" && childList.length > 0)
      return childList.map((item) => (
        <Fragment key={item.name}>
          <NavLink href={`/product/search/${item?.slug}`} color="grey.700">
            <Span
              display="block"
              ml={4}
              py={0.5}
              sx={{ color: "grey.700", fontWeight: 600 }}
            >
              {item.name}
            </Span>
          </NavLink>

          {item?.children && renderChild(item.children, "child")}
        </Fragment>
      ));
    else
      return childList?.map((item, ind) => (
        <NavLink
          href={`/product/search/${item?.slug}`}
          color="grey.700"
          key={ind}
        >
          <Span
            display="block"
            ml={6}
            pb={1}
            sx={{
              fontWeight:
                item?.name?.toLowerCase() === searchKey?.toLowerCase()
                  ? "500"
                  : "0",
            }}

          >
            {item.name}
          </Span>
        </NavLink>
      ));
  };

  return (
    <Fragment>
      <Scrollbar
        style={{
          marginTop: scrolled ? 24 : 0,
          transition: "all 0.4s ease-in-out",
          maxHeight: scrolled ? "100%" : `calc(100% - ${104}px)`,
        }}
      >
        {data.map((item, ind) => {
          return (
            <Box color="grey.700" key={ind}>
              {item?.children?.length > 0 ? (
                <Accordion>
                  <AccordionHeader px={0} py={0.75}>
                    <FlexBox gap={1} alignItems="center">
                      <Span fontWeight={800}>{item.name}</Span>
                    </FlexBox>
                  </AccordionHeader>

                  {item.children ? renderChild(item.children) : null}
                </Accordion>
              ) : (
                <NavLink
                  key={item.name}
                  href={`/product/search/${item.slug}`}
                  color="grey.700"
                >
                  <FlexBox gap={1}>
                    <Span fontWeight={800}>{item.name}</Span>
                  </FlexBox>
                </NavLink>
              )}
            </Box>
          );
        })}
      </Scrollbar>
    </Fragment>
  );
};

export default TreeviewCategories;
