import { getArtigo } from '../../../src/db'

export default async function (req, res) {
  const art_nome = req.query.art_nome;
  const artigo = await getArtigo(art_nome);
  if (artigo) {
    res.json( artigo );
  } else {
    res.status(400).json( { message: 'artigo inexistente' } );
  }  
}