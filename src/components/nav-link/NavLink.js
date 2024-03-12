import { styled } from "@mui/material";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react"; // component props interface

// styled component
const StyledLink = styled("a")(({ theme, active_route }) => ({
  position: "relative",
  color: active_route === "active" ? theme.palette.primary.main : "inherit",
  cursor:"pointer",
  transition: "color 150ms ease-in-out",
  "&:hover": {
    color: `${theme.palette.primary.main} !important`,
  },
}));

const NavLink = ({ href, children, style, className, ...props }) => {
  const { pathname } = useRouter();
  const router = useRouter();
  const checkRouteMatch = () => {
    if (href === "/") return pathname === href;
    return pathname.includes(href);
  }; // active route

  const redirect = () => {
    router.push({pathname:href,query:{slug:"true"}});
  };

  const currentRoute = checkRouteMatch();
  return (
    // <Link href={href} passHref>
      <StyledLink
        active_route={currentRoute ? "active" : ""}
        className={clsx(className)}
        style={style}
        href={href}
        {...props}
        onClick={redirect}
      >
        {children}
      </StyledLink>
    // </Link>
  );
};

export default NavLink;
