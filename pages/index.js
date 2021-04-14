import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { globalMenuInicio } from '../src/config'

export default function Psicosite() {

  // Primeiro item ativo no menu
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
      <h1>Carregando...</h1>
    </div>
  )
}

