from fastapi import FastAPI, HTTPException
import sqlite3

# Inisialisasi FastAPI
app = FastAPI()


def get_data_by_id(id: int):
    # Membuat koneksi ke database
    conn = sqlite3.connect('./database/javbokep.sqlite')
    cursor = conn.cursor()

    # Mengambil data dari tabel dengan ID tertentu
    cursor.execute(f"SELECT * FROM javtbl WHERE id=?", (id,))
    data = cursor.fetchone()

    # Menutup koneksi
    conn.close()

    return data
    

# Fungsi untuk mengambil semua data dari tabel javtbl
def get_all_data(per_page: int, page: int):
    # Menghitung offset berdasarkan halaman dan jumlah per halaman
    offset = (page - 1) * per_page

    # Membuat koneksi ke database
    conn = sqlite3.connect('./database/javbokep.sqlite')
    cursor = conn.cursor()

    # Mengambil data dari tabel dengan paginasi
    cursor.execute(f"SELECT * FROM javtbl LIMIT ? OFFSET ?", (per_page, offset))
    data = cursor.fetchall()

    # Menutup koneksi
    conn.close()

    return data

# Endpoint /all
@app.get("/all")
def get_all(per_page: int = 10, page: int = 1):
    # Mendapatkan data dari tabel dengan paginasi
    data = get_all_data(per_page, page)

    # Memeriksa apakah data ditemukan
    if not data:
        raise HTTPException(status_code=404, detail="Data not found")

    # Mengubah data menjadi format yang diinginkan
    result = [{"id": row[0], "title": row[1], "video_embed": row[2]} for row in data]

    return result


# DETAIL id
@app.get("/detail/{id}")
def get_detail(id: int):
    # Mendapatkan data berdasarkan ID
    data = get_data_by_id(id)

    # Memeriksa apakah data ditemukan
    if not data:
        raise HTTPException(status_code=404, detail="Data not found")

    # Mengubah data menjadi format yang diinginkan
    result = {"id": data[0], "title": data[1], "video_embed": data[2]}

    return result

