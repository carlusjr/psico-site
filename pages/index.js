import Head from 'next/head'
import Menu from '../src/menu.js'
import Image from 'next/image'

function App(props) {
  // aqui podem ser colocados dados dinâmicos
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
        <Image src="/Freud.jpg" alt="Freud online" width={300} height={300} />
        <h2>{props.artigoTitulo}</h2>
        <p></p>
        <p>{props.artigoTexto}</p>
        <p></p>       
      </section>
    </div>
  );
}


export async function getStaticProps() {

  const db = require("../src/db");
  let resultado = await db.selectArtigos('Home');
  const artigoJSON   = JSON.parse(resultado);
  const artigoTitulo = artigoJSON.art_titulo;
  const artigoTexto  = artigoJSON.art_texto; 
  return {
    props: {
      artigoTitulo, artigoTexto
    },
    revalidate: 5
  }
}

export default App;