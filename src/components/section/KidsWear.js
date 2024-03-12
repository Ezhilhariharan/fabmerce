import Link from "next/link";
import { Box, styled, Card, Container } from "@mui/material";
import { H4 } from "components/Typography";
import LazyImage from "components/LazyImage";
import useWindowSize from "hooks/useWindowSize";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const StyledHeaderFour = styled(H4)(({ theme }) => ({
    //margin: "23px 0",
    fontWeight: 400,
    fontSize: "22px",
    lineHeight: "33px",
    color: " #072255",

    [theme.breakpoints.down("md")]: {
        fontSize: 20,
        lineHeight: "25px",
    },
    [theme.breakpoints.down("sm")]: {
        fontSize: 17,
        lineHeight: "25px",
    }
}));
const Section = styled("div")(({ theme, width }) => ({
    padding: "0px !important",
    margin: width < 600 ? "15px 0px 30px 0px !important" : "15px 0px 50px 0px !important",
    width: "100%",
    display: "flex",
    flexDirection: " row",
    verticalAlign:"middle",
    overflow: "hidden",
    position: "relative",
    "& ::-webkit-scrollbar": {
        display: "none !important",
    },
}));

const Scroll = styled("div")(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    overflowX: "scroll",
    width: "100%",
    scrollbarWidth: "none",
}));
const StyledBazarCard = styled("div")(({ theme, width }) => ({
    backgroundImage: "url(assets/images/kidswear.svg)",
    backgroundPosition: "center",
    backgroundSize: "cover",
    width: width < 600 ? "100px" : "180px",
    minWidth: width < 600 ? "100px" : "180px",
    height: width < 600 ? "134px" : "236px",
    display: "flex",
    justifyContent:"center",
    alignItems:"center",
    cursor: "pointer",
    paddingTop:"15px",
    paddingBottom:"10px"
}));
const KidsBox = styled(Box)(() => ({
    backgroundColor: "#FFFFFF",
    //width: "100% !important",
    ".kidsHeading": {
        borderBottom: "1px solid #F4F4F5"
    }
}));

// const StyledContainer = styled(Container)(() => ({
//     pb: "1rem",
//     "@media (min-width: 1280px)": {
//         maxWidth: "1700px",
//         background: "white",
//     },
// }));

