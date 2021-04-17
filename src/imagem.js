import Image from 'next/image'

export default function ImagemTop(props) {
  const pagina = props.paginaAtiva;
  const imagemFile = props.artigo.art_imagem;
  const classImagem = props.artigo.art_classImagem;
  if (imagemFile) {
    return (
      <div className={classImagem}>
        <Image src={imagemFile} objectPosition="left" layout="fill" objectFit="scale-down" alt={pagina} />     
      </div>
    )
  } else {
    return (
      <div><p></p></div>
    )
  }
}