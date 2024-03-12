import Head from "next/head";
import React from "react";
const ENABLE_GOOGLE_ANALYTICS = process.env.ENABLE_GOOGLE_ANALYTICS;

const OpenGraphTags = ({ PageTitle, url, description, imageUrl, keyWords }) => {
  return (
    <React.Fragment>
      <Head>
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
        <title>
          {PageTitle ||
            "Best Online Shopping Site In India For Fashion, Electronics & More | Fabmerce"}
        </title>
        <meta
          name="description"
          content={
            description ||
            "Fabmerce: The Largest Online Shopping Site In India. Buy Online for Men's & Women's Clothing, Kid's toys, Electronic gadgets, and much more! Free Shipping & Cash on Delivery Available."
          }
        />
        <meta
          name="keywords"
          content={
            keyWords ||
            "Fabmerce, Online Shopping, online shopping india, india shopping online, buy online, online Shopping store, Online Shopping Site, Shop Online, Online store, ethnic wear, online purchase, fashion store"
          }
        />
        {ENABLE_GOOGLE_ANALYTICS === "true" && (
          <link rel="canonical" href={url || "https://www.fabmerce.in/"} />
        )}
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content={
            PageTitle ||
            "Best Online Shopping Site In India For Fashion, Electronics & More | Fabmerce"
          }
        />
        <meta
          property="og:description"
          content={
            description ||
            "Fabmerce: The Largest Online Shopping Site In India. Buy Online for Men's & Women's Clothing, Kid's toys, Electronic gadgets, Graphic T-shirts, Organic soap, furnitures and much more! Free Shipping & Cash on Delivery Available."
          }
        />
        <meta property="og:url" content={url || "https://www.fabmerce.in/"} />
        <meta
          property="og:image"
          content={
            imageUrl ||
            "https://storage.googleapis.com/asp-pprd-images-bucket/assets/fabmerce-logo.png"
          }
        />
        <meta property="og:site_name" content="Fabmerce" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@fabmerce" />
        <meta
          name="twitter:title"
          content={
            PageTitle ||
            "Best Online Shopping Site In India For Fashion, Electronics & More | Fabmerce"
          }
        />
        <meta
          name="twitter:image"
          property="twitter:image"
          content={imageUrl}
        />
        <meta
          name="twitter:description"
          content={
            description ||
            "Fabmerce: The Largest Online Shopping Site In India. Buy Online for Men's & Women's Clothing, Kid's toys, Electronic gadgets, Graphic T-shirts, Organic soap, furnitures and much more! Free Shipping & Cash on Delivery Available."
          }
        />
      </Head>
    </React.Fragment>
  );
};

export default OpenGraphTags;
