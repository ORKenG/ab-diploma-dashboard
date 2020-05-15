import config from 'config';
import React from 'react';

const DownloadLibraryButton = () => {
  const handleCLick = () => {
    fetch(`${config.apiUrl}/library/download`).then(
      response => {
        response.blob().then(blob => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement('a');
          a.href = url;
          a.download = 'library.js';
          a.click();
        }
        )
      }
    )}

  return (
    <div className="mt-3">
      <button onClick={handleCLick } className="btn btn-secondary" download>
        Download library
      </button>
    </div>
  )
}

export default DownloadLibraryButton;
