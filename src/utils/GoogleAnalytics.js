import React from "react";

const GoogleAnalytics = () => {
  return (
    <React.Fragment>
      {/* Google analytics */}
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-9CZ6E9MW5W"
      ></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-9CZ6E9MW5W');
          `,
        }}
      ></script>
    </React.Fragment>
  );
};

export default GoogleAnalytics;
