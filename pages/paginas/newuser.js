import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import useAuth from "../../src/contexts/AuthContext"
import Template from "../../src/templates/Template"
import { verify } from 'jsonwebtoken';

export default function NewUser({ userJWT }) {
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

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(campos)
    });
    const resJSON = await res.json();
    alert(resJSON.message);
    if (res.ok) {
      event.target.reset();
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
    </Template>
    
  );
}


export async function getServerSideProps(context) {
  const mySecret = process.env.UUID_JWT;
  const token = (context.req.cookies.jwtpsicosite || '');
  const userJWT = { logged: false, id: "", name:"" }
  try {
    const decoded = verify(token, mySecret);
    userJWT.logged = true;
    userJWT.id = decoded.id;
    userJWT.name = decoded.username;    
  }
  catch {    
  }
  
  return {
    props: { userJWT }
  }
}

