from fastapi import FastAPI, Request
from bs4 import BeautifulSoup
from starlette.templating import Jinja2Templates
from starlette.responses import HTMLResponse
import httpx

app = FastAPI()
templates = Jinja2Templates(directory="templates")

@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.get("/scrape", response_class=HTMLResponse)
async def scrape(request: Request, url: str):
    # Menambahkan headers untuk mengimitasi perilaku web browser
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
    }

    try:
        # Mengunduh sumber kode HTML dari URL dengan headers
        async with httpx.AsyncClient() as client:
            response = await client.get(url, headers=headers)
        
        if response.status_code == 200:
            # Mengambil teks sumber kode HTML
            html = response.text

            # Membuat objek BeautifulSoup dari kode HTML
            soup = BeautifulSoup(html, 'html.parser')

            # Mengambil semua elemen <a>
            a_elements = soup.find_all('a')

            # Menyusun hasil dalam bentuk HTML dengan satu tautan per baris
            result = "<br>".join(a.get('href') for a in a_elements if a.get('href'))

            return templates.TemplateResponse("scrape_result.html", {"request": request, "result": result})
        else:
            return templates.TemplateResponse("error.html", {"request": request, "error_message": "Gagal mengunduh sumber kode HTML dari URL"})
    except Exception as e:
        return templates.TemplateResponse("error.html", {"request": request, "error_message": f"Terjadi kesalahan: {str(e)}"})
