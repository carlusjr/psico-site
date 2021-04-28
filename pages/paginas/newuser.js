import Layout from '../../src/layout';
import Rodape from "../../src/rodape";
import { useState } from 'react';
import { verify } from 'jsonwebtoken';

export default function NewUser(props) {

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
    <div>
      <Layout>
        <p></p>
        <hr />
        <h3>Cadastro de Usuários</h3>
        <h4>Usuário: {props.user}</h4>
        <p></p>
        <form onSubmit={handleFormSubmit}>
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
      </Layout>
      <Rodape isLogin />
    </div>
  );
}

export async function getServerSideProps(context) {
  const mySecret = process.env.UUID_JWT;
  const token = (context.req.cookies.jwtpsiconet || '');
  let userName = '';
  verify(token, mySecret, function (err, decoded) {
    if ((!err) && (decoded)) {
      userName = decoded.username;
    } else {
      if (context.res) {
        context.res.writeHead(302, { Location: '/paginas/admin' });
        context.res.end();
      }
    }
  });
  return {
    props: {
      user: userName,
    }
  }
}

