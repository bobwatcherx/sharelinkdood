// COPY
document.getElementById('copybtn').addEventListener('click', () => {
  const resultContainer = document.getElementById('result');
  const range = document.createRange();
  range.selectNode(resultContainer);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range);
  document.execCommand('copy');
  window.getSelection().removeAllRanges();
  alert('Hasil telah disalin!');
});


document.getElementById('generateLink').addEventListener('click', async () => {
  const apiKey = document.getElementById('api_key').value;
  const page = document.getElementById('pageberapa').value;
  const perPage = document.getElementById('totalpage').value;

  try {
    const response = await fetch(`https://oakdoodserver.deno.dev/file/list?per_page=${perPage}&page=${page}&key=${apiKey}`);
    const data = await response.json();
    
    if (data.result ) {
      const files = data.result.files;

      const resultContainer = document.getElementById('result');
      resultContainer.innerHTML = '';

      files.forEach(file => {
        const div = document.createElement('div');
        div.classList.add('result-item'); // Tambahkan class 'result-item'
        div.innerHTML = `<div>${file.title}<br/>https://bangtoge.netlify.app/player/${file.file_code}</div><br/>`;
        resultContainer.appendChild(div);
      });
    } else {
      throw new Error('Invalid API response');
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
