import Link from 'next/link'

export default function Rodape() {
  return (
    <div className="footer">
      <p>Desenvolvido por&nbsp;<Link href="https://github.com/carlusjr/psico-site"><a>Carlos Roberto da Silva Jr.</a></Link></p>
      <p><a href="#" className="back-top">Voltar ao Topo</a></p>
    </div>
  )
}