import { expect, test } from '@playwright/test';

test('semua tombol membuka pesan/detail yang sesuai dan dialog dapat ditutup', async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/');
  await expect(page.getByText('Selamat datang,', { exact: false })).toBeVisible();
  await expect(page.getByRole('img', { name: 'Logo Politeknik Semen Indonesia' })).toBeVisible();

  for (const [index, name] of ['SIhadir', 'SIMASET', 'SIGAP', 'SIPAS'].entries()) {
    await page.getByRole('button', { name: new RegExp('^' + name + ',') }).click();
    const dialog = page.getByTestId('preview-dialog');
    await expect(dialog.getByRole('heading', { name: 'Belum tersedia', exact: true })).toBeVisible();
    await expect(dialog).toContainText('Modul ' + name);
    if (index === 0) await page.getByRole('button', { name: 'Tutup dialog', exact: true }).click();
    else if (index === 1) await page.getByRole('button', { name: 'Kembali ke Beranda', exact: true }).click();
    else if (index === 2) await page.keyboard.press('Escape');
    else await page.mouse.click(5, 5);
    await expect(dialog).not.toBeVisible();
  }

  for (const title of ['Pengumuman Layanan Akademik', 'Agenda Kegiatan Kampus']) {
    await page.getByRole('button', { name: 'Buka ' + title, exact: true }).click();
    await expect(page.getByTestId('preview-dialog').getByRole('heading', { name: title, exact: true })).toBeVisible();
    await expect(page.getByText('Contoh informasi · Data dummy', { exact: true })).toBeVisible();
    if (title.startsWith('Agenda')) await expect(page.getByText('Aula kampus (contoh lokasi)', { exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Kembali ke Beranda', exact: true }).click();
  }

  await page.getByRole('button', { name: /^Lihat semua informasi/ }).click();
  await expect(page.getByRole('heading', { name: 'Daftar informasi belum dibuat' })).toBeVisible();
  await page.keyboard.press('Escape');

  for (const [label, title] of [
    ['Informasi', 'Daftar informasi belum dibuat'],
    ['Notifikasi', 'Notifikasi belum tersedia'],
    ['Akun', 'Halaman akun belum dibuat'],
  ]) {
    await page.getByRole('tab', { name: new RegExp('^' + label + ',') }).click();
    await expect(page.getByRole('heading', { name: title, exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Tutup dialog', exact: true }).click();
  }

  await page.getByRole('tab', { name: 'Beranda', exact: true }).click();
  await expect.poll(() => page.getByTestId('home-scroll').evaluate((element) => element.scrollTop)).toBe(0);
  await expect(page.getByRole('button', { name: 'Notifikasi, belum tersedia', exact: true })).toBeInViewport();
  await page.getByRole('button', { name: 'Notifikasi, belum tersedia', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Notifikasi belum tersedia' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByTestId('preview-dialog')).not.toBeVisible();

  if (testInfo.project.name === 'phone-390') {
    await page.screenshot({ path: 'verification/beranda-390.png' });
    await page.getByRole('button', { name: 'Buka Agenda Kegiatan Kampus', exact: true }).scrollIntoViewIfNeeded();
    await page.screenshot({ path: 'verification/informasi-390.png' });
  }
  expect(errors).toEqual([]);
});

test('layout tidak meluber dan target sentuh dapat dijangkau', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('tab', { name: 'Beranda', exact: true })).toBeVisible();
  const viewport = page.viewportSize()!;
  const app = page.getByTestId('home-app');
  const controls = app.getByRole('button').or(app.getByRole('tab'));
  for (const control of await controls.all()) {
    const box = await control.boundingBox();
    expect(box, (await control.getAttribute('aria-label')) ?? 'Kontrol tanpa label').not.toBeNull();
    expect(box!.width).toBeGreaterThanOrEqual(44);
    expect(box!.height).toBeGreaterThanOrEqual(44);
    expect(box!.x).toBeGreaterThanOrEqual(-1);
    expect(box!.x + box!.width).toBeLessThanOrEqual(viewport.width + 1);
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);
  await page.getByRole('button', { name: 'Buka Agenda Kegiatan Kampus', exact: true }).scrollIntoViewIfNeeded();
  const agendaBox = await page.getByRole('button', { name: 'Buka Agenda Kegiatan Kampus', exact: true }).boundingBox();
  const navBox = await page.getByRole('tab', { name: 'Beranda', exact: true }).boundingBox();
  expect(agendaBox!.y + agendaBox!.height).toBeLessThanOrEqual(navBox!.y + 1);
});

test('keyboard membuka dialog, fokus terlihat, dan Escape menutupnya', async ({ page }) => {
  await page.goto('/');
  const bell = page.getByRole('button', { name: 'Notifikasi, belum tersedia', exact: true });
  await bell.focus();
  await expect(bell).toBeFocused();
  await expect(bell).toHaveCSS('border-top-color', 'rgb(255, 255, 255)');
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: 'Notifikasi belum tersedia' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByTestId('preview-dialog')).not.toBeVisible();
});
