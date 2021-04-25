//import { getArtigo } from '../../../src/db'

export default async function (req, res) {
  const art_nome = req.query.art_nome;
  //const artigo = await getArtigo(art_nome);
  if (art_nome) {
    res.json( { message: `${art_nome} não está disponível!` } );
  } else {
    res.status(400).json( { message: 'Request de API inválido!' } );
  }  
}