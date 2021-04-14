import Head from 'next/head'
import React, { useState, useEffect } from 'react'
import { globalIdSite, globalNomeSite } from '../../src/config'

export default function Pagina({ site, menu, artigo, pagina }) {

  const [sendRequest, setSendRequest] = useState(false);
  const arrayTexto = artigo.art_texto.split('\n');

  useEffect(() => {
    if(sendRequest){
      let x = document.getElementById("menuTopnav");
      if (x.className === "topnav") {
        x.className += " responsive";
      } else {
        x.className = "topnav";
      }
      setSendRequest(false);
    }
  });

  return (
    <div>
      <Head>
        <title>PsicoNET</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Open+Sans&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      </Head>

      <section>
        <h1>{site.site_titulo}</h1>
        <div className="topnav" id="menuTopnav">
          {menu.map((item, index) => <a 
            href={`/paginas/${item.menu_nome}`} 
            className={(item.menu_nome == pagina ? "active" : "")} 
            id={item.menu_nome} 
            key={index}>{item.menu_titulo}</a>)
          };
          <a href="#teste" 
            className="icon" 
            onClick={() => setSendRequest(true)}> 
            <i className="material-icons">menu</i>
          </a>
        </div>
        <div id="conteudo">
          <h2 id="titulo">{artigo.art_titulo}</h2>
          <p></p>
          <h3 id="subtitulo">{artigo.art_subtitulo}</h3>
          <p></p>
          <div className="textoArtigo">{arrayTexto.map((txt, index) => <p key={index}>{txt}</p>)}</div>
          <p></p>
        </div>
      </section>

      <footer className="footer">
        Desenvolvido por Carlos Roberto da Silva Junior
      </footer>
    </div>
  )
}

export async function getStaticPaths() {
  // montar paths com consulta ao banco de dados
  return {
    paths: [{ params: { pagina: 'home' } },
    { params: { pagina: 'procedimentos' } }
    ],
    fallback: false
  }
}

export async function getStaticProps(context) {
  let { pagina } = context.params;
  if (!pagina) {
    pagina = 'home';
  }
  const db = require("../../src/db");
  const rSite = await db.getSite(globalNomeSite);
  const rMenu = await db.getMenu(globalIdSite);
  const rArtigo = await db.getArtigo(pagina);
  const rSiteJSON = JSON.parse(rSite);
  const rMenuJSON = JSON.parse(rMenu);
  const rArtigoJSON = JSON.parse(rArtigo);

  return {
    props: {
      site: rSiteJSON,
      menu: rMenuJSON,
      artigo: rArtigoJSON,
      pagina: pagina,
    },
    revalidate: 60
  }
}
