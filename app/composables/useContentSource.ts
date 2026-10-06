import type { SiteSettings } from '~/types/content'
import {
  mockCareers,
  mockCategories,
  mockCustomers,
  mockHome,
  mockPages,
  mockPosts,
  mockProducts,
  mockPromotions,
  mockServices,
  mockSettings,
  mockTestimonials
} from '~/data/mock'

/**
 * Content access layer.
 *
 * Semua konten publik diambil dari backend Express di NUXT_PUBLIC_API_BASE.
 * Kalau backend belum aktif atau request gagal, nilai dari app/data/mock.ts
 * dipakai supaya frontend tetap tampil utuh saat development.
 *
 * Bentuk data dan daftar endpoint ada di README.md bagian "Kontrak API".
 * Setiap field bilingual dikirim apa adanya ({ id, en }) supaya pergantian
 * bahasa tidak butuh request ulang.
 */

export type ResourceName =
  | 'settings'
  | 'home'
  | 'pages'
  | 'services'
  | 'product-categories'
  | 'products'
  | 'customers'
  | 'testimonials'
  | 'posts'
  | 'careers'
  | 'promotions'

const FALLBACKS: Record<ResourceName, unknown> = {
  settings: mockSettings,
  home: mockHome,
  pages: mockPages,
  services: mockServices,
  'product-categories': mockCategories,
  products: mockProducts,
  customers: mockCustomers,
  testimonials: mockTestimonials,
  posts: mockPosts,
  careers: mockCareers,
  promotions: mockPromotions
}

export function useContentSource() {
  const config = useRuntimeConfig()
  const apiBase = String(config.public.apiBase || '').replace(/\/+$/, '')

  const source = computed<'api' | 'mock'>(() => (apiBase ? 'api' : 'mock'))

  async function request<T>(name: ResourceName, path = '', query: Record<string, string> = {}): Promise<T> {
    const fallback = FALLBACKS[name] as T
    if (!apiBase) return fallback

    const params = new URLSearchParams({ lang: String(useI18n().locale.value), ...query })
    const url = `${apiBase}/${name}${path}?${params.toString()}`

    try {
      return await $fetch<T>(url, { retry: 0, timeout: 6000, headers: { accept: 'application/json' } })
    } catch (error) {
      if (import.meta.dev) {
        console.warn(`[content] pakai data lokal untuk "${name}${path}":`, (error as Error).message)
      }
      return fallback
    }
  }

  async function post<T>(path: string, body: unknown): Promise<T> {
    if (!apiBase) throw new Error('API belum dikonfigurasi (NUXT_PUBLIC_API_BASE kosong)')

    return await $fetch<T>(`${apiBase}${path}`, {
      method: 'POST',
      body: body as Record<string, unknown>,
      timeout: 10000,
      headers: { accept: 'application/json' }
    })
  }

  return { apiBase, source, request, post }
}

/**
 * Ambil satu resource. `key` wajib unik per kombinasi resource + argumen,
 * misalnya "service:quality-assurance".
 */
export function useCms<T>(name: ResourceName, key: string, path = '', query: Record<string, string> = {}) {
  const { request, source } = useContentSource()
  const cache = useState(`cms:${name}:${key}`, () => null as T | null)

  const { data } = useAsyncData<T>(`cms:${name}:${key}`, async () => {
    if (cache.value !== null) return cache.value
    const result = await request<T>(name, path, query)
    cache.value = result
    return result
  })

  return {
    data: computed(() => data.value ?? (FALLBACKS[name] as T)),
    source
  }
}

export function useCompany() {
  return useCms<SiteSettings>('settings', 'site')
}

export type { SiteSettings }