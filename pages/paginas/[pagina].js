import Head from 'next/head'
import { globalIdSite, globalNomeSite } from '../../src/config'
import Header from '../../src/header'
import Menu from '../../src/menu'
import Conteudo from '../../src/conteudo'

export default function Pagina({ site, menu, artigo, pagina }) {

  //const arrayTexto = artigo.art_texto.split('\n');
  //const imagemFile = '/' + pagina + '.jpg'

  return (
    <div>
      <Head>
        <title>Psicosite</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>
      <section>
        <Header titulo={site.site_titulo} />
        <Menu menuItens={menu} paginaAtiva={pagina} />
        <Conteudo artigo={artigo} paginaAtiva={pagina} />

        {/* <div id="conteudo">
          <p></p>
          <img src={imagemFile} alt={pagina} />
          <h2 id="titulo">{artigo.art_titulo}</h2>
          <p></p>
          <h3 id="subtitulo">{artigo.art_subtitulo}</h3>
          <hr />
          <p></p>
          <div className="textoArtigo">{arrayTexto.map((txt, index) => <p key={index}>{txt}</p>)}</div>
        </div> */}
      </section>
      <footer className="footer">
        <p>Desenvolvido por&nbsp;<a href="mailto:crsilvajr@gmail.com">Carlos Roberto da Silva Jr.</a></p>
        <p><a href="#" className="back-top">Voltar ao Topo</a></p>
      </footer>
    </div>
  )
}

export async function getStaticPaths() {
  // montar paths com consulta ao banco de dados
  const db = require("../../src/db");
  const rMenu = await db.getMenu(globalIdSite);
  const rMenuJSON = JSON.parse(rMenu);
  const paths = rMenuJSON.map( menu => { return { params: { pagina: menu.menu_nome } } });
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps(context) {
  let { pagina } = context.params;
  if (!pagina) {
    pagina = 'home';
  }
  const db = require("../../src/db");
  const rSite = await db.getSite(globalNomeSite);
  const rMenu = await db.getMenu(globalIdSite);
  const rArtigo = await db.getArtigo(pagina);
  const rSiteJSON = JSON.parse(rSite);
  const rMenuJSON = JSON.parse(rMenu);
  const rArtigoJSON = JSON.parse(rArtigo);

  return {
    props: {
      site: rSiteJSON,
      menu: rMenuJSON,
      artigo: rArtigoJSON,
      pagina: pagina,
    },
    revalidate: 120
  }
}
