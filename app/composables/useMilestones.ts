export interface HomeMilestone {
  year: string
  title: string
  description: string
}

/**
 * Timeline perusahaan dari i18n (`milestones`), sudah terlokalisasi.
 * Konten ini statis (bukan dari API) dan mengikuti locale aktif.
 *
 * Catatan: dengan `optimizeMessageBundling`, `tm()` dapat mengembalikan
 * message AST (objek tanpa prototype) di client, sehingga nilainya harus
 * dirender lewat `rt()` dan tidak boleh di-`String()` langsung.
 */
export function useMilestones() {
  const { locale, tm, rt } = useI18n()

  const toText = (value: unknown): string => {
    if (typeof value === 'string') return value
    if (typeof value === 'number') return String(value)
    if (value == null) return ''
    return rt(value as Parameters<typeof rt>[0])
  }

  return computed<HomeMilestone[]>(() => {
    void locale.value
    const raw = tm('milestones')
    if (!Array.isArray(raw)) return []
    return raw.map((item) => {
      const m = item as Record<string, unknown>
      return {
        year: toText(m.year),
        title: toText(m.title),
        description: toText(m.description)
      }
    })
  })
}
