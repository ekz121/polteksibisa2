# Laporan build APK pratinjau Polteksibisa

Tanggal: 12 November 2026 (Asia/Jakarta).

## Status aktual

**APK berhasil dibuat dan dapat diunduh.** Build EAS berstatus FINISHED; perintah build selesai dengan exit code 0. Pemeriksaan identitas awal menghasilkan Not logged in; pemeriksaan ulang berhasil setelah pengguna login sebagai zeinn. Proyek @zeinn/polteksibisa dibuat/dihubungkan dengan ID a2c01e90-07ad-451c-a1f9-ef20e4e2a4e9, dan keystore dibuat di server Expo. APK tersedia di cloud; tidak menyimpan salinan APK ke workspace. Ekspor bundel lokal yang berhasil bukan APK dan bukan bukti aplikasi sudah berjalan di Android fisik.

## Artefak APK terverifikasi

- Build ID: `19107637-cb41-4fa6-803c-5fe358fd1c82`.
- [Unduh APK pratinjau](https://expo.dev/artifacts/eas/TQdSmjmUUZjxYdwZdIPxRMCT3F4aZpOrqpsjLC-FmRA.apk).
- [Halaman build Expo](https://expo.dev/accounts/zeinn/projects/polteksibisa/builds/19107637-cb41-4fa6-803c-5fe358fd1c82).
- Status server: `FINISHED`, platform ANDROID, profile preview, distribusi INTERNAL.
- Aplikasi: Polteksibisa 0.1.0, Android versionCode 1, identifier sementara com.polteksibisa.preview, SDK 58.0.0 (paket Expo 58.0.24).
- Dibuat: 12 November 2026 09.23.54 WIB. Selesai: 12 November 2026 09.43.54 WIB.
- Ukuran: 97.609.031 byte, sekitar 97,6 MB (93,1 MiB).
- HTTP HEAD pada tautan artefak berhasil 200, Content-Length 97609031. Server memakai Content-Type application/octet-stream.
- HTTP GET Range 0–3 berhasil 206; signature 50-4B-03-04 cocok dengan kontainer ZIP/APK, Content-Range bytes 0-3/97609031. Hanya empat byte diunduh untuk pemeriksaan ini; tidak mengklaim seluruh APK diunduh/diperiksa atau diinstal di perangkat.
- Metadata EAS mencatat expirationDate 26 November 2026 09.23.54 WIB. Unduh dan simpan salinan sebelum kedaluwarsa. Tautan unduh di atas memakai endpoint artefak Expo, bukan URL redirect bertanda tangan yang berumur pendek.
- Menolak pilihan menjalankan emulator pada akhir CLI. Tidak memasang emulator atau toolchain Android lokal.

## Workspace dan lingkup

- Workspace terkonfirmasi melalui `Get-Location`: `D:\polteksibisa2`. Sumber aplikasi berada di `D:\polteksibisa2\mobile`; tidak menggunakan workspace E:.
- `git status --short` awal kosong, branch `main` mengikuti `origin/main`. Tidak melakukan reset, checkout pemulihan, commit, atau push.
- Membaca keputusan-increment-1.txt, mobile/README.md, mobile/AGENTS.md, mobile/package.json, mobile/app.json, mobile/VERIFICATION.md, dan mobile/UPGRADE-SDK58.md.
- Instruksi lama dalam keputusan mengenai rencana saja merupakan konteks tahap sebelumnya; pekerjaan sekarang mengikuti permintaan eksplisit pengguna untuk APK pratinjau.
- Kondisi aktual: React Native 0.88.1, TypeScript 6, Expo Router, Expo SDK 58. Aplikasi hanya dashboard/Beranda Anggota dengan data dummy. Referensi `design/screens` tidak dihitung sebagai layar yang sudah diimplementasikan.
- `node_modules` sudah tersedia dan pemeriksaan dapat berjalan. `npm.cmd ci` tidak dijalankan secara lokal karena tidak perlu memasang ulang dependensi yang tersedia. Di server EAS, build menjalankan npm ci --include=dev dari lockfile dan berhasil melewati fase pemasangan dependensi. package-lock.json dipertahankan dan diperbarui oleh Expo/npm ketika menyelaraskan enam patch yang terbukti tidak sesuai pemeriksaan kompatibilitas.
- Node.js aktual v26.13.0, npm 11.20.0. Tidak ada direktori native android/ios. `java`, `adb`, dan `sdkmanager` tidak ditemukan pada PATH; JAVA_HOME, ANDROID_HOME, ANDROID_SDK_ROOT tidak terpasang pada sesi ini. Ini bukan pemeriksaan menyeluruh seluruh disk.
- Tidak mengerjakan backend, database, Laravel, Tahap 02, atau Tahap 03. Tidak memasang Android Studio, JDK, Android SDK, ADB, atau emulator. Tidak membeli atau mengaktifkan layanan berbayar.

## Perubahan yang dibuat

1. Membuat `mobile/eas.json` dengan satu profile `preview`: `distribution: internal`, environment `preview`, dan `android.buildType: apk`. Tidak ada profile production atau konfigurasi pengiriman ke toko aplikasi.
2. Menambahkan identifier sementara `android.package: com.polteksibisa.preview` pada app.json. **Identifier wajib dikonfirmasi sebelum rilis resmi.** Tidak memakai nama institusi lain.
3. Menyelaraskan enam patch berdasarkan kegagalan nyata `expo install --check` dan Expo Doctor awal (19/20), melalui:

```powershell
npx.cmd expo install expo@~58.0.24 expo-constants@~58.0.16 expo-linking@~58.0.17 expo-router@~58.0.31 expo-splash-screen@~58.0.14 expo-status-bar@~58.0.5
```

| Paket | Sebelum | Sesudah |
| --- | --- | --- |
| Expo | 58.0.23 | 58.0.24 |
| expo-constants | 58.0.15 | 58.0.16 |
| expo-linking | 58.0.16 | 58.0.17 |
| expo-router | 58.0.30 | 58.0.31 |
| expo-splash-screen | 58.0.13 | 58.0.14 |
| expo-status-bar | 58.0.4 | 58.0.5 |

Major Expo tetap 58; React dan React Native tidak diganti. Tooling Expo otomatis menambahkan config plugin `expo-status-bar` serta merapikan format app.json. Plugin tanpa opsi tidak mengubah pengaturan status bar; implementasinya diperiksa. Tidak melakukan audit fix paksa atau mengabaikan pemeriksaan kompatibilitas. Saat menghubungkan akun, EAS otomatis mencatat extra.eas.projectId serta metadata extra.router.asyncRoutes.web pada app.json.

4. Memperbarui mobile/README.md: jalur workspace, batas Tahap 01, status build, login mandiri, langkah build, cara mengunduh/memasang APK, dan cara membuka melalui Expo Go.
5. Membuat laporan ini. Tidak menambahkan credential, secret, token, atau keystore ke source/Git.

Nama Polteksibisa, ikon, splash, warna, tema, orientasi, scheme, konfigurasi web dan typedRoutes dibandingkan dengan HEAD dan tetap sama. Hash Git kedua aset logo/ikon serta src/constants/theme.ts sama dengan HEAD. Source UI dan design tidak diubah. Pemeriksaan TypeScript awal maupun akhir lulus; masalah import safe-area.css tidak muncul, sehingga tidak menambahkan deklarasi atau mengubah CSS tanpa kebutuhan.

## Pemeriksaan yang benar-benar dijalankan

| Perintah/pemeriksaan | Hasil |
| --- | --- |
| Get-Location dan git status awal | D:\polteksibisa2, bersih |
| `npm.cmd run typecheck` | Lulus sebelum dan sesudah penyelarasan patch |
| `npm.cmd run lint` | Lulus sebelum dan sesudah penyelarasan patch, tanpa error/warning lint |
| `npm.cmd run check:contrast` | Lulus 13 pasangan warna sebelum dan sesudah |
| `npx.cmd expo install --check` | Awal gagal karena enam patch; akhir lulus, Dependencies are up to date |
| `npx.cmd --yes expo-doctor@latest` | Awal 19/20; akhir lulus 20/20, No issues detected |
| Penyelarasan enam patch lewat expo install | Selesai exit code 0; package.json dan package-lock.json diperbarui |
| `npx.cmd eas-cli@latest whoami` | Awal Not logged in (exit 1); pemeriksaan ulang berhasil sebagai zeinn (exit 0). EAS CLI 27.7.2 melalui npx, tanpa instalasi global |
| `npx.cmd expo export --platform android --output-dir dist/android` | Lulus, 1.246 modul; bundel Hermes Android sekitar 2,6 MB dan 27 aset |
| Perbandingan konfigurasi branding/aset dengan Git dan JSON profile APK | Lulus; hanya profile preview, APK internal, Expo 58.0.24 |
| `git diff --check` | Lulus; hanya pemberitahuan konversi LF/CRLF Windows |
| `npx.cmd eas-cli@latest build --platform android --profile preview` | Lulus, exit code 0; cloud build FINISHED dan artefak APK tersedia |
| `npx.cmd eas-cli@latest build:view 19107637-cb41-4fa6-803c-5fe358fd1c82 --json` | Status akhir FINISHED, profile preview, URL APK tersedia |
| HTTP HEAD dan GET Range artefak APK | Lulus 200/206, ukuran 97609031 byte, signature ZIP/APK sesuai |

Ekspor berada di `mobile/dist/android` yang diabaikan Git. Proses Metro ekspor selesai. Warning NO_COLOR/FORCE_COLOR tidak menggagalkan ekspor. Instalasi melaporkan 8 temuan moderate; ini keluaran npm saat pemasangan, bukan hasil perintah audit terpisah. Tidak menjalankan `npm audit fix --force`.

Tes UI browser yang tercatat dalam VERIFICATION.md/UPGRADE-SDK58.md merupakan riwayat; **tidak dijalankan ulang pada pekerjaan ini**. Belum menguji APK, safe area, tombol kembali, splash, maupun ikon launcher pada perangkat fisik. Expo Go tidak dibuka ulang pada pekerjaan ini.

Terminal sandbox gagal memulai proses dengan `CryptUnprotectData failed: 2148073483`; pemeriksaan dan perubahan akhirnya berhasil melalui eksekusi yang disetujui di luar sandbox. Alat apply_patch juga menolak jalur workspace (path contains a reparse point); penulisan konfigurasi/dokumentasi memakai terminal dengan pengecekan berkas tujuan. Tidak ada penolakan persetujuan otomatis yang menyisakan pekerjaan lokal terhambat.

## Login dan proses cloud build

Login awal menjadi blocker; pengguna menanganinya sendiri. Login sudah berhasil diverifikasi. Perintah login untuk referensi sesi berikutnya:

```powershell
Set-Location 'D:\polteksibisa2\mobile'
npx.cmd eas-cli@latest login
```

Masukkan kredensial hanya pada terminal/alur resmi Expo. Jangan mengirim username, password, OTP, atau token lewat chat. Setelah login, agen sudah memeriksa ulang `npx.cmd eas-cli@latest whoami` dan menjalankan:

```powershell
npx.cmd eas-cli@latest build --platform android --profile preview
```

Cloud build membutuhkan akun Expo. Menurut [panduan resmi Expo](https://docs.expo.dev/build/setup/), akun pada Free plan dapat memakai layanan build. Jika kuota gratis habis atau ada kewajiban mengaktifkan layanan berbayar, hentikan dan laporkan hambatannya. Tidak mengaktifkan billing atau membeli paket.

Pada build pertama, EAS dapat meminta membuat/menghubungkan proyek pada akun yang login; project ID yang diberikan server dapat ditambahkan pada app.json. Gunakan keystore yang dikelola Expo di server untuk penandatanganan pratinjau; jangan memasukkan credential ke repository. Build ini sudah selesai dengan status FINISHED, dan tautan APK beserta pemeriksaan HTTP dicatat di atas. Untuk build berikutnya, tetap tunggu status selesai serta artefak tersedia sebelum menyatakan berhasil.

## Pengunduhan dan pemasangan APK

APK sudah tersedia melalui tautan pada bagian Artefak APK terverifikasi. Cara memasang:

1. Buka tautan artefak dari hasil EAS atau halaman build pada browser Android, lalu unduh berkas `.apk`.
2. Buka berkas di Unduhan/Downloads. Jika diminta, masuk ke Setelan dari dialog pemasangan dan aktifkan **Izinkan dari sumber ini** untuk browser/Files yang membuka APK. Letak menu dapat berbeda: **Aplikasi > Akses aplikasi khusus > Instal aplikasi tidak dikenal**.
3. Kembali ke APK, ketuk **Instal**, tunggu selesai, lalu **Buka**. Izin sumber dapat dinonaktifkan lagi setelah pemasangan. Ikuti pemeriksaan Android yang muncul; jangan menonaktifkan perlindungan perangkat secara menyeluruh.
4. Profile ini ditujukan menghasilkan APK mandiri dengan bundel lokal; pembukaan tanpa Metro/Expo Go baru dibuktikan setelah diuji pada HP. [Panduan resmi APK Expo](https://docs.expo.dev/build-reference/apk/), [bantuan instalasi Android](https://support.google.com/android/answer/9457058?hl=id).

Jika Android menampilkan pembatasan khusus developer tidak terverifikasi, izin sumber di atas mungkin belum cukup. Ikuti [panduan resmi Android](https://support.google.com/android/answer/17588095?hl=id); alur tersebut dapat memerlukan waktu tunggu 24 jam. Hal ini bergantung pada perangkat dan kebijakan Android yang diterapkan.

## Fitur yang dapat dicoba dan batas pratinjau

APK ini hanya **APK pratinjau Tahap 01**, dengan perilaku dari source Beranda yang ada:

- Gulir Beranda; buka detail pengumuman dan agenda dummy, lalu tutup dialog melalui X, Kembali ke Beranda, area luar, atau tombol kembali Android.
- Tekan SIhadir, SIMASET, SIGAP, dan SIPAS: semuanya tetap **Belum tersedia**.
- Tab Beranda menggulir ke atas; Informasi/Lihat semua menjelaskan daftar belum dibuat; Akun menjelaskan belum ada halaman akun/sesi; Notifikasi/lonceng menjelaskan fitur belum tersedia.
- Coba orientasi tegak/mendatar, font Android besar, safe area, ikon, splash, dan tombol kembali pada HP. Belum ada klaim hasil pengujian fisik.

**Data masih dummy. Belum ada login sebenarnya, backend/database, OTP/email, atau halaman admin.** Tidak ada pengiriman data kampus, lampiran PDF, registrasi, pemulihan akun, pengelolaan konten, atau operasi empat layanan mendatang. Dashboard bukan aplikasi operasional penuh.

## Menjalankan ulang melalui Expo Go

```powershell
Set-Location 'D:\polteksibisa2\mobile'
# Hanya bila dependensi belum ada pada salinan baru:
# npm.cmd ci
npm.cmd start -- --clear
```

Hubungkan laptop dan HP ke Wi-Fi/hotspot yang sama, buka Expo Go Android yang mendukung SDK 58, lalu pindai QR baru. Biarkan Metro berjalan. Gunakan URL exp:// dari terminal jika memasukkan alamat manual. Hentikan dengan Ctrl+C. Panduan jaringan lanjutan ada di mobile/README.md.
