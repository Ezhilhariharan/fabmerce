import React from "react";
import Link from "next/link";
import CategorySectionCreator from "../CategorySectionCreator";
import CategoriesCards from "components/product-cards/CategoriesCards";
import { Grid } from "@mui/material";
import Light from "components/icons/Light";
const CategorySection = () => {
  return (
    <CategorySectionCreator title="Hot Sale" icon={<Light color="primary" />}>
      <Grid container spacing={2}>
        {CategorySectionList.map((item, ind) => (
          <Grid item md={4} xs={12} key={ind}>
            <Link href={item?.Navurl}>
              <a>
                <CategoriesCards title={item?.title} imgUrl={item?.imgUrl} />
              </a>
            </Link>
          </Grid>
        ))}
      </Grid>
    </CategorySectionCreator>
  );
};

export default CategorySection;

export const CategorySectionList = [
  {
    imgUrl: "/assets/images/catagories/image_women.png",
    Navurl: "/product/search/Women",
    title: "Women's Fashion",
  },
  {
    imgUrl: "/assets/images/catagories/image_men.png",
    Navurl: "/product/search/Men",
    title: "Men's Fashion",
  },
  {
    imgUrl: "/assets/images/catagories/image_elactronic.png",
    Navurl: "/product/search/Accessories",
    title: "Gadgets",
  },
];
