import type { IconName } from '@/components/Icon';

// Seluruh identitas dan informasi di beranda ini adalah contoh, bukan data kampus.
export const member = { name: 'Zein', identity: 'Mahasiswa', program: 'Teknologi Informasi' };
export const campus = { appName: 'Polteksibisa', name: 'Politeknik Semen Indonesia' };

export type CampusService = { id: string; name: string; description: string; icon: IconName };

export const services: CampusService[] = [
  { id: 'sihadir', name: 'SIhadir', description: 'Presensi', icon: 'attendance' },
  { id: 'simaset', name: 'SIMASET', description: 'Layanan aset', icon: 'assets' },
  { id: 'sigap', name: 'SIGAP', description: 'Survei kampus', icon: 'chart' },
  { id: 'sipas', name: 'SIPAS', description: 'Pengajuan surat', icon: 'document' },
];

export type CampusInformation = {
  id: string;
  category: 'Pengumuman' | 'Agenda Kegiatan';
  title: string;
  summary: string;
  dateLabel: string;
  icon: IconName;
  paragraphs: string[];
  event?: { time: string; location: string };
};

export const information: CampusInformation[] = [
  {
    id: 'layanan-akademik', category: 'Pengumuman', title: 'Pengumuman Layanan Akademik',
    summary: 'Informasi terbaru terkait layanan akademik di lingkungan PSI.',
    dateLabel: '9 Nov 2026', icon: 'announcement',
    paragraphs: [
      'Ini adalah contoh pengumuman untuk pratinjau Polteksibisa. Informasi ini bukan pengumuman resmi kampus.',
      'Mahasiswa dapat membaca informasi layanan akademik melalui modul Informasi Kampus. Konten sebenarnya akan dikelola setelah backend tersedia.',
      'Pada pratinjau ini belum ada lampiran PDF atau pengiriman data ke server.',
    ],
  },
  {
    id: 'agenda-kampus', category: 'Agenda Kegiatan', title: 'Agenda Kegiatan Kampus',
    summary: 'Jadwal kegiatan kampus bulan November 2026.', dateLabel: '7 Nov 2026', icon: 'calendar',
    paragraphs: [
      'Ini adalah contoh agenda untuk memperlihatkan tampilan detail kegiatan. Waktu dan lokasi berikut merupakan data dummy.',
      'Agenda berisi informasi kegiatan. Pendaftaran, tiket, serta presensi kegiatan belum tersedia.',
    ],
    event: { time: '20 November 2026, 09.00–11.00 WIB (contoh)', location: 'Aula kampus (contoh lokasi)' },
  },
];

export type NavigationId = 'home' | 'information' | 'notifications' | 'account';
export const navigation: { id: NavigationId; label: string; icon: IconName }[] = [
  { id: 'home', label: 'Beranda', icon: 'home' },
  { id: 'information', label: 'Informasi', icon: 'information' },
  { id: 'notifications', label: 'Notifikasi', icon: 'bell' },
  { id: 'account', label: 'Akun', icon: 'person' },
];

export const previewMessages = {
  information: {
    title: 'Daftar informasi belum dibuat',
    description: 'Pratinjau ini baru mencakup Beranda. Anda dapat menekan kartu Informasi Terbaru untuk membuka contoh detail pengumuman dan agenda.',
  },
  notifications: {
    title: 'Notifikasi belum tersedia',
    description: 'Menu ini mengikuti referensi desain. Fitur notifikasi tidak termasuk Increment 1 dan belum diaktifkan.',
  },
  account: {
    title: 'Halaman akun belum dibuat',
    description: 'Anda sedang melihat pratinjau dengan identitas dummy. Belum ada sesi login, penyimpanan akun, atau perubahan profil.',
  },
};
