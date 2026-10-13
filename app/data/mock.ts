import type {
  CareerItem,
  CustomerItem,
  HomeContent,
  Milestone,
  PageContent,
  PostItem,
  ProductCategory,
  ProductItem,
  ServiceItem,
  SiteSettings,
  TestimonialItem
} from '~/types/content'

/**
 * Local fallback content.
 *
 * Frontend berjalan penuh tanpa backend. Saat Express API sudah siap, isi
 * NUXT_PUBLIC_API_BASE dan semua resource diambil dari API; file ini hanya
 * dipakai sebagai fallback ketika request gagal atau backend belum aktif.
 *
 * Sumber: Company Profile "Compro LKR Lubricants 2026.pdf" + halaman lama
 * lobuntalubricants.com (EN/ID). Semua string di sini adalah konten awal —
 * setelah CMS aktif, nilai diambil dari database, bukan dari file ini.
 */

export const mockSettings: SiteSettings = {
  companyName: { id: 'Lobunta Lubricants', en: 'Lobunta Lubricants' },
  legalName: 'PT. Lobunta Kencana Raya',
  tagline: {
    id: 'Distributor Resmi Oli dan Pelumas Pertamina',
    en: 'Official Distributor of Pertamina Oil and Lubricants'
  },
  description: {
    id: 'Distributor resmi pelumas Pertamina sejak 1991 dengan Nomor Agen C 705106. Kami menyediakan produk orisinal, stok siap kirim, harga kompetitif, pengiriman tepat waktu, dan dukungan teknis untuk berbagai kebutuhan industri di seluruh Indonesia.',
    en: 'Official Pertamina Lubricants distributor since 1991 under Agency No. C 705106. We supply genuine products with ready stock, competitive pricing, timely delivery, and technical support for industrial needs across Indonesia.'
  },
  agencyNumber: 'C 705106',
  foundedYear: '1973',
  address: {
    id: 'Jl. Raya Jatiwaringin No. 26, Pondok Gede, Bekasi 17411, Jawa Barat, Indonesia',
    en: 'Jl. Raya Jatiwaringin No. 26, Pondok Gede, Bekasi 17411, West Java, Indonesia'
  },
  phone: ['021-8480520', '021-84994214'],
  whatsapp: '6285282400976',
  email: 'info@lobuntalubricants.com',
  officeHours: {
    id: 'Senin - Jumat, 08.00 - 17.00 WIB',
    en: 'Monday - Friday, 08.00 - 17.00 WIB'
  },
  logo: '/img/logo.svg',
  image: '/img/profile-hero.svg',
  companyProfile: '',
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
    youtube: ''
  }
}

export const mockMilestones: Milestone[] = [
  {
    id: 1,
    year: '1973',
    order: 1,
    title: { id: 'CV. Lobunta Kencana Raya', en: 'CV. Lobunta Kencana Raya' },
    description: {
      id: 'CV. Lobunta Kencana Raya didirikan pada 27 Januari 1973.',
      en: 'CV. Lobunta Kencana Raya was established on 27 January 1973.'
    }
  },
  {
    id: 2,
    year: '1977',
    order: 2,
    title: { id: 'PT. Lobunta Kencana Raya', en: 'PT. Lobunta Kencana Raya' },
    description: {
      id: 'Bentuk badan hukum berubah menjadi Perseroan Terbatas pada 30 September 1977.',
      en: 'The entity was converted to a limited liability company on 30 September 1977.'
    }
  },
  {
    id: 3,
    year: '1991',
    order: 3,
    title: {
      id: 'Distributor Resmi Pertamina Lubricants',
      en: 'Official Pertamina Lubricants Distributor'
    },
    description: {
      id: 'Menjadi distributor resmi pelumas Pertamina dengan Nomor Agen C 705106.',
      en: 'Appointed as an official Pertamina Lubricants distributor under Agency No. C 705106.'
    }
  }
]

