import React, { useState } from "react";
import { Close } from "@mui/icons-material";
import { Box, Dialog, styled, Button } from "@mui/material";
import LazyImage from "components/LazyImage";
import FlexBox from "components/FlexBox";
import Link from "next/link";
const PopoverDialog = styled(Dialog)(() => ({
    ".closeButton": {
        zIndex: 100,
        position: "absolute",
        display: "inline",
        color: "#FFFFFF",
        width: "40px",
        height: "40px",
        padding: 0,
        margin: 0,
        "&:hover": {
            backgroundColor: "transparent",
        }
    }
}));
const AnchotTagWithoutLineHeight = styled("a")(() => ({
    lineHeight: "0px",
}));

export const PopoverPromotion = () => {
    const [openPopover, setPopover] = useState(true);
    const handleClose = () => {
        setPopover(false);
    };
    return (
        <Box>
            <PopoverDialog open={openPopover} maxWidth={"md"} onClose={handleClose}>
                <FlexBox justifyContent="flex-end" pr={1}>
                    <Button onClick={() => setPopover(false)} className="closeButton" disableRipple><Close fontSize="large" /></Button>
                </FlexBox>
                <Link href="/collections/diwali-sale" passHref>
                    <AnchotTagWithoutLineHeight>
                    <img
                        src="https://storage.googleapis.com/asp-pprd-images-bucket/promotionvideos/Diwali%20popup.gif"
                        alt="promotion-onload"
                        width={"850px"}
                        height={"500px"}
                    />
                    </AnchotTagWithoutLineHeight>
                </Link>
            </PopoverDialog>
        </Box>
    )
}