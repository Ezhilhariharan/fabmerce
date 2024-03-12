import { Box, styled } from "@mui/material";

export const FlexContainer = styled(Box)(() => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "400px",
    padding: 0
  }));
export const RightMarginSpan = styled("span")(() => ({
    marginRight: "15px"
  }));
export const LeftMarginSpan = styled("span")(() => ({
    marginLeft: "15px"
  }));