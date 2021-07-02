import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { ToastContext } from "../../src/contexts/toastContext";
import { Toast } from "../../src/components/Toast"
import { v4 as uuid } from "uuid";
import Template from "../../src/templates/Template";
import useAuth from "../../src/contexts/AuthContext";


export default function Admin() {
  const { dispatch } = useContext(ToastContext);
  const { setUserAuth } = useAuth();
  const [btnLogin, setBtnLogin] = useState("Login");
  const [campos, setCampos] = useState({
    user_name: "",
    user_password: "",
  });
  const router = useRouter();
    
  function handleInputChange(event) {
    campos[event.target.name] = event.target.value;
    setCampos(campos);
  }

  async function handleFormSubmit(event) {
    setBtnLogin("Aguarde...");    
    event.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify(campos),
    });
    const resJSON = await res.json();
    setBtnLogin("Login");

    if (!res.ok) {
      dispatch({type: "ADD_NOTIFICATION", payload: { 
        id: uuid(), 
        type: "ERROR", 
        title: resJSON.message,
        message: "Verifique suas credenciais."
      }});      
      return;
    }    
    setUserAuth({ logged: true, id: resJSON.UserId, name: resJSON.userName });
    router.push("/paginas/newuser");
  }

  return (
    <Template 
      siteTitulo="PSICÓLOGOS na InterNET - Administração"      
      paginaAtiva="admin"
    >
      <p></p>
      <hr />
      <h3>Login do Administrador</h3>
      <p></p>
      <form onSubmit={handleFormSubmit} className="form-login">
        <label>
          <span>Nome do usuário</span>
          <input
            type="text"
            name="user_name"
            required
            onChange={handleInputChange}
          />
        </label>
        <label>
          <span>Senha</span>
          <input
            type="password"
            name="user_password"
            required
            onChange={handleInputChange}
          />
        </label>
        <input type="submit" value={btnLogin} disabled={ (btnLogin !== "Login") }/>
      </form>   
      <Toast position="topLeft" setTime={3500} />   
    </Template>
  );
}
