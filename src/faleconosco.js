import { useState } from 'react'

export default function Faleconosco(props) {
  if (props.paginaAtiva != 'faleconosco') {
    return (<div></div>)
  }
  const [campos, setCampos] = useState({
    nome: '',
    email: '',
    mensagem: ''
  });

  function handleInputChange(event) {
    if (event.target.name === "anexo")
      campos[event.target.name] = event.target.files[0];
    else
      campos[event.target.name] = event.target.value;
    setCampos(campos);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    console.log(campos);
  }

  return (
    <div className="faleconosco">
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="email">E-mail</label>
        <input type="text" id="email" name="email" placeholder="Digite seu e-mail" onChange={handleInputChange} />

        <label htmlFor="nome">Nome</label>
        <input type="text" id="nome" name="nome" placeholder="Digite seu nome completo" onChange={handleInputChange} />

        <label htmlFor="mensagem">Mensagem</label>
        <textarea id="mensagem" name="mensagem" placeholder="Digite sua mensagem" className="textArea" onChange={handleInputChange}></textarea>

        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
}

