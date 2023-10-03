import sqlite3
import json

# Baca data dari Result.json
with open('Result.json', 'r') as file:
    data = json.load(file)

# Hubungkan ke database
conn = sqlite3.connect('../database/javbokep.sqlite')

# Buat objek kursor
cursor = conn.cursor()

# Hapus semua data dari tabel
cursor.execute('DELETE FROM javtbl')  # Ganti 'nama_tabel' dengan nama tabel Anda

# Insert data ke tabel
for item in data:
    title = item['title']
    video_embed = item['video_embed']

    cursor.execute('INSERT INTO javtbl (title, video_embed) VALUES (?, ?)', (title, video_embed)) # Ganti 'nama_tabel' dengan nama tabel Anda

# Commit perubahan
conn.commit()

# Tutup koneksi
conn.close()
