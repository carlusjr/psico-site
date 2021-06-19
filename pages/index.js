// Home Page do psico-site
import Template from "../src/templates/Template"
import Conteudo from "../src/components/Conteudo"

export default function Psicosite(props) {  
  return (
    <Template menuItens={props.menu} paginaAtiva={props.pagina} siteTitulo={props.site.site_titulo}>
      <Conteudo artigo={props.artigo} paginaAtiva={props.pagina}/>
    </Template>    
  )
}

export async function getStaticProps() {
  const db = require("../src/db");
  const siteProps = await db.getProps();  
  return { props: siteProps, revalidate: 120 }  
}

