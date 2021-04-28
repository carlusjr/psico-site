import Head from 'next/head';
import { globalSite } from './config';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>{globalSite.tituloSite}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <section>
        <h1>PSICÓLOGOS na InterNET</h1>
        {children}
      </section>
    </>
  )
}
