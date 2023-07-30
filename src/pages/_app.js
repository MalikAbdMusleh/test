import * as React from "react";
import "@/styles/globals.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Layout from "@/components/Layout/Layout";
import CssBaseline from "@mui/material/CssBaseline";
import "/node_modules/flag-icons/css/flag-icons.min.css";
import { wrapper } from "@/redux/store";
import { Provider, useDispatch } from "react-redux";
import { themeOptions } from "@/theme";
import Head from "next/head";
import ProtectedRoute from "@/HOC/ProtectedRoute";
import { useGetConfigsQuery } from "@/redux/apis/account/myWatchList.api";
import { useEffect } from "react";
import { setConfigs } from "@/redux/slices/auth.slice";
import { I18nextProvider, useSSR, useTranslation } from "react-i18next";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import i18n from "../../i18n.js";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";

const cacheLtr = createCache({
  key: "muiltr",
});

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const ltrTheme = createTheme({ ...themeOptions, direction: "ltr" });
const rtlTheme = createTheme({ ...themeOptions, direction: "rtl" });
function App({ Component, ...rest }) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps, session } = props;
  const { t, i18n } = useTranslation();

  const theme = React.useMemo(() => createTheme(themeOptions), []);
  const route = props?.router?.state?.route;
  const getConfQ = useGetConfigsQuery();
  const dispatch = useDispatch();
  const [isRtl, setIsRtl] = React.useState(false);
  useSSR();
  React.useLayoutEffect(() => {
    document.body.setAttribute("dir", i18n.dir() == "rtl" ? "rtl" : "ltr");
  }, [isRtl]);
  useEffect(() => {
    if (getConfQ.data)
      dispatch(
        setConfigs({
          ...getConfQ?.data?.filterOptions,
          sellerTypes: getConfQ?.data?.sellerTypes,
        })
      );
  }, [getConfQ]);

  return (
    <Provider store={store}>
      <Head>
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/imgs/logo2.svg"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/imgs/logo2.svg"
        />
      </Head>
      <I18nextProvider i18n={i18n}>
        <CacheProvider value={i18n.dir() == "rtl" ? cacheRtl : cacheLtr}>
          <ThemeProvider theme={i18n.dir() == "rtl" ? rtlTheme : ltrTheme}>
            <CssBaseline enableColorScheme />
            {/* <SessionProvider session={session}> */}
            <ProtectedRoute
              store={store}
              route={route}
              Component={Component}
              {...pageProps}
              {...rest}
            />

            {/* </SessionProvider> */}
          </ThemeProvider>
        </CacheProvider>
      </I18nextProvider>
    </Provider>
  );
}

export default wrapper.withRedux(App);
