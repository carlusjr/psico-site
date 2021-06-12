import { globalSite } from "./config";

// Acesso ao Bando de Dados MySQL AWS
const mysql = require("mysql2/promise");

async function connect() {
  if (global.connection && global.connection !== "disconnected") {
    return global.connection;
  }
  try {
    const conn = await mysql.createConnection(process.env.MYSQL_CONNSTRING);
    global.connection = conn;
    return conn;
  } catch (error) {
    console.log("Não foi possível conectar ao DB!");
    console.log(error.code, error.errno);
    process.exit();
  }
}

async function getArtigo(nomeArtigo) {
  const conn = await connect();
  const [res] = await conn.query(
    "SELECT art_titulo, art_subtitulo, art_texto, art_imagem, art_classImagem  FROM artigos WHERE art_nome = ?",
    nomeArtigo
  );
  const resJSON = JSON.stringify(res[0]);
  return resJSON;
}

async function getSite(nomeSite) {
  const conn = await connect();
  const [res] = await conn.query(
    "SELECT site_nome, site_titulo FROM site WHERE site_nome = ?",
    nomeSite
  );
  const resJSON = JSON.stringify(res[0]);
  return resJSON;
}

async function getMenu(idSite) {
  const conn = await connect();
  const [res] = await conn.query(
    "SELECT menu_nome, menu_titulo FROM menu WHERE site_id = ?",
    idSite
  );
  const resJSON = JSON.stringify(res);
  return resJSON;
}

async function getProps(pagina) {
  if (!pagina) {
    pagina = globalSite.homeSite;
  }
  const idSite = globalSite.idSite;
  const nomeSite = globalSite.nomeSite;

  const rSite = await getSite(nomeSite);
  const rMenu = await getMenu(idSite);
  const rArtigo = await getArtigo(pagina);

  const rSiteJSON = JSON.parse(rSite);
  const rMenuJSON = JSON.parse(rMenu);
  const rArtigoJSON = JSON.parse(rArtigo);

  return {
    menu: rMenuJSON,
    artigo: rArtigoJSON,
    pagina: pagina,
    site: rSiteJSON,
  };
}

async function getPaths() {
  const idSite = globalSite.idSite;
  const rMenu = await getMenu(idSite);
  const rMenuJSON = JSON.parse(rMenu);
  const paths = rMenuJSON.map((menu) => {
    return { params: { pagina: menu.menu_nome } };
  });
  return paths;
}

module.exports = { getArtigo, getSite, getMenu, connect, getProps, getPaths };
