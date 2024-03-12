import AppLayout from "../src/components/layout/AppLayout";
import { useSelector } from "react-redux";
import React, { Fragment, useEffect } from "react";
import { Container, styled } from "@mui/material";
import Link from "next/link";

const Wrapper = styled(Container)(() => ({
    display: "block",
    height: "100%",
    width: "90%",
    paddingTop: "10px",
    paddingBottom: "60px",
    "& .verticalLine": {
        borderLeft: "2px solid Black ",
        height: "50px",
        marginLeft: "4px"
    },
    "& .title": {
        fontSize: 35,
    },
    "& .cursor": {
        cursor: "pointer"
    },
}));

const SiteMap = () => {
    const catagoriesList = useSelector((state) => state?.brandSlice?.catagoriesList);

    return (
        <AppLayout>
            <Wrapper>
                <h1 className="title">Categories</h1>
                {
                    catagoriesList?.map((category) => {
                        return (
                            <Fragment key={category?.id}>
                                <h1>{category?.name}</h1>
                                {category?.children?.map((subMenu, index) =>
                                    <>
                                        {subMenu?.children?.map((childrenName, index) =>
                                            <>
                                                <Link href={`/product/search/${childrenName.slug}`} key={index}>
                                                    <span className="cursor"> {childrenName.name}
                                                        <span className="verticalLine"></span>
                                                    </span>
                                                </Link>
                                                <>
                                                    {
                                                        childrenName?.children?.map((Name, index) =>
                                                            <Link href={`/product/search/${Name.slug}`} key={index}>
                                                                <span>{Name}
                                                                    <span className="verticalLine"></span>
                                                                </span>
                                                            </Link>
                                                        )}
                                                </>
                                            </>
                                        )}
                                    </>
                                )}
                            </Fragment>
                        )
                    })
                }
            </Wrapper>
        </AppLayout>
    );
};

export default SiteMap;