export const mockServices: ServiceItem[] = [
  {
    id: 1,
    slug: 'quality-assurance',
    icon: 'shield',
    order: 1,
    featured: true,
    image: '/img/service-quality.svg',
    title: { id: 'Jaminan Mutu', en: 'Quality Assurance' },
    excerpt: {
      id: 'Pelumas yang kami pasok kualitas dan kuantitasnya dijamin orisinal dari Pertamina, karena Lobunta Lubricants adalah Distributor Resmi Pertamina Lubricants dengan nomor agency.',
      en: 'The lubricants we market are guaranteed in quality and quantity to be genuine Pertamina products, because Lobunta Lubricants is an Authorized Distributor of Pertamina Lubricants with an agency number.'
    },
    body: {
      id: '<p>Setiap produk yang keluar dari gudang kami berasal dari rantai distribusi resmi Pertamina. Kami adalah Distributor Resmi Pertamina Lubricants dengan Nomor Agen C 705106, sehingga keaslian produk dapat ditelusuri sampai ke sumbernya.</p><p>Komitmen kami: produk orisinal dengan kualitas terjamin dari Pertamina, kesesuaian spesifikasi, serta respons cepat terhadap permintaan pengecekan.</p>',
      en: '<p>Every product leaving our warehouse comes through the official Pertamina distribution chain. We are an Authorized Distributor of Pertamina Lubricants under Agency No. C 705106, so product authenticity can be traced back to its source.</p><p>Our commitments: genuine products with quality guaranteed by Pertamina, specification conformity, and a fast response to verification requests.</p>'
    },
    highlights: {
      id: [
        { id: 'Nomor Agen C 705106', en: 'Agency No. C 705106' },
        { id: 'Produk orisinal Pertamina', en: 'Genuine Pertamina products' },
        { id: 'Kesesuaian spesifikasi produk', en: 'Product specification conformity' }
      ],
      en: [
        { id: 'Agency No. C 705106', en: 'Agency No. C 705106' },
        { id: 'Genuine Pertamina products', en: 'Genuine Pertamina products' },
        { id: 'Product specification conformity', en: 'Product specification conformity' }
      ]
    }
  },
  {
    id: 2,
    slug: 'supply-assurance',
    icon: 'truck',
    order: 2,
    featured: true,
    image: '/img/service-supply.svg',
    title: { id: 'Jaminan Pasok', en: 'Supply Assurance' },
    excerpt: {
      id: 'Kami memahami pentingnya jaminan pasok yang andel dan konsisten bagi bisnis Anda. Sebagai distributor resmi, kami menjamin pasokan berkelanjutan darielters LOBP Pertamina.',
      en: 'We understand how important a reliable and consistent supply guarantee is for your business. As an official distributor, we guarantee continuous supply from Pertamina LOBP plants.'
    },
    body: {
      id: '<p>Pertamina memiliki 4 lokasi LOBP: Jakarta, Cilacap, Surabaya, dan Gresik. Sebagai distributor resmi Pertamina Lubricants, kami menjamin pasokan berkelanjutan sebagai bagian dari komitmen layanan kami.</p><p>Stok siap kirim untuk item populer, inventory terpantau, dan jadwal pengiriman yang disepakati bersama.</p>',
      en: '<p>Pertamina has 4 LOBP locations: Jakarta, Cilacap, Surabaya, and Gresik. As an official Pertamina Lubricants distributor, we guarantee continuous supply as part of our service commitment.</p><p>Ready stock for popular items, monitored inventory, and delivery schedules agreed in advance.</p>'
    },
    highlights: {
      id: [
        { id: '4 lokasi LOBP Pertamina: Jakarta, Cilacap, Surabaya, Gresik', en: '4 Pertamina LOBP locations: Jakarta, Cilacap, Surabaya, Gresik' },
        { id: 'Stok siap kirim', en: 'Ready stock' },
        { id: 'Pasokan berkelanjutan', en: 'Continuous supply' }
      ],
      en: [
        { id: '4 Pertamina LOBP locations: Jakarta, Cilacap, Surabaya, Gresik', en: '4 Pertamina LOBP locations: Jakarta, Cilacap, Surabaya, Gresik' },
        { id: 'Ready stock', en: 'Ready stock' },
        { id: 'Continuous supply', en: 'Continuous supply' }
      ]
    }
  },
  {
    id: 3,
    slug: 'training',
    icon: 'academy',
    order: 3,
    featured: true,
    image: '/img/service-training.svg',
    title: { id: 'Pelatihan Pelumas & Pelubrikasi', en: 'Lubricant & Lubrication Training' },
    excerpt: {
      id: 'Kami tidak hanya menyediakan produk pelumas berkualitas, tetapi juga pelatihan profesional menyeluruh yang disesuaikan dengan kebutuhan pelanggan.',
      en: 'We not only provide quality lubricant products, but also offer comprehensive professional training tailored to customer needs.'
    },
    body: {
      id: '<p>Lobunta Lubricants menyediakan Fundamental Product Training yang dapat disesuaikan dengan kebutuhan industri pelanggan. Materi mencakup pengenalan jenis pelumas, properties, aplikasi, serta praktik pemilihan pelumas yang tepat.</p>',
      en: '<p>Lobunta Lubricants provides Fundamental Product Training tailored to customer industry needs. Topics cover lubricant types, properties, applications, and hands-on practice for selecting the right lubricant.</p>'
    },
    highlights: {
      id: [
        { id: 'Fundamental Product Training', en: 'Fundamental Product Training' },
        { id: 'Materi disesuaikan kebutuhan pelanggan', en: 'Material tailored to customer needs' },
        { id: 'Praktik pemilihan pelumas', en: 'Hands-on lubricant selection practice' }
      ],
      en: [
        { id: 'Fundamental Product Training', en: 'Fundamental Product Training' },
        { id: 'Material tailored to customer needs', en: 'Material tailored to customer needs' },
        { id: 'Hands-on lubricant selection practice', en: 'Hands-on lubricant selection practice' }
      ]
    }
  },
  {
    id: 4,
    slug: 'lubricant-recommendation',
    icon: 'target',
    order: 4,
    featured: true,
    image: '/img/service-recommendation.svg',
    title: { id: 'Rekomendasi Pelumas', en: 'Lubricant Recommendation' },
    excerpt: {
      id: 'Kami siap memberikan informasi teknis dan layanan untuk memilih pelumas yang tepat untuk mesin serta peralatan industri Anda.',
      en: 'We are ready to provide customers with technical information and services to select the right lubricants for industrial machinery and equipment.'
    },
    body: {
      id: '<p>Pemilihan pelumas yang tepat menentukan umur mesin, efisiensi energi, dan biaya pemeliharaan. Tim teknis kami membantu memetakan kebutuhan pelumas berdasarkan tipe mesin, kondisi operasi, dan standar industri.</p><p>Rekomendasi diberikan dalam bentuk spesifikasi, grade, jumlah, dan harga yang sesuai ketentuan procurement perusahaan Anda.</p>',
      en: '<p>Choosing the right lubricant determines machine life, energy efficiency, and maintenance cost. Our technical team maps lubricant needs based on machine type, operating conditions, and industry standards.</p><p>Recommendations are delivered as specifications, grades, and quantities that fit your procurement requirements.</p>'
    },
    highlights: {
      id: [
        { id: 'Analisis tipe mesin dan kondisi operasi', en: 'Machine type and operating condition analysis' },
        { id: 'Rekomendasi grade dan spesifikasi', en: 'Grade and specification recommendation' },
        { id: 'Dukungan sesuai standar industri', en: 'Support aligned with industry standards' }
      ],
      en: [
        { id: 'Machine type and operating condition analysis', en: 'Machine type and operating condition analysis' },
        { id: 'Grade and specification recommendation', en: 'Grade and specification recommendation' },
        { id: 'Support aligned with industry standards', en: 'Support aligned with industry standards' }
      ]
    }
  },
  {
    id: 5,
    slug: 'technical-services',
    icon: 'engineer',
    order: 5,
    featured: true,
    image: '/img/service-technical.svg',
    title: { id: 'Layanan Teknis', en: 'Technical Services' },
    excerpt: {
      id: 'Insinyur dan Tim Dukungan Teknis kami yang andal selalu siap memberikan dukungan.',
      en: 'Our reliable engineers and Technical Support Team are always ready to provide support.'
    },
    body: {
      id: '<p>Tim teknisi dan insinyur kami menangani troubleshooting masalah pelumas di lapangan, termasuk Pleasing Pleasing dan pengujian performance mesin. Kami datang ke lokasi pelanggan untuk mendiagnosis, mengambil sampel, dan merekomendasikan tindakan perbaikan.</p>',
      en: '<p>Our engineers and technicians handle on-site lubricant troubleshooting, including oil analysis interpretation and machine performance checks. We visit customer sites to diagnose issues, take samples, and recommend corrective action.</p>'
    },
    highlights: {
      id: [
        { id: 'Kunjungan teknisi ke lokasi pelanggan', en: 'Technician visits to customer sites' },
        { id: 'Diagnosis masalah pelumas', en: 'Lubricant problem diagnosis' },
        { id: 'Tindakan perbaikan yang direkomendasikan', en: 'Recommended corrective action' }
      ],
      en: [
        { id: 'Technician visits to customer sites', en: 'Technician visits to customer sites' },
        { id: 'Lubricant problem diagnosis', en: 'Lubricant problem diagnosis' },
        { id: 'Recommended corrective action', en: 'Recommended corrective action' }
      ]
    }
  },
  {
    id: 6,
    slug: 'oil-monitoring',
    icon: 'lab',
    order: 6,
    featured: true,
    image: '/img/service-oil-monitoring.svg',
    title: { id: 'Oil Monitoring', en: 'Oil Monitoring' },
    excerpt: {
      id: 'Oil Clinic adalah laboratorium milik Pertamina Lubricants untuk pengujian pelumas.',
      en: 'Oil Clinic is a laboratory owned by Pertamina Lubricants for lubricant testing.'
    },
    body: {
      id: '<p>Oil Clinic adalah laboratorium yang dimiliki Pertamina Lubricants untuk pengujian pelumas. Melalui program ini, kondisi oli dapat dipantau secara berkala sehingga kerusakan mesin dapat dicegah lebih awal.</p><p>Pemantauan meliputi analisis viskositas, kontaminasi, keausan logam, dan kondisi oli secara keseluruhan.</p>',
      en: '<p>Oil Clinic is a laboratory owned by Pertamina Lubricants for lubricant testing. Through this program, oil condition can be monitored periodically so machine damage is prevented early.</p><p>Monitoring covers viscosity analysis, contamination, metal wear, and overall oil condition.</p>'
    },
    highlights: {
      id: [
        { id: 'Laboratorium milik Pertamina Lubricants', en: 'Laboratory owned by Pertamina Lubricants' },
        { id: 'Analisis kondisi oli berkala', en: 'Periodic oil condition analysis' },
        { id: 'Pencegahan kerusakan mesin lebih awal', en: 'Early prevention of machine damage' }
      ],
      en: [
        { id: 'Laboratory owned by Pertamina Lubricants', en: 'Laboratory owned by Pertamina Lubricants' },
        { id: 'Periodic oil condition analysis', en: 'Periodic oil condition analysis' },
        { id: 'Early prevention of machine damage', en: 'Early prevention of machine damage' }
      ]
    }
  },
  {
    id: 7,
    slug: 'timely-shipping',
    icon: 'delivery',
    order: 7,
    featured: true,
    image: '/img/service-shipping.svg',
    title: { id: 'Pengiriman Tepat Waktu', en: 'Timely Shipping' },
    excerpt: {
      id: 'Kualitas dan kuantitas orisinal Pertamina, karena Lobunta Lubricants adalah Distributor Resmi Pertamina Lubricants dengan nomor agency C 705106.',
      en: 'Genuine Pertamina quality and quantity, because Lobunta Lubricants is an Official Pertamina Lubricants Distributor with agency number C 705106.'
    },
    body: {
      id: '<p>Kami menjaga kondisi gudang dan armada agar pesanan dikirim sesuai jadwal yang disepakati. Pengiriman mencakup wilayah Jabodetabek dan seluruh Indonesia melalui jaringan logistik.</p><p>Nomor resi dan status pengiriman dapat kami informasikan langsung kepada pelanggan.</p>',
      en: '<p>We maintain warehouse and fleet readiness so orders ship on the agreed schedule. Delivery covers the Greater Jakarta Area and all of Indonesia through our logistics network.</p><p>Tracking numbers and delivery status are shared directly with customers.</p>'
    },
    highlights: {
      id: [
        { id: 'Kirim sesuai jadwal', en: 'Ship on schedule' },
        { id: 'Cakupan seluruh Indonesia', en: 'Nationwide coverage' },
        { id: 'Informasi status pengiriman', en: 'Delivery status updates' }
      ],
      en: [
        { id: 'Ship on schedule', en: 'Ship on schedule' },
        { id: 'Nationwide coverage', en: 'Nationwide coverage' },
        { id: 'Delivery status updates', en: 'Delivery status updates' }
      ]
    }
  }
]

