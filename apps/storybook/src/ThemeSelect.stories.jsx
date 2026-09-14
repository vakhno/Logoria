import React, { useState } from "react";
import { ThemeSelect } from "../../../shared/components/dist/index.js";

const meta = {
  title: "Design System/ThemeSelect",
  component: ThemeSelect,
};

export default meta;

export const Default = {
  render: () => {
    const [selectedTheme, setSelectedTheme] = useState("system");
    return React.createElement(ThemeSelect, {
      options: ["light", "dark", "system"],
      selectedTheme,
      onSelectTheme: setSelectedTheme,
      renderOption: (theme) => theme.toUpperCase(),
    });
  },
};
