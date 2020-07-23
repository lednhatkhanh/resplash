import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class ResplashDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" type="image/svg+xml" href="/images/unsplash.svg" />
          <meta name="description" content="A pwa Unsplash client" />
          {/* <meta httpEquiv="Accept-CH" content="DPR, Viewport-Width" />
          <meta httpEquiv="Accept-CH-Lifetime" content="86400" /> */}
        </Head>
        <body className="w-screen overflow-x-hidden">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
