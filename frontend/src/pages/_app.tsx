import { AppProps as NextAppProps } from "next/app";
import Head from "next/head";
import NextNprogress from "nextjs-progressbar";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "styled-components";

import { queryClient } from "../services/api";

import { AtomHydrator, AtomProvider } from "@/hooks/AtomProvider";

import GlobalStyles from "../styles/global";
import theme from "../styles/theme";

type AppProps = NextAppProps & {
  Component: NextAppProps["Component"] /*& {*/;
  //   auth?: WithAccessOptions;
  // };
};

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <AtomProvider initialState={pageProps.initialState}>
            <AtomHydrator initialState={pageProps.initialState}>
              <ThemeProvider theme={theme}>
                <Head>
                  <title>Rubeus Integration</title>
                </Head>
                <GlobalStyles />
                <NextNprogress
                  color={theme.colors.blue}
                  startPosition={0.3}
                  stopDelayMs={300}
                  height={5}
                />
                <ToastContainer />
                <Component {...pageProps} />
              </ThemeProvider>
            </AtomHydrator>
          </AtomProvider>
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default App;
