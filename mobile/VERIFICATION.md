# Hasil pemeriksaan pratinjau Beranda

Dokumen ini menyimpan hasil awal pada SDK 57. Hasil terbaru setelah upgrade ke SDK 58 dicatat di [UPGRADE-SDK58.md](./UPGRADE-SDK58.md).

Tanggal pencatatan: 9 November 2026. Pemeriksaan dijalankan pada laptop Windows, bukan pada HP pengguna.

## Lingkungan yang ditemukan

- Node.js: v24.14.0.
- npm: 11.9.0, dijalankan melalui `npm.cmd`.
- Git: 2.55.0.windows.4. Repository utama sudah ada; tidak membuat repository terpisah di `mobile`.
- Expo: 57.0.32; Expo Router: 57.0.30; React Native: 0.86.3.
- Pengujian browser memakai Microsoft Edge terpasang, satu worker Playwright. Metro dibatasi dua worker.

## Perintah dan hasil akhir

| Pemeriksaan | Hasil |
| --- | --- |
| `npm.cmd run typecheck` | PASS, tidak ada error TypeScript |
| `npm.cmd run lint` | PASS, tidak ada error atau warning lint |
| `npm.cmd run check:contrast` | PASS, 13 pasangan warna memenuhi ambang masing-masing |
| `npx.cmd expo install --check` | PASS, dependensi sesuai SDK |
| `npx.cmd --yes expo-doctor@latest` | PASS, 21/21 pemeriksaan |
| `npm.cmd run test:ui` | PASS, 15/15 tes pada lima ukuran layar |
| `npx.cmd expo export --platform android --output-dir dist/android` | PASS, bundel Hermes Android dan aset berhasil diekspor lokal |
| `npm.cmd start -- --port 8081` | PASS, Metro berjalan dalam mode Expo Go/LAN dan mencetak QR |
| Endpoint `/status`, localhost dan alamat LAN laptop | PASS, respons `packager-status:running` |
| Endpoint pembukaan Expo Go | PASS, runtime `expo`, URL `exp://…:8081` |
| Manifest Android | PASS, nama Polteksibisa, SDK 57.0.0, runtime `exposdk:57.0.0` |
| Hash SHA-256 logo | PASS, salinan dalam `mobile` identik dengan berkas asli |

Bundel Android adalah pemeriksaan kompilasi JavaScript/aset, bukan APK atau pengujian perilaku Android. Seluruh server pengujian dihentikan setelah pemeriksaan; jalankan `npm.cmd start` untuk mencoba di HP.

## Hasil interaksi browser

Semua baris berikut dijalankan pada ukuran 320×740, 390×844, 430×932, 768×1024, dan 844×390.

| Tindakan | Hasil yang diamati |
| --- | --- |
| SIhadir | PASS, dialog “Belum tersedia” menyebut SIhadir |
| SIMASET | PASS, dialog “Belum tersedia” menyebut SIMASET |
| SIGAP | PASS, dialog “Belum tersedia” menyebut SIGAP |
| SIPAS | PASS, dialog “Belum tersedia” menyebut SIPAS |
| Pengumuman Layanan Akademik | PASS, detail pengumuman dan label data dummy terlihat |
| Agenda Kegiatan Kampus | PASS, detail agenda, label dummy, dan lokasi contoh terlihat |
| X | PASS, menutup dialog |
| Kembali ke Beranda | PASS, menutup dialog |
| Area luar dialog | PASS, menutup dialog |
| Escape | PASS, menutup dialog pada browser |
| Lihat semua | PASS, membuka penjelasan daftar informasi yang belum dibuat |
| Tab Informasi | PASS, membuka penjelasan daftar informasi yang belum dibuat |
| Tab Notifikasi | PASS, menjelaskan fitur di luar Increment 1 |
| Tab Akun | PASS, menjelaskan pratinjau tanpa akun sungguhan |
| Tab Beranda | PASS, posisi gulir kembali ke nol |
| Lonceng header | PASS, membuka penjelasan notifikasi |
| Fokus keyboard lalu Enter | PASS, fokus terlihat dan dialog terbuka |
| Ukuran kontrol | PASS, target yang diperiksa minimal 44×44 piksel |
| Lebar kontrol dan halaman | PASS, tidak melewati lebar viewport pada ukuran uji |
| Baris agenda terakhir | PASS, dapat digulir ke posisi di atas navigasi bawah |
| Error browser | PASS, tidak ada `pageerror` atau log `console.error` sepanjang uji interaksi |

