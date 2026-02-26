import AdminHtml from '../../../fg/Admin.html?raw';
import React from 'react';

export function FgAdmin() {
  return (
    <div style={{ width: '100%', overflow: 'auto' }}>
      <div dangerouslySetInnerHTML={{ __html: AdminHtml }} />
    </div>
  );
}

