import { globalSite } from "../config";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Rodape from "../components/Rodape";

export default function Template({ menuItens, paginaAtiva, children, isLogin }) {
  if (!paginaAtiva) {
    paginaAtiva = globalSite.homeSite;
  }
  return (
    <>
      <Header title={globalSite.tituloSite} />
      <section>
        <Menu menuItens={menuItens} paginaAtiva={paginaAtiva} />
        {children}
        <Rodape isLogin={isLogin} />
      </section>
    </>
  );
}
