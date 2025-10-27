import { createClient } from '@vercel/kv';

const kv = createClient({
  url: process.env.KV_URL,
  token: process.env.KV_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Apenas GET é permitido' });
  }
  try {
    const { id } = req.query;
    const movieIds = await kv.get(`list_${id}`);
    if (!movieIds) {
      return res.status(404).json({ message: 'Lista não encontrada' });
    }
    return res.status(200).json({ movieIds });
  } catch (error) {
    console.error('Erro ao buscar no Vercel KV:', error);
    return res.status(500).json({ message: 'Erro ao buscar a lista' });
  }
}