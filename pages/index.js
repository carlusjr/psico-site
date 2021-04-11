import Head from 'next/head'
import Menu from '../src/menu'
import Image from 'next/image'

function App({data}) {
  // aqui podem ser colocados dados dinâmicos
  const arrayTexto = data.art_texto.split('\n');
  return (    
    <div>
      <Head>
        <title>PsicoNET</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />        
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"  />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />        
      </Head>      
      <section>        
        <Menu />
        <p></p>
        <Image src="/Freud.jpg" alt="Freud online" width={300} height={250} />
        <p></p>
        <div id="conteudo">
          <h2 id="titulo">{data.art_titulo}</h2>
          <p></p>
          <h3 id="subtitulo">{data.art_subtitulo}</h3>
          <p></p>
          <div className="textoArtigo">{arrayTexto.map( txt => <p>{txt}</p> )}</div>
          <p></p>       
        </div>
      </section>
    </div>
  );
}

export async function getStaticProps() { 
  const db =  require("../src/db");
  const res = await db.getArtigo("home");
  const resJSON = JSON.parse(res);
  return {
    props: {
      data: resJSON,
    },
    revalidate: 10
  }
}

export default App;