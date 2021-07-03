import Router from 'next/router'

const Header = ({ titulo, userLogged }) => {

  const handleLogout = async () => {
    const res = await fetch("/api/logout");
    if (res.ok) {
      Router.reload(window.location.pathname)    
    }
  }

  return (
    <header>      
      <h1>{titulo}</h1>      
      <div className={(userLogged) ? "headerUser" : "headerLogout"}>
        <h5>{ (userLogged) ? "Usuário: "+userLogged : ""}</h5>
        <button onClick={handleLogout}>Logout</button>
      </div>      
    </header>
  )
}

export default Header