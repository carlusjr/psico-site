import { useState } from "react";
import { useRouter } from "next/router";
import Template from "../../src/templates/Template";
import useAuth from "../../src/contexts/AuthContext";

export default function Admin() {
  const { setUser } = useAuth();
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
    event.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      credentials: "include",
      body: JSON.stringify(campos),
    });
    const resJSON = await res.json();

    if (!res.ok) {
      alert(resJSON.message);      
      return;
    }    
    setUser({ logged: true, id: resJSON.UserId, name: resJSON.userName });
    router.push("/paginas/newuser");
  }

  return (
    <Template siteTitulo="Psicólogos na InterNET - Administração" isLogin>
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
        <input type="submit" value="Login" />
      </form>      
    </Template>
  );
}
