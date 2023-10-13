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
    const genre = document.getElementById('genre').value;

    // Membuat URL berdasarkan input fields
    const url = `https://poophdserver.vercel.app/${genre}?key=${apiKey}&limit=${perPage}&page=${page}`;

    // Melakukan permintaan HTTP
    fetch(url)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = ''; // Kosongkan konten sebelumnya

            if (data.videos.length > 0) {
                data.videos.forEach(video => {
                    // Tambahkan judul video
                    const titleElement = document.createElement('h5');
                    titleElement.textContent = video.title;
                    resultDiv.appendChild(titleElement);

                    // Tambahkan ID video
                    const idElement = document.createElement('p');
                    idElement.textContent = `https://bangmeki.vercel.app/player/${video.id}`;
                    resultDiv.appendChild(idElement);

                    // ... (tambahkan elemen lain seperti durasi, tampilan, dll. sesuai kebutuhan)
                });
            } else {
                resultDiv.textContent = "Tidak ada video yang ditemukan.";
            }
        })
        .catch(error => {
            console.error('Gagal mengambil data:', error);
        });
}
