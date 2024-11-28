import * as React from "react";
import { emphasize, styled } from "@mui/material/styles";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Chip from "@mui/material/Chip";
import HomeIcon from "@mui/icons-material/Home";
import styles from "styled-components";
import { useNavigate } from "react-router-dom";

// StyledBreadcrumb component using MUI's styled() API
const StyledBreadcrumb = styled(Chip)(({ theme }) => {
  const backgroundColor =
    theme.palette.mode === "light"
      ? theme.palette.grey[100]
      : theme.palette.grey[800];

  // Ensure that we use a valid emphasize value in the range [0, 1]
  const emphasizeValue = Math.max(0, Math.min(0.12, -0.06));  // Clamp the value to [0, 1]

  return {
    backgroundColor,
    height: theme.spacing(3),
    color: theme.palette.text.primary,
    fontWeight: theme.typography.fontWeightRegular,
    "&:hover, &:focus": {
      backgroundColor: emphasize(backgroundColor, emphasizeValue),  // Correctly using emphasize()
    },
    "&:active": {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(backgroundColor, 0.12),
    },
  };
});

// Wrapper component for custom styling
const Wrapper = styles.section`
  .backbtn{
    display: flex;
    align-items: center;
    background: linear-gradient(-45deg, rgba(255,255,255,0.25), rgba(0,0,0,0.8));
    border-radius: 50px;
    height: 30px;
    width: 100px;
    color: white;
    margin: 5px 0 0 5px;
    justify-content: center;
    position: absolute;
    box-shadow: 
      12px 12px 16px 0 rgba(0, 0, 0, 0.7),
      -8px -8px 16px 0 rgba(255, 255, 255, 0.3);
  }

  @keyframes vibrate-1 {
    0% {
      transform: translate(0);
    }
    20% {
      transform: translate(-2px, 2px);
    }
    40% {
      transform: translate(-2px, -2px);
    }
    60% {
      transform: translate(2px, 2px);
    }
    80% {
      transform: translate(2px, -2px);
    }
    100% {
      transform: translate(0);
    }
  }

  .css-6od3lo-MuiChip-label {
    overflow: hidden;
    text-overflow: ellipsis;
    padding-left: 12px;
    padding-right: 12px;
    white-space: nowrap;
    color: #c4c3ca;
  }

  .css-1oohpub-MuiChip-root .MuiChip-icon {
    margin-left: 5px;
    margin-right: -6px;
    color: #c4c3ca;
  }
`;

export default function CustomizedBreadcrumbs() {
  const navigate = useNavigate();

  // Handler for breadcrumb click to navigate to Home
  function handleClick(event) {
    event.preventDefault();
    navigate("/Home");
  }

  return (
    <>
      <Wrapper>
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb">
            <StyledBreadcrumb
              className="backbtn"
              component="a"
              href="/"
              label="Home"
              icon={<HomeIcon fontSize="small" />}
            />
          </Breadcrumbs>
        </div>
      </Wrapper>
    </>
  );
}
