import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import LazyImage from "../src/components/LazyImage";
import FlexBox from "../src/components/FlexBox";
import { Box, Grid, Card, Paper, styled, Switch } from "@mui/material";
import AppLayout from "components/layout/AppLayout";
import { H2 } from "../src/components/Typography";
import { ExpandMore } from "@mui/icons-material";
import { getBrands } from "utils/api/superstore-shop/sections.js";
import CustomPagination from "components/pagination/CustomPagination";
import useWindowSize from "hooks/useWindowSize";
import MobileBrandImage from "components/mobile-category-nav/MobileBrandsImage";
import Link from "next/link";
import { FontFamilyBox } from "../pages/index";

const ResultBox = styled(Box)(() => ({
    backgroundColor: "#FFFFFF",
    font: "Poppins",
}));
const BrandsGrid = styled(Grid)(() => ({
    display: "flex",
    justifyContent: "center",
}));
const ShowingResult = styled("div")(() => ({
    color: "#999999",
    marginBottom: "5.04px",
    fontSize: "16px",
    marginTop: "5px"
}));
const RotatedIcon = styled(ExpandMore)(() => ({
    transform: "rotate(270deg)",
    mx: "15px"
}));
const ParentBox = styled(Box)(() => ({
    backgroundColor: "#FFFFFF",
}));
const BrandsRadiusImage = styled(LazyImage)(() => ({
    borderRadius: "25px"
}));
const AllBrands = ({ allBrands, page, limit, key }) => {
    const brands = useSelector(state => state?.brandSlice?.brandList);
    const screenWidth = useWindowSize();
    const [limitPerPage, setLimit] = useState(limit);
    const [displayBrands, setBrands] = useState(allBrands);
    useEffect(() => {
        switch (true) {
            case screenWidth < 580:
                setLimit(18);
                break;
            case screenWidth < 659:
                setLimit(16);
                break;
            case screenWidth < 1336:
                setLimit(18);
                break;
            default:
                setLimit(20);
                break;
        }
    }, [screenWidth, limitPerPage, page]);
    useEffect(() => {
        const brandApi = getBrands(key, page, limitPerPage);
        brandApi.then(data => {
            setBrands(data);
        }).catch(err => console.log(err));
    }, [limitPerPage, screenWidth, page])
    return (
        <AppLayout>
            <FontFamilyBox mt={"5px"} mx={"20px"}>
                <ResultBox pl={"40px"} pt={"30px"}>
                    <Box fontSize="24px" fontWeight="500">All Brands</Box>
                    <ShowingResult>Showing {allBrands?.length} Results</ShowingResult>
                    <FlexBox alignItems="center" mt={"20.14px"} pb={"15.14px"} fontSize="16px">
                        <a href="/">Home</a>
                        <RotatedIcon fontSize="small" />
                        <a href="/allbrands">All Brands</a>
                    </FlexBox>
                </ResultBox>
                <ParentBox>
                    <BrandsGrid container mt={"5px"} pt={"26px"} pl={"20px"}>
                        {displayBrands?.map((brand, brandInd) =>
                            <Grid item pr={screenWidth < 659 ? "50px" : "70px"} pb={screenWidth < 659 ? "20px" : "40px"} key={brandInd}>
                                {brand?.icon_photo && <a href={`/store/${brand.slug}`}>
                                    {screenWidth > 658 ? <BrandsRadiusImage
                                        src={brand.icon_photo || brand.logo_photo}
                                        width="249.8px"
                                        height="340px"
                                        alt={brand.name}
                                    /> : <Box mb={3}>
                                        <Link href={`/store/${brand?.slug}`}>
                                            <a href={`/store/${brand?.slug}`}>
                                                {brand?.logo_photo && <MobileBrandImage {...brand} />}
                                            </a>
                                        </Link>
                                    </Box>}
                                </a>}
                            </Grid>
                        )}
                    </BrandsGrid>
                    <FlexBox
                        flexWrap="wrap"
                        justifyContent="center"
                        alignItems="center"
                        mt={1}
                        pb={8}
                    >
                        <CustomPagination count={brands?.length} page={page} limit={limitPerPage} />
                    </FlexBox>
                </ParentBox>
            </FontFamilyBox>
        </AppLayout >
    )
}

export async function getServerSideProps(context) {
    const page = parseInt(context?.query?.page) || 1;
    const limit = parseInt(context?.query?.limit) || 20;
    const key = "";
    const allBrands = await getBrands(key, page, limit);
    return {
        props: {
            allBrands,
            page,
            limit,
            key,
        }
    }
}

export default AllBrands;