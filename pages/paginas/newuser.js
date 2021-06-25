import { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router'
import { verify } from 'jsonwebtoken';
import { ToastContext } from "../../src/contexts/toastContext";
import { Toast } from "../../src/components/Toast"
import { v4 as uuid } from "uuid";
import Template from "../../src/templates/Template"
import useAuth from "../../src/contexts/AuthContext"


export default function NewUser({ userJWT }) {
  const { dispatch } = useContext(ToastContext);
  const router = useRouter();
  const { user, setUser } = useAuth();

  
  useEffect( () => {
    if (!user.logged && !userJWT.logged) {        
      router.push('/paginas/admin')      
    }
    if (userJWT) {
      setUser(userJWT);
    }
  });  

  const [campos, setCampos] = useState({
    user_name: '',
    user_password: '',
    user_email: ''
  });

  function handleInputChange(event) {
    campos[event.target.name] = event.target.value;
    setCampos(campos);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    // API para inclusão de usuário no banco de dados
    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(campos)
    });
    const resJSON = await res.json();   
    
    
    if (res.ok) {
      // Se inclusão foi bem sucedida
      dispatch({type: "ADD_NOTIFICATION", payload: { 
        id: uuid(), 
        type: "SUCCESS", 
        title: resJSON.message,
        message: ""
      }});
      event.target.reset();
    } else {
      // Senão, exibe mensagem de erro.
      dispatch({type: "ADD_NOTIFICATION", payload: { 
        id: uuid(), 
        type: "ERROR", 
        title: resJSON.message,
        message: "Atenção as regras de cadastro."
      }});
    }
  }

  return (    
    <Template siteTitulo="Psicólogos na InterNET - Administração" isLogin>
      <p></p>
      <hr />
      <h3>Cadastro de Usuários</h3>
      <h4>Usuário logado: {user.name}</h4>
      <p></p>
      <form onSubmit={handleFormSubmit} className="form-login">
        <label>
          <span>Nome do usuário</span>
          <input type="text" name="user_name" required onChange={handleInputChange} />
        </label>
        <label>
          <span>e-mail do usuário</span>
          <input type="text" name="user_email" required onChange={handleInputChange} />
        </label>
        <label>
          <span>Senha</span>
          <input type="password" name="user_password" required onChange={handleInputChange} />
        </label>
        <input type="submit" value="Salvar" />
      </form>
      <Toast position="topLeft" setTime={5000} />
    </Template>
    
  );
}


export async function getServerSideProps(context) {

  // verifica a existência de token gravado em cookie
  const mySecret = process.env.UUID_JWT;
  const token = (context.req.cookies.jwtpsicosite || null);
  const userJWT = { logged: false, id: "", name:"" }
  try {
    // Se existe token, valida o mesmo para obter usuário logado
    if (token) {
      const decoded = verify(token, mySecret);
      userJWT.logged = true;
      userJWT.id = decoded.id;
      userJWT.name = decoded.username;
    }
  }
  catch {    
  }
  
  return {
    props: { userJWT }
  }
}

