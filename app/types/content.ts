export type LocaleCode = 'id' | 'en'

export interface Localized {
  id: string
  en: string
}

export interface LocalizedHtml {
  id: string
  en: string
}

export interface LocalizedLink {
  label: Localized
  to: string
}

export interface Media {
  id: number
  url: string
  alt?: Localized
  width?: number
  height?: number
}

export interface SiteSettings {
  companyName: Localized
  legalName: string
  tagline: Localized
  description: Localized
  agencyNumber: string
  foundedYear: string
  address: Localized
  phone: string[]
  whatsapp: string
  email: string
  officeHours: Localized
  logo: string
  social: {
    facebook?: string
    instagram?: string
    linkedin?: string
    youtube?: string
  }
  menuVisibility?: Record<string, boolean>
}

export interface HeroConfig {
  eyebrow: Localized
  heading: Localized
  subheading: Localized
  image: string
  imagePosition: 'left' | 'right'
  textPosition: 'left' | 'right'
  description: Localized
  ctaProduct: LocalizedLink
  ctaContact: LocalizedLink
  ctaPrimary: LocalizedLink
  ctaSecondary: LocalizedLink
}

export interface ProfileSection {
  title: Localized
  history: Localized
  gallery: Media[]
}

export interface ProductCategory {
  id: number
  slug: string
  name: Localized
  description: Localized
  image: string
  icon: string
  order: number
  productCount: number
  applications: { id: Localized[]; en: Localized[] }
}

export interface ProductItem {
  id: number
  slug: string
  name: Localized
  categorySlug: string
  image: string
  packaging: string
  weight: string
  spec: { label: Localized; value: Localized }[]
  tdsMediaId: number
  msdsMediaId: number
  description: Localized
  featured: boolean
  status: 'published' | 'draft'
}

export interface ServiceItem {
  id: number
  slug: string
  title: Localized
  excerpt: Localized
  body: LocalizedHtml
  image: string
  featured: boolean
}

export interface CustomerImage {
  id: number
  image: string
  alt?: Localized
}

export interface BlogItem {
  id: number
  slug: string
  title: Localized
  excerpt: Localized
  body: LocalizedHtml
  cover: string
  metaTitle: Localized
  metaDescription: Localized
  publishedAt: string
}

export interface PromotionItem {
  id: number
  slug: string
  name: Localized
  description: Localized
  products: Localized[]
}

export interface PostItem {
  id: number
  slug: string
  title: Localized
  excerpt: Localized
  body: LocalizedHtml
  cover: string
  author: string
  category: Localized
  tags: string[]
  publishedAt: string
  readingMinutes: number
}

export interface HomeContent {
  hero: HeroConfig
  aboutIntro: { heading: Localized; body: Localized }
  milestones: { year: string; title: Localized }[]
  categories: ProductCategory[]
  customers: CustomerImage[]
  testimonials: { author: string; quote: Localized; company: string }[]
  cta: { heading: Localized; body: Localized; button: LocalizedLink }
}

export interface CareerItem {
  id: number
  slug: string
  title: Localized
  location: Localized
  employmentType: Localized
  department: Localized
  description: LocalizedHtml
  requirements: { id: Localized[]; en: Localized[] }
  isOpen: boolean
  postedAt: string
}