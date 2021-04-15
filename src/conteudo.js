
export default function Conteudo(props) {

  const arrayTexto = props.artigo.art_texto.split('\n');
  for (let i in arrayTexto){
    arrayTexto[i] = arrayTexto[i].split('=');
  }
  const imagemFile = '/'+props.paginaAtiva + '.jpg'
  if (props.paginaAtiva  == 'linksuteis') {
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
          {arrayTexto.map((txt, index) => 
            <p key={index}><a href={txt[1]}>{txt[0]}</a></p>)}
        </div>
      </div>
    )
  } else {
    return (
      <div id="conteudo">
        <p></p>
        <img src={imagemFile} alt={props.paginaAtiva} />
        <h2 id="titulo">{props.artigo.art_titulo}</h2>
        <p></p>
        <h3 id="subtitulo">{props.artigo.art_subtitulo}</h3>
        <hr />
        <p></p>
        <div className="textoArtigo">{arrayTexto.map((txt, index) => <p key={index}>{txt}</p>)}</div>
      </div>
    )
  }

}