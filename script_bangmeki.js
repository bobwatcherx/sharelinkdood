 function copyToClipboard() {
        var resultElement = document.getElementById('result');
        var range = document.createRange();
        range.selectNode(resultElement);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand('copy');
        window.getSelection().removeAllRanges();
        alert('Berhasil menyalin ke clipboard!');
    }
    
function generateLink() {
    // Mengambil nilai dari input fields
    const apiKey = document.getElementById('apikey').value;
    const page = document.getElementById('page').value;
    const perPage = document.getElementById('per_page').value;
    const genre = document.getElementById('genre').value
    const domain = document.getElementById('domain').value;
    // Membuat URL berdasarkan input fields
    const url = `https://poopcloudflare.bobwatcherx3755.workers.dev/poop_byfolder?key=${apiKey}&fld_id=${genre}&page=${page}&limit=50`;

    // Melakukan permintaan HTTP
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = ''; // Clear previous content

            if (data.videos.length > 0) {
                data.videos.forEach(video => {
                    const titleElement = document.createElement('h5');
                    titleElement.textContent = video.title;
                    resultDiv.appendChild(titleElement);

                    const idElement = document.createElement('p');
                    idElement.innerHTML = `${domain}/player/${video.id}<br>`; // Use innerHTML to include <br>
                    resultDiv.appendChild(idElement);
                });
            } else {
                resultDiv.textContent = "Tidak ada video yang ditemukan.";
            }
        })
        .catch(error => {
            console.error('Gagal mengambil data:', error);
        });
}
