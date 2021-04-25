import Head from "next/head";
import { globalSite } from "../../src/config";
import Header from "../../src/header";
import Rodape from "../../src/rodape";
//import Link from "next/link";

export default function Admin({ site }) {
  return (
    <div>
      <Head>
        <title>{globalSite.tituloSite}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>
      <section>
        <Header titulo={site.site_titulo} />
        <p></p>
        <hr />
        <h3>Login do Administrador</h3>
        <p></p>
        <form>
          <label>
            <span>Nome do usuário</span>
            <input type="text" name="username" required />
          </label>
          <label>
            <span>Senha</span>
            <input type="password" name="password" required />
          </label>
          <input type="submit" value="Login" />
        </form>
      </section>
      <Rodape isLogin />
    </div>
  );
}

export async function getStaticProps() {
  const db = require("../../src/db");
  const nomeSite = globalSite.nomeSite;
  const rSite = await db.getSite(nomeSite);
  const rSiteJSON = JSON.parse(rSite);

  return {
    props: {
      site: rSiteJSON,
    },
    revalidate: 10,
  };
}
