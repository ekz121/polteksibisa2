# Upgrade Polteksibisa ke Expo SDK 58

Proyek `mobile` diperbarui di tempat dari SDK 57 ke SDK 58 untuk menyesuaikan Expo Go SDK 58 yang terpasang di HP pengguna. Tidak membuat proyek baru atau menambahkan fitur aplikasi.

## Titik pemulihan sebelum perubahan

- Arsip: `.recovery/expo-sdk57-before-upgrade-5c5feb62.zip`.
- Manifest: `.recovery/expo-sdk57-before-upgrade-5c5feb62.json`.
- Arsip mencakup 75 berkas kode, konfigurasi, aset, referensi desain, dan keputusan sebelum upgrade. Folder dependensi serta keluaran pemeriksaan tidak dimasukkan.
- Seluruh 75 isi arsip diperiksa ulang terhadap SHA-256 masing-masing berkas.
- SHA-256 arsip: `0F220BAC6EC9040207A4D7A3A66A989F5CBAE20D45F92C0C975E55F4F2039B57`.
- Repository belum mempunyai commit saat pekerjaan dimulai. Berkas yang telah di-stage tetap dipertahankan; hash Git index sebelum dan setelah perubahan cocok.

Jika perlu memeriksa versi sebelumnya, ekstrak arsip ke folder terpisah terlebih dahulu. Jangan langsung menimpa proyek aktif. Lockfile SDK 57 di dalam arsip dapat digunakan untuk memasang ulang dependensi versi lama pada salinan pemulihan.

## Paket yang diperbarui

Versi terpasang yang diperiksa setelah `expo install --fix`:

| Paket | Versi |
| --- | --- |
| Expo | 58.0.23 |
| Expo Router | 58.0.30 |
| React / React DOM | 19.3.0 |
| React Native | 0.88.1 |
| Expo Constants | 58.0.15 |
| Expo Linking | 58.0.16 |
| Expo Splash Screen | 58.0.13 |
| Expo Status Bar | 58.0.4 |
| Expo System UI | 58.0.7 |
| Reanimated / Worklets | 4.7.1 / 0.13.0 |
| Safe Area Context | 5.11.1 |
| React Native Screens | 4.30.1 |
| React Native SVG | 15.16.0 |
| React Native Web | 0.21.4 |

Tipe React dan konfigurasi lint Expo juga diselaraskan. `package.json` dan `package-lock.json` mencatat hasilnya.

Konflik awal berasal dari paket opsional Expo UI 57 yang tersisa pada tree dependensi saat Router diperbarui. Instalasi lama dan lockfile sementara diisolasi, kemudian dependensi dipasang ulang dari manifest yang seluruh versinya sudah selaras. Instalasi tidak lengkap yang sempat menyebabkan modul CLI hilang dan lockfile tidak valid juga diganti dengan instalasi bersih. Folder dependensi sementara dibersihkan setelah pemeriksaan.

Tidak memakai opsi pemaksaan atau pengabaian peer dependency. `npx.cmd expo install --fix` akhirnya selesai dengan pesan `Dependencies are up to date`.

## Pemeriksaan catatan rilis

