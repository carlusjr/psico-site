import { useState } from 'react'

export default function FaleConosco() {
  const [campos, setCampos] = useState({
    nome: '',
    email: '',
    mensagem: ''
  });

  function handleInputChange(event) {
    campos[event.target.name] = event.target.value;
    setCampos(campos);
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    enviarEmail(campos);
    event.target.reset();
  }

  return (
    <div className="faleconosco">
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="email">E-mail</label>
        <input type="text" id="email" name="email" required placeholder="Digite seu e-mail" onChange={handleInputChange} />

        <label htmlFor="nome">Nome</label>
        <input type="text" id="nome" name="nome" required placeholder="Digite seu nome" onChange={handleInputChange} />

        <label htmlFor="mensagem">Mensagem</label>
        <textarea id="mensagem" name="mensagem" required placeholder="Digite sua mensagem" className="textArea" onChange={handleInputChange}></textarea>

        <input type="submit" value="Enviar" />
      </form>
    </div>
  );
}

export async function enviarEmail(campos) {
  const camposJSON = JSON.stringify(campos);
  const res = await fetch('/api/contato', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: camposJSON
  })
  const resJSON = await res.json();
  alert(resJSON.message)
}
