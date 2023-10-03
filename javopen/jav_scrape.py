import requests
from bs4 import BeautifulSoup

# Inisialisasi list untuk menyimpan URL
urls = []

# Meminta pengguna untuk memasukkan URL
while True:
    url = input("Masukkan URL (klik 'd' untuk selesai): ")
    
    if url.lower() == 'd':
        break
    
    urls.append(url)

# Iterate melalui setiap URL
for url in urls:
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
                
                # Print hasilnya
                print(src)
                

    else:
        print(f'Error: Status code {response.status_code}')
