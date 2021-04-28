import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { globalSite } from '../src/config'

export default function Psicosite() {

  // index redireciona para /paginas/home
  const router = useRouter();
  const rota = '/paginas/' + globalSite.homeSite;

  useEffect(() => {
    router.push(rota)
  })

  return (
    <div>
      <Head>
        <title>{globalSite.tituloSite}</title>
      </Head>
      <h2>Carregando...</h2>
    </div>
  )
}