export const mockCategories: ProductCategory[] = [
  {
    id: 1,
    slug: 'heavy-duty-diesel-oil',
    icon: 'truck',
    order: 1,
    image: '/img/cat-heavy-duty.svg',
    productCount: 0,
    name: { id: 'Heavy Duty Diesel Oils', en: 'Heavy Duty Diesel Oils' },
    description: {
      id: 'Oli diesel berat untuk mesin industri, genset, excavator, dan alat berat yang bekerja pada beban tinggi.',
      en: 'Heavy duty diesel oils for industrial engines, generator sets, excavators, and heavy equipment operating under high load.'
    },
    applications: {
      id: [
        { id: 'Alat berat dan excavator', en: 'Heavy equipment and excavators' },
        { id: 'Genset dan stationary engine', en: 'Generator sets and stationary engines' },
        { id: 'Truck dan armada mining', en: 'Trucks and mining fleets' }
      ],
      en: [
        { id: 'Heavy equipment and excavators', en: 'Heavy equipment and excavators' },
        { id: 'Generator sets and stationary engines', en: 'Generator sets and stationary engines' },
        { id: 'Trucks and mining fleets', en: 'Trucks and mining fleets' }
      ]
    }
  },
  {
    id: 2,
    slug: 'transmission-oil',
    icon: 'gear',
    order: 2,
    image: '/img/cat-transmission.svg',
    productCount: 0,
    name: {
      id: 'Automatic & Manual Transmission Oil',
      en: 'Automatic & Manual Transmission Oil'
    },
    description: {
      id: 'Oli transmisi untuk otomatis dan manual pada kendaraan, alat berat, serta mesin industri.',
      en: 'Transmission fluids for automatic and manual gearboxes in vehicles, heavy equipment, and industrial machinery.'
    },
    applications: {
      id: [
        { id: 'Mobil dan armada logistik', en: 'Passenger cars and logistics fleets' },
        { id: 'Alat berat dan farming', en: 'Heavy equipment and farming machinery' },
        { id: 'Mesin industri', en: 'Industrial machinery' }
      ],
      en: [
        { id: 'Passenger cars and logistics fleets', en: 'Passenger cars and logistics fleets' },
        { id: 'Heavy equipment and farming machinery', en: 'Heavy equipment and farming machinery' },
        { id: 'Industrial machinery', en: 'Industrial machinery' }
      ]
    }
  },
  {
    id: 3,
    slug: 'circulating-bearing-system-oil',
    icon: 'bearing',
    order: 3,
    image: '/img/cat-bearing.svg',
    productCount: 0,
    name: {
      id: 'Circulating Bearing & System Oil',
      en: 'Circulating Bearing & System Oil'
    },
    description: {
      id: 'Oli sistem dan bearing untuk mesin turbin, kompresor, serta peralatan industri dengan sirkulasi terus-menerus.',
      en: 'System and bearing oils for turbines, compressors, and industrial equipment with continuous circulation.'
    },
    applications: {
      id: [
        { id: 'Turbin dan steam turbine', en: 'Turbines and steam turbines' },
        { id: 'Kompresor dan blower', en: 'Compressors and blowers' },
        { id: 'Sistem hidrolik dan power units', en: 'Hydraulic systems and power units' }
      ],
      en: [
        { id: 'Turbines and steam turbines', en: 'Turbines and steam turbines' },
        { id: 'Compressors and blowers', en: 'Compressors and blowers' },
        { id: 'Hydraulic systems and power units', en: 'Hydraulic systems and power units' }
      ]
    }
  },
  {
    id: 4,
    slug: 'cylinder-oil',
    icon: 'piston',
    order: 4,
    image: '/img/cat-cylinder.svg',
    productCount: 0,
    name: { id: 'Cylinder Oil', en: 'Cylinder Oil' },
    description: {
      id: 'Oli silinder untuk mesin pembakaran internal, marine engine, serta mesin diesel kecepatan tinggi dengan paket aditif terformulasi.',
      en: 'Cylinder oil for internal combustion engines, marine engines, and high-speed diesel engines with formulated additive packages.'
    },
    applications: {
      id: [
        { id: 'Marine engine', en: 'Marine engines' },
        { id: 'Mesin diesel stationary', en: 'Stationary diesel engines' },
        { id: 'Pabrik dan PLN', en: 'Industrial plants and power plants' }
      ],
      en: [
        { id: 'Marine engines', en: 'Marine engines' },
        { id: 'Stationary diesel engines', en: 'Stationary diesel engines' },
        { id: 'Industrial plants and power plants', en: 'Industrial plants and power plants' }
      ]
    }
  },
  {
    id: 5,
    slug: 'industrial-marine-engine-oil',
    icon: 'factory',
    order: 5,
    image: '/img/cat-industrial.svg',
    productCount: 0,
    name: {
      id: 'Industrial Engine Oils & Marine Engine Oils',
      en: 'Industrial Engine Oils & Marine Engine Oils'
    },
description: {
      id: 'Oli mesin industri dan marine untuk seluruh pabrik, kapal, unit pembangkitan, serta refinery dan power plant.',
      en: 'Industrial and marine engine oils for factories, vessels, generating units, refineries, and power plants.'
    },
    applications: {
      id: [
        { id: 'Pabrik dan industri manufaktur', en: 'Manufacturing plants' },
        { id: 'Pelayaran dan kapal', en: 'Shipping and vessels' },
        { id: 'PLN dan genset', en: 'Power plants and generator sets' }
      ],
      en: [
        { id: 'Manufacturing plants', en: 'Manufacturing plants' },
        { id: 'Shipping and vessels', en: 'Shipping and vessels' },
        { id: 'Power plants and generator sets', en: 'Power plants and generator sets' }
      ]
    }
  },
  {
    id: 6,
    slug: 'natural-gas-engine-oil',
    icon: 'gas',
    order: 6,
    image: '/img/cat-gas.svg',
    productCount: 0,
    name: { id: 'Natural Gas Engine Oils', en: 'Natural Gas Engine Oils' },
    description: {
      id: 'Oli mesin gas untuk unit stationary gas engine, turbin gas, serta captive power di refineries dan plant.',
      en: 'Gas engine oils for stationary gas engines, gas turbines, and captive power units at refineries and plants.'
    },
    applications: {
      id: [
        { id: 'Gas engine stationary', en: 'Stationary gas engines' },
        { id: 'Turbin gas', en: 'Gas turbines' },
        { id: 'Refinery dan power plant', en: 'Refineries and power plants' }
      ],
      en: [
        { id: 'Stationary gas engines', en: 'Stationary gas engines' },
        { id: 'Gas turbines', en: 'Gas turbines' },
        { id: 'Refineries and power plants', en: 'Refineries and power plants' }
      ]
    }
  },
  {
    id: 7,
    slug: 'heat-transfer-turbine-oil',
    icon: 'heat',
    order: 7,
    image: '/img/cat-heat.svg',
    productCount: 0,
    name: { id: 'Heat Transfer Oils & Turbine Oils', en: 'Heat Transfer Oils & Turbine Oils' },
    description: {
      id: 'Minyak transfer panas dan oli turbin untuk sistem pendingin serta turbin pada skala industri berat.',
      en: 'Heat transfer fluids and turbine oils for cooling systems and turbines at heavy industrial scale.'
    },
    applications: {
      id: [
        { id: 'Sistem heat transfer proses', en: 'Process heat transfer systems' },
        { id: 'Turbin uap dan gas', en: 'Steam and gas turbines' },
        { id: 'Industri kimia dan refinery', en: 'Chemical plants and refineries' }
      ],
      en: [
        { id: 'Process heat transfer systems', en: 'Process heat transfer systems' },
        { id: 'Steam and gas turbines', en: 'Steam and gas turbines' },
        { id: 'Chemical plants and refineries', en: 'Chemical plants and refineries' }
      ]
    }
  },
{
    id: 8,
    slug: 'compressor-gear-hydraulic-oil',
    icon: 'compressor',
    order: 8,
    image: '/img/cat-hydraulic.svg',
    productCount: 0,
    name: {
      id: 'Industrial Compressor, Gear & Hydraulic Oils',
      en: 'Industrial Compressor, Gear & Hydraulic Oils'
    },
    description: {
      id: 'Oli kompresor, oli roda gigi, dan oli hidrolik untuk mesin serta sistem hidrolik industri.',
      en: 'Compressor oils, gear oils, and hydraulic oils for industrial machinery and hydraulic systems.'
    },
    applications: {
      id: [
        { id: 'Kompresor udara dan gas', en: 'Air and gas compressors' },
        { id: 'Roda gigi dan gearbox', en: 'Gears and gearboxes' },
        { id: 'Sistem hidrolik dan power units', en: 'Hydraulic systems and power units' }
      ],
      en: [
        { id: 'Air and gas compressors', en: 'Air and gas compressors' },
        { id: 'Gears and gearboxes', en: 'Gears and gearboxes' },
        { id: 'Hydraulic systems and power units', en: 'Hydraulic systems and power units' }
      ]
    }
  },
  {
    id: 9,
    slug: 'grease-specialty-oil',
    icon: 'grease',
    order: 9,
    image: '/img/cat-grease.svg',
    productCount: 0,
    name: { id: 'Grease & Specialty Oils', en: 'Grease & Specialty Oils' },
    description: {
      id: 'Grease serta specialty oil seperti Trafolube, cutting oil, dan produk khusus lainnya untuk kebutuhan manufaktur dan pulp & paper.',
      en: 'Greases and specialty oils such as Trafolube, cutting oil, and other purpose-made products for manufacturing and pulp & paper needs.'
    },
    applications: {
      id: [
        { id: 'Bearing dan sliding bearing', en: 'Bearings and sliding bearings' },
        { id: 'Metal working dan cutting fluid', en: 'Metal working and cutting fluids' },
        { id: 'Pulp, paper, dan food grade', en: 'Pulp, paper, and food grade' }
      ],
      en: [
        { id: 'Bearings and sliding bearings', en: 'Bearings and sliding bearings' },
        { id: 'Metal working and cutting fluids', en: 'Metal working and cutting fluids' },
        { id: 'Pulp, paper, and food grade', en: 'Pulp, paper, and food grade' }
      ]
    }
  }
]

