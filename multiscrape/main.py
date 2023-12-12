import requests
from bs4 import BeautifulSoup

def scrape_links(url):
    try:
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        }

        # Mengambil konten halaman web dengan header
        response = requests.get(url, headers=headers)
        response.raise_for_status()

        # Parsing HTML
        soup = BeautifulSoup(response.content, 'html.parser')

        # Mencari semua elemen dengan class 'btn btn-default btn-sm' dan mendapatkan nilai 'href'
        view_links = [a['href'] for a in soup.find_all('a', class_='btn btn-default btn-sm')]

        return view_links
    except Exception as e:
        print(f"Error scraping {url}: {str(e)}")
        return None

# Membaca file data.txt dan mengambil setiap link
with open('data.txt', 'r') as file:
    links = file.readlines()

# Menghapus karakter newline dari setiap link
links = [link.strip() for link in links]

# Melakukan scraping untuk setiap link dan mencetak hasilnya
for link in links:
    result = scrape_links(link)
    if result:
        print(f"Link: {link}")
        for view_link in result:
            print(f"View Link: {view_link}")
        print("-" * 40)
