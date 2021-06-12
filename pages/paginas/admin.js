import Template from "../../src/template/Template"
import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Admin() {
  const [campos, setCampos] = useState({
    user_name: '',
    user_password: ''
  });
  const router = useRouter();

  function handleInputChange(event) {
    campos[event.target.name] = event.target.value;
    setCampos(campos);
  }

  async function handleFormSubmit(event) {
    event.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(campos)
    });
    const resJSON = await res.json();
    if (res.ok) {
      router.push('/paginas/newuser');
    } else {
      alert(resJSON.message);
    }
  }

  return (    
    <Template isLogin>
      <p></p>
      <hr />
      <h3>Login do Administrador</h3>
      <p></p>
      <form onSubmit={handleFormSubmit}>
        <label>
          <span>Nome do usuário</span>
          <input type="text" name="user_name" required onChange={handleInputChange} />
        </label>
        <label>
          <span>Senha</span>
          <input type="password" name="user_password" required onChange={handleInputChange} />
        </label>
        <input type="submit" value="Login" />
      </form>
    </Template>   
  );
}

