import React from "react";
import { Button, Header } from "../../../shared/components/dist/index.js";

const meta = {
  title: "Design System/Patterns/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

export const SignedOut = {
  render: () =>
    React.createElement(
      "div",
      { style: { padding: 24 } },
      React.createElement(
        Header,
        null,
        React.createElement(
          Header.Brand,
          null,
          React.createElement("a", { href: "/" }, "app_name"),
        ),
        React.createElement(
          Header.Actions,
          null,
          React.createElement("span", null, "Browsing anonymously"),
          React.createElement("a", { href: "/signin" }, "Sign in"),
        ),
      ),
    ),
};

export const SignedIn = {
  render: () =>
    React.createElement(
      "div",
      { style: { padding: 24 } },
      React.createElement(
        Header,
        null,
        React.createElement(
          Header.Brand,
          null,
          React.createElement("a", { href: "/" }, "app_name"),
          React.createElement(
            Header.Nav,
            null,
            React.createElement("a", { href: "/rooms" }, "Rooms"),
            React.createElement("a", { href: "/settings" }, "Settings"),
          ),
        ),
        React.createElement(
          Header.Actions,
          null,
          React.createElement(
            "div",
            { style: { textAlign: "right" } },
            React.createElement("div", null, "Alex Morgan"),
            React.createElement("div", null, "alex@example.com"),
          ),
          React.createElement(Button, { variant: "outline" }, "Sign out"),
        ),
      ),
    ),
};
