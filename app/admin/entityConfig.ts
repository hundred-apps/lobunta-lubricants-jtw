/** Definisi field generik untuk form admin. Satu config untuk render + payload. */

export type FieldKind =
  | 'text'
  | 'textarea'
  | 'html'
  | 'number'
  | 'toggle'
  | 'select'
  | 'icon'
  | 'image'
  | 'slug'
  | 'repeater'
  | 'pair'
  | 'date'
  | 'password'
  | 'tags'
  | 'gallery'

export interface FieldOption {
  value: string
  label: string
}

export interface FieldDef {
  name: string
  label: string
  kind: FieldKind
  /** Field dua bahasa: nilai disimpan sebagai { id, en }. */
  bilingual?: boolean
  required?: boolean
  help?: string
  placeholder?: { id?: string; en?: string }
  options?: FieldOption[]
  /** Untuk field select: sumber data dari endpoint lain. */
  optionsFrom?: { resource: string; labelKey: string; valueKey: string }
  rows?: number
  min?: number
  max?: number
  step?: number
}

export interface ColumnDef {
  key: string
  label: string
  kind?: 'text' | 'image' | 'toggle' | 'status' | 'number' | 'bilingual' | 'date'
  width?: string
}

export interface EntityDef {
  /** Key route dan juga nama resource di API. */
  key: string
  label: string
  singular: string
  icon: string
  /** Ringkasan jumlah baris untuk kartu dashboard. */
  countable?: boolean
  columns: ColumnDef[]
  fields: FieldDef[]
  defaultSort?: string
  orderBy?: string
  /** Entitas tanpa form create/edit (mis. inquiry, media). */
  readOnly?: boolean
  help?: string
}

const langFields: FieldDef[] = [
  {
    name: 'title',
    label: 'Judul',
    kind: 'text',
    bilingual: true,
    required: true,
    placeholder: { id: 'Judul Bahasa Indonesia', en: 'English title' }
  },
  {
    name: 'slug',
    label: 'Slug URL',
    kind: 'slug',
    help: 'Dipakai di alamat halaman. Huruf kecil, angka, dan tanda hubung saja.'
  }
]

const orderField: FieldDef = {
  name: 'order',
  label: 'Urutan',
  kind: 'number',
  min: 0,
  step: 1,
  help: 'Angka kecil tampil lebih dulu.'
}

const featuredField: FieldDef = {
  name: 'featured',
  label: 'Tampilkan menonjol',
  kind: 'toggle'
}

const imageField = (name: string, label: string): FieldDef => ({ name, label, kind: 'image' })

