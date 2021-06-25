import { Users } from '../../src/users';

export default async function signup(request, response) {
  // Somente método POST
  if (request.method === "POST") {
    const userName = request.body.user_name;
    const userPassword = request.body.user_password;
    const userEmail = request.body.user_email;
    const myUser = new Users(userName, userPassword, userEmail);
    const res = await myUser.saveUserDb();
    if (res) {
      response.json({ message: `Usuário cadastrado com sucesso!` });
    } else {
      response.status(400).json({ message: myUser.error });
    }
  } else {
    response.status(405).json({ message: "API only support POST method!" });
  }
}
