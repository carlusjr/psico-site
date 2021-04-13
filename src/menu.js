import React, { useState, useEffect } from 'react'

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
      let itensMenu = document.getElementsByName('menuItem');
      let qtdItens = itensMenu.length;
      for (let i = 0; i < qtdItens; i++) {
        itensMenu[i].className = "";
      }
      let menuItem = document.getElementById(activeItem);
      menuItem.className = "active";      
    }

  });

  return (
    <div>
      <h1>PSICÓLOGOS na Internet</h1>
      <div className="topnav" id="menuTopnav">
        <a href="#home" name="menuItem" id="home" onClick={mudaActive}>Home</a>
        <a href="#psicologos" name="menuItem" id="psicologos" onClick={mudaActive}>Psicólogos</a>
        <a href="#procedimentos" name="menuItem" id="procedimentos" onClick={mudaActive}>Procedimentos</a>
        <a href="#linksUteis" name="menuItem" id="linksUteis" onClick={mudaActive}>Links Úteis</a>
        <a href="#faleConosco" name="menuItem" id="faleConosco" onClick={mudaActive}>Fale conosco</a>
        <a href="#teste" className="icon" onClick={addCount}>
          <i className="material-icons">menu</i>
        </a>
      </div>
    </div>
  )
}

export default Menu