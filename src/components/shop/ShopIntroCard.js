import FlexBox from "components/FlexBox";
import FacebookFilled from "components/icons/FacebookFilled";
import InstagramFilled from "components/icons/InstagramFilled";
import TwitterFilled from "components/icons/TwitterFilled";
import YoutubeFilled from "components/icons/YoutubeFilled";
import { H3 } from "components/Typography";
import { Avatar, Card } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import LazyImage from "components/LazyImage";
import useWindowSize from "hooks/useWindowSize";

const ShopIntroCard = ({ brandinfo }) => {
  const windowSize = useWindowSize();
  return (
    <Card
      sx={{
        mb: "32px",
        pb: "10px",
      }}
    >
      {brandinfo?.cover_photo && <LazyImage
        height="500px"
        src={brandinfo?.cover_photo}
        width="1820px"
        alt={brandinfo?.name}
      />}
      <FlexBox mt={-8} px={3.75} flexWrap="wrap">
        <Avatar
          src={brandinfo?.logo_photo}
          sx={{
            height: "120px",
            width: "120px",
            mr: "37px",
            border: "4px solid",
            borderColor: "grey.100",
          }}
          alt={brandinfo?.name}
        />

        <Box
          sx={{
            flex: "1 1 0",
            minWidth: "250px",
            "@media only screen and (max-width: 500px)": {
              marginLeft: 0,
            },
            mt: windowSize <= 513 ? 1 : 8,
          }}
        >

          <FlexBox
            flexWrap="wrap"
            justifyContent="space-between"
            alignItems="center"
            sx={{ flexDirection: "flex-end" }}
          >
            <Box>
              <H3 fontWeight="600">{brandinfo?.name}</H3>
              {/* <FlexBox alignItems="center" mb={2}>
                <Rating color="warn" size="small" value={5} readOnly />
                <Small color="grey.600" pl={1.5} display="block">
                  (45)
                </Small>
              </FlexBox> */}
            </Box>
            <FlexBox
              flexWrap="wrap"
              justifyContent="flex-end"
              alignItems="center"
              mt={0.8}
            >
              <FlexBox my="8px">
                {brandinfo?.fb_url !== null && brandinfo?.fb_url !== "" && (
                  <a
                    href={brandinfo?.fb_url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <FacebookFilled
                      sx={{
                        fontSize: "1.875rem",
                        mr: "10px",
                      }}
                    />
                  </a>
                )}
                {brandinfo?.twitter_url !== null &&
                  brandinfo?.twitter_url !== "" && (
                    <a
                      href={brandinfo?.twitter_url}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <TwitterFilled
                        sx={{
                          fontSize: "1.875rem",
                          mr: "10px",
                        }}
                      />
                    </a>
                  )}
                {brandinfo?.youtube_url !== null &&
                  brandinfo?.youtube_url !== "" && (
                    <a
                      href={brandinfo?.youtube_url}
                      target="_blank"
                      rel="noreferrer noopener"
                    >
                      <YoutubeFilled
                        sx={{
                          fontSize: "1.875rem",
                          mr: "10px",
                        }}
                      />
                    </a>
                  )}
                {brandinfo?.insta_url !== null && brandinfo?.insta_url !== "" && (
                  <a
                    href={brandinfo?.insta_url}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    <InstagramFilled
                      sx={{
                        fontSize: "1.875rem",
                        mr: "10px",
                      }}
                    />
                  </a>
                )}
              </FlexBox>
            </FlexBox>
          </FlexBox>
        </Box>
      </FlexBox>
    </Card>
  );
};

export default ShopIntroCard;
