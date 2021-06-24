import { useContext, useState } from "react";
import { ToastContext } from "../contexts/toastContext";
import { Toast } from "./Toast"
import { v4 as uuid } from "uuid";

export default function FaleConosco() {
  const { dispatch } = useContext(ToastContext);
  const [btnEnviar, setBtnEnviar] = useState("Enviar");  
  const [campos, setCampos] = useState({
    nome: "",
    email: "",
    mensagem: "",
  });

  function handleInputChange(event) {
    campos[event.target.name] = event.target.value;
    setCampos(campos);
  }

  
  async function handleFormSubmit(event) {

    setBtnEnviar("Aguarde...")    
    event.preventDefault();

    // Tenta enviar mensagem por e-mail via API contato
    const envio = await enviarEmail(campos); 
    if (envio.ok) {
      dispatch({type: "ADD_NOTIFICATION", payload: { 
        id: uuid(), 
        type: "SUCCESS", 
        title: envio.message,
        message: "O retorno do contato será pelo e-mail informado."
      }});
      event.target.reset();        
    } else {
      dispatch({type: "ADD_NOTIFICATION", payload: { 
        id: uuid(), 
        type: "ERROR", 
        title: envio.message,
        message: "Não foi possível enviar sua mensagem."
      }});
    }

    setBtnEnviar("Enviar");    
  }

  return (
    <div className="faleconosco">
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="email">E-mail</label>
        <input
          type="text"
          id="email"
          name="email"
          required
          placeholder="Digite seu e-mail"
          onChange={handleInputChange}
        />

        <label htmlFor="nome">Nome</label>
        <input
          type="text"
          id="nome"
          name="nome"
          required
          placeholder="Digite seu nome"
          onChange={handleInputChange}
        />

        <label htmlFor="mensagem">Mensagem</label>
        <textarea
          id="mensagem"
          name="mensagem"
          required
          placeholder="Digite sua mensagem"
          className="textArea"
          onChange={handleInputChange}
        ></textarea>

        <input type="submit" value={btnEnviar} disabled={ (btnEnviar !== "Enviar") }/>        
      </form>      
      <Toast position="bottomLeft" setTime={4000} />
    </div>
  );
}

export async function enviarEmail(campos) {
  const camposJSON = JSON.stringify(campos);
  const res = await fetch("/api/contato", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: camposJSON,
  });
  const resJSON = await res.json();      
  return resJSON
}
