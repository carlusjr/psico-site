import Header from "../components/Header";
import Menu from "../components/Menu";
import Rodape from "../components/Rodape";
import { globalSite } from "../config";


export default function Template({ menuItens, paginaAtiva, siteTitulo, isLogin, children }) {
  return (
    <>
      <Header title={globalSite.site_titulo} />
      <section>
        <h1>{siteTitulo}</h1>
        <Menu menuItens={menuItens} paginaAtiva={paginaAtiva} />
        {children}
        <Rodape isLogin={isLogin} />
      </section>
    </>
  );
}
