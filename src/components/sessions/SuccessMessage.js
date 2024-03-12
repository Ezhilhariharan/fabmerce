import { Card, Dialog, Button } from "@mui/material";
import useWindowSize from "hooks/useWindowSize";
import { styled } from "@mui/material/styles";
import FlexBox from "components/FlexBox";
import Image from "components/BazarImage";
import CheckIcon from "@mui/icons-material/Check";
import { green, red } from "@mui/material/colors";
import { useEffect, useState } from "react";
import Close from "@mui/icons-material/Close";
import { useRouter } from "next/router";

const StyledCard = styled(({ children, window, ...rest }) => (
    <Card {...rest}>{children}</Card>
))(({ theme }) => ({
    width: window < 600 ? 150 : 380,
    height: window < 550 ? 300 : 200,
    [theme.breakpoints.down("sm")]: {
        width: "100%",
    },
}));

const SuccessMessage =
    ({
        message,
        toggleDialog,
        dataStatus,
        resetPage,
        toggleSuccessStatus
    }) => {
        const window = useWindowSize();
        const [open, setOpen] = useState(true);
        const router = useRouter();

        const handleClose = () => {
            setOpen(false);
            toggleDialog(false);
            if (!resetPage) {
                toggleSuccessStatus(false);
            }
            if (!!resetPage) {
                router.push({ pathname: "/" });
            }
        };
        return (
            <Dialog open={open} onClose={handleClose}>
                <StyledCard
                    window={window}
                    sx={{ margin: window < 600 ? "0px" : "30px", border: "none", boxShadow: "none", padding: "10px", height: window < 300 ? 250 : 200, }}
                >
                    <Button sx={{ float: "right" }} onClick={handleClose}><Close /></Button>
                    <FlexBox
                        alignItems="center"
                        justifyContent="center"
                        mr={1}
                        minWidth="170px"
                        sx={{
                            display: {
                                xs: "flex",
                                md: "flex",
                            },
                        }}
                    >
                        <Image
                            height={80}
                            mb={0.5}
                            src="https://storage.googleapis.com/asp-pprd-images-bucket/assets/fabmerce-logo.png"
                            alt="logo"
                        />
                    </FlexBox>
                    <FlexBox alignItems="center" justifyContent="center">
                        {dataStatus === "success" ? <CheckIcon
                            sx={{
                                width: window < 550 ? 30 : 50,
                                height: window < 550 ? 30 : 50,
                                color: green[500],
                                fontWeight: 700,
                            }}
                        /> : <Close 
                                sx={{ width: window < 550 ? 30 : 50, height: window < 550 ? 30 : 50, color: red[500], fontWeight: 700 }} 
                            />}
                    </FlexBox>
                    <FlexBox
                        alignItems="center"
                        justifyContent="center"
                        mr={1}
                        minWidth="170px"
                        pt={1}
                        sx={{
                            display: {
                                xs: "flex",
                                md: "flex",
                            },
                        }}
                    >
                        {message}
                    </FlexBox>
                </StyledCard>
            </Dialog>
        )
    }

export default SuccessMessage;