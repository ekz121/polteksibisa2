# Polteksibisa mobile

Pratinjau Beranda Anggota dengan React Native, Expo SDK 58, TypeScript, dan Expo Router. Seluruh identitas serta konten merupakan data dummy. Belum ada autentikasi, backend, database, atau halaman administrator.

## Menjalankan di Windows

Dependensi sudah dipasang. Buka terminal PowerShell VS Code:

```powershell
Set-Location 'D:\polteksibisa2\mobile'
npm.cmd start
```

Perintah tersebut menjalankan `expo start --go --lan`. Biarkan terminal tetap berjalan. Gunakan `npm.cmd` dan `npx.cmd` karena kebijakan PowerShell laptop ini memblokir `npm.ps1`; tidak perlu mengubah execution policy Windows.

Jika kelak memasang ulang dependensi dari lockfile, jalankan `npm.cmd ci` di direktori `mobile` terlebih dahulu.

## Membuka pada Motorola G67 5G

1. Pasang Expo Go Android untuk SDK 58; versi proyek dan Expo Go harus cocok.
2. Sambungkan laptop dan HP ke jaringan Wi-Fi yang sama. Alternatifnya, aktifkan hotspot HP lalu sambungkan laptop ke hotspot tersebut.
3. Jalankan `npm.cmd start` dari folder `mobile`.
4. Buka Expo Go, pilih pemindaian QR, lalu pindai QR pada terminal. Jika perlu, tekan `E` pada terminal untuk menampilkan ulang QR.
5. Jika memilih masukan URL manual di Expo Go, gunakan alamat `exp://...` yang dicetak terminal, bukan `localhost`.
6. Tunggu bundel pertama selesai. Pada pemakaian pertama, Expo Go dapat menampilkan petunjuk pengembang sebelum Beranda.

