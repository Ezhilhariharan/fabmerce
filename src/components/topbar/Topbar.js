import Image from "components/BazarImage";
import BazarMenu from "components/BazarMenu";
import FlexBox from "components/FlexBox";
import NavLink from "components/nav-link/NavLink";
import { Span } from "components/Typography";
import CallOutlined from "@mui/icons-material/CallOutlined";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MailOutline from "@mui/icons-material/MailOutline";
import { Container, MenuItem } from "@mui/material";
import TouchRipple from "@mui/material/ButtonBase";
import { styled } from "@mui/material/styles";
import { layoutConstant } from "utils/constants";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import useWindowSize from "hooks/useWindowSize";
const TopbarWrapper = styled("div")(({ theme }) => ({
  background: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  height: layoutConstant.topbarHeight,
  fontSize: 12,
  "& .topbarLeft": {
    "& .logo": {
      display: "none",
    },
    "& .title": {
      marginLeft: "10px",
    },
    "@media only screen and (max-width: 900px)": {
      "& .logo": {
        display: "block",
      },
      "& > *:not(.logo)": {
        display: "none",
      },
    },
  },
  "& .topbarRight": {
    "& .link": {
      paddingRight: 30,
      color: theme.palette.secondary.contrastText,
    },
    "@media only screen and (max-width: 900px)": {
      "& .link": {
        display: "none",
      },
    },
  },
  "& .smallRoundedImage": {
    height: 15,
    width: 25,
    borderRadius: 2,
  },
  "& .handler": {
    height: layoutConstant.topbarHeight,
  },
  "& .menuTitle": {
    fontSize: 12,
    marginLeft: "0.5rem",
    fontWeight: 600,
  },
  "& .menuItem": {
    minWidth: 100,
  },
  "& .marginRight": {
    marginRight: "1.25rem",
  },
}));

const Topbar = () => {
  const windowSize = useWindowSize();
  return (
    <TopbarWrapper>
      <Container
        sx={{
          display: "flex",
          justifyContent: windowSize < 300 ? "space-around" : "space-between",
          alignItems: "center",
          height: "100%",
          "@media (min-width: 900px)": {
            maxWidth:'1270px'
          },
        }}
      >
        <FlexBox className="topbarLeft" alignItems="center">
          <div className="logo">
            <Link href="/" passHref>
              <Image
                display="block"
                height="28px"
                src={"/assets/images/applogo/footerlogo.png"}
                alt="logo"
              />
            </Link>
          </div>

          <FlexBox alignItems="center">
            <a href="/collections/saree-collection-16">
              <Span className="title">
                New Arrival Sarees-Shop Now
              </Span>
            </a>
          </FlexBox>
        </FlexBox>

        <FlexBox className="topbarRight" alignItems="center"  mr={ windowSize>1000 && 3}>
          <FlexBox alignItems="center" ml={2.5}>
            <MailOutline fontSize="small" />
            <a href={`mailto:help@fabmerce.com`} target="_blank">
              <Span className="title">help@fabmerce.com</Span>
            </a>
          </FlexBox>
        </FlexBox>
      </Container>
    </TopbarWrapper>
  );
};

const languageList = [
  {
    title: "EN",
    imgUrl: "/assets/images/flags/usa.png",
  },
  {
    title: "BN",
    imgUrl: "/assets/images/flags/bd.png",
  },
  {
    title: "HN",
    imgUrl: "/assets/images/flags/in.png",
  },
];
const currencyList = [
  {
    title: "USD",
    imgUrl: "/assets/images/flags/usa.png",
  },
  {
    title: "EUR",
    imgUrl: "/assets/images/flags/uk.png",
  },
  {
    title: "BDT",
    imgUrl: "/assets/images/flags/bd.png",
  },
  {
    title: "INR",
    imgUrl: "/assets/images/flags/in.png",
  },
];
export default Topbar;
