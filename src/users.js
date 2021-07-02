import { connect } from "./db";
export class Users {
  constructor(user_name, user_password, user_email, user_id) {
    this.user_name = user_name;
    this.user_password = user_password;
    this.user_email = user_email;
    this.user_id = user_id;
    this.error = "";
  }
  // Valida nome do usuário, precisa ser string e maior ou igual a 3 caracteres
  validName(userName) {
    userName = userName || this.user_name;
    if (typeof userName == 'string') {
      return (userName.length >= 3);
    } else return false;
  }
  // Valida senha do usuário, precisa ser string e maior ou igual a 5 caracteres
  validPassword(userPassword) {
    userPassword = userPassword || this.user_password;
    if (typeof userPassword == 'string') {
      return (userPassword.length >= 3);
    } else return false;
  }

  // Valida nome de usuário e password
  get IsValid() {
    return (this.validName() && this.validPassword());
  }

  // Recupera usuário do banco de dados pelo nome
  async getDbUserByName(user_name) {
    user_name = user_name || this.user_name;
    if (this.IsValid) {
      const db = await connect();
      const [dbRes] = await db.query(
        "SELECT * FROM users WHERE user_name = ?", user_name);
      const row = dbRes[0];
      return row
    }
  }

  // Lista de usuários cadastrados 
  async getAllDbUsers() {       
    const db = await connect();
    const [dbRes] = await db.query(
      "SELECT user_id, user_name, user_email FROM users");
    const resJSON = JSON.stringify(dbRes);
    return resJSON;
  }

  // Recupera usuário do banco de dados pelo e-mail
  async findUserByEmail(user_email) {
    user_email = user_email || this.user_email;
    if (user_email) {
      const db = await connect();
      const [dbRes] = await db.query(
        "SELECT user_id, user_name FROM users WHERE user_email = ?", user_email);
      const row = dbRes[0];
      return row
    }
  }

  async deleteUserById(user_id) {
    user_id = user_id || this.user_id;

    if (!user_id) {
      this.error= "Id do usuário não informado!"
      return false;
    }  
    try {
      const db = await connect();
      const dbRes = await db.query( "DELETE FROM users WHERE user_id = ?", user_id);
      return dbRes
    } catch (e) {
      this.error= "Não foi possível excluir este usuário!"
      return false;
    }    
  }

  // Salva usuário no banco de dados
  async saveUserDb() {
    if (this.IsValid) {
      if (await this.findUserByEmail()) {
        this.error = 'e-mail já cadastrado!';
      } else if (await this.getDbUserByName()) {
        this.error = 'Nome de usuário já cadastrado! ';
      } else {
        const db = await connect();
        const bcrypt = require('bcryptjs');
        const hashedPassword = bcrypt.hashSync(this.user_password, 10);
        const values = [this.user_name, hashedPassword, this.user_email];
        const [res] = await db.query("INSERT INTO users (user_name, user_password, user_email) VALUES ( ?, ?, ? )", values);
        return res;
      }
    } else {
      this.error = 'Nome do usuário ou senha inválida!';
    }
  }
}




