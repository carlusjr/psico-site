import Link from "next/link";

export default function Rodape({ homeLink }) {
  return (
    <div className="footer">
      <br></br>
      <hr></hr>
      <p>
        Desenvolvido por&nbsp;
        <Link href="https://github.com/carlusjr/psico-site">
          <a>Carlos Roberto da Silva Jr.</a>
        </Link>
      </p>
      {homeLink ? (
        <p>
          <Link href="/paginas/home">
            <a className="back-top">Volta para HOME</a>
          </Link>
        </p>
      ) : (
        <p>
          <a href="#" className="back-top">
            Voltar ao Topo
          </a>
        </p>
      )}
    </div>
  );
}
