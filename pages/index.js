import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Head from 'next/head'

function App() {
  return (    
    <div>
      <Head>
        <title>PsicoNET</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      </Head>      
      <section>
        <h1>PSICÓLOGOS na Internet</h1>
        <Menu />
        <h2>Página em construção...</h2>
      </section>
    </div>
  );
}

function Menu() {
  const [count, setCount] = useState(0);
  const [activeItem, setActive] = useState('home');
  
  function mudaActive(e) {
    setActive(e.target.id);
  }

  function addCount() {
    setCount(count + 1);
  }

  useEffect(() => {
    let x = document.getElementById("menuTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }

    if (activeItem) {
      console.log('Atualiza menu', count);
      let itensMenu = document.getElementsByName('menuItem');
      let qtdItens = itensMenu.length;
      for (let i=0; i < qtdItens; i++){
        itensMenu[i].className = "";
      }
      let menuItem = document.getElementById(activeItem);
      menuItem.className = "active";
    }

  });

  return (
    <div className="topnav" id="menuTopnav">
      <a href="#home" name="menuItem" id="home" onClick={mudaActive}>Home</a>
      <a href="#psicologos" name="menuItem" id="psicologos" onClick={mudaActive}>Psicólogos</a>
      <a href="#procedimentos" name="menuItem" id="procedimentos" onClick={mudaActive}>Procedimentos</a>
      <a href="#linksUteis" name="menuItem" id="linksUteis" onClick={mudaActive}>Links Úteis</a>
      <a href="#faleConosco" name="menuItem" id="faleConosco" onClick={mudaActive}>Fale conosco</a>
      <Link href="/sobre" id="sobre"><a name="menuItem" onClick={mudaActive}>Sobre</a></Link>
      <a href="#teste" className="icon" onClick={addCount}>
        <i className="fa fa-bars"></i>
      </a>
    </div>
  )
}


export default App;