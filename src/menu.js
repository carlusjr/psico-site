import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Menu(props) {
  const [sendRequest, setSendRequest] = useState(false);

  useEffect(() => {
    if (sendRequest) {
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
    <div className="topnav" id="menuTopnav">
      {props.menuItens.map(item =><Link href={`/paginas/${item.menu_nome}`} key={item.menu_nome}>
          <a className={(item.menu_nome == props.paginaAtiva ? "active" : "")}>{item.menu_titulo}</a>
        </Link>)
      };
      <a href="#teste"
        className="icon"
        onClick={() => setSendRequest(true)}>
        <i className="material-icons">menu</i>
      </a>
    </div>
  )
}