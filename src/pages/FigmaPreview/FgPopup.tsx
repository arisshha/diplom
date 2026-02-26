import PopupHtml from '../../../fg/Popup.html?raw';
import React from 'react';

export function FgPopup() {
  return (
    <div style={{ width: '100%', overflow: 'auto' }}>
      <div dangerouslySetInnerHTML={{ __html: PopupHtml }} />
    </div>
  );
}