export const mockProducts: ProductItem[] = []

export const mockCustomers: CustomerItem[] = [
  { id: 1, name: 'Berkah Bersaudara', logo: '', industry: { id: 'Industri', en: 'Industry' }, order: 1 },
  { id: 2, name: 'Fanbel Jaya Bersama', logo: '', industry: { id: 'Industri', en: 'Industry' }, order: 2 },
  { id: 3, name: 'Berkat Manunggal Energi', logo: '', industry: { id: 'Energi', en: 'Energy' }, order: 3 }
]

export const mockTestimonials: TestimonialItem[] = []

export const mockPosts: PostItem[] = []

export const mockCareers: CareerItem[] = [
  {
    id: 1,
    slug: 'sales-representative',
    isOpen: true,
    postedAt: '2026-01-15',
    location: { id: 'Bekasi, Jawa Barat', en: 'Bekasi, West Java' },
    employmentType: { id: 'Full Time', en: 'Full Time' },
    department: { id: 'Penjualan', en: 'Sales' },
    title: { id: 'Sales Representative', en: 'Sales Representative' },
    description: {
      id: '<p>Menangani penjualan pelumas ke pelanggan industri dan distributor di wilayah Jabodetabek. Posisi ini reportes langsung ke Head of Sales.</p>',
      en: '<p>Handle lubricant sales to industrial customers and distributors across the Greater Jakarta Area, reporting directly to the Head of Sales.</p>'
    },
    requirements: {
      id: [
        { id: 'Minimal 3 tahun pengalaman penjualan industri', en: 'Minimum 3 years of industrial sales experience' },
        { id: 'Memahami jenis pelumas dan aplikasinya', en: 'Understanding lubricant types and applications' },
        { id: 'Memiliki SIM A dan siap dinas lapangan', en: 'Valid Indonesian driving licence and willing to travel' }
      ],
      en: [
        { id: 'Minimum 3 years of industrial sales experience', en: 'Minimum 3 years of industrial sales experience' },
        { id: 'Understanding lubricant types and applications', en: 'Understanding lubricant types and applications' },
        { id: 'Valid Indonesian driving licence and willing to travel', en: 'Valid Indonesian driving licence and willing to travel' }
      ]
    }
  },
  {
    id: 2,
    slug: 'lubrication-engineer',
    isOpen: true,
    postedAt: '2026-01-15',
    location: { id: 'Bekasi, Jawa Barat', en: 'Bekasi, West Java' },
    employmentType: { id: 'Full Time', en: 'Full Time' },
    department: { id: 'Teknikal', en: 'Technical' },
    title: { id: 'Lubrication Engineer', en: 'Lubrication Engineer' },
    description: {
      id: '<p>Memberikan dukungan teknis lubricant selection dan oil monitoring kepada pelanggan, termasuk on-site troubleshooting dan Oil Clinic program.</p>',
      en: '<p>Provide technical support on lubricant selection and oil monitoring to customers, including on-site troubleshooting and Oil Clinic program participation.</p>'
    },
    requirements: {
      id: [
        { id: 'Sarjana Teknik/Mesin atau setara', en: 'Bachelor degree in Mechanical Engineering or equivalent' },
        { id: 'Pengalaman teknis pelumas minimal 3 tahun', en: 'At least 3 years of lubricant technical experience' },
        { id: 'Kemampuan komunikasi teknis yang baik', en: 'Strong technical communication skills' }
      ],
      en: [
        { id: 'Bachelor degree in Mechanical Engineering or equivalent', en: 'Bachelor degree in Mechanical Engineering or equivalent' },
        { id: 'At least 3 years of lubricant technical experience', en: 'At least 3 years of lubricant technical experience' },
        { id: 'Strong technical communication skills', en: 'Strong technical communication skills' }
      ]
    }
  },
  {
    id: 3,
    slug: 'warehouse-supervisor',
    isOpen: true,
    postedAt: '2026-01-15',
    location: { id: 'Bekasi, Jawa Barat', en: 'Bekasi, West Java' },
    employmentType: { id: 'Full Time', en: 'Full Time' },
    department: { id: 'Logistik', en: 'Logistics' },
    title: { id: 'Warehouse Supervisor', en: 'Warehouse Supervisor' },
    description: {
      id: '<p>Mengelola operasional gudang pelumas: penerimaan, penyimpanan, stok opname, dan akurasi pengiriman.</p>',
      en: '<p>Manage lubricant warehouse operations: receiving, storage, stock opname, and delivery accuracy.</p>'
    },
    requirements: {
      id: [
        { id: 'Minimal 3 tahun pengalaman gudang', en: 'Minimum 3 years of warehouse experience' },
        { id: 'Menguasai sistem stok dan dokumen gudang', en: 'Familiar with inventory systems and warehouse documents' },
        { id: 'Disiplin dan teliti', en: 'Disciplined and detail-oriented' }
      ],
      en: [
        { id: 'Minimum 3 years of warehouse experience', en: 'Minimum 3 years of warehouse experience' },
        { id: 'Familiar with inventory systems and warehouse documents', en: 'Familiar with inventory systems and warehouse documents' },
        { id: 'Disciplined and detail-oriented', en: 'Disciplined and detail-oriented' }
      ]
    }
  }
]