const KidsWear = ({ headerMargin }) => {
    const catagoriesList = useSelector((state) => state?.brandSlice?.catagoriesList);
    const [kidswear, setKidswear] = useState([]);
    const [kids_clothing, setKids_clothing] = useState([]);
    const width = useWindowSize();
    const kids = catagoriesList?.filter((item) => item.name == "Kids")
    const clothing = kids[0]?.children?.filter((item) => item.name == "Clothes")
    return (
        <>{
            width < 1460 ?

                <KidsBox mt={"5px"} pb={width > 599 && "8px"}>
                    <Box className="kidsHeading" py={"15px"} ml={headerMargin}>
                        {
                            kids.length > 0 && <StyledHeaderFour>
                                Best of Kidswear
                            </StyledHeaderFour>
                        }
                    </Box>
                    <Section width={width}>
                        {
                            kids[0]?.children?.length > 9 ?
                                <Scroll>
                                    {
                                        kids[0]?.children?.map((item) => (

                                            <StyledBazarCard  width={width} key={item?.id}>
                                                <Link
                                                    key={item?.id}
                                                    href={`/product/search/${item?.slug}`}
                                                    passHref
                                                >
                                                    <a>
                                                    {item?.profile_photo && <LazyImage
                                                        src={item?.profile_photo}
                                                        width={width < 600 ? "90px" : "160px"}
                                                        height={width < 600 ? "120px" : "216px"}
                                                        alt={item?.title}
                                                        priority
                                                        
                                                    />}
                                                    </a>
                                                </Link>
                                            </StyledBazarCard>
                                        ))
                                    }
                                </Scroll>
                                : <Scroll style={{display: "flex", alignItems:"center"}}>
                                    {kids[0]?.children?.map((item) => (
                                        <>
                                            <StyledBazarCard width={width} key={item?.id}>
                                                <Link
                                                    key={item?.id}
                                                    href={`/product/search/${item?.slug}`}
                                                    passHref
                                                >
                                                    <a>
                                                    {item?.profile_photo && <LazyImage
                                                        src={item?.profile_photo}
                                                        width={width < 600 ? "90px" : "160px"}
                                                        height={width < 600 ? "120px" : "216px"}
                                                        alt={item?.title}
                                                        priority
                                                        
                                                    // objectFit="cover"
                                                    />}
                                                    </a>
                                                </Link>
                                            </StyledBazarCard>
                                            {
                                                item?.children?.map((chilItem) => (
                                                    <StyledBazarCard width={width} key={chilItem?.id}>
                                                        <Link
                                                            key={chilItem?.id}
                                                            href={`/product/search/${chilItem?.slug}`}
                                                            passHref
                                                        >
                                                            <a>
                                                            {item?.profile_photo && <LazyImage
                                                                src={chilItem?.profile_photo}
                                                                width={width < 600 ? "90px" : "160px"}
                                                                height={width < 600 ? "120px" : "215px"}
                                                                alt={chilItem?.title}
                                                                priority
                                                                
                                                            />}
                                                            </a>
                                                        </Link>
                                                    </StyledBazarCard>
                                                ))
                                            }
                                        </>
                                    ))}
                                </Scroll>
                        }

                    </Section>

                </KidsBox>
                :
                <Box mt={"5px"} pb={"8px"}>
                    <Box className="kidsHeading" py={"15px"} ml={headerMargin}>
                        {
                            kids?.length > 0 && <StyledHeaderFour>
                                Best of Kidswear
                            </StyledHeaderFour>
                        }
                    </Box>
                    <Section>
                        {
                            kids[0]?.children.length > 9 ?
                                <Scroll>
                                    {
                                        kids[0]?.children?.map((item) => (

                                            <StyledBazarCard width={width} key={item?.id}>
                                                <Link
                                                    key={item?.id}
                                                    href={`/product/search/${item?.slug}`}
                                                    passHref
                                                >
                                                    <a>
                                                    {item?.profile_photo && <LazyImage
                                                        src={item?.profile_photo}
                                                        width={width < 600 ? "90px" : "160px"}
                                                        height={width < 600 ? "120px" : "215px"}
                                                        alt={item?.title}
                                                        priority
                                                        
                                                    />}
                                                    </a>
                                                </Link>
                                            </StyledBazarCard>
                                        ))
                                    }
                                </Scroll>
                                : <Scroll>
                                    {kids[0]?.children?.map((item) => (
                                        <>
                                            <StyledBazarCard width={width} key={item?.id}>
                                                <Link
                                                    key={item?.id}
                                                    href={`/product/search/${item?.slug}`}
                                                    passHref
                                                >
                                                    <a>
                                                    {item?.profile_photo && <LazyImage
                                                        src={item?.profile_photo}
                                                        width={width < 600 ? "90px" : "160px"}
                                                        height={width < 600 ? "120px" : "215px"}
                                                        alt={item?.title}
                                                        priority
                                                        
                                                    />}
                                                    </a>
                                                </Link>
                                            </StyledBazarCard>
                                            {
                                                item?.children?.map((chilItem) => (
                                                    <StyledBazarCard width={width} key={chilItem?.id}>
                                                        <Link
                                                            key={chilItem?.id}
                                                            href={`/product/search/${chilItem?.slug}`}
                                                            passHref
                                                        >
                                                            <a>
                                                            {item?.profile_photo && <LazyImage
                                                                src={chilItem?.profile_photo}
                                                                width={width < 600 ? "90px" : "160px"}
                                                                height={width < 600 ? "120px" : "215px"}
                                                                alt={chilItem?.title}
                                                                priority
                                                                
                                                            />}
                                                            </a>
                                                        </Link>
                                                    </StyledBazarCard>
                                                ))
                                            }
                                        </>
                                    ))}
                                </Scroll>
                        }

                    </Section>

                </Box>
        }
        </>

    );
};

export default KidsWear;

