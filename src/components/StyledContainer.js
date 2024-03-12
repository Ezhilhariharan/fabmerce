import { Container, styled } from "@mui/material";

export const StyledContainer = styled(Container)(() => ({
    pb: "1rem",
    "@media (min-width: 1280px)": {
      maxWidth: "1550px",
        },
  }));