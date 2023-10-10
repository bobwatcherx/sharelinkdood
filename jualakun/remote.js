document.getElementById('sub_url').addEventListener('click', async () => {
  const apiKey = document.getElementById('apikey').value;
  const urlList = document.getElementById('url_list').value;

  const urls = urlList.split('\n').filter(line => line.trim() !== ''); // Membuat array dari setiap baris

  for (const url of urls) {
    if (url.trim() !== '') { // Memastikan URL tidak kosong
      if (url.startsWith('https://')) {
        const response = await fetch(`https://doodapi.com/api/upload/url?key=${apiKey}&url=${encodeURIComponent(url)}`);
        const data = await response.json();
        console.log(response)
        console.log(`Request for ${url} returned:`, data);
      }
    }
  }
});
