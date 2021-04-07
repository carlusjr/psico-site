import Link from 'next/link'
import Menu from '../src/menu.js'

function Sobre() {
  return (
    <div>
      <section>
        <Menu />
        <h1>SOBRE</h1>
        <p></p><br></br>
        <Link href="/">
          <a>Acessar página Home</a>
        </Link>  
      </section>
    </div>
  )
}

export default Sobre;