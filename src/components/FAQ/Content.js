import React from "react";
import { QuestionsAnswers } from "./Questions&Ans";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import { styled } from "@mui/material";

const StyledLink = styled("List")(({ theme }) => ({
  display: "block",
  cursor: "pointer",
  "&:hover": {
    color: "white",
    backgroundColor: theme.palette.primary[1000],
  },
  color: "black",
  backgroundColor: theme.palette.grey[1000],
}));
const Content = () => {
  const [addIndex, setAddIndex] = React.useState("");
  const [open, setOpen] = React.useState({ [addIndex]: false });

  const collapseOpen = (index) => {
    setAddIndex(index);
    setOpen({ [index]: !open[index] });
  };

  const handleClick = (index) => {
    switch (index) {
      case 0:
        collapseOpen(index);
        break;
      case 1:
        collapseOpen(index);
        break;
      case 2:
        collapseOpen(index);
        break;
      case 3:
        collapseOpen(index);
        break;
      case 4:
        collapseOpen(index);
        break;
      case 5:
        collapseOpen(index);
        break;
      case 6:
        collapseOpen(index);
        break;
      case 7:
        collapseOpen(index);
        break;
      default:
        setOpen({});
    }
  };
  return (
    <List>
      {QuestionsAnswers.map((term, index) => {
        return (
          <div key={index}>
            <StyledLink>
              <ListItem onClick={() => handleClick(index)}>
                {term.addIcon}
                <ListItemText primary={term.question} sx={{ pl: "2rem" }} />
                {open[index] ? term.expandLess : term.expandMore}
              </ListItem>
            </StyledLink>
            <Collapse in={open[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemText sx={{ pl: 9 }}>
                
                      <ul style={{ listStyleType: "disc" }}>
                        {term.answer?.map((data,index) => 
                        <li key={index}>{data}</li>)}
                      </ul>
                  
                  
                  {/*refund*/}
                  {term.Another_answer?.map((modified,index) => (
                    <div ket={index}>
                      <ul style={{ listStyleType: "none" }}>
                        {modified?.content1.map((contOne,index) => (
                          <li key={index}>{contOne}</li>
                        ))}
                      </ul>
                      
                      <ul style={{ listStyleType: "disc" }}>
                        {modified.middlecontent.map((ruleTwo,index) => (
                          <li key={index}>{ruleTwo}</li>
                        ))}
                    </ul>
                    <ul style={{ listStyleType: "none" }}>
                        {modified?.content2.map((contTwo,index) => (
                          <li key={index}>{contTwo}</li>
                        ))}
                      </ul>
                      
                    </div>
                  ))}
                </ListItemText>
              </List>
            </Collapse>
          </div>
        );
      })}
    </List>
  );
};

export default Content;
