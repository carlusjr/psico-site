import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { globalMenuInicio } from '../src/config'

export default function Psicosite() {

  // index redireciona para /paginas/home
  const rota = '/paginas/'+globalMenuInicio;
  
  useEffect(() => {
    router.push(rota)
  })

  const router = useRouter();
  return (
    <div>
      <Head>
        <title>Psicosite</title>
      </Head>
      <h2>Carregando...</h2>
    </div>
  )
}

