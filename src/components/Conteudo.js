import Link from "next/link";
import ImagemTop from "./Imagem";
import Pagamento from "./Pagamento";
import FaleConosco from "./FaleConosco";
import SobreAdmin from "./SobreAdmin";

const extraPage = { pagamento: Pagamento, faleconosco: FaleConosco, sobre: SobreAdmin };

export default function Conteudo({ artigo, paginaAtiva }) {
  if (!paginaAtiva) {
    paginaAtiva = "home";
  }

  const PageExtra = extraPage[paginaAtiva];  
  const arrayTexto = artigo.art_texto.split("\n");

  // Insere em cada parágrafo os links para e-mail ou para outras páginas
  function trataTexto(texto, index) {
    const myKey = "txt" + index;
    const arrayLink = texto.match(/<(.*)>/);

    // se tem link delimitado por '<' e '>'
    if (arrayLink) {
      const userLink = arrayLink[1];
      const startLink = texto.indexOf(arrayLink[0]);
      const sizeLink = arrayLink[0].length;
      const leftLink = texto.substring(0, startLink);
      const rigthLink = texto.substring(startLink + sizeLink);
      const isEmail = userLink.indexOf("@") > 0;

      // Insere link apropriado para e-mail ou outras páginas
      if (isEmail) {
        const linkEmail = "mailto:" + userLink;
        return (
          <p key={myKey}>
            {leftLink}
            <Link href={linkEmail}>
              <a>{userLink}</a>
            </Link>
            {rigthLink}
          </p>
        );
      } else {
        const arrayTxt = userLink.split("=");
        if (paginaAtiva == "linksuteis") {
          return (
            <li key={myKey}>
              {leftLink}
              <Link href={arrayTxt[1]}>
                <a>{arrayTxt[0]}</a>
              </Link>
              {rigthLink}
            </li>
          );
        } else {
          return (
            <p key={myKey}>
              {leftLink}
              <Link href={arrayTxt[1]}>
                <a>{arrayTxt[0]}</a>
              </Link>
              {rigthLink}
            </p>
          );
        }
      }
    } else {
      return (
        <p className={paginaAtiva} key={myKey}>
          {texto}
        </p>
      );
    }
  }
  // Exibe conteúdo do artigo
  return (
    <div id="conteudo" className="textoArtigo">
      <ImagemTop artigo={artigo} paginaAtiva={paginaAtiva} />
      <h2 id="titulo">{artigo.art_titulo}</h2>
      <p></p>
      <h3 id="subtitulo">{artigo.art_subtitulo}</h3>
      <hr />
      <p></p>
      <div>{arrayTexto.map((txt, index) => trataTexto(txt, index))}</div>

      {/* Complemento somente na página de pagamento */}
      { PageExtra && <PageExtra />}
    </div>
  );
}
