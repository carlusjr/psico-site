import Link from 'next/link'

export default function Conteudo(props) {

  const arrayTexto = props.artigo.art_texto.split('\n');
  const imagemFile = '/' + props.paginaAtiva + '.jpg'

  // Insere em cada parágrafo os links para e-mail ou para outras páginas
  function trataTexto(texto, index) {
    const myKey = 'txt' + index;
    const arrayLink = texto.match(/<(.*)>/);

    // se tem link delimitado por '<' e '>'
    if (arrayLink) {
      const userLink = arrayLink[1];
      const startLink = texto.indexOf(arrayLink[0]);
      const sizeLink = arrayLink[0].length;
      const leftLink = texto.substring(0, startLink);
      const rigthLink = texto.substring(startLink + sizeLink);
      const isEmail = (userLink.indexOf('@') > 0);

      // Insere link apropriado para e-mail ou outras páginas
      if (isEmail) {
        const linkEmail = 'mailto:'+userLink;
        return (<p key={myKey}>{leftLink}<Link href={linkEmail}><a>{userLink}</a></Link>{rigthLink}</p>)
      } else {
        const arrayTxt = userLink.split('=');
        return (<p key={myKey}>{leftLink}<Link href={arrayTxt[1]}><a>{arrayTxt[0]}</a></Link>{rigthLink}</p>)
      }
    } else {
      return (<p key={myKey}>{texto}</p>)
    }
  }
  // Exibe conteúdo do artigo
  return (
    <div id="conteudo">
      <p></p>
      <img src={imagemFile} alt={props.paginaAtiva} />
      <h2 id="titulo">{props.artigo.art_titulo}</h2>
      <p></p>
      <h3 id="subtitulo">{props.artigo.art_subtitulo}</h3>
      <hr />
      <p></p>
      <div className="textoArtigo">
        {arrayTexto.map((txt, index) => trataTexto(txt, index))}
      </div>
    </div>
  )
}

