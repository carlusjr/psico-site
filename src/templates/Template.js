import Head from "../components/Head";
import Header from "../components/Header"
import Menu from "../components/Menu";
import Rodape from "../components/Rodape";
import { globalSite } from "../config";


export default function Template({ menuItens, paginaAtiva, siteTitulo, subTitulo, userLogged, children }) {
  return (
    <>
      <Head title={globalSite.tituloSite} />
      <section>
        <Header titulo={siteTitulo} subTitulo={subTitulo} userLogged={userLogged} />
        <Menu menuItens={menuItens} paginaAtiva={paginaAtiva} />
        {children}
        <Rodape homeLink={ paginaAtiva == "admin" || !!userLogged } />
      </section>
    </>
  );
}
