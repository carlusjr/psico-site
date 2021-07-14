import Template from "../../src/templates/Template"
import Conteudo from '../../src/components/Conteudo';

export default function Pagina({ menu, artigo, pagina, site}) {
  return (
    <Template 
      menuItens={menu} 
      paginaAtiva={pagina} 
      siteTitulo={site.site_titulo}
    >
      <Conteudo 
        artigo={artigo} 
        paginaAtiva={pagina}
      />
    </Template>   
  )
}

export async function getStaticPaths() {  
  const db = require("../../src/db");
  const paths = await db.getPaths();
  return { paths, fallback: false  };
}

export async function getStaticProps(context) {
  const { pagina } = context.params;
  const db = require("../../src/db");
  const props = await db.getProps(pagina);  
  return { props, revalidate: 1200 };  
}
