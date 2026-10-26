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

## Versi APK Android

Folder `android/` berisi proyek Android (WebView) yang menampilkan game
yang sama dari aset lokal di dalam APK — jadi APK-nya tetap offline,
tanpa izin internet.

Setiap push ke `main` yang menyentuh `android/` akan menjalankan
GitHub Actions (`.github/workflows/build-apk.yml`): membangun APK debug
dan membuat / memperbarui Release `v1.0` dengan file
`app-debug.apk` terlampir. Cara pasang:

1. Buka halaman Releases di repo ini, unduh `app-debug.apk` dari
   Release `v1.0`.
2. Di HP, izinkan install dari sumber tidak dikenal untuk browser /
   pengelola file yang dipakai, sekali saja.
3. Pasang APK, buka aplikasi "Teka-Teki", mainkan offline.

Catatan: ini APK debug untuk pemakaian pribadi, bukan APK rilis
Play Store yang ditandatangani kunci rilis.

## Rencana berikutnya (opsional)

- Level 5 × 5
- Mode waktu / langkah terbatas
- Suara dan animasi geser
- Bungkus jadi APK dengan WebView, bila mau dipasang seperti aplikasi