Mengikuti [panduan upgrade resmi](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/) dan meninjau [catatan rilis SDK 58](https://expo.dev/changelog/sdk-58):

- Node.js 24.14.0 yang tersedia memenuhi persyaratan tooling.
- Tipe ref `ScrollView` diperbarui ke `ScrollViewInstance` untuk Strict TypeScript API. Tidak memakai opt-out tipe lama.
- Pemindaian kode tidak menemukan penggunaan API yang dihapus seperti `InteractionManager`, `NativeMethods`, atau prop status bar lama.
- Tidak ada direktori native `android`/`ios` yang perlu diregenerasi.

[Panduan migrasi Router](https://docs.expo.dev/router/migrate/sdk-57-to-58/) dan [panduan safe area](https://docs.expo.dev/develop/user-interface/safe-areas/) juga ditinjau:

- Layout web memakai CSS `env(safe-area-inset-*)` melalui `_layout.web.tsx` dan `safe-area.css`. Layout Android mempertahankan provider/inset native.
- `web.output` tetap eksplisit `static`. Tidak memakai flag server lama, custom navigator, atau helper pengujian Router yang berubah.
- Header navigator tetap tersembunyi; header Beranda buatan aplikasi dipertahankan.

Server sempat kehabisan heap ketika pemeriksaan startup dilakukan bersamaan dengan pembersihan salinan dependensi sementara. Setelah salinan tersebut dibersihkan, `.recovery` dikecualikan dari pemindaian Metro. Startup diulang dengan cache bersih, dan endpoint kesehatan serta manifest SDK 58 kemudian merespons normal. Batas dua worker tetap dipertahankan untuk laptop RAM 8 GB; batas heap sistem tidak dinaikkan.

## Hasil pemeriksaan aktual

| Pemeriksaan | Hasil |
| --- | --- |
| `npx.cmd expo install --fix` | Lulus; versi selaras |
| `npx.cmd expo install --check` | Lulus |
| `npx.cmd --yes expo-doctor@latest` | Lulus 20/20 |
| `npm.cmd run typecheck` | Lulus setelah migrasi tipe ref |
| `npm.cmd run lint` | Lulus; diulang setelah penyesuaian Metro |
| `npm.cmd run check:contrast` | Lulus 13 pasangan warna |
| `npx.cmd expo export --platform android --output-dir dist/android --clear` | Berhasil mengekspor bundel Hermes Android lokal |
| `npm.cmd run test:ui` | Lulus 15/15 pada lima viewport |
| `npm.cmd start -- --clear` | Startup Expo Go/LAN berhasil pada pemeriksaan akhir |
| Endpoint `/status` | `packager-status:running` |
| Manifest Android | Polteksibisa, SDK `58.0.0`, runtime `exposdk:58.0.0` |
| Bundel pengembangan Android dari server Metro | Berhasil dimuat melalui HTTP lokal, 6.066.657 byte; bukan pengujian pada HP |
| `git diff --check` | Tidak ada kesalahan whitespace; Git hanya memberi pemberitahuan konversi LF/CRLF Windows |
| Keutuhan berkas | Seluruh berkas snapshot masih ada; desain, logo, data dummy, dan komponen yang tidak perlu migrasi cocok hash-nya |

Tes UI yang sudah ada tetap dipakai tanpa perubahan: empat modul, dua detail informasi, seluruh menu navigasi, tombol penutup, area luar dialog, Escape, fokus keyboard, gulir ke atas, ukuran target sentuh, serta overflow. Ukuran uji: 320×740, 390×844, 430×932, 768×1024, dan 844×390. Tidak ada error browser selama tes interaksi.

Audit npm terbaru masih melaporkan **12 moderate, 0 high, dan 0 critical**. Temuan berada pada rantai dependensi tooling Expo/lint seperti `glob` dan `minimatch`. Temuan ini dicatat, tidak disembunyikan atau ditangani dengan penggantian SDK secara paksa.

## Menjalankan kembali pada HP

Hentikan terminal Metro lama dengan Ctrl+C. Buka PowerShell VS Code:

```powershell
Set-Location 'C:\Users\ASUS\Downloads\kuliah\polteksibisa2\mobile'
npm.cmd start -- --clear
```

Hubungkan laptop dan Motorola ke jaringan yang sama. Buka Expo Go SDK 58, lalu pindai QR baru. Jangan memakai kembali tautan sesi SDK 57 yang tersimpan. Bundel pertama setelah penghapusan cache membutuhkan waktu lebih lama.

Tidak perlu menginstal ulang dependensi untuk mencoba perubahan pada laptop ini. Jika nanti menyiapkan salinan lain dari lockfile terbaru, gunakan `npm.cmd ci` dari folder `mobile`.

Server pemeriksaan telah dihentikan setelah verifikasi agar terminal pengguna dapat menjalankan sesi baru.

Pengujian browser dan bundel bukan bukti tampilan di HP. Pembukaan nyata melalui Expo Go SDK 58, safe area perangkat, dan tombol kembali Android tetap menunggu konfirmasi pengguna. Tidak ada emulator, Android Studio, database, autentikasi, atau cloud build yang dijalankan.