Jika muncul pesan versi tidak kompatibel, pastikan Expo Go mendukung SDK 58. Pilihan versi Android tersedia pada [halaman resmi Expo Go](https://expo.dev/go?sdkVersion=58&platform=android). Jangan mengubah versi paket secara acak.

Proyek diperbarui dari SDK 57 ke SDK 58 mengikuti [panduan resmi upgrade Expo](https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/) agar cocok dengan Expo Go SDK 58 pada HP pengguna. [Penjelasan kecocokan versi Expo Go](https://docs.expo.dev/troubleshooting/expo-go-version-mismatch/). Rincian upgrade dan titik pemulihan ada di [UPGRADE-SDK58.md](./UPGRADE-SDK58.md).

Setelah upgrade, hentikan Metro lama dengan Ctrl+C, lalu jalankan dari folder `mobile`:

```powershell
npm.cmd start -- --clear
```

Pindai QR baru dari terminal; jangan membuka tautan sesi SDK 57 yang lama.

## Mencoba Beranda

| Kontrol | Perilaku |
| --- | --- |
| SIhadir, SIMASET, SIGAP, SIPAS | Dialog “Belum tersedia”, dengan nama dan penjelasan modul |
| Kartu pengumuman | Modal detail pengumuman dummy |
| Kartu agenda | Modal detail agenda dummy beserta waktu dan lokasi contoh |
| Tombol X / Kembali ke Beranda | Menutup dialog |
| Area gelap di luar dialog | Menutup dialog |
| Tombol kembali Android saat dialog terbuka | Ditangani `Modal.onRequestClose` untuk menutup dialog; perlu dicoba pada HP |
| Beranda pada navigasi bawah | Menggulir kembali ke atas |
| Informasi / Lihat semua | Penjelasan bahwa layar daftar belum dibuat, dengan arahan membuka kartu contoh |
| Lonceng header / Notifikasi | Penjelasan bahwa notifikasi tidak termasuk Increment 1 |
| Akun | Penjelasan bahwa halaman akun dan sesi login belum dibuat |

Tidak ada badge jumlah notifikasi atau penanda pesan belum dibaca yang dibuat-buat. Menu Notifikasi dipertahankan hanya untuk mengikuti permintaan pratinjau navigasi referensi.

Gulir sampai informasi terakhir. Coba posisi tegak dan mendatar, serta ukuran font Android yang lebih besar. Navigasi bawah berada di luar area gulir sehingga tidak menutupi baris terakhir. Safe area atas, bawah, kiri, dan kanan diperhitungkan. Layanan berubah menjadi satu kolom pada layar sangat sempit atau skala font besar.

## Jika laptop dan HP tidak terhubung

1. Pastikan terminal masih berjalan dan kedua perangkat berada pada jaringan yang sama. Hentikan VPN pada perangkat pengujian jika VPN mengubah jalur jaringan.
2. Jika Windows meminta izin Node.js, izinkan pada jaringan privat yang Anda percaya. Tidak perlu mematikan firewall secara menyeluruh.
3. Pada browser HP, coba `http://IP-LAPTOP:8081/status`, menggunakan IP dari terminal. Respons yang diharapkan adalah `packager-status:running`. Jika tidak dapat dibuka, masalahnya masih pada jaringan/firewall.
4. Wi-Fi kampus/tamu dapat membatasi komunikasi antarperangkat. Coba hotspot HP atau jaringan rumah. Pastikan laptop mengikuti jaringan baru sebelum memulai ulang Expo.
5. Jika QR mengarah ke adaptor VPN/virtual, periksa IPv4 Wi-Fi dengan `ipconfig`. Pada terminal yang sama, tetapkan IP Wi-Fi yang benar:

```powershell
# Contoh saja: ganti angka berikut dengan IPv4 Wi-Fi laptop Anda.
$env:REACT_NATIVE_PACKAGER_HOSTNAME = '192.168.1.10'
npm.cmd start
```

Hapus pengaturan sesi tersebut jika berpindah jaringan:

```powershell
Remove-Item Env:REACT_NATIVE_PACKAGER_HOSTNAME -ErrorAction SilentlyContinue
```

6. Jika port 8081 sedang dipakai, hentikan server Expo lama dengan Ctrl+C. Sebagai alternatif, jalankan `npm.cmd start -- --port 8083`, lalu pindai QR baru; gunakan port 8083 juga saat memeriksa `/status`.

Jalur Expo Go di atas memakai LAN. Tidak ada tunnel, emulator, Android Studio, Docker, atau layanan berbayar yang disiapkan. Konfigurasi cloud build APK pratinjau dijelaskan di bawah; Expo Go tetap dapat dipakai seperti biasa.

## Menghentikan dan menjalankan ulang

- Hentikan Metro dengan Ctrl+C di terminal yang menjalankannya.
- Mulai lagi dari folder `mobile` menggunakan `npm.cmd start`; buka proyek kembali di Expo Go.
- Setelah mengubah komponen atau data, simpan berkas untuk Fast Refresh. Tekan `R` pada terminal jika perlu memuat ulang.
- Jika tampilan masih memakai cache lama, hentikan server, kemudian jalankan `npm.cmd start -- --clear`.
- Menutup Expo Go di HP tidak otomatis menghentikan server laptop.

## Berkas yang dapat dipelajari dan diubah

| Berkas | Kegunaan |
| --- | --- |
| `src/app/_layout.tsx` | Fondasi Expo Router dan safe-area provider |
| `src/app/_layout.web.tsx`, `src/safe-area.css` | Penyesuaian safe area browser untuk SDK 58 |
| `src/app/index.tsx` | Route utama yang menampilkan Beranda |
| `src/screens/HomeScreen.tsx` | Susunan header, kartu layanan, daftar informasi, navigasi bawah |
| `src/data/home.ts` | Nama dummy, teks kampus, layanan, informasi, isi modal, dan pesan menu |
| `src/constants/theme.ts` | Warna, lebar maksimum, jarak, dan radius utama |
| `src/components/PreviewDialog.tsx` | Modal pesan dan detail informasi |
| `src/components/Action.tsx` | Tombol dengan keadaan ditekan dan fokus |
| `src/components/Icon.tsx` | Ikon SVG yang dirender sebagai komponen |
| `assets/images/logo-kampus.png` | Salinan persis logo asli, digunakan di header dan konfigurasi splash |
| `assets/images/app-icon.png` | Logo asli pada kanvas persegi putih, digunakan sebagai ikon aplikasi |
| `app.json` | Nama aplikasi, identitas proyek, pilihan tema, ikon, dan splash |
| `metro.config.js` | Batas dua worker Metro untuk laptop RAM 8 GB |

Referensi tetap di `../design/screens/beranda/01-beranda-anggota.png`. Logo sumber tetap di `../design/assets/logo-kampus.png`. Folder desain dan keputusan tidak diubah.

Mengganti gambar sumber di `design` tidak otomatis memperbarui salinan di `mobile`. Untuk mengganti logo aplikasi, perbarui salinan `logo-kampus.png` serta `app-icon.png`. Ikon harus persegi; pertahankan proporsi logo dan tambahkan ruang putih, jangan meregangkan atau memotong lambang. Ikon aplikasi mandiri dan splash sepenuhnya baru dapat diperiksa pada tahap build nanti; Expo Go mempunyai tampilan pembukanya sendiri.

## Pilihan visual

Beranda Anggota mengikuti referensi merah-putih, dials ENERGY 2 / RHYTHM 2 / MOTION 1. Header menjadi fokus utama; gelombang merah mempertahankan karakter referensi tanpa foto gedung. Kartu putih memisahkan layanan dari informasi. Empat layanan memakai ukuran setara karena statusnya sama, sementara informasi menggunakan susunan baris yang berbeda.

Font sistem Android dipilih untuk mendekati tipografi sans-serif referensi, mendukung skala teks perangkat, serta menghindari unduhan font tambahan. Ikon kalender/jam menandai presensi, perangkat/aset menandai SIMASET, diagram menandai survei, dan dokumen menandai persuratan. Label status menjelaskan fungsi yang belum tersedia; chevron menandai tindakan membuka dialog/detail. Bayangan ringan memisahkan kartu dari latar seperti referensi. Tema terang mengikuti arah desain merah-putih; belum ada pilihan tema tambahan.

Gambar referensi tidak digunakan sebagai seluruh halaman. Semua tata letak, teks, kartu, ikon, dan dialog merupakan komponen React Native. Foto gedung dan foto lain yang tidak tersedia sebagai aset terpisah diganti kartu informasi berikon.

## Pemeriksaan lokal

Jalankan dari direktori `mobile`:

```powershell
npm.cmd run typecheck
npm.cmd run lint
npm.cmd run check:contrast
npx.cmd expo install --check
npx.cmd --yes expo-doctor@latest
npm.cmd run test:ui
```

Pengujian UI menggunakan Microsoft Edge yang sudah terpasang pada Windows ini, tanpa emulator. Konfigurasinya ada di `playwright.config.ts`; jika Edge tidak tersedia di perangkat pengembangan lain, sesuaikan channel browser sebelum menjalankan tes.

Tes menjalankan server web lokal pada port 8082 dan mematikannya setelah selesai. Bukti gambar berada di `verification/`, dan keluaran kegagalan jika ada di `test-results/`; keduanya diabaikan Git. Ini verifikasi tambahan terhadap komponen yang sama, bukan bukti bahwa aplikasi sudah tampil di HP.

```powershell
npx.cmd expo export --platform android --output-dir dist/android
```

Perintah tersebut membuat bundel JavaScript/aset Android lokal untuk pemeriksaan Metro, bukan APK atau cloud build. Ringkasan hasil dan batas pemeriksaan ada di `VERIFICATION.md`.

## APK Android pratinjau Tahap 01

Status 12 November 2026: **build APK berhasil**, status EAS `FINISHED`, selesai pukul 09.43 WIB. [Unduh APK pratinjau (97,6 MB)](https://expo.dev/artifacts/eas/TQdSmjmUUZjxYdwZdIPxRMCT3F4aZpOrqpsjLC-FmRA.apk) atau buka [halaman build](https://expo.dev/accounts/zeinn/projects/polteksibisa/builds/19107637-cb41-4fa6-803c-5fe358fd1c82). Tautan diuji: HTTP HEAD 200 dan unduh parsial HTTP 206 dengan signature ZIP/APK. APK belum diuji pada HP fisik. Metadata EAS mencatat kedaluwarsa build 26 November 2026 pukul 09.23 WIB; unduh dan simpan salinannya sebelum itu. Hasil pemeriksaan terbaru dicatat di [laporan build APK](../docs/LAPORAN-BUILD-APK-PRATINJAU.md); hasil dalam VERIFICATION.md dan UPGRADE-SDK58.md adalah riwayat pemeriksaan sebelumnya.

APK ini hanya pratinjau dashboard/Beranda Tahap 01. Data dan identitas masih dummy. Belum ada login sebenarnya, backend/database, OTP/email, atau halaman admin. SIhadir, SIMASET, SIGAP, dan SIPAS tetap **Belum tersedia**. Gambar di `design/screens` merupakan referensi, bukan layar aplikasi yang otomatis tersedia.

`eas.json` hanya mempunyai profile `preview`, dengan `distribution: internal`, environment `preview`, dan `android.buildType: apk`. Tidak ada profile production. Identifier Android sementara adalah `com.polteksibisa.preview`; identifier ini harus dikonfirmasi sebelum rilis resmi. Nama Polteksibisa, ikon, splash, warna, dan major Expo SDK 58 dipertahankan.

Jalankan dari PowerShell:

```powershell
Set-Location 'D:\polteksibisa2\mobile'
npx.cmd eas-cli@latest whoami
# Jika belum login, pengguna menjalankan ini sendiri:
npx.cmd eas-cli@latest login
# Setelah identitas berhasil diperiksa:
npx.cmd eas-cli@latest whoami
npx.cmd eas-cli@latest build --platform android --profile preview
```

Gunakan akun Expo milik Anda dan jalur gratis yang tersedia. Jika kuota gratis habis atau diminta mengaktifkan layanan berbayar, hentikan; jangan membeli layanan. Build pertama dapat menghubungkan/membuat proyek Expo pada akun yang login dan menghasilkan `extra.eas.projectId` di app.json. ID proyek bukan secret. Keystore penandatanganan dapat dikelola di server Expo; jangan menyimpan credential, token, password, atau keystore di source/Git. Jangan mengirim kredensial lewat chat.

Konfigurasi ini ditujukan menghasilkan APK mandiri dengan bundel aplikasi di dalamnya, tanpa Metro/Expo Go saat digunakan. Itu baru dapat dipastikan setelah build cloud selesai dan diuji di HP. Tidak perlu memasang Android Studio, JDK, SDK, ADB, atau emulator lokal untuk jalur cloud ini. Status berhasil hanya boleh dicatat setelah build selesai dan tautan artefak APK tersedia. [Panduan resmi build APK](https://docs.expo.dev/build-reference/apk/).

### Mengunduh dan memasang APK

1. Buka [tautan APK](https://expo.dev/artifacts/eas/TQdSmjmUUZjxYdwZdIPxRMCT3F4aZpOrqpsjLC-FmRA.apk) di browser HP untuk mengunduh berkas `.apk`, atau pilih Install/Download pada [halaman build](https://expo.dev/accounts/zeinn/projects/polteksibisa/builds/19107637-cb41-4fa6-803c-5fe358fd1c82).
2. Buka berkas dari Downloads/Unduhan. Jika Android meminta izin, buka Setelan pada dialog, lalu aktifkan **Izinkan dari sumber ini** untuk browser atau aplikasi Files yang membuka APK. Menu dapat bernama **Aplikasi > Akses aplikasi khusus > Instal aplikasi tidak dikenal**, tergantung versi Android.
3. Kembali ke berkas APK, ketuk **Instal**, lalu **Buka** untuk menjalankan Polteksibisa. Setelah selesai, izin instalasi dari sumber tersebut dapat dinonaktifkan kembali.
4. Coba gulir Beranda, kartu pengumuman/agenda dummy, dialog empat layanan, navigasi bawah, tombol kembali Android, orientasi layar, dan ukuran font besar. Halaman daftar informasi/akun serta notifikasi hanya menampilkan penjelasan statusnya.

Jika Android menampilkan pembatasan khusus developer tidak terverifikasi, izin sumber di atas mungkin belum cukup. Ikuti [panduan resmi Android](https://support.google.com/android/answer/17588095?hl=id); alur tersebut dapat memerlukan waktu tunggu 24 jam. Hal ini bergantung pada perangkat dan kebijakan Android yang diterapkan.

Untuk menjalankan kembali melalui Expo Go, hubungkan HP dan laptop ke jaringan yang sama, jalankan `npm.cmd start -- --clear` dari `D:\polteksibisa2\mobile`, lalu pindai QR memakai Expo Go yang mendukung SDK 58. APK dan Expo Go adalah dua cara membuka pratinjau yang sama.