Bukti gambar browser: `verification/beranda-390.png` dan `verification/informasi-390.png`. Gambar ini bukan tangkapan layar Motorola.

## Gerbang pemeriksaan desain

Status di bagian ini berlaku untuk pratinjau lokal yang sudah diuji. Pemeriksaan fisik Android ditandai terpisah di bawah.

### Aturan utama

- R-02 PASS: teks buatan aplikasi tidak menggunakan em dash.
- R-03 PASS: tes lebar halaman, target sentuh, dan keterjangkauan konten lulus pada lima viewport; safe area native diterapkan dalam kode.
- R-17 PASS: tidak ada angka statistik kampus yang diklaim sebagai fakta; tanggal contoh berada pada konten dummy.
- R-18 PASS: tidak ada testimoni atau foto profil buatan.
- R-23 PASS: logo asli disalin tanpa perubahan; gelombang dan kartu berikon mengikuti instruksi eksplisit pengguna.
- R-24 PASS: empat item navigasi referensi mempunyai tindakan; item yang belum dibuat menjelaskan status melalui dialog.
- R-25 PASS: 13 kombinasi warna dihitung menggunakan rumus luminans WCAG dalam `check-contrast.mjs`.
- R-26 PASS: seluruh tombol diperiksa melalui tes interaksi yang dicatat di atas.
- R-27 PASS untuk lingkup lokal: keadaan kosong tersedia; pratinjau web menunggu hidrasi; ErrorBoundary Router tersedia. Tidak ada pengambilan data jaringan yang memerlukan simulasi loading/error API pada tahap ini.
- R-28 tidak berlaku: tidak ada FAQ.
- R-32 PASS pada browser: fokus terlihat, Enter membuka dialog, Escape menutupnya; label aksesibilitas tersedia pada kontrol.
- R-33 PASS: perubahan UI ditulis langsung melalui patch sumber, bukan skrip pengganti teks/CSS.
- R-34 tidak berlaku: hanya tema terang sesuai referensi, tanpa tombol tema.
- R-35 PASS untuk pemeriksaan lokal: aplikasi dijalankan, 15 tes interaksi/layout lulus, bundel Android berhasil; belum mengklaim hasil HP.
- R-36 PASS: tidak ada klaim keamanan, performa, atau kepatuhan yang dibuat-buat.
- R-37 PASS: arah visual berasal dari referensi Beranda pengguna; ENERGY 2 / RHYTHM 2 / MOTION 1 tercatat dalam README.
- R-38 PASS: identitas dan konten contoh diberi label dummy; menu belum dibuat mempunyai penjelasan.

### Tujuan pilihan visual

- R-01 PASS: merah-putih mengikuti identitas referensi; gelombang menjadi pengganti foto gedung yang diminta.
- R-04 PASS: ikon berhubungan dengan presensi, aset, survei, dokumen, pengumuman, dan agenda; alasan tercatat dalam README.
- R-06 PASS: font sistem menjaga keterbacaan Android dan mendekati tipografi referensi.
- R-07 tidak berlaku: tidak memakai latar grid, blueprint, atau titik-titik.
- R-08 PASS: chevron menandai pembukaan detail atau dialog, mengikuti referensi.
- R-09 PASS: badge menjelaskan kategori informasi dan status “Belum tersedia”.
- R-10 tidak berlaku: tidak memakai glassmorphism.
- R-12 PASS: bayangan ringan memisahkan kartu dari latar seperti referensi.
- R-13 tidak berlaku: tidak memakai glow.
- R-14 PASS: empat kartu layanan setara karena status dan tingkat navigasinya sama; informasi memakai susunan baris berbeda.
- R-19 PASS: gerak dibatasi pada feedback tekan, gulir ke atas, dan transisi dialog native.
- R-22 PASS: pengganti foto berupa ikon fungsi dan gelombang yang secara eksplisit diminta.

