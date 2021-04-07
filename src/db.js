// Acesso ao Bando de Dados MySQL AWS
const mysql = require("mysql2/promise");

async function connect() {
    if (global.connection && global.connection !== 'disconnected') {
        return global.connection;
    }
    try {
        const conn = await mysql.createConnection({
            host: process.env.MYSQL_URL,
            user: process.env.MYSQL_USERNAME,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DATABAS
        });
        console.log("Conectado ao MySQL AWS.")
        global.connection = conn;
        return conn;
    } catch (error) {
        console.log('Não foi possível conectar ao DB!');
        console.log(error.code, error.errno);
        process.exit();
    }
}

async function selectArtigos(nomeArtigo) {
    const conn = await connect();
    const [resultado] = await conn.query('SELECT * FROM Artigos WHERE art_nome = ?', nomeArtigo);
    const resultJson = JSON.stringify(resultado[0]);
    return resultJson;
}

module.exports = { selectArtigos };