export const mockPages: Record<string, PageContent> = {
  profile: {
    slug: 'profile',
    updatedAt: '2026-06-01',
    heroImage: '/img/profile-hero.svg',
    title: { id: 'Profil', en: 'Profile' },
    heading: { id: 'Tentang Lobunta Lubricants', en: 'About Lobunta Lubricants' },
    metaTitle: {
      id: 'Profil Lobunta Lubricants — Distributor Resmi Pelumas Pertamina',
      en: 'Lobunta Lubricants Profile — Official Pertamina Lubricants Distributor'
    },
    metaDescription: {
      id: 'Sejarah, struktur bisnis, dan komitmen Lobunta Lubricants sebagai distributor resmi pelumas Pertamina sejak 1991 dengan Nomor Agen C 705106.',
      en: 'History, business lines, and commitments of Lobunta Lubricants as an official Pertamina Lubricants distributor since 1991 under Agency No. C 705106.'
    },
    intro: {
      id: 'PT. Lobunta Kencana Raya didirikan pada 27 Januari 1973 dengan bentuk badan hukum CV, kemudian berubah menjadi Perseroan Terbatas pada 30 September 1977. Kami resmi menjadi distributor pelumas Pertamina sejak 1991.',
      en: 'PT. Lobunta Kencana Raya was established on 27 January 1973 as a CV, then converted to a limited liability company on 30 September 1977. We officially became a Pertamina lubricants distributor in 1991.'
    },
    body: {
      id: [
        '<p>Bidang usaha kami meliputi general contractor, general supplier, plant hire, property, crushing plant, penjualan oli dan pelumas Pertamina, serta mixer plant. Sejak 1991 kami resmi menjadi distributor pelumas Pertamina.</p>',
        '<p>Sebagai Distributor Resmi Pertamina Lubricants dengan Nomor Agen C 705106, kami memasarkan seluruh produk Pertamina antara lain:</p>',
        '<ul><li>Pelumas industri</li><li>Pelumas alat berat</li><li>Pelumas marine, dan lain-lain</li></ul>',
        '<p>Komitmen kami dalam memasarkan pelumas Pertamina:</p>',
        '<ul><li>Kualitas orisinal terjamin dari Pertamina</li><li>Stok siap kirim</li><li>Harga pelumas kompetitif</li><li>Pengiriman tepat waktu</li><li>Distribusi barang ke seluruh Indonesia</li></ul>',
'<p>Lobunta Land juga mengembangkan kawasan hunian seperti Griya Lobunta Lestari, Teratai Residence, Flamboyan Residence, dan Kenanga Residence di kota Cirebon. Inovasi Lobunta Land akan berlanjut dengan pengembangan kawasan komersial dan kawasan hunian yang aman, nyaman, dan indah.</p>'
      ].join('\n'),
      en: [
        '<p>Our business lines cover general contracting, general supply, plant hire, property, crushing plant, Pertamina oil and lubricant dealership, and mixer plant. Since 1991 we have officially been a Pertamina lubricants distributor.</p>',
        '<p>As an Authorized Distributor of Pertamina Lubricants under Agency No. C 705106, we market all Pertamina products, including among others:</p>',
        '<ul><li>Industrial lubricants</li><li>Heavy equipment lubricants</li><li>Marine lubricants, and others</li></ul>',
        '<p>Our commitments in marketing Pertamina lubricants:</p>',
        '<ul><li>Genuine quality guaranteed by Pertamina</li><li>Ready stock items</li><li>Competitive lubricant prices</li><li>Timely delivery</li><li>Distribution of goods throughout Indonesia</li></ul>',
        '<p>Lobunta Land has also developed residential areas such as Griya Lobunta Lestari, Teratai Residence, Flamboyan Residence, and Kenanga Residence in the city of Cirebon. Its innovation will continue with safe, comfortable, and beautiful commercial areas and residential rows.</p>'
      ].join('\n')
    }
  },
  'privacy-policy': {
    slug: 'privacy-policy',
    updatedAt: '2026-06-01',
    heroImage: '',
    title: { id: 'Kebijakan Privasi', en: 'Privacy Policy' },
    heading: { id: 'Kebijakan Privasi', en: 'Privacy Policy' },
    metaTitle: { id: 'Kebijakan Privasi', en: 'Privacy Policy' },
    metaDescription: {
      id: 'Kebijakan privasi dan pengelolaan data pribadi di Lobunta Lubricants.',
      en: 'Privacy policy and personal data handling at Lobunta Lubricants.'
    },
    intro: {
      id: 'Halaman ini menjelaskan bagaimana Lobunta Lubricants mengumpulkan, menggunakan, dan melindungi data pribadi Anda.',
      en: 'This page explains how Lobunta Lubricants collects, uses, and protects your personal data.'
    },
    body: {
      id: [
        '<p><strong>Data yang kami kumpulkan.</strong> Kami mengumpulkan nama, nomor telepon, alamat email, dan pesan yang Anda kirimkan melalui formulir kontak atau WhatsApp.</p>',
        '<p><strong>Penggunaan data.</strong> Data tersebut digunakan hanya untuk menjawab pertanyaan, memenuhi permintaan penawaran, dan memproses pemesanan produk.</p>',
        '<p><strong>Berbagi data.</strong> Kami tidak menjual atau menyewakan data pribadi Anda kepada pihak ketiga.</p>',
        '<p><strong>Keamanan.</strong> Data disimpan pada server yang aksesnya terbatas dan hanya digunakan oleh personnel yang berwenang.</p>',
        '<p><strong>Hak Anda.</strong> Anda dapat meminta akses, koreksi, atau penghapusan data Anda dengan menghubungi kami melalui halaman kontak.</p>'
      ].join('\n'),
      en: [
        '<p><strong>Data we collect.</strong> We collect your name, phone number, email address, and messages you submit through the contact form or WhatsApp.</p>',
        '<p><strong>Use of data.</strong> This data is used only to answer inquiries, fulfil quotation requests, and process product orders.</p>',
        '<p><strong>Data sharing.</strong> We do not sell or rent your personal data to third parties.</p>',
        '<p><strong>Security.</strong> Data is stored on servers with restricted access and used only by authorised personnel.</p>',
        '<p><strong>Your rights.</strong> You may request access, correction, or deletion of your data by contacting us through the contact page.</p>'
      ].join('\n')
    }
  },
  faq: {
    slug: 'faq',
    updatedAt: '2026-06-01',
    heroImage: '',
    title: { id: 'FAQ', en: 'FAQ' },
    heading: { id: 'Pertanyaan yang sering diajukan', en: 'Frequently asked questions' },
    metaTitle: {
      id: 'FAQ — Lobunta Lubricants',
      en: 'FAQ — Lobunta Lubricants'
    },
    metaDescription: {
      id: 'Pertanyaan yang sering diajukan tentang produk, pemesanan, pembayaran, dan pengiriman pelumas Pertamina di Lobunta Lubricants.',
      en: 'Frequently asked questions about products, ordering, payment, and delivery of Pertamina lubricants at Lobunta Lubricants.'
    },
    intro: {
      id: 'Beberapa pertanyaan yang paling sering kami terima dari pelanggan industri.',
      en: 'Some of the questions we most often receive from industrial customers.'
    },
    body: {
      id: [
        '<details><summary>Apakah produk yang dijual dijamin orisinal?</summary><p>Ya. Kami adalah Distributor Resmi Pertamina Lubricants dengan Nomor Agen C 705106, sehingga seluruh produk dijamin asli langsung dari Pertamina.</p></details>',
        '<details><summary>Apakah ada minimal pembelian?</summary><p>Tidak ada minimal pembelian untuk pembelian eceran. Untuk harga grosir dan kontrak pasokan rutin, silakan hubungi tim kami untuk penawaran khusus.</p></details>',
        '<details><summary>Metode pembayaran apa yang tersedia?</summary><p>Kami menerima transfer bank dan pembayaran tunai. Untuk pelanggan korporat, tersedia opsi pembayaran sesuai kesepakatan kontrak.</p></details>',
        '<details><summary>Apakah bisa dikirim ke luar kota?</summary><p>Bisa. Kami mendistribusikan produk ke seluruh Indonesia melalui mitra logistik, dengan estimasi waktu kirim yang disesuaikan tujuan.</p></details>',
        '<details><summary>Apakah menyediakan dukungan teknis?</summary><p>Ya. Tim teknis kami siap membantu merekomendasikan grade pelumas yang tepat sesuai tipe mesin dan kondisi operasi Anda.</p></details>',
        '<details><summary>Bagaimana cara mendapatkan penawaran harga?</summary><p>Kirimkan kebutuhan Anda melalui halaman Kontak atau WhatsApp. Sertakan tipe produk, jumlah, dan lokasi pengiriman untuk respons yang lebih cepat.</p></details>'
      ].join('\n'),
      en: [
        '<details><summary>Are the products guaranteed genuine?</summary><p>Yes. We are an Authorized Distributor of Pertamina Lubricants under Agency No. C 705106, so all products are guaranteed genuine and sourced directly from Pertamina.</p></details>',
        '<details><summary>Is there a minimum order?</summary><p>There is no minimum order for retail purchases. For wholesale pricing and recurring supply contracts, please contact our team for a special quotation.</p></details>',
        '<details><summary>Which payment methods are available?</summary><p>We accept bank transfer and cash payment. For corporate customers, payment options can be arranged according to the contract agreement.</p></details>',
        '<details><summary>Can you deliver outside the city?</summary><p>Yes. We distribute products throughout Indonesia through logistics partners, with estimated delivery times adjusted to the destination.</p></details>',
        '<details><summary>Do you provide technical support?</summary><p>Yes. Our technical team is ready to help recommend the right lubricant grade for your machine type and operating conditions.</p></details>',
        '<details><summary>How do I get a price quotation?</summary><p>Send us your requirements through the Contact page or WhatsApp. Include product type, quantity, and delivery location for a faster response.</p></details>'
      ].join('\n')
    }
  },
  'terms-conditions': {
    slug: 'terms-conditions',
    updatedAt: '2026-06-01',
    heroImage: '',
    title: { id: 'Syarat & Ketentuan', en: 'Terms & Conditions' },
    heading: { id: 'Syarat & Ketentuan', en: 'Terms & Conditions' },
    metaTitle: { id: 'Syarat & Ketentuan', en: 'Terms & Conditions' },
    metaDescription: {
      id: 'Syarat dan ketentuan penggunaan layanan serta transaksi di Lobunta Lubricants.',
      en: 'Terms and conditions for using the services and transactions at Lobunta Lubricants.'
    },
    intro: {
      id: 'Dengan menggunakan layanan dan melakukan transaksi dengan Lobunta Lubricants, Anda menyetujui syarat dan ketentuan berikut.',
      en: 'By using our services and conducting transactions with Lobunta Lubricants, you agree to the following terms and conditions.'
    },
    body: {
      id: [
        '<p><strong>1. Ruang lingkup.</strong> Syarat dan ketentuan ini mengatur penggunaan situs serta transaksi pembelian produk dan layanan dari Lobunta Lubricants.</p>',
        '<p><strong>2. Pesanan.</strong> Pesanan dianggap sah setelah dikonfirmasi oleh tim kami, baik melalui email, telepon, maupun WhatsApp.</p>',
        '<p><strong>3. Harga.</strong> Harga yang tercantum dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya. Harga final mengikuti penawaran resmi yang kami kirimkan.</p>',
        '<p><strong>4. Pembayaran.</strong> Pembayaran dilakukan sesuai metode dan jangka waktu yang disepakati pada saat konfirmasi pesanan.</p>',
        '<p><strong>5. Pengiriman.</strong> Waktu pengiriman bersifat estimasi dan dapat dipengaruhi oleh ketersediaan stok serta layanan logistik pihak ketiga.</p>',
        '<p><strong>6. Jaminan produk.</strong> Seluruh produk yang kami jual dijamin orisinal dari Pertamina. Klaim atas produk yang rusak atau tidak sesuai harus disampaikan segera setelah barang diterima.</p>',
        '<p><strong>7. Pembatasan tanggung jawab.</strong> Kami tidak bertanggung jawab atas kerugian tidak langsung yang timbul dari penggunaan produk yang tidak sesuai anjuran teknis kami.</p>',
        '<p><strong>8. Hukum yang berlaku.</strong> Syarat dan ketentuan ini diatur oleh dan ditafsirkan sesuai hukum yang berlaku di Republik Indonesia.</p>'
      ].join('\n'),
      en: [
        '<p><strong>1. Scope.</strong> These terms and conditions govern the use of our site and the purchase of products and services from Lobunta Lubricants.</p>',
        '<p><strong>2. Orders.</strong> An order is valid once confirmed by our team, whether by email, phone, or WhatsApp.</p>',
        '<p><strong>3. Pricing.</strong> Listed prices may change at any time without prior notice. The final price follows the official quotation we send.</p>',
        '<p><strong>4. Payment.</strong> Payment is made according to the method and period agreed upon at order confirmation.</p>',
        '<p><strong>5. Delivery.</strong> Delivery times are estimates and may be affected by stock availability and third-party logistics services.</p>',
        '<p><strong>6. Product warranty.</strong> All products we sell are guaranteed genuine from Pertamina. Claims for damaged or non-conforming products must be submitted promptly after receipt.</p>',
        '<p><strong>7. Limitation of liability.</strong> We are not liable for indirect losses arising from the use of products contrary to our technical recommendations.</p>',
        '<p><strong>8. Governing law.</strong> These terms and conditions are governed by and construed in accordance with the laws applicable in the Republic of Indonesia.</p>'
      ].join('\n')
    }
  }
}

