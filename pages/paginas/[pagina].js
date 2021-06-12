import Template from "../../src/template/Template"
import Conteudo from '../../src/components/Conteudo';
import { globalSite } from '../../src/config'

export default function Pagina({ menu, artigo, pagina}) {
  return (
    <Template menuItens={menu} paginaAtiva={pagina}>
      <Conteudo artigo={artigo} paginaAtiva={pagina}/>
    </Template>   
  )
}

export async function getStaticPaths() {
  // montar paths com consulta ao banco de dados
  const db = require("../../src/db");
  const idSite = globalSite.idSite;
  const rMenu = await db.getMenu(idSite);
  const rMenuJSON = JSON.parse(rMenu);
  const paths = rMenuJSON.map(menu => { return { params: { pagina: menu.menu_nome } } });
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps(context) {
  const { pagina } = context.params;
  
  const db = require("../../src/db");
  const idSite = globalSite.idSite
  const rMenu = await db.getMenu(idSite);
  const rArtigo = await db.getArtigo(pagina);
  const rMenuJSON = JSON.parse(rMenu);
  const rArtigoJSON = JSON.parse(rArtigo);

  return {
    props: {
      menu: rMenuJSON,
      artigo: rArtigoJSON,
      pagina: pagina,
    },
    revalidate: 120
  }
}
