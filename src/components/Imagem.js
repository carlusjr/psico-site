import Image from "next/image";

export default function ImagemTop({ paginaAtiva, artigo }) {
  const imagemFile = artigo.art_imagem;
  const classImagem = artigo.art_classImagem;
  if (imagemFile) {
    return (
      <div className={classImagem}>
        <Image
          src={imagemFile}
          objectPosition="left"
          layout="fill"
          objectFit="scale-down"
          alt={paginaAtiva}
        />
      </div>
    );
  } else {
    return (
      <div>
        <p></p>
      </div>
    );
  }
}
