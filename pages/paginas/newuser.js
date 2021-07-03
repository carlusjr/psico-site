import { useState, useContext, useEffect } from "react";
import { ToastContext } from "../../src/contexts/toastContext";
import { Toast } from "../../src/components/Toast";
import { v4 as uuid } from "uuid";
import { useRouter } from 'next/router'
import Template from "../../src/templates/Template";
import useAuth from "../../src/contexts/AuthContext";
import UserCard from "../../src/components/UserCard";

export default function NewUser() {
  
  const { userAuth } = useAuth();
  const { dispatch } = useContext(ToastContext);
  const [btnSalvar, setBtnSalvar] = useState("Salvar");    
  const [listUsers, setListUsers] = useState([]);
  const router = useRouter(); 
  const [campos, setCampos] = useState({
    user_name: "",
    user_password: "",
    user_email: "",
  });

  const dbListUsers = async () => {
    const allUsers = await fetch("/api/userdb", {
      method: "GET",
      headers: { "Content-type": "application/json" },
      credentials: "include",      
    });
    const allUsersJSON = await allUsers.json();
    if (allUsersJSON) {      
      setListUsers(allUsersJSON);
    }   
  }
  
  useEffect(() => {
    if (!userAuth.logging && !userAuth.logged) {
      router.push("/paginas/admin");    
    } else {
      dbListUsers();
    }
  }, [userAuth])

  function sendToast( success, title ) {
    const typeToast = success ? "SUCCESS" : "ERROR";
    dispatch({
      type: "ADD_NOTIFICATION",
      payload: {
        id: uuid(),
        type: typeToast,
        title: title,
        message: ""
      },
    });
  }
 
  function handleInputChange(event) {
    campos[event.target.name] = event.target.value;
    setCampos(campos);
  }

  // Remove usuário
  async function handleRemoveUser(userId) {
    const res = await fetch("/api/userdb", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ user_id: userId }),
    });
    const resJSON = await res.json();
    sendToast( res.ok, resJSON.message );      
  }


  // Salva novo usuário  
  async function handleFormSubmit(event) {
    setBtnSalvar("Aguarde...");
    event.preventDefault();

    // API para inclusão de usuário no banco de dados
    const res = await fetch("/api/userdb", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify(campos),
    });
    const resJSON = await res.json();
    sendToast( res.ok, resJSON.message );   
    setBtnSalvar("Salvar");
  }

  if (!userAuth.logged && userAuth.logging) {
    return <div>Autenticando usuário...</div>
  };

  if (!userAuth.logged && !userAuth.logging) {
    return <div>Redirecionando...</div>
  };

  return (
    <Template
      siteTitulo="PSICÓLOGOS na InterNET - Administração"
      userLogged={userAuth.name}
    >
      <p></p>
      <hr />
      <h3>Usuários cadastrados</h3>

      { (listUsers) ? (
        listUsers.map((user) => <UserCard User={user} removeClick={handleRemoveUser} key={user.user_id} />)
      ) : (
        <div></div>
      )}

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
          <span>e-mail do usuário</span>
          <input
            type="text"
            name="user_email"
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
        <input
          type="submit"
          value={btnSalvar}
          disabled={btnSalvar !== "Salvar"}
        />
      </form>
      <Toast position="topLeft" setTime={3500} />
    </Template>
  );
}

