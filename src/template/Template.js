import { globalSite } from "../config";
import Header from "../components/Header";
import Menu from "../components/Menu";
import Rodape from "../components/Rodape";

export default function Template({ menuItens, paginaAtiva, isLogin, children }) {
  return (
    <>
      <Header title={globalSite.tituloSite} />
      <section>
        <h1>Psicólogos na InterNET</h1>
        <Menu menuItens={menuItens} paginaAtiva={paginaAtiva} />
        {children}
        <Rodape isLogin={isLogin} />
      </section>
    </>
  );
}
