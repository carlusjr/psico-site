import Head from 'next/head'
import Menu from '../src/menu.js'


function App(props) {
  const dinamicDate = new Date();
  const dinamicDateString = dinamicDate.toLocaleDateString();
  const dinamicTimeString = dinamicDate.toLocaleTimeString();
  const textDinamic = 'Página em construção, conteúdo dinâmico: '+dinamicDateString+' - '+dinamicTimeString;

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
        <h2>{props.homeTitulo}</h2>
        <p></p>
        <p>{props.homeArtigo}</p>
        <p></p>
        <p>{textDinamic}</p>
      </section>
    </div>
  );
}


export async function getStaticProps() {
  const homeTitulo = 'Psicologia ao alcance de todos'
  const staticDate = new Date();
  const staticDateString = staticDate.toLocaleDateString();
  const staticTimeString = staticDate.toLocaleTimeString();
  const homeArtigo = 'Página em construção, conteúdo estático: '+staticDateString+' - '+staticTimeString;

  return {
    props: {
      homeTitulo,
      homeArtigo
    },
    revalidate: 5
  }

}

export default App;