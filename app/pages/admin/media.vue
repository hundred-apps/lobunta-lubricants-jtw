<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const { list, remove, upload, connected, lastError } = useAdminApi()

interface MediaRow {
  id: number
  url: string
  fileName?: string
  mimeType?: string
  sizeBytes?: number
  alt?: { id?: string; en?: string }
}

const items = ref<MediaRow[]>([])
const total = ref(0)
const loading = ref(true)
const uploading = ref(false)
const keyword = ref('')
const pendingDelete = ref<MediaRow | null>(null)

const input = ref<HTMLInputElement | null>(null)
const copied = ref<number | null>(null)

function absolute(url: string): string {
  if (/^https?:\/\//.test(url)) return url
  const base = String(useRuntimeConfig().public.apiBase || '').replace(/\/api\/v1\/?$/, '')
  return base ? `${base}${url.startsWith('/') ? '' : '/'}${url}` : url
}

function size(bytes?: number): string {
  if (!bytes) return '-'
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

async function load() {
  loading.value = true
  const result = await list<MediaRow>('media', { q: keyword.value || undefined, limit: 100 })
  items.value = result.data
  total.value = result.total
  loading.value = false
}

onMounted(load)

async function onFile(event: Event) {
  const el = event.target as HTMLInputElement
  const file = el.files?.[0]
  if (!file) return
  uploading.value = true
  await upload(file)
  uploading.value = false
  el.value = ''
  await load()
}

async function confirmDelete() {
  if (!pendingDelete.value) return
  await remove('media', pendingDelete.value.id)
  pendingDelete.value = null
  await load()
}

async function copyUrl(row: MediaRow) {
  const value = absolute(row.url)
  try {
    await navigator.clipboard.writeText(value)
    copied.value = row.id
    setTimeout(() => { copied.value = null }, 1500)
  } catch {
    window.prompt('Salin URL ini', value)
  }
}

useSeoMeta({ title: 'Media | CMS Lobunta' })
</script>

<template>
  <div class="space-y-5">
    <div class="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 class="text-2xl">
          Media
        </h1>
        <p class="mt-1 text-sm text-slate-600 dark:text-slate-300">
          {{ total }} file. Dipakai di semua pilihan gambar pada form konten.
        </p>
      </div>
      <div class="flex flex-wrap items-center gap-2">
        <input v-model="keyword" type="search" class="field !w-64" placeholder="Cari nama file..." @keyup.enter="load">
        <button type="button" class="btn-outline !py-2" @click="load">
          Cari
        </button>
        <button type="button" class="btn-primary !py-2" :disabled="uploading" @click="input?.click()">
          {{ uploading ? 'Mengupload...' : 'Upload gambar' }}
        </button>
        <input ref="input" type="file" accept="image/*" multiple class="hidden" @change="onFile">
      </div>
    </div>

    <p v-if="!connected && lastError" class="rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:bg-amber-500/10 dark:text-amber-200">
      {{ lastError }}
    </p>

    <div v-if="loading" class="card px-5 py-10 text-center text-sm text-slate-500">
      Memuat media...
    </div>

    <div v-else-if="!items.length" class="card px-5 py-10 text-center text-sm text-slate-500">
      Belum ada file. Klik Upload gambar.
    </div>

    <div v-else class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      <figure
        v-for="item in items"
        :key="item.id"
        class="card overflow-hidden"
      >
        <div class="grid aspect-square place-items-center bg-slate-50 p-3 dark:bg-white/5">
          <img :src="absolute(item.url)" :alt="item.fileName || item.url" class="max-h-full max-w-full object-contain">
        </div>
        <figcaption class="space-y-2 p-3">
          <p class="truncate text-xs font-medium" :title="item.fileName">
            {{ item.fileName || `media-${item.id}` }}
          </p>
          <p class="text-[11px] text-slate-500">
            {{ size(item.sizeBytes) }}
          </p>
          <div class="flex gap-1">
            <button type="button" class="btn-ghost !px-2 !py-1 text-xs" @click="copyUrl(item)">
              {{ copied === item.id ? 'Tersalin' : 'Salin URL' }}
            </button>
            <button
              type="button"
              class="btn-ghost !px-2 !py-1 text-xs text-red-600"
              @click="pendingDelete = item"
            >
              Hapus
            </button>
          </div>
        </figcaption>
      </figure>
    </div>

    <Teleport to="body">
      <div v-if="pendingDelete" class="fixed inset-0 z-50 grid place-items-center bg-slate-900/60 p-4">
        <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-brand-950">
          <h2 class="text-lg">
            Hapus file ini?
          </h2>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Gambar yang sudah dipakai di konten akan ikut rusak. Ganti dulu field gambarnya.
          </p>
          <div class="mt-6 flex justify-end gap-2">
            <button type="button" class="btn-outline" @click="pendingDelete = null">
              Batal
            </button>
            <button type="button" class="btn-accent" @click="confirmDelete">
              Ya, hapus
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>