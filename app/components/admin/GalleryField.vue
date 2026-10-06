<script setup lang="ts">
/**
 * Galeri multi-gambar untuk field 'gallery'.
 * Value: string[] (array of image URLs)
 */

const props = defineProps<{
  modelValue?: string[]
  label?: string
  disabled?: boolean
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string[]] }>()

const { list, upload, connected, lastError } = useAdminApi()

const open = ref(false)
const items = ref<Array<{ id: number; url: string; fileName?: string }>>([])
const loading = ref(false)
const uploading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const previewBase = computed(() => {
  const config = useRuntimeConfig()
  return String(config.public.apiBase || '').replace(/\/api\/v1\/?$/, '')
})

const current = computed<string[]>({
  get: () => props.modelValue || [],
  set: (value) => emit('update:modelValue', value)
})

function abs(url: string): string {
  if (!url) return ''
  if (/^https?:\/\//.test(url)) return url
  const base = previewBase.value.replace(/\/api\/v1\/?$/, '')
  return base ? `${base}${url.startsWith('/') ? '' : '/'}${url}` : url
}

async function load() {
  loading.value = true
  const result = await list<{ id: number; url: string; fileName?: string }>('media', { limit: 100 })
  items.value = result.data
  loading.value = false
}

async function openPicker() {
  open.value = true
  await load()
}

function pick(url: string) {
  current.value = [...current.value, url]
  open.value = false
}

function removeImage(url: string) {
  current.value = current.value.filter((u) => u !== url)
}

async function onFilePicker(event: Event) {
  const input = event.target as HTMLInputElement
  const files = Array.from(input.files || [])
  if (!files.length) return
  
  uploading.value = true
  for (const file of files) {
    const result = await upload(file)
    if (result?.url) {
      current.value = [...current.value, result.url]
    }
  }
  uploading.value = false
  if (input) input.value = ''
  await load()
}

function moveUp(index: number) {
  if (index === 0) return
  const next = [...current.value] as string[]
  const item = next.splice(index, 1)[0] as string
  next.splice(index - 1, 0, item)
  current.value = next
}

function moveDown(index: number) {
  if (index >= current.value.length - 1) return
  const next = [...current.value] as string[]
  const item = next.splice(index, 1)[0] as string
  next.splice(index + 1, 0, item)
  current.value = next
}
</script>

<template>
  <div class="space-y-2">
    <span class="block text-sm font-semibold text-slate-800 dark:text-slate-100">
      {{ label || 'Galeri' }}
    </span>

    <div v-if="current.length" class="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      <div
        v-for="(url, index) in current"
        :key="index"
        class="relative group"
      >
        <div class="aspect-square overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5">
          <img :src="abs(url)" :alt="`Gallery ${index + 1}`" class="h-full w-full object-cover">
        </div>
        <div class="absolute top-1 right-1 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            type="button"
            class="btn-ghost !p-1.5 rounded-full bg-white/90 dark:bg-brand-900/90"
            :disabled="disabled || index === 0"
            @click="moveUp(index)"
            title="Geser ke atas"
          >
            <UiIcon name="arrow-right" :size="14" style="transform: rotate(-90deg)" />
          </button>
          <button
            type="button"
            class="btn-ghost !p-1.5 rounded-full bg-white/90 dark:bg-brand-900/90"
            :disabled="disabled || index >= current.length - 1"
            @click="moveDown(index)"
            title="Geser ke bawah"
          >
            <UiIcon name="arrow-right" :size="14" style="transform: rotate(90deg)" />
          </button>
          <button
            type="button"
            class="btn-ghost !p-1.5 rounded-full bg-white/90 dark:bg-brand-900/90 text-red-600"
            :disabled="disabled"
            @click="removeImage(url)"
            title="Hapus"
          >
            <UiIcon name="close" :size="14" />
          </button>
        </div>
      </div>

      <button
        v-if="current.length < 20"
        type="button"
        class="btn-outline !py-3 aspect-square flex flex-col items-center justify-center gap-1"
        :disabled="disabled"
        @click="fileInput?.click()"
      >
        <UiIcon name="download" :size="20" />
        <span class="text-xs">Tambah gambar</span>
      </button>
    </div>

    <div v-else class="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center dark:border-white/10">
      <UiIcon name="document" :size="32" class="mx-auto text-slate-400" />
      <p class="mt-2 text-sm text-slate-500 dark:text-slate-400">Belum ada gambar</p>
      <button
        type="button"
        class="btn-outline mt-3"
        :disabled="disabled"
        @click="fileInput?.click()"
      >
        Upload gambar pertama
      </button>
    </div>

    <input ref="fileInput" type="file" accept="image/*" multiple class="hidden" @change="onFilePicker">

    <Teleport to="body">
      <div v-if="open" class="fixed inset-0 z-50 grid place-items-center bg-slate-900/60 p-4">
        <div class="max-h-[80vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-brand-950">
          <div class="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-white/10">
            <h3 class="text-base font-semibold">Pilih dari media library</h3>
            <button type="button" class="btn-ghost !px-3 !py-2" @click="open = false">
              <UiIcon name="close" :size="18" />
            </button>
          </div>
          <div class="max-h-[60vh] overflow-y-auto p-5">
            <p v-if="loading" class="text-sm text-slate-500">Memuat...</p>
            <p v-else-if="!items.length" class="text-sm text-slate-500">Belum ada media. Gunakan tombol Upload.</p>
            <div v-else class="grid grid-cols-3 gap-3 sm:grid-cols-5">
              <button
                v-for="item in items"
                :key="item.id"
                type="button"
                class="grid aspect-square place-items-center overflow-hidden rounded-lg border transition hover:border-brand-500"
                :class="current.includes(item.url) ? 'border-brand-600 ring-2 ring-brand-500/30' : 'border-slate-200 dark:border-white/10'"
                @click="pick(item.url)"
                :disabled="current.includes(item.url)"
              >
                <img :src="abs(item.url)" :alt="item.fileName || item.url" class="h-full w-full object-contain">
                <span v-if="current.includes(item.url)" class="absolute inset-0 flex items-center justify-center bg-brand-700/50 text-white">
                  <UiIcon name="check" :size="24" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>