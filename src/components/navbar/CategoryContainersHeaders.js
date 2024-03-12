import { Button, styled, Box, Paper, Popper, Grid } from "@mui/material";
import "@fontsource/poppins";
export const CategoryButton = styled(Button)(() => ({
  fontFamily: "Poppins,sans-serif",
  "&.categoryButton": {
    marginRight: "1rem",
    color: "#FFFFFF",
    fontSize: "16px",
    borderRadius: 0,
  },
  "&:hover": {
    borderBottom: "2px solid white",
  }
}));

export const CategoryPopover = styled(Popper)(() => ({
  minWidth: "450px",
  //borderTop: "1px solid red",
  zIndex: 100,
  position: "absolute",
  top: "19px !important",
}));

export const CategoryPapper = styled(Paper)(({ theme, position, open }) => ({
  paddingTop: "0.5rem",
  right: "auto",
  top: position === "absolute" ? "calc(100% + 0.7rem)" : "0.5rem",
  borderRadius: 4,
  transform: open ? "scaleY(1)" : "scaleY(0)",
  transformOrigin: "top",
  backgroundColor: theme.palette.background.paper,
  boxShadow: theme.shadows[2],
  transition: "all 250ms ease-in-out",
  zIndex: 98,
  minHeight: "361px",
}));

export const CategoryMenu = styled(Box)(({ fontWeight, color, greaterLength }) => ({
  display: "block",
  fontWeight: fontWeight,
  color: color,
  "&:hover": { background: "transparent" },
  paddingRight: greaterLength && "15px"
}));

export const SubCategoryParentBox = styled(Box)(({ matrixLength }) => ({
  marginTop: "15px",
  marginBottom: "10px",
  color: "#072255",
  fontSize: "14px",
  textAlign: matrixLength > 1 && "center",
  fontWeight: 500
}));

export const PopOverGridItem = styled(Grid)(() => ({
  minWidth: "150px"
}));

export const BoxBorder = styled(Box)(({ lesserLength }) => ({
  borderBottom: " 1px solid #F4F4F5",
  minWidth: lesserLength && "450px",
}));

export const MatrixBorder = styled(Box)(() => ({
  minWidth: "150px"
}));

export const ChildBox = styled(Box)(({ evenColor }) => ({
  background: evenColor && "#F4F4F5",
  minHeight: "320px"
}))