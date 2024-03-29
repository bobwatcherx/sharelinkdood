


function generateLink() {
    
    const page = document.getElementById("page").value;
    const perPage = document.getElementById("per_page").value;

    // URL API dengan parameter page dan per_page
    const api_url = `https://bobwatcherx-poophdserver.hf.space/https://lulustream.com/api/file/list?key=936yclje4cl5mud6kcw&page=${page}&per_page=${perPage}`;
    // Melakukan permintaan GET ke API
    fetch(api_url)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById("result");
            const files = data.result.files; // Perhatikan perubahan ini
            let links = '';

            files.forEach((file, index) => {
                const title = file.title;
                const sub = file.title.replace(/\s+/g, '_');
                const file_code = file.file_code;
                const link = `https://banglulu.netlify.app/player/${file_code}`;
                links += `${title}\n<br>${link}\n<br><br>`; // Menggunakan \n untuk baris baru
            });

            resultDiv.innerHTML = links; // Menggunakan innerHTML untuk memperhitungkan baris baru

            // Menampilkan total_pages dan total_data
            const total_pages = data.result.total_pages; // Perhatikan perubahan ini
            const total_data = data.result.total_data; // Perhatikan perubahan ini
            const totalPagesSpan = document.getElementById("total_pages");
            const totalDataSpan = document.getElementById("total_data");
            totalPagesSpan.textContent = total_pages;
            totalDataSpan.textContent = total_data;
            
            // Tambahkan tombol Copy
            const copyButton = document.createElement("button");
            copyButton.textContent = "Copy";
            copyButton.addEventListener("click", function () {
                const textToCopy = resultDiv.innerText; // Mendapatkan teks dari div
                const textArea = document.createElement("textarea");
                textArea.value = textToCopy;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand("copy");
                document.body.removeChild(textArea);
                alert("Teks telah disalin ke clipboard.");
            });

            resultDiv.appendChild(copyButton);

        })
        .catch(error => {
            console.error("Error:", error);
        });
}
