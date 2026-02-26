import ClientHtml from '../../../fg/Client.html?raw';
import React from 'react';

export function FgClient() {
  return (
    <div style={{ width: '100%', overflow: 'auto' }}>
      <div dangerouslySetInnerHTML={{ __html: ClientHtml }} />
    </div>
  );
}

