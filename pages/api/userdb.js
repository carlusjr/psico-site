import { Users } from '../../src/users';
import verifyJWT from "../../src/verifyJWT";

export default async function userdb(request, response) {

  // verifica jwt token cookie
  const { cookies } = request;
  const token = cookies.jwtpsicosite || '';
  const resToken = verifyJWT(token);
  if (!resToken) {
    response.status(401).json( { message: "Invalid JWT Token!" } );
    return;
  }

  // Método GET- Lista usuários
  if (request.method === "GET") {
    const myUser = new Users();
    const res = await myUser.getAllDbUsers();
    if (res) {
      response.json(res);
    } else {      
      response.status(400).json({ message: myUser.error });
    }    
    return;
  }


  // Método POST - adiciona usuário  
  if (request.method === "POST") {
    const userName = request.body.user_name;
    const userPassword = request.body.user_password;
    const userEmail = request.body.user_email;
    const myUser = new Users(userName, userPassword, userEmail);
    const res = await myUser.saveUserDb();
    if (res) {
      response.json({ message: "Usuário cadastrado com sucesso!" });
    } else {
      response.status(400).json({ message: myUser.error });
    }
    return;    
  }

  //  método DELETE - remove usuário 
  if (request.method === "DELETE") {
    const userId = request.body.user_id;        
    const myUser = new Users();
    const res = await myUser.deleteUserById(userId);
    if (res) {
      response.json({ message: "Usuário excluído com sucesso!" });
    } else {
      response.status(400).json({ message: myUser.error });
    }
    return;    
  }

  response.status(405).json({ message: "Method not supported!" });
  return;

}
