import Head from 'next/head';

export default function Header({ title }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="icon" type="image/png" href="favicon.png"/>
        <title>{title}</title>        
      </Head>      
    </>
  )
}
