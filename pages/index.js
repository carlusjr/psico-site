// Home Page do psico-site
import Template from "../src/template/Template"
import Conteudo from "../src/components/Conteudo"
import { globalSite } from '../src/config';

export default function Psicosite(props) {  
  return (
    <Template menuItens={props.menu} paginaAtiva={props.pagina}>
      <Conteudo artigo={props.artigo} paginaAtiva={props.pagina}/>
    </Template>    
  )
}

export async function getStaticProps() {
  const pagina=globalSite.homeSite;
  const idSite = globalSite.idSite

  const db = require("../src/db");
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

