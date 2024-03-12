import { Box, styled } from "@mui/material";
import LazyImage from "components/LazyImage";
import { Paragraph } from "components/Typography";
import React from "react"; // styled component

const StyledParagraph = styled(Paragraph)(({ theme }) => ({
  top: "10px",
  left: "10px",
  fontWeight: 600,
  borderRadius: "5px",
  position: "absolute",
  padding: "0.5rem 1rem",
  backgroundColor: theme.palette.secondary[100],
}));
const StyledParagraph2 = styled(Paragraph)(() => ({
  top: "100px",
  left: "10px",
  color: "#22060E",
  fontWeight: 600,
  borderRadius: "5px",
  position: "absolute",
  padding: "0.5rem 1.5rem",
  background: "linear-gradient(97.14deg, rgba(255, 255, 255, 0.72) 0%, rgba(255, 255, 255, 0.4) 100%);",
}));
const CategoriesCards = ({ title, imgUrl }) => {
  console.log(imgUrl)
  return (
    <Box
      position="relative"
      sx={{
        boxShadow: 2,
      }}
    >
      <LazyImage
        mx="auto"
        alt={title}
        width={678}
        src={imgUrl}
        height={406}
        objectFit="cover"
        priority={true}
      />
      {title && <StyledParagraph2>{title}</StyledParagraph2>}
    </Box>
  );
};

export default CategoriesCards;
