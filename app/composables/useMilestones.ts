export interface HomeMilestone {
  year: string
  title: string
  description: string
}

/**
 * Timeline perusahaan dari i18n (`milestones`), sudah terlokalisasi.
 * Konten ini statis (bukan dari API) dan mengikuti locale aktif.
 */
export function useMilestones() {
  const { locale, tm } = useI18n()
  return computed<HomeMilestone[]>(() => {
    void locale.value
    const raw = tm('milestones')
    if (!Array.isArray(raw)) return []
    return raw.map((item) => {
      const m = item as Record<string, unknown>
      return {
        year: String(m.year ?? ''),
        title: String(m.title ?? ''),
        description: String(m.description ?? '')
      }
    })
  })
}
