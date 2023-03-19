import { AppProps } from 'next/app';
import Head from 'next/head';
import '../public/styles/shared-root.css';
import '../public/styles/reset.scss';
import '../public/styles/shared-global.scss';
import '../public/styles/global.scss';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';
import RootLayout from '../lib/layout/RootLayout';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function CustomApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <>
      <Head>
        <title>Airhublabs Kanban</title>
      </Head>

      {getLayout(
        <RootLayout>
          <Component {...pageProps} />
        </RootLayout>
      )}
    </>
  );
}

export default CustomApp;
