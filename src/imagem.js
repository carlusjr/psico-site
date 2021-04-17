import Image from 'next/image'
export default function ImagemTop(props) {
  const imagemFile = '/' + props.paginaAtiva + '.jpg'
  if (props.paginaAtiva != 'pagamento') {
    return (
      <div className="imageFile">
        <Image src={imagemFile} objectPosition="left" layout="fill" objectFit="scale-down" alt={props.paginaAtiva} />     
      </div>
    )
  } else {
    return (
      <div><p></p></div>
    )
  }
}