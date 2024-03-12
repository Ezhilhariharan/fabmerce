import { Box } from "@mui/material";
import React from "react";
import CategorySectionHeader from "./CategorySectionHeader";
import { StyledContainer } from "./StyledContainer";

const CategorySectionCreator = ({ icon, seeMoreLink, title, children }) => {
  return (
    <Box mb={7.5} mt={title==="New Arrivals" && 3}>
      <StyledContainer>
        {title && (
          <CategorySectionHeader
            title={title}
            seeMoreLink={seeMoreLink}
            icon={icon}
          />
        )}

        {children}
      </StyledContainer>
    </Box>
  );
};

export default CategorySectionCreator;
