import { Box, Card, styled } from "@mui/material";
import React from "react";
import LazyImage from "components/LazyImage";
const BorderRadiusLazyImage = styled(LazyImage)(() => ({
  borderRadius: "10px"
}));
const CollectionBanner = ({ collectionInfo }) => {
  return (
    <Box
      sx={{
        mb: "32px",
      }}
    >
      {collectionInfo?.banner_url && (
        <a href={`/collections/${collectionInfo?.slug}`}>
          <BorderRadiusLazyImage
            height="500px"
            src={collectionInfo?.banner_url}
            width="1820px"
            alt={collectionInfo?.name}
          />
        </a>
      )}
    </Box>
  );
};

export default CollectionBanner;
