## Simple WebGis

### Author: Fivi Melinda

---

**Langkah-langkah menjalankan aplikasi:**

1. Clone/download repository
2. Buat DB baru melalui PgAdmin
3. Copy dan jalankan query dalam file _api/app/config/dbScript_ pada DB yang sudah dibuat melalui Query Tool PgAdmin.
4. Sesuaikan data dalam file _api/app/config/dbConfig_ dengan DB yang sudah dibuat.
5. Pada root directory _api_, lakukan `npm install` untuk menginstall dependency. Kemudian lakukan `npm start` untuk menjalankan aplikasi backend.
6. Pada root directory _frontendgis_, lakukan `npm install` untuk menginstall dependency. Kemudian lakukan `npm start` untuk menjalankan aplikasi frontend. Aplikasi dapat dilihat pada **localhost:3000**.

Apabila ingin mencoba menjalankan semua API (CRUD), dapat melakukan import file postman collection pada api/postman
