import { AppProps as NextAppProps } from "next/app";
import Head from "next/head";
import NextNprogress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "styled-components";

import GlobalStyles from "../styles/global";
import theme from "../styles/theme";

type AppProps = NextAppProps & {
  Component: NextAppProps["Component"] /*& {*/;
  //   auth?: WithAccessOptions;
  // };
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Rubeus Project</title>
      </Head>
      <GlobalStyles />
      <NextNprogress
        color={theme.colors.darkPrimaryColor}
        startPosition={0.3}
        stopDelayMs={300}
        height={5}
      />
      <ToastContainer />
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default App;
