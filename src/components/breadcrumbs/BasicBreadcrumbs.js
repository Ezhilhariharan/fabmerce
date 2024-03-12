import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from 'next/link'

const handleClick = (event) => {
  event.preventDefault();
};
const BasicBreadcrumbs = ({ product }) => {
  return (
    <div role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        <span>{product?.category?.name?.toLowerCase()}</span>
        <Link
          underline="hover"
          color="inherit"
          href={{ pathname:`/product/search/${product?.sub_category?.slug}`,query:{category:product?.sub_category?.name}}}
        >
          {product?.sub_category?.name?.toLowerCase()}
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href={{pathname: `/product/search/${product?.children?.slug}`,query:{category:product?.children?.name}}}
        >
          {product?.children?.name?.toLowerCase()}
        </Link>
      </Breadcrumbs>
    </div>
  );
};

export default BasicBreadcrumbs;
