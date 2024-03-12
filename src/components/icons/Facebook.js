import { SvgIcon } from "@mui/material";
import React from "react";
import useWindowSize from "hooks/useWindowSize";
const Facebook = (props) => {
  const window = useWindowSize();
  return (
    <div>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_1507_4445)">
          <path
            d="M10.0001 1.66666C5.39758 1.66666 1.66675 5.3975 1.66675 10C1.66675 14.1592 4.71425 17.6067 8.69841 18.2325V12.4083H6.58175V10H8.69841V8.16416C8.69841 6.07583 9.94175 4.9225 11.8459 4.9225C12.7576 4.9225 13.7109 5.085 13.7109 5.085V7.135H12.6609C11.6251 7.135 11.3026 7.7775 11.3026 8.43666V10H13.6134L13.2442 12.4083H11.3026V18.2325C15.2859 17.6075 18.3334 14.1583 18.3334 10C18.3334 5.3975 14.6026 1.66666 10.0001 1.66666Z"
            stroke="white"
          />
        </g>
        <defs>
          <clipPath id="clip0_1507_4445">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Facebook;
