import { useEffect } from "react";
import { useRouter } from 'next/router'
import useAuth from "../../src/contexts/AuthContext";
import Template from "../../src/templates/Template";
import Link from "next/link";

export default function MenuAdmin() {

  const { userAuth } = useAuth();
  const router = useRouter(); 

  useEffect(() => {
    if (!userAuth.logging && !userAuth.logged) {
      router.push("/paginas/admin");    
    }
  }, [userAuth]);

  if (!userAuth.logged && userAuth.logging) {
    return <div>Autenticando usuário...</div>
  };

  if (!userAuth.logged && !userAuth.logging) {
    return <div>Redirecionando...</div>
  };


  return (    
    <Template 
      siteTitulo="PSICÓLOGOS na InterNET - Menu Administração"      
      paginaAtiva="admin"
      userLogged={userAuth.name}
    >
      <br></br>
      <hr />
      <h3>Menu do Administrador</h3>
      <br></br>
      <ul>
        <li>
          <Link href="/paginas/newuser">
            <a>Cadastro de Usuários</a>
          </Link>        
        </li>
        <li>
          <Link href="#">
            <a>Cadastro de Artigos</a>
          </Link>        
        </li>
      </ul>
    </Template>
  )
}