import Head from "next/head";
import Router from "next/router";
import "nprogress/nprogress.css";
import nProgress from "nprogress";
import MuiTheme from "theme/MuiTheme";
import "simplebar/dist/simplebar.min.css";
import OpenGraphTags from "utils/OpenGraphTags";
import React, { Fragment, useEffect } from "react";
import GoogleAnalytics from "utils/GoogleAnalytics";
import createEmotionCache from "../src/createEmotionCache";
import { CacheProvider } from "@emotion/react"; // Client-side cache, shared for the whole session of the user in the browser.
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { wrapper, store, persistor } from "../src/store/store";
const ENABLE_GOOGLE_ANALYTICS = process.env.ENABLE_GOOGLE_ANALYTICS;

const clientSideEmotionCache = createEmotionCache();
// export const cache = createCache({ key: 'css', prepend: true })
//Binding events.
Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done()); // small change

nProgress.configure({
  showSpinner: false,
});

const App = ({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}) => {
  const Layout = Component.layout || Fragment;
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");

    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);
  return (
    <CacheProvider value={emotionCache}>
      {ENABLE_GOOGLE_ANALYTICS === "true" && <GoogleAnalytics />}
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MuiTheme>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </MuiTheme>
        </PersistGate>
      </Provider>
    </CacheProvider>
  );
}; // Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// App.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//   return { ...appProps };
// };

export default wrapper.withRedux(App);
