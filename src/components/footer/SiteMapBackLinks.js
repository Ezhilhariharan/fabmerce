import { useSelector } from "react-redux";
import React, { Fragment, useEffect } from "react";
import { Container, styled, Grid, Box } from "@mui/material";
import Link from "next/link";
import useWindowSize from "hooks/useWindowSize";
import { FontFamilyBox } from "../../../pages";

const Wrapper = styled(Box)(({ screenWidth }) => ({
    display: "block",
    backgroundColor: "#FFFFFF",
    padding: "10px 20px 10px 30px",
    paddingBottom: screenWidth < 901 ? "70px" : "30px",
    font: "Poppins",
    "& .verticalLine": {
        borderLeft: "2px solid Black ",
        height: "50px",
        marginLeft: "4px",
    },
    "& .verticalLine1": {
        marginLeft: "4px",
    },
    "& .title": {
        fontSize: 18,
        margin: "0px",
        padding: "0px",
        display: "inline-block",
        fontWeight: 600,
    },
    "& .title3": {
        fontSize: 16,
        color: "gray",
        margin: "0px",
        padding: "0px",
        display: "inline-block",
        fontWeight: 500,
    },
    "& .cursor": {
        //cursor: "pointer",
        display: "inline-block",
        margin: "0px",
    },
}));

export const SiteMapBackLinks = () => {
    const allBrands = useSelector((state) => state?.brandSlice?.brandList);
    const allCategories = useSelector(state => state?.brandSlice?.catagoriesList);
    const screenWidth = useWindowSize();
    return (
        <FontFamilyBox>
            <Wrapper screenWidth={screenWidth}>
                <br />
                <h1 className="title3">Top Stories:</h1>&nbsp;&nbsp;
                <h1 className="title">Brand Directory</h1>
                <div className="cursor">
                    <br />
                    <h1 className="title3">BRANDS:&nbsp;</h1>
                    {allBrands?.map((brands, index) => {
                        const array1 = allBrands;
                        const final1 = array1[array1.length - 1];
                        return (
                            <div className="cursor" key={index}>
                                <div className="cursor">
                                    {" "}
                                    &nbsp;
                                    <Link href={`/store/${brands.slug}`}>
                                        {brands.name}
                                    </Link>
                                    &nbsp;
                                    {brands.name === final1?.name ? (
                                        <span></span>
                                    ) : (
                                        <span className={"verticalLine"}></span>
                                    )}
                                </div>
                            </div>
                        );
                    })}{" "}
                    <Grid container columnSpacing={3}>
                        {allCategories?.map((category, catInd) => {
                            return (
                                <Grid item lg={6} md={6} xs={12} sm={12} key={catInd}>
                                    <h1 className="title">{category?.name}:&nbsp;</h1>
                                    {category?.children?.map((subCategory, ind) => {
                                        const childrenLength = subCategory?.children?.length;
                                        return (
                                            <><br />
                                                <h1 className="title3" key={ind}>
                                                    <a href={`/product/search/${subCategory.slug}`}>
                                                        {subCategory?.name.toUpperCase()}{childrenLength > 0 && ":"}
                                                    </a>
                                                </h1>
                                                {subCategory?.children?.map((catName, index) => {
                                                    const array = subCategory?.children;
                                                    const final = array[array.length - 1];
                                                    return (
                                                        <>
                                                            <span className="cursor" key={index}>
                                                                &nbsp;
                                                                <Link href={`/product/search/${catName.slug}`}>
                                                                    {catName.name}
                                                                </Link>
                                                                &nbsp;
                                                                {catName.name === final?.name ? (
                                                                    <span></span>
                                                                ) : (
                                                                    <span
                                                                        className={"verticalLine"}
                                                                    ></span>
                                                                )}
                                                            </span>
                                                        </>
                                                    );
                                                })}
                                            </>
                                        )
                                    })}
                                </Grid>
                            )
                        })}
                    </Grid>
                </div>
            </Wrapper >
        </FontFamilyBox>
    )
} 