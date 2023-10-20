function generateLink() {
    const page = document.getElementById("page").value;
    const perPage = document.getElementById("per_page").value;

    const api_url = `https://api.filelions.com/api/file/list?key=1730m2zzxzv2tzii249x&page=${page}&per_page=${perPage}`;

    fetch(api_url)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById("result");
            const files = data.result.files;
            let links = '';

            files.forEach((file, index) => {
                const title = file.title;
                const file_code = file.file_code;
                const link = `https://bangucup.vercel.app/player/${file_code}`;
                links += `${title}<br>${link}<br><br>`;
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
                const textToCopy = resultDiv.innerHTML;
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
