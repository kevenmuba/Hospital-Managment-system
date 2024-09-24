import React from 'react';

export default function Image({ src, ...rest }) {
  // Construct full URL for local images
  const validSrc = src.startsWith('http') ? src : `http://localhost:4000${src}`;

  return (
    <img {...rest} src={validSrc} alt="" onError={(e) => { e.target.onerror = null; e.target.src = 'http://localhost:4000/uploads/default-image.jpg'; }} />
  );
}