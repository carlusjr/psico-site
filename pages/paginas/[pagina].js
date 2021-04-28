import Layout from '../../src/layout';
import Menu from '../../src/menu';
import Conteudo from '../../src/conteudo';
import Rodape from '../../src/rodape';
import Pagamento from '../../src/pagamento';
import Faleconosco from '../../src/faleconosco';
import { globalSite } from '../../src/config'

export default function Pagina({ menu, artigo, pagina }) {
  return (
    <div>
      <Layout>
        <Menu menuItens={menu} paginaAtiva={pagina} />
        <Conteudo artigo={artigo} paginaAtiva={pagina} />
        <Pagamento paginaAtiva={pagina} />
        <Faleconosco paginaAtiva={pagina} />
      </Layout>
      <Rodape />
    </div>
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
  let { pagina } = context.params;
  if (!pagina) {
    pagina = globalSite.homeSite;
  }
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
    revalidate: 60
  }
}
