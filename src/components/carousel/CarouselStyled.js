import { styled } from "@mui/material";
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  DotGroup,
  Slider,
} from "pure-react-carousel"; // StyledCarouselProvider and StyledSlider component props type

// common styles for arrow back and next button
const commonArrowBtnStyle = ({
  theme,
  showDots,
  dot_margin_top,
  showArrowOnHover,
}) => ({
  display: showArrowOnHover ? "none" : "flex",
  position: "absolute",
  transform: "translateY(-50%)",
  boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
  background: theme.palette.secondary.main,
  color: theme.palette.secondary.contrastText,
  border: 0,
  borderRadius: "50%",
  height: 40,
  width: 40,
  alignItems: "center",
  justifyContent: "center",
  top: `calc(50% - ${showDots ? dot_margin_top : "0px"})`,
  "&:disabled": {
    background: theme.palette.text.disabled,
    color: theme.palette.secondary.main,
    cursor: "not-allowed",
  },
  "&:hover:not(:disabled)": {
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  [theme.breakpoints.down("xs")]: {
    display: "block !important",
  },
}); // styled components
const VideoReelsDotGroup = styled(DotGroup)(({ dot_margin_top }) => ({
  display: "flex",
  position: "absolute",
  // top:"94%",
  // left:"50%",  
  left: 0, 
  right: 0, 
  bottom:"4%",
  marginLeft: "auto", 
  marginRight: "auto", 
  width: "80px",
  // background:"red"
}));

const StyledCarouselProvider = styled(CarouselProvider)(({ spacing }) => ({
  position: "relative",
    minWidth: 0,
  "& .focusRing___1airF.carousel__slide-focus-ring": {
    outline: "none !important",
  },
  "& .carousel__inner-slide": {
    margin: "auto",
    // width: `calc(100% - ${spacing || "0px"})`,
  },
  "&:hover $arrowButton": {
    display: "flex",
  },
}));
const StyledSlider = styled(Slider)(({ spacing }) => ({
  marginLeft: `calc(-1 * ${spacing || "0px"} / 4)`,
  marginRight: `calc(-1 * ${spacing || "0px"} / 4)`,
  borderRadius: "20px"
}));
const StyledDotGroup = styled(DotGroup)(({ dot_margin_top }) => ({
  display: "flex",
  justifyContent: "center",
  marginTop: dot_margin_top || "0px",
  paddingBottom: "1rem",
}));
const StyledDot = styled("div")(({ dot_color, dot_active, theme }) => ({
  height: 8,
  width: `${dot_active ? "20px " : "9px "}`,
  margin: "0.25rem",
  borderRadius: 300,
  backgroundColor: `${dot_active ? dot_color || theme.palette.secondary.main : "#F4F4F5"}`
}));
const VideoReelsDot = styled("div")(({ dot_color, dot_active, theme }) => ({
  height: 8,
  width: `${dot_active ? "20px " : "9px "}`,
  borderRadius: 300,
  backgroundColor: "white",
  margin: "0.25rem",
}));
const StyledArrowBackButton = styled(ButtonBack)(
  ({ theme, showArrowOnHover, showDots, dot_margin_top, arrowLeft }) => ({
    ...commonArrowBtnStyle({
      theme,
      showDots,
      showArrowOnHover,
      dot_margin_top,
    }),
    marginLeft: arrowLeft && arrowLeft,
    [theme.breakpoints.down("md")]: {
      height: "36px",
      width: "36px",
      left: "-12px",
    },
  })
);
const StyledArrowNextButton = styled(ButtonNext)(
  ({ theme, showArrowOnHover, showDots, dot_margin_top }) => ({
    ...commonArrowBtnStyle({
      theme,
      showDots,
      showArrowOnHover,
      dot_margin_top,
    }),
    [theme.breakpoints.down("md")]: {
      height: "36px",
      width: "36px",
      right: "-12px",
    },
  })
);
export {
  StyledDot,
  StyledSlider,
  StyledDotGroup,
  commonArrowBtnStyle,
  StyledCarouselProvider,
  StyledArrowBackButton,
  StyledArrowNextButton,
  VideoReelsDotGroup,
  VideoReelsDot,
};
