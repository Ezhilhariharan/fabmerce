import React from "react";
import { Pagination, styled } from "@mui/material";
import { useRouter } from "next/router";
import { paginationCount } from "../../../helper/filters";

const DesignedPagination = styled(Pagination)(() => ({
  color: "#072255",
  borderRadius: "4px",
  "&	.MuiPaginationItem-page": {
    fontSize: "14px",
    fontWeight: "600",
    "&.Mui-selected": {
      color: "#FFFFFF",
      backgroundColor: "#072255",
      "&:hover": {
        backgroundColor: "#072255",
      }
    },
    "&.MuiPaginationItem-ellipsis": {
      display: "flex",
      alignItems: "center"
    }
  },
}));

const CustomPagination = ({ path, count, limit, page }) => {
  const router = useRouter();
  const pageCount = paginationCount(count, limit);
  //   page values
  const handleChange = (event, value) => {
    const currentPath = path;
    const currentQuery = router.query;
    currentQuery.page = value;
    currentQuery.limit = limit;
    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };
  return (
    <>
      {pageCount > 1 && (
        <DesignedPagination
          count={pageCount}
          variant="contained"
          onChange={handleChange}
          page={page}
          shape="rounded"
        />
      )}
    </>
  );
};

export default CustomPagination;
