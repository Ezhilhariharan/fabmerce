import React from 'react'
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from 'next/link'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import "@fontsource/poppins";
import { styled } from '@mui/material';
const StyledBreadCrumbs = styled(Breadcrumbs)(() => ({
  paddingLeft:"22px",
  fontWeight:"400",
  fontSize:"16px",
  fontFamily: "Poppins,sans-serif",
}));

const CategoryBreadcrumbs = () => {
  return (
    <div role="presentation">
      <StyledBreadCrumbs separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb" pb={"15.11px"}>
        <Link
          underline="hover"
          color="inherit"
          href={"/"}
        >
          Home
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href={"/Allcategories"}
        >
          All categories
        </Link>
      </StyledBreadCrumbs>
    </div>
  )
}

export default CategoryBreadcrumbs