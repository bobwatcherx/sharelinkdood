function generateLink() {
    const page = document.getElementById("page").value;
    const perPage = document.getElementById("per_page").value;

    // URL API dengan parameter page dan per_page
   const api_url = `https://filemoon.sx/api/file/list?key=26604oo759r7ar6j96q7h&page=${page}&per_page=${perPage}`;

    // Melakukan permintaan GET ke API
    fetch(api_url)
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById("result");
        const files = data.result.files; // Perhatikan perubahan ini

        let links = '';

        files.forEach((file, index) => {
            const title = file.title;
            const file_code = file.file_code;

            // Memperoleh file_code dari link yang diberikan
            const file_code_match = file.link.match(/\/d\/([^\/]+)/);
            const new_file_code = file_code_match ? file_code_match[1] : '';

            // Membuat link baru
            const link = `https://bangmomon.vercel.app/player/${new_file_code}`;
            
            links += `${title}\n<br>${link}\n<br><br>`;
        });


        resultDiv.innerHTML = links;

        const total_pages = data.result.pages;
        const total_data = data.result.results_total;
        const totalPagesSpan = document.getElementById("total_pages");
        const totalDataSpan = document.getElementById("total_data");
        totalPagesSpan.textContent = total_pages;
        totalDataSpan.textContent = total_data;

        const copyButton = document.createElement("button");
        copyButton.textContent = "Copy";
        copyButton.addEventListener("click", function () {
            const textToCopy = resultDiv.innerText;
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