### Komposisi dan kualitas

- Dials PASS: ENERGY 2, RHYTHM 2, MOTION 1 sesuai header merah, susunan bagian yang berbeda, dan gerak terbatas.
- Fokus visual PASS: identitas kampus dan sapaan berada pada header utama.
- Spasi PASS: header, banner, layanan, dan daftar informasi mempunyai pemisahan yang jelas.
- Aksen PASS: merah digunakan untuk identitas dan tindakan utama dengan dasar putih.
- Motif PASS: gelombang header dan penanda judul bagian mengikuti referensi pengguna.
- Design Read PASS: arah Beranda Anggota merah-putih dinyatakan sebelum penulisan UI dan dicatat dalam README.
- C-1 PASS: alasan warna, font, ikon, kartu, dan susunan ditulis dalam README.
- C-2 PASS: tidak ada kontrol tanpa perilaku pada daftar yang diuji.
- C-3 PASS: bagian mengikuti kebutuhan Beranda, tanpa bagian pemasaran tambahan.
- C-4 PASS pada viewport uji: layout dan interaksi lulus pada lima ukuran; skala font native masih perlu dicoba di HP.
- C-5 PASS: tidak ada testimoni, statistik, atau klaim buatan yang disamarkan sebagai fakta.
- R-05 PASS: susunan berasal dari referensi, bukan template situs pemasaran.
- R-11 PASS: radius dibedakan untuk kartu, dialog, badge, dan tombol.
- R-15 PASS: tombol memakai tindakan spesifik seperti “Lihat semua” dan “Kembali ke Beranda”.
- R-16 PASS: tidak menambahkan jargon pemasaran pada UI.
- R-20 PASS: identitas logo kampus, warna, dan susunan Beranda pengguna dipertahankan.
- R-21 PASS: tema terang merupakan arah desain eksplisit pengguna.
- R-29 PASS: warna utama merah, putih, dan netral gelap; tint berasal dari warna tersebut.
- R-30 PASS: implementasi mengikuti gambar pengguna, tanpa meniru produk eksternal.
- R-31 PASS: keputusan visual utama mempunyai alasan yang tercatat.

## Temuan dependensi

`npm.cmd audit --json` masih melaporkan **14 temuan: 11 moderate dan 3 high**. Rantai yang dilaporkan mencakup `minimatch`/`glob` pada tooling Expo/lint dan `decode-uri-component`/`query-string` pada Expo Router.

Saran otomatis audit mencakup perubahan lintas major Expo/Router atau penurunan versi paket lain. Tidak menjalankan `npm audit fix --force` karena dapat mengubah SDK yang dipilih untuk Expo Go. Ini temuan aktual yang masih terbuka, bukan pernyataan bahwa toolchain sudah bebas kerentanan. Pemeriksaan versi dan audit perlu diulang sebelum distribusi operasional.

Beberapa proses CLI juga mencetak warning lingkungan `NO_COLOR`/`FORCE_COLOR`; ini tidak berasal dari aplikasi dan tidak menggagalkan tes. Error lint dan peringatan SVG yang ditemukan pada iterasi awal sudah diperbaiki sebelum pengujian akhir.

## Belum diverifikasi pada perangkat fisik

- Pembukaan proyek di Expo Go Motorola G67 5G milik pengguna.
- Posisi safe area nyata pada kamera/status bar dan navigasi Android.
- Tombol kembali Android saat dialog terbuka, termasuk predictive back.
- Tampilan pada pengaturan ukuran font Android yang diperbesar dan TalkBack.
- Keterhubungan HP ke laptop melalui Wi-Fi/hotspot pengguna.

Implementasi menyediakan safe-area insets, alur `Modal.onRequestClose`, serta layout yang menyesuaikan skala font. Hasil nyata di HP menunggu konfirmasi pengguna. Tidak ada APK, emulator, Android Studio, Docker, backend, autentikasi, database, atau cloud build yang dijalankan pada pekerjaan ini.
