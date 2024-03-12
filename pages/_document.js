import React from "react";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../src/createEmotionCache";
import createEmotionServer from "@emotion/server/create-instance";
import Document, { Html, Head, Main, NextScript } from "next/document";
const GOOGLE_SITE_VERIFICATION = process.env.GOOGLE_SITE_VERIFICATION;
const ENABLE_GOOGLE_ANALYTICS = process.env.ENABLE_GOOGLE_ANALYTICS;
export default class ASP extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="apple-touch-icon" href="/icon.png"></link>
          {ENABLE_GOOGLE_ANALYTICS === "false" && (
            <meta name="robots" content="noindex" />
          )}
          <meta name="theme-color" content="#fff" />
          <meta
            name="google-site-verification"
            content={GOOGLE_SITE_VERIFICATION}
          />
          {ENABLE_GOOGLE_ANALYTICS === "true" && (
            <script
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `(function(w,d,s,l,i){w[l] = w[l] || [];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-P8QRHFC');`,
              }}
            ></script>
          )}
          {ENABLE_GOOGLE_ANALYTICS === "true" && (
            <script
              async
              defer
              src="https://tools.luckyorange.com/core/lo.js?site-id=28db2bd5"
            ></script>
          )}
        </Head>
        <body>
          {ENABLE_GOOGLE_ANALYTICS === "true" && (
            <noscript
              dangerouslySetInnerHTML={{
                __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-P8QRHFC"
height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
              }}
            ></noscript>
          )}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

ASP.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);
  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => <App emotionCache={cache} {...props} />,
      enhanceComponent: (Component) => (props) =>
        (
          <CacheProvider value={cache}>
            <Component {...props} />
          </CacheProvider>
        ),
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStylesTages = emotionStyles.styles.map((style) => (
    <style
      data-emotion={`${style.key} ${style.ids.join("")}`}
      key={style.key}
      dangerouslySetInnerHTML={{
        __html: style.css,
      }}
    />
  ));
  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      ...emotionStylesTages,
    ],
  };
};
