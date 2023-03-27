import { ThemeProvider } from "styled-components";

import theme from "../src/styles/theme";
import GlobalStyles from "../src/styles/global";

export const parameters = {
  backgrounds: {
    default: "rubeus-white",
    values: [
      {
        name: "rubeus-white",
        value: theme.colors.white,
      },
      {
        name: "rubeus-black",
        value: theme.colors.darkGrey,
      },
    ],
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Story />
    </ThemeProvider>
  ),
];
