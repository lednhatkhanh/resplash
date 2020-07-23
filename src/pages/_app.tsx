import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';

import '../styles/index.scss';

const ResplashApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Resplash</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
};

export default ResplashApp;
