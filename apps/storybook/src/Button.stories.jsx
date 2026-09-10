import React from "react";

const Button = ({ children, tone = "primary" }) =>
  React.createElement(
    "button",
    {
      type: "button",
      style: {
        border: tone === "ghost" ? "1px solid #d4d4d8" : "1px solid #111827",
        borderRadius: 10,
        background: tone === "ghost" ? "transparent" : "#111827",
        color: tone === "ghost" ? "#111827" : "#ffffff",
        cursor: "pointer",
        font: "600 14px/1 system-ui",
        padding: "10px 16px",
      },
    },
    children,
  );

const meta = {
  title: "Design System/Button",
  component: Button,
  args: {
    children: "Debate now",
  },
};

export default meta;

export const Primary = {};

export const Ghost = {
  args: {
    tone: "ghost",
    children: "Secondary action",
  },
};
