import React, { useState } from 'react';
import { useMovieContext } from "../contexts/MovieContext";

const ShareButton = () => {
  const { favorites, shareFavorites } = useMovieContext();
  const [status, setStatus] = useState('idle');

  const handleShare = async () => {
    if (favorites.length === 0) {
      alert("Adicione filmes aos favoritos antes de compartilhar!");
      return;
    }
    
    setStatus('loading');

    const url = await shareFavorites();

    if (url) {
      navigator.clipboard.writeText(url);
      setStatus('success');
      alert(`Link copiado! Compartilhe este URL: ${url}`);
    } else {
      setStatus('error');
      alert('Erro ao gerar o link. Tente novamente.');
    }
    setTimeout(() => setStatus('idle'), 5000);
  };

  return (
    <div style={{ margin: '20px 0', textAlign: 'center' }}>
      <button 
        onClick={handleShare} 
        disabled={status === 'loading'}
        style={{ 
          padding: '10px 20px', 
          fontSize: '16px', 
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          backgroundColor: status === 'loading' ? '#ffc107' : (status === 'success' ? '#28a745' : '#007bff'),
          color: 'white',
          border: 'none',
          borderRadius: '5px'
        }}
      >
        {status === 'loading' ? 'Gerando Link...' : (status === 'success' ? 'Link Copiado!' : 'Compartilhar Minha Lista')}
      </button>
      {status === 'success' && (
        <p style={{ marginTop: '10px', color: '#28a745' }}>
          Link Gerado! Cole para compartilhar.
        </p>
      )}
    </div>
  );
};

export default ShareButton;