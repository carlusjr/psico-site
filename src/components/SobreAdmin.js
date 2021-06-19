import Link from "next/link";

const SobreAdmin = () => {
  return (
    <div>
      <br></br>      
      <Link href="/paginas/admin">
        <a>Login do Administrador (área restrita)</a>
      </Link>
      <hr></hr>
    </div>
  )
}

export default SobreAdmin