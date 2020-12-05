/*
 *==================================================
 * Licensed Materials - Property of HCL Technologies
 *
 * HCL Commerce
 *
 * (C) Copyright HCL Technologies Limited 2020
 *
 *==================================================
 */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const StyledTabsWrapper = styled.div`
  ${({ theme }) => `
    .MuiAppBar-root {
      box-shadow: none;
    }

    .MuiButtonBase-root {
      font-size: 0.9rem;
      font-weight: 500;
      color: ${theme.palette.text.primary};
      min-width: auto;
      padding: 0 ${theme.spacing(2)}px;
    }

    .MuiTabs-indicator {
      background-color: ${theme.palette.text.primary};
    }

    .MuiTabs-flexContainer {
      background: white;
      color: ${theme.palette.primary.main};
      border-bottom: 2px solid ${theme.palette.grey[300]};
    }
  `}
`;

const StyledTabsPanel = styled.div`
  ${({ theme }) => `
    padding: ${theme.spacing(2)}px;

    ul {
      margin-left: ${theme.spacing(2)}px;
    }
  `}
`;

function TabPanel(props) {
  const { children, value, index, name, ...other } = props;

  if (value === index) {
    return (
      <StyledTabsPanel
        role="tabpanel"
        hidden={value !== index}
        id={`${name}-tabpanel-${index}`}
        aria-labelledby={`${name}-tab-${index}`}
        {...other}>
        {children}
      </StyledTabsPanel>
    );
  } else {
    return <></>;
  }
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
};

export interface ITabs {
  title: string;
  tabContent: JSX.Element;
}

function StyledTabs({ childrenList, name }: any) {
  const [value, setValue] = React.useState(0);

  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  function a11yProps(index) {
    return {
      id: `${name}-tab-${index}`,
      "aria-controls": `${name}-tabpanel-${index}`,
    };
  }

  return (
    <StyledTabsWrapper>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange} aria-label="tabs example">
          {childrenList.map((v: any, index: number) => (
            <Tab key={index} label={v.title} {...a11yProps(index)} />
          ))}
        </Tabs>
      </AppBar>
      {childrenList.map((v: any, index: number) => (
        <TabPanel key={index} value={value} index={index} name={name}>
          {v.tabContent}
        </TabPanel>
      ))}
    </StyledTabsWrapper>
  );
}

StyledTabs.propTypes = {
  childrenList: PropTypes.any.isRequired,
  name: PropTypes.string.isRequired,
};

export default StyledTabs;
