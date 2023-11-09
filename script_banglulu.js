function generateLink() {
    const page = document.getElementById("page").value;
    const perPage = document.getElementById("per_page").value;

    // URL API with parameters
    const api_url = `https://corsany-1-g0403094.deta.app/https://lulustream.com/api/file/list?key=936yclje4cl5mud6kcw&page=${page}&per_page=${perPage}`;

    // Making a GET request to the API
    fetch(api_url)
        .then(response => response.json())
        .then(data => {
            const resultDiv = document.getElementById("result");
            const files = data.result.files; // Using the correct property for files
            let links = '';

            files.forEach((file, index) => {
                const title = file.title;
                const file_code = file.file_code;
                const link = `https://banglulu.vercel.app/player/${file_code}`;
                links += `${title}\n<br>${link}\n<br><br>`;
            });

            resultDiv.innerHTML = links;

            // Displaying total_pages and total_results
            const total_pages = data.result.pages;
            const total_data = data.result.results_total;
            const totalPagesSpan = document.getElementById("total_pages");
            const totalDataSpan = document.getElementById("total_data");
            totalPagesSpan.textContent = total_pages;
            totalDataSpan.textContent = total_data;

            // Adding a Copy button
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
                alert("Text has been copied to the clipboard.");
            });

            resultDiv.appendChild(copyButton);
        })
        .catch(error => {
            console.error("Error:", error);
        });
}
