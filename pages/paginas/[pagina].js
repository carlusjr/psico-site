import Head from 'next/head'
import { globalSite } from '../../src/config'
import Header from '../../src/header'
import Menu from '../../src/menu'
import Conteudo from '../../src/conteudo'
import Rodape from '../../src/rodape'
import Pagamento from '../../src/pagamento'
import Faleconosco from '../../src/faleconosco'

export default function Pagina({ site, menu, artigo, pagina }) {
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
        <Pagamento paginaAtiva={pagina} />
        <Faleconosco paginaAtiva={pagina} />
      </section>
      <Rodape />
    </div>
  )
}

export async function getStaticPaths() {
  // montar paths com consulta ao banco de dados
  const db = require("../../src/db");
  const arrayGlobal = globalSite.split('/');
  const idSite = arrayGlobal[0];
  const rMenu = await db.getMenu(idSite);
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
  const arrayGlobal = globalSite.split('/');
  const idSite = arrayGlobal[0];
  const nomeSite = arrayGlobal[1];
  const rSite = await db.getSite(nomeSite);
  const rMenu = await db.getMenu(idSite);
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
