import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import useAuth from "../../src/contexts/AuthContext";
import Template from "../../src/templates/Template";

export default function ArtigoEdit({ menu, artigos }) {

  const { userAuth } = useAuth();
  const router = useRouter(); 
  const menuInicio = menu[0].menu_nome;  
  const [campos, setCampos] = useState( setArtigo(menuInicio) );

  function setArtigo(nomeArtigo) {
    for (let artigo of artigos ) {
      if (artigo.art_nome === nomeArtigo) {        
        return artigo;
      }
    }    
  }
  
  useEffect(() => {
    if (!userAuth.logging && !userAuth.logged) {
      router.push("/paginas/admin");    
    }
  }, [userAuth, campos]);

  if (!userAuth.logged && userAuth.logging) {
    return <div>Autenticando usuário...</div>
  };

  if (!userAuth.logged && !userAuth.logging) {
    return <div>Redirecionando...</div>
  };

  function handleInputChange(event) {
    campos[event.target.name] = event.target.value;
    setCampos(campos);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    event.target.reset();    
  }

  function handleSelectArtigo(event) {
    const artSel = event.target.value;
    setCampos( setArtigo(artSel) );
    event.target.nextSibling.reset();
  }

  return (
    <Template 
      siteTitulo="PSICÓLOGOS na InterNET - Menu Administração"      
      paginaAtiva="admin"
      userLogged={userAuth.name}
    >
      <br></br>
      <hr />
      <h3>Edição de Artigos</h3>      

      <select name="nomeArtigo" id="idArtigo" onChange={handleSelectArtigo}>
        {
          menu.map( (menu, index) => 
            <option value={menu.menu_nome} key={index}>{menu.menu_titulo}</option> )
        }        
      </select>

      <form onSubmit={handleFormSubmit} className="form-artigo" name="formArtigo">
        <label>
          <span>Título do artigo</span>
          <input
            type="text"
            name="art_titulo"
            defaultValue={campos["art_titulo"]}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <span>Subtítulo do artigo</span>
          <input
            type="text"
            name="art_subtitulo"            
            defaultValue={campos["art_subtitulo"]}
            onChange={handleInputChange}
          />
        </label>
        <label>
          <span>Texto do artigo</span>
          <textarea        
            name="art_texto"
            rows="10"            
            defaultValue={campos["art_texto"]}
            onChange={handleInputChange}
          />
        </label>
        
        <input
          type="submit"
          value="Salvar"          
        />
      </form>

    </Template>
  )
}

export async function getStaticProps() {  
  const db = require("../../src/db");
  const rMenu = await db.getMenu();  
  const rArtigos = await db.getArtigos();
  const rMenuJSON = JSON.parse(rMenu);
  const rArtigosJSON = JSON.parse(rArtigos);
  return { props: { menu: rMenuJSON, artigos: rArtigosJSON }, revalidate: 1200 };  
}