export const mockHome: HomeContent = {
  hero: {
    eyebrow: {
      id: 'Distributor Resmi Pertamina Lubricants',
      en: 'Official Pertamina Lubricants Distributor'
    },
    heading: {
      id: 'Oli dan Pelumas Pertamina Original, Ready Stock, Tepat Waktu',
      en: 'Genuine Pertamina Oil and Lubricants, Ready Stock, Delivered on Time'
    },
    subheading: {
      id: 'Kami sudah menjadi distributor resmi pelumas Pertamina sejak 1991 dengan Nomor Agen C 705106. Produk orisinal, stok siap kirim, harga kompetitif, dan dukungan teknis untuk seluruh kebutuhan industri Anda.',
      en: 'We have been an official Pertamina Lubricants distributor since 1991 under Agency No. C 705106. Genuine products, ready stock, competitive pricing, and technical support for every industrial need.'
    },
    image: '/img/hero-lubricants.svg',
    ctaPrimary: { label: { id: 'Lihat Produk', en: 'View Products' }, to: '/products' },
    ctaSecondary: { label: { id: 'Konsultasi Gratis', en: 'Free Consultation' }, to: '/contact' }
  },
  aboutIntro: {
    heading: { id: 'Perjalanan kami', en: 'Our journey' },
    body: {
      id: 'Lebih dari lima dekade pengalaman distribusi pelumas di Indonesia, dengan status distributor resmi Pertamina Lubricants sejak 1991.',
      en: 'More than five decades of lubricant distribution experience in Indonesia, with official Pertamina Lubricants distributor status since 1991.'
    }
  },
  milestones: mockMilestones,
  categories: mockCategories,
  customers: mockCustomers,
  testimonials: mockTestimonials,
  cta: {
    heading: {
      id: 'Butuh rekomendasi pelumas untuk mesin Anda?',
      en: 'Need a lubricant recommendation for your machinery?'
    },
    body: {
      id: 'Kirimkan tipe mesin, jenis operasi, dan spesifikasi unit Anda. Tim teknis kami akan merekomendasikan grade yang tepat.',
      en: 'Send us your machine type, operating conditions, and specifications. Our technical team will recommend the right grade.'
    },
    button: { label: { id: 'Hubungi Kami', en: 'Contact Us' }, to: '/contact' }
  }
}