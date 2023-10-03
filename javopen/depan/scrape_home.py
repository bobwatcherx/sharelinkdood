import requests
from bs4 import BeautifulSoup
import json

# URL situs web yang akan di-scrape
url = "https://javopen.co"

# Lakukan request ke URL
response = requests.get(url)

# Cek apakah request berhasil
if response.status_code == 200:
    # Parsing HTML dengan BeautifulSoup
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # Temukan div dengan id "pagebuilder-9345"
    target_div1 = soup.find('div', id='pagebuilder-9345')
    target_div2 = soup.find('div', id='pagebuilder-9428')  # Tambahkan ini
    target_div3 = soup.find('div', id='pagebuilder-7120')   # Tambahkan ini
    
    # Buat list untuk menyimpan tautan href dan judul unik
    listresult = []
    
    def scrape_links(div):
        if div:
            # Temukan semua elemen post
            posts = div.find_all('div', class_='item')
            
            # Loop melalui elemen post
            for post in posts:
                # Ambil judul dan URL
                title = post.find('h3').text
                url = post.find('a')['href']
                
                # Hanya tambahkan jika belum ada dalam listresult
                if {'title': title, 'url': url} not in listresult:
                    listresult.append({'title': title, 'url': url})
    
    # Panggil fungsi untuk scrape link dari target_div1, target_div2, dan target_div3
    scrape_links(target_div1)
    scrape_links(target_div2)
    scrape_links(target_div3)
    
    # Tulis hasil ke dalam file halaman_home.json
    with open('halaman_home.json', 'w') as file:
        json.dump(listresult, file, indent=4)
    print("Berhasil disimpan ke halaman_home.json")
else:
    print(f'Error: Status code {response.status_code}')
