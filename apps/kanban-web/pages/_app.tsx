import { AppProps } from 'next/app';
import Head from 'next/head';
import '../public/styles/shared-root.css';
import '../public/styles/reset.scss';
import '../public/styles/shared-global.scss';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to kanban-web!</title>
      </Head>
      <main className="app">
        <Component {...pageProps} />
      </main>
    </>
  );
}

export default CustomApp;
