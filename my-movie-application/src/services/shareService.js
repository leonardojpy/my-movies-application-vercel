export const saveSharedList = async (movieIds) => {
  const response = await fetch('/api/share-list', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ movieIds }),
  });

  if (!response.ok) {
    throw new Error('Falha ao criar o link de compartilhamento');
  }
  return await response.json();
};

export const getSharedList = async (shareId) => {
  const response = await fetch(`/api/list/${shareId}`);
  
  if (!response.ok) {
    throw new Error('Lista de compartilhamento não encontrada');
  }
  return await response.json();
};