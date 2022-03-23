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
import { render, screen, fireEvent } from "../../../testing/utils/test-utils";
import mediaQuery from "css-mediaquery";

import { Header } from "../Header";

function createMatchMedia(width) {
  return (query: string): MediaQueryList => ({
    matches: mediaQuery.match(query, { width }),
    addListener: () => {},
    removeListener: () => {},
    media: "'",
    onchange: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {
      return false;
    },
  });
}

describe("Mobile : Header is displayed in mobile version ", () => {
  test("Mobile : Header is displayed in mobile version ", () => {
    window.matchMedia = createMatchMedia(400);

    render(<Header loggedIn={false} />);

    const HeaderHamburgerElement = screen.getByTestId("menu-hamburger-element");
    expect(HeaderHamburgerElement).toBeInTheDocument();

    fireEvent.click(HeaderHamburgerElement);

    const MegaMenuElement = screen.getByTestId("header-menu-drawer-element");
    expect(MegaMenuElement).toBeInTheDocument();

    const SearchBarMobileElement = screen.getByTestId("search-bar-mobile-element");
    expect(SearchBarMobileElement).toBeInTheDocument();

    expect(screen.queryByTestId("menubar-menuitem-button")).toBeNull();
    expect(screen.queryByText("AllCategoriesExpandedMenu.AllCategoriesLabel")).toBeNull();
    expect(screen.queryByTestId("search-bar-desktop-largetablet-element")).toBeNull();
  });
});

describe("Desktop : Header is displayed in desktop version", () => {
  test("Desktop : Header is displayed in desktop version", () => {
    window.matchMedia = createMatchMedia(1500);

    render(<Header loggedIn={false} />);

    const MenubarMenuItemElement = screen.getByTestId("menubar-menuitem-button");
    expect(MenubarMenuItemElement).toBeInTheDocument();

    const AllCategoriesExpandedMenuElement = screen.getByText("AllCategoriesExpandedMenu.AllCategoriesLabel");
    expect(AllCategoriesExpandedMenuElement).toBeInTheDocument();

    const SearchBarDesktopLargeTabletElement = screen.getByTestId("search-bar-desktop-largetablet-element");
    expect(SearchBarDesktopLargeTabletElement).toBeInTheDocument();

    expect(screen.queryByTestId("menu-hamburger-element")).toBeNull();
    expect(screen.queryByTestId("header-menu-drawer-element")).toBeNull();
    expect(screen.queryByTestId("search-bar-mobile-element")).toBeNull();
  });
});
