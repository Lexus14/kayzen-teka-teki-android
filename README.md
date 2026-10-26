# Teka-Teki Susun Angka (Android, Offline)

Game teka-teki susun angka untuk Android, dimainkan dari browser HP.
Tidak butuh internet setelah file diunduh, tidak ada server, tidak ada
iklan, dan tidak ada dependensi eksternal — semua kode ada di repo ini.

## Cara main

1. Buka `index.html` di browser HP Android (atau salin folder ini ke HP).
2. Pilih ukuran: 3 × 3 (Mudah) atau 4 × 4 (Sulit).
3. Ketuk ubin di sebelah kotak kosong untuk menggesernya.
4. Susun angka 1, 2, 3, … secara berurutan sampai kotak kosong di pojok
   kanan bawah. Ubin yang bisa digeser ditandai lebih terang.
5. Skor terbaik (langkah paling sedikit, lalu waktu tercepat) tersimpan
   di perangkatmu sendiri, per ukuran papan.

## Kenapa selalu bisa diselesaikan

Papan tidak diacak sembarang. Papan dimulai dari posisi selesai, lalu
digeser secara acak dengan langkah yang sah (100 langkah untuk 3 × 3,
200 langkah untuk 4 × 4). Karena setiap langkah bisa dibalik, papan
hasil acakan selalu punya solusi.

## File

```
index.html  Halaman game
style.css   Tampilan sentuh untuk HP
app.js      Logika papan, timer, dan skor terbaik lokal
```

## Rencana berikutnya (opsional)

- Level 5 × 5
- Mode waktu / langkah terbatas
- Suara dan animasi geser
- Bungkus jadi APK dengan WebView, bila mau dipasang seperti aplikasi
