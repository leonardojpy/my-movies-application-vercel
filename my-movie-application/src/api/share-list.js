import { createClient } from '@vercel/kv';
import { randomUUID } from 'crypto';

const kv = createClient({
  url: process.env.KV_URL,
  token: process.env.KV_TOKEN,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Apenas POST é permitido' });
  }
  try {
    const { movieIds } = req.body;
    if (!movieIds || !Array.isArray(movieIds)) {
      return res.status(400).json({ message: 'IDs de filmes não fornecidos' });
    }
    const shareId = randomUUID().substring(0, 8);
    await kv.set(`list_${shareId}`, movieIds);
    return res.status(200).json({ shareId });
  } catch (error) {
    console.error('Erro ao salvar no Vercel KV:', error);
    return res.status(500).json({ message: 'Erro ao salvar a lista' });
  }
}