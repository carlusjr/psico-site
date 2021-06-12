import Image from 'next/image'

export default function Pagamento() {
  return (
    <div>
      <p>Clique no botão abaixo para pagar com Cartão de Crédito:</p>        
      <p><a title="Pagar com PagSeguro" href="https://pag.ae/7WK2qTven/button" target="_blank">
          <img src="//assets.pagseguro.com.br/ps-integration-assets/botoes/pagamentos/205x30-pagar.gif" 
              alt="Pague com PagSeguro - é rápido, grátis e seguro!" />
          </a>
      </p>
      <p>Se preferir, pague via PIX usando como chave o celular (41) 99880-1809 ou com QR CODE abaixo:</p>
      <div className="pgtoImage">
        <Image src="/QrCodePIX.jpg" objectPosition="left" layout="fill" objectFit="scale-down" alt="QR CODE PIX" />        
      </div>
    </div>
  )
}