export const ENTITIES: EntityDef[] = [
  {
    key: 'home-hero',
    label: 'Hero Beranda',
    singular: 'Hero',
    icon: 'target',
    countable: true,
    defaultSort: 'order',
    help: 'Hero beranda: judul, deskripsi, gambar, CTA. Hanya satu record hero.',
    columns: [
      { key: 'heading', label: 'Judul', kind: 'bilingual' },
      { key: 'order', label: 'Urutan', kind: 'number', width: 'w-24' },
      { key: 'isActive', label: 'Aktif', kind: 'toggle', width: 'w-24' }
    ],
    fields: [
      { name: 'eyebrow', label: 'Label kecil (eyebrow)', kind: 'text', bilingual: true, help: 'Teks kecil di atas judul, contoh: Distributor Resmi' },
      { name: 'heading', label: 'Judul utama', kind: 'text', bilingual: true, required: true, help: 'Judul besar hero beranda' },
      { name: 'imageUrl', label: 'Gambar hero', kind: 'image', help: 'Gambar background hero' },
      { name: 'imagePosition', label: 'Posisi gambar', kind: 'select', bilingual: true, options: [
        { value: 'left', label: 'Kiri' },
        { value: 'right', label: 'Kanan' }
      ], help: 'Posisi gambar di hero section' },
      { name: 'textPosition', label: 'Posisi teks', kind: 'select', bilingual: true, options: [
        { value: 'left', label: 'Kiri' },
        { value: 'right', label: 'Kanan' }
      ], help: 'Posisi teks di hero section' },
      { name: 'description', label: 'Deskripsi', kind: 'textarea', bilingual: true, rows: 4, help: 'Teks deskripsi di bawah judul' },
      { name: 'ctaProduct', label: 'CTA Product', kind: 'text', bilingual: true, help: 'Nama produk CTA' },
      { name: 'ctaContact', label: 'CTA Contact', kind: 'text', bilingual: true, help: 'Kontak CTA (email/telepon)' },
      orderField,
      { name: 'isActive', label: 'Tampilkan hero', kind: 'toggle', help: 'Nonaktifkan untuk menyembunyikan hero' }
    ]
  },
  {
    key: 'profile',
    label: 'Profile',
    singular: 'Profile',
    icon: 'factory',
    countable: true,
    defaultSort: 'order',
    help: 'Profil perusahaan: tentang, sejarah, gallery image.',
    columns: [
      { key: 'order', label: 'Urutan', kind: 'number', width: 'w-24' },
      { key: 'isActive', label: 'Aktif', kind: 'toggle', width: 'w-24' }
    ],
    fields: [
      { name: 'title', label: 'Judul', kind: 'text', bilingual: true, required: true },
      { name: 'history', label: 'Sejarah', kind: 'textarea', bilingual: true, rows: 5, help: 'Sejarah perusahaan' },
      { name: 'gallery', label: 'Gallery Image', kind: 'gallery', help: 'Upload gambar gallery' },
      orderField,
      { name: 'isActive', label: 'Tampilkan', kind: 'toggle', help: 'Sembunyikan di profile' }
    ]
  },
  {
    key: 'product-categories',
    label: 'Kategori Produk',
    singular: 'Kategori',
    icon: 'delivery',
    countable: true,
    defaultSort: 'order',
    columns: [
      { key: 'name', label: 'Nama', kind: 'bilingual' },
      { key: 'slug', label: 'Slug' },
      { key: 'order', label: 'Urutan', kind: 'number', width: 'w-24' }
    ],
    fields: [
      { name: 'name', label: 'Nama kategori', kind: 'text', bilingual: true, required: true },
      { name: 'slug', label: 'Slug URL', kind: 'slug', required: true },
      { name: 'description', label: 'Deskripsi', kind: 'textarea', bilingual: true, required: true, rows: 4 },
      { name: 'icon', label: 'Ikon', kind: 'icon' },
      imageField('image', 'Gambar kategori'),
      orderField
    ]
  },
  {
    key: 'products',
    label: 'Produk',
    singular: 'Produk',
    icon: 'lab',
    countable: true,
    defaultSort: 'order',
    columns: [
      { key: 'image', label: 'Gambar', kind: 'image', width: 'w-20' },
      { key: 'name', label: 'Nama produk', kind: 'bilingual' },
      { key: 'packaging', label: 'Kemasan', width: 'w-32' },
      { key: 'weight', label: 'Berat/Volume', width: 'w-36' },
      { key: 'order', label: 'Urutan', kind: 'number', width: 'w-24' },
      { key: 'status', label: 'Status', kind: 'toggle', width: 'w-28' }
    ],
    fields: [
      { name: 'name', label: 'Nama produk', kind: 'text', bilingual: true, required: true },
      { name: 'slug', label: 'Slug URL', kind: 'slug', required: true },
      { name: 'packaging', label: 'Kemasan', kind: 'text', bilingual: true, required: true, placeholder: { id: 'Contoh: Drum 200L', en: 'e.g. Drum 200L' } },
      { name: 'weight', label: 'Berat/Volume (liter/kg)', kind: 'text', bilingual: true, required: true, placeholder: { id: 'Contoh: 200 liter', en: 'e.g. 200 liters' } },
      {
        name: 'categoryId',
        label: 'Kategori',
        kind: 'select',
        required: true,
        optionsFrom: { resource: 'product-categories', labelKey: 'name', valueKey: 'id' }
      },
      { name: 'spec', label: 'Spesifikasi teknis', kind: 'pair', bilingual: true, help: 'Baris label dan nilai, misalnya Viskositas / ISO VG 68' },
      imageField('image', 'Foto produk'),
      { name: 'tdsFile', label: 'File TDS (Technical Data Sheet)', kind: 'image', help: 'Upload file PDF TDS' },
      { name: 'msdsFile', label: 'File MSDS (Material Safety Data Sheet)', kind: 'image', help: 'Upload file PDF MSDS' },
      { name: 'status', label: 'Status', kind: 'toggle', help: 'Aktifkan untuk menampilkan produk di katalog' },
      orderField
    ]
  },
  {
    key: 'customers',
    label: 'Customer',
    singular: 'Customer',
    icon: 'factory',
    countable: true,
    defaultSort: 'order',
    columns: [
      { key: 'image', label: 'Gambar', kind: 'image', width: 'w-20' },
      { key: 'order', label: 'Urutan', kind: 'number', width: 'w-24' }
    ],
    fields: [
      { name: 'name', label: 'Nama perusahaan', kind: 'text', required: true },
      imageField('image', 'Logo (SVG atau PNG transparan)'),
      orderField
    ]
  },
  {
    key: 'blog',
    label: 'Artikel Blog',
    singular: 'Artikel',
    icon: 'document',
    countable: true,
    defaultSort: 'publishedAt',
    columns: [
      { key: 'cover', label: 'Cover', kind: 'image', width: 'w-20' },
      { key: 'title', label: 'Judul', kind: 'bilingual' },
      { key: 'publishedAt', label: 'Terbit', kind: 'date', width: 'w-40' },
      { key: 'status', label: 'Status', kind: 'toggle', width: 'w-28' }
    ],
    fields: [
      { name: 'title', label: 'Judul artikel', kind: 'text', bilingual: true, required: true },
      { name: 'slug', label: 'Slug URL', kind: 'slug', required: true },
      { name: 'excerpt', label: 'Ringkasan', kind: 'textarea', bilingual: true, required: true, rows: 3, help: 'Tampil di kartu daftar artikel' },
      { name: 'body', label: 'Isi artikel (HTML)', kind: 'html', bilingual: true, rows: 16 },
      imageField('cover', 'Gambar cover'),
      { name: 'metaTitle', label: 'Meta title', kind: 'text', bilingual: true, help: 'Judul di hasil pencarian' },
      { name: 'metaDescription', label: 'Meta description', kind: 'textarea', bilingual: true, rows: 3, help: 'Deskripsi meta untuk SEO' },
      { name: 'publishedAt', label: 'Tanggal terbit', kind: 'date' },
      { name: 'status', label: 'Status', kind: 'toggle', help: 'Aktifkan untuk memublikasikan artikel' }
    ]
  },
  {
    key: 'promotions',
    label: 'Promo Program',
    singular: 'Promo',
    icon: 'target',
    countable: true,
    defaultSort: 'order',
    columns: [
      { key: 'title', label: 'Judul', kind: 'bilingual' },
      { key: 'period', label: 'Periode', kind: 'bilingual', width: 'w-40' },
      { key: 'isActive', label: 'Aktif', kind: 'toggle', width: 'w-24' },
      { key: 'order', label: 'Urutan', kind: 'number', width: 'w-24' }
    ],
    fields: [
      { name: 'title', label: 'Judul promo', kind: 'text', bilingual: true, required: true },
      { name: 'slug', label: 'Slug URL', kind: 'slug', required: true },
      { name: 'description', label: 'Deskripsi', kind: 'textarea', bilingual: true, rows: 4, help: 'Deskripsi promo' },
      { name: 'products', label: 'Produk didalam', kind: 'tags', help: 'Pisahkan dengan koma, misalnya: "Mineral Oil, Grease"' },
      { name: 'period', label: 'Periode', kind: 'text', bilingual: true, placeholder: { id: '1 Jan - 31 Mar 2026', en: 'Jan 1 - Mar 31 2026' } },
      { name: 'isActive', label: 'Promo aktif', kind: 'toggle' },
      orderField
    ]
  },
  {
    key: 'careers',
    label: 'Lowongan',
    singular: 'Lowongan',
    icon: 'academy',
    countable: true,
    defaultSort: 'postedAt',
    columns: [
      { key: 'title', label: 'Posisi', kind: 'bilingual' },
      { key: 'location', label: 'Lokasi', kind: 'bilingual', width: 'w-44' },
      { key: 'employmentType', label: 'Tipe', kind: 'bilingual', width: 'w-32' },
      { key: 'isOpen', label: 'Dibuka', kind: 'toggle', width: 'w-24' }
    ],
    fields: [
      { name: 'title', label: 'Posisi', kind: 'text', bilingual: true, required: true },
      { name: 'slug', label: 'Slug URL', kind: 'slug', required: true },
      { name: 'location', label: 'Lokasi', kind: 'text', bilingual: true, required: true },
      { name: 'employmentType', label: 'Tipe kerja', kind: 'text', bilingual: true, required: true, placeholder: { id: 'Full Time', en: 'Full Time' } },
      { name: 'description', label: 'Deskripsi (HTML)', kind: 'html', bilingual: true, rows: 8 },
      { name: 'requirements', label: 'Kualifikasi', kind: 'repeater', bilingual: true, help: 'Satu baris satu syarat' },
      { name: 'isOpen', label: 'Lowongan dibuka', kind: 'toggle' },
      { name: 'postedAt', label: 'Tanggal posting', kind: 'date' }
    ]
  },
  {
    key: 'admin-users',
    label: 'User Admin',
    singular: 'User Admin',
    icon: 'engineer',
    defaultSort: 'name',
    help: 'User yang bisa login ke panel ini.',
    columns: [
      { key: 'name', label: 'Nama' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Telepon', width: 'w-40' },
      { key: 'role', label: 'Peran', kind: 'status', width: 'w-32' }
    ],
    fields: [
      { name: 'name', label: 'Nama', kind: 'text', required: true },
      { name: 'email', label: 'Email', kind: 'text', required: true },
      { name: 'phone', label: 'Nomor telepon', kind: 'text', required: true, help: 'Format: 08xxxxxxxxxx atau 628xxxxxxxxxx' },
      { name: 'password', label: 'Password', kind: 'password', help: 'Kosongkan saat mengubah user yang sudah ada.' },
      { name: 'role', label: 'Peran', kind: 'select', options: [
        { value: 'superadmin', label: 'Superadmin' },
        { value: 'editor', label: 'Editor' }
      ] }
    ]
  },
  {
    key: 'settings',
    label: 'Pengaturan',
    singular: 'Pengaturan',
    icon: 'gear',
    countable: false,
    readOnly: true,
    help: 'Pengaturan tampilan menu dan konfigurasi umum.',
    columns: [
      { key: 'key', label: 'Key', width: 'w-40' },
      { key: 'value', label: 'Value', width: 'w-60' }
    ],
    fields: [
      { name: 'key', label: 'Key pengaturan', kind: 'text', required: true },
      { name: 'value', label: 'Value', kind: 'textarea', help: 'Nilai pengaturan (JSON untuk menuVisibility)' }
    ]
  }
]

export function findEntity(key: string): EntityDef | null {
  return ENTITIES.find((item) => item.key === key) ?? null
}

export const ICON_CHOICES = [
  'shield', 'truck', 'academy', 'target', 'engineer', 'lab', 'delivery', 'gear',
  'bearing', 'piston', 'factory', 'gas', 'heat', 'compressor', 'grease',
  'document', 'mail', 'phone', 'clock', 'check', 'map-pin', 'download', 'arrow-right'
]