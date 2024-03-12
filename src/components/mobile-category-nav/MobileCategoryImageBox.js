import FlexBox from "components/FlexBox";

import { ListItemButton, ListItemText, Collapse, styled } from "@mui/material";
import React, { Fragment, useState } from "react";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { ExpandLess } from "@mui/icons-material";
import Link from "next/link";

const MobileCategoryImageBox = ({ subMenus, index }) => {

  const [saveIndex, setSaveIndex] = useState("");
  const [open, setOpen] = useState({
    [saveIndex]: false
  });
  const [indexOfLastChild, setIndexOfLastChild] = useState("");
  const [openLastChild, setOpenLastChild] = useState({
    [indexOfLastChild]: false
  });

  const collapseContent = (i) => {
    setSaveIndex(i);
    setOpen({ [i]: !open[i] })
  }

  const handleNestedDropDown = (a) => {
    switch (a) {
      case a:
        setIndexOfLastChild(a);
        setOpenLastChild({ [a]: !openLastChild[a] });
        break;
      default:
        setOpenLastChild({});
    }
  }

  const handleDropDown = (i) => {
    switch (i) {
      case i:
        collapseContent(i);
        break;
      default:
        setOpen({});
    }
  }

  const RotatedIcon = styled(ExpandLess)(() => ({
    transform: "rotate(90deg)"
  }));

  return (
    <Fragment>
      <ListItemButton
        sx={{ display: "flex", alignItems: "space-around", justifyContent: "center" }}
        onClick={() => handleDropDown(index)}
      >
        <ListItemText primary={subMenus?.name} sx={{ textAlign: "center" }} />
        {subMenus?.children?.length > 0 && <span>{open[index] ? <ExpandMore /> : <RotatedIcon />}</span>}
      </ListItemButton>
      <Collapse in={open[index]}>
        {subMenus?.children?.map((data, nestedIndex) => <Link key={data.id} href={`/product/search/${data.slug}`} passHref>
          <ListItemButton sx={{ justifyContent: "center" }} onClick={() => handleNestedDropDown(nestedIndex)}>
            {data?.children?.length > 0 && 
              <span>{openLastChild[nestedIndex] ? 
                <ExpandMore /> : <RotatedIcon />}</span>}
            {data?.children?.lenth > 0 ? <div>
              {data?.children?.map(lastChild => <Link key={lastChild.id} href={`/product/search/${lastChild.slug}`}><ListItemButton>{lastChild.name}</ListItemButton></Link>)}
            </div> : <span>{data.name}</span>}
          </ListItemButton>
        </Link>)}
      </Collapse>
    </Fragment>
  );
};

export default MobileCategoryImageBox;
