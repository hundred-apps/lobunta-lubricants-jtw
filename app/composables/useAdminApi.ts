/**
 * Client untuk endpoint admin.
 *
 * Semua request memakai base URL yang sama dengan frontend publik
 * (NUXT_PUBLIC_API_BASE) dengan prefix /admin. Format payload bilingual:
 * field dua bahasa dikirim sebagai objek { id, en }, sama seperti respons
 * endpoint publik, supaya backend cukup serialize satu bentuk saja.
 *
 * Panel ini tidak pernah memakai data mock. Kalau backend belum ada, request
 * gagal dan state `connected` bernilai false supaya UI menampilkan kondisi
 * koneksi terbaru.
 */

export interface ListQuery {
  q?: string
  page?: number
  limit?: number
  sort?: string
  order?: 'asc' | 'desc'
  [key: string]: string | number | undefined
}

export interface ListResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
}

export function useAdminApi() {
  const config = useRuntimeConfig()
  const base = String(config.public.apiBase || '').replace(/\/+$/, '')
  const { token } = useAdminAuth()

  const connected = useState<boolean>('admin:connected', () => false)
  const lastError = useState<string>('admin:lastError', () => '')

  const baseUrl = computed(() => (base ? `${base}/admin` : ''))

  function headers(): Record<string, string> {
    const value: Record<string, string> = { accept: 'application/json' }
    if (token.value) value.authorization = `Bearer ${token.value}`
    return value
  }

  function describe(error: unknown): string {
    const err = error as { statusCode?: number; status?: number; data?: { error?: string; message?: string }; message?: string }
    const status = err.statusCode ?? err.status
    if (!status) return err.message || 'Tidak bisa terhubung ke server'
    if (status === 401) return 'Sesi tidak valid atau belum login'
    if (status === 403) return 'Anda tidak punya akses untuk aksi ini'
    if (status === 404) return 'Endpoint belum ada di backend'
    if (status === 422) return err.data?.error || err.data?.message || 'Data tidak valid'
    return err.data?.error || err.data?.message || `Server error (${status})`
  }

  async function run<T>(task: () => Promise<T>, fallback: T): Promise<T> {
    if (!baseUrl.value) {
      lastError.value = 'NUXT_PUBLIC_API_BASE belum diisi'
      connected.value = false
      return fallback
    }
    try {
      const result = await task()
      connected.value = true
      lastError.value = ''
      return result
    } catch (error) {
      connected.value = false
      lastError.value = describe(error)
      return fallback
    }
  }

  function list<T>(resource: string, query: ListQuery = {}) {
    return run<ListResponse<T>>(
      () => $fetch<ListResponse<T>>(`${baseUrl.value}/${resource}`, {
        query,
        headers: headers()
      }),
      { data: [], total: 0, page: 1, limit: 20 }
    )
  }

  function get<T>(resource: string, id: string | number) {
    return run<T | null>(() => $fetch<T>(`${baseUrl.value}/${resource}/${id}`, { headers: headers() }), null)
  }

  function create<T>(resource: string, payload: unknown) {
    return run<T | null>(
      () => $fetch<T>(`${baseUrl.value}/${resource}`, {
        method: 'POST',
        body: payload as Record<string, unknown>,
        headers: headers()
      }),
      null
    )
  }

  function update<T>(resource: string, id: string | number, payload: unknown) {
    return run<T | null>(
      () => $fetch<T>(`${baseUrl.value}/${resource}/${id}`, {
        method: 'PUT',
        body: payload as Record<string, unknown>,
        headers: headers()
      }),
      null
    )
  }

  function remove(resource: string, id: string | number) {
    return run<boolean>(
      () => $fetch<boolean>(`${baseUrl.value}/${resource}/${id}`, { method: 'DELETE', headers: headers() }),
      false
    )
  }

  async function upload(file: File) {
    if (!baseUrl.value) {
      connected.value = false
      lastError.value = 'NUXT_PUBLIC_API_BASE belum diisi'
      return null
    }
    const body = new FormData()
    body.append('file', file)
    try {
      const result = await $fetch<{ id: number; url: string }>(`${baseUrl.value}/media`, {
        method: 'POST',
        body,
        headers: { accept: 'application/json', ...(token.value ? { authorization: `Bearer ${token.value}` } : {}) }
      })
      connected.value = true
      lastError.value = ''
      return result
    } catch (error) {
      connected.value = false
      lastError.value = describe(error)
      return null
    }
  }

  async function login(identifier: string, password: string) {
    if (!baseUrl.value) throw new Error('NUXT_PUBLIC_API_BASE belum diisi')
    return await $fetch<{ token: string; user: { id: number; email: string; name: string; role: 'superadmin' | 'editor'; phone: string } }>(
      `${baseUrl.value}/auth/login`,
      { method: 'POST', body: { identifier, password } }
    )
  }

  async function post<T>(path: string, payload: unknown) {
    return run<T | null>(
      () => $fetch<T>(`${baseUrl.value}${path}`, {
        method: 'POST',
        body: payload as Record<string, unknown>,
        headers: headers()
      }),
      null
    )
  }

  return { baseUrl, connected, lastError, list, get, create, update, remove, upload, login, post }
}