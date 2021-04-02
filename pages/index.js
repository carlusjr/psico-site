import { useState } from 'react'
import Header from './Header'
import Link from 'next/link'

function App() {

  let teste=10;

  function addMeuContador(){
    teste++;
  }

  return (
    <div>
      <Header title="PSICÓLOGOS NA InterNet" meuContador={teste}/>
      <input type="button" value="Add Contador Carlos" onClick={addMeuContador} />
      <p></p><br></br>
      <h2>Página em construção...</h2>
      <Contador />
      <p></p><br></br>
      <Link href="/sobre">
        <a>Acessar página Sobre</a>
      </Link>
    </div>
  );
}

function Contador() {
  const [contador, setcontador] = useState(0);

  function addContador() {
    setcontador(contador + 1)
  }

  return (
    <div>
      <h2>Contador Felipe: {contador} </h2>
      <input type="button" value="Add Contador Felipe" onClick={addContador} />
    </div>
  )
}

export default App;