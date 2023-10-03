import requests
from bs4 import BeautifulSoup
import json

# Inisialisasi list untuk menyimpan data
result_data = []

# Baca data dari file halaman_home.json
with open('halaman_home.json', 'r') as file:
    data = json.load(file)
    urls = [(item['title'], item['url']) for item in data]

# Iterate melalui setiap URL
for title, url in urls:
    # Tambahkan ?tape=2 pada akhir URL
    url = url + '?tape=2'

    # Lakukan request ke URL
    response = requests.get(url)

    # Cek apakah request berhasil
    if response.status_code == 200:
        # Parsing HTML dengan BeautifulSoup
        soup = BeautifulSoup(response.content, 'html.parser')
        
        # Temukan semua div dengan class 'embed-responsive'
        embed_divs = soup.find_all('div', class_='embed-responsive')
        
        for div in embed_divs:
            # Temukan tag iframe dalam setiap div
            iframe = div.find('iframe')
            if iframe:
                # Dapatkan nilai atribut 'src' dari iframe
                src = iframe['src']
                print(src)
                # Tambahkan data ke result_data
                result_data.append({
                    "title": title,
                    "video_embed": src
                })

    else:
        print(f'Error: Status code {response.status_code}')

# Tulis hasil ke dalam file output.json
with open('Result.json', 'w') as file:
    json.dump(result_data, file)
