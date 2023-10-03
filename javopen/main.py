import requests
from bs4 import BeautifulSoup

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
    
    # Buat list untuk menyimpan tautan href unik
    listresult = []
    
    def scrape_links(div):
        if div:
            # Temukan semua tautan href di dalam div target
            links = div.find_all('a', href=True)
            
            # Loop melalui tautan href
            for link in links:
                # Hanya tambahkan tautan href jika belum ada dalam listresult
                href = link['href']
                if href not in listresult:
                    listresult.append(href)
    
    # Panggil fungsi untuk scrape link dari target_div1, target_div2, dan target_div3
    scrape_links(target_div1)
    scrape_links(target_div2)
    scrape_links(target_div3)
    
    # Print semua tautan href unik
    for unique_link in listresult:
        print(unique_link)
else:
    print(f'Error: Status code {response.status_code}')
