//import { useState } from 'react'
import Menu from './Menu.js'
import Head from 'next/head'

function App() {
  return (    
    <div>
      <Head>
        <title>PsicoNET</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      </Head>      
      <section>
        <h1>PSICÓLOGOS na Internet</h1>
        <Menu />
        <h2>Página em construção...</h2>
      </section>
    </div>
  );
}

// function Contador() {
//   const [contador, setcontador] = useState(0);

//   function addContador() {
//     setcontador(contador + 1)
//   }
//   return (
//     <div>
//       <h2>Contador Felipe: {contador} </h2>
//       <input type="button" value="Add Contador Felipe" onClick={addContador} />
//     </div>
//   )
// }

export default App;