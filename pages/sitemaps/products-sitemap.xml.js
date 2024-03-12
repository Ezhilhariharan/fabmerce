import React from 'react'

 export default class ProductSitemap extends React.Component {
    static async getInitialProps({ res }) {
        const request = await fetch('https://assets.aptonshops.com/sitemaps/products-sitemap.xml');
        const links = await request.text();
        res.setHeader('Content-Type', 'text/xml');
        res.write(links);
        res.end();
    }
}

