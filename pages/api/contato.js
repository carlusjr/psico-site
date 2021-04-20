import nodemailer from 'nodemailer'
import getConfig from 'next/config'

export default async function contato(req, res) {

  // Obtem string de configuração de variável ambiente criptografada
  const { serverRuntimeConfig } = getConfig();
  const stringConfig = serverRuntimeConfig.CONTATO_STRING;

  if (stringConfig) {
    // Parâmetros do servidor SMTP obtidos da string de configuração
    const arrayConfig = stringConfig.split('/');
    const smtpServer = arrayConfig[0];
    const emailConta = arrayConfig[1];
    const passConta = arrayConfig[2];
    const emaildestino = arrayConfig[3];
  
    // Verifica se recebeu parâmetros válidos na API
    if (req.body.email) {
      try {
        // Configura smtp transporter do nodemailer
        let transporter = nodemailer.createTransport({
          host: smtpServer, // smtp server for hotmail.com
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: emailConta,
            pass: passConta,
          },
        });
  
        // Envia e-mail com os parâmetros recebidos
        let info = await transporter.sendMail({
          from: `PsicoNET contato <${emailConta}>`, // e-mail 
          to: `${emaildestino}`,
          replyTo: `${req.body.email}`,
          subject: `${req.body.nome}`,
          text: `${req.body.mensagem}`
        });
        res.status(200).json({ message: "Mensagem enviada com sucesso!" });
  
      } catch (error) {
        res.status(400).json({ message: error.message })
      }
    } else {
      res.status(400).json({ message: "Parâmetros não recebidos!" })
    }
  } else {
    res.status(400).json({ message: "String de configuração inválida!" })
  }
}

