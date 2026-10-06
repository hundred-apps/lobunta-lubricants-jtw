<script setup lang="ts">
/**
 * Pilih gambar dari media library backend, atau tempel URL.
 * Upload memakai POST /api/v1/admin/media (multipart, field "file").
 */

const props = defineProps<{
  modelValue?: string
  label?: string
  disabled?: boolean
}>()

const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const { list, upload, connected, lastError } = useAdminApi()

const open = ref(false)
const items = ref<Array<{ id: number; url: string; fileName?: string }>>([])
const loading = ref(false)
const uploading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const previewBase = computed(() => {
  const config = useRuntimeConfig()
  return String(config.public.apiBase || '')
})

const current = computed<string>({
  get: () => props.modelValue || '',
  set: (value) => emit('update:modelValue', value)
})

function absolute(url: string): string {
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
  current.value = url
  open.value = false
}

async function onFile(event: Event) {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (!file) return
  uploading.value = true
  const result = await upload(file)
  uploading.value = false
  input.value = ''
  if (result?.url) {
    current.value = result.url
    await load()
  }
}

function remove() {
  current.value = ''
}
</script>

<template>
  <div class="space-y-2">
    <span class="block text-sm font-semibold text-slate-800 dark:text-slate-100">
      {{ label || 'Gambar' }}
    </span>

    <div class="flex flex-wrap items-center gap-3">
      <div
        class="grid h-20 w-28 place-items-center overflow-hidden rounded-lg border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5"
      >
        <img v-if="current" :src="absolute(current)" :alt="label || 'Gambar'" class="h-full w-full object-contain">
        <span v-else class="text-xs text-slate-400">
          <UiIcon name="document" :size="22" />
        </span>
      </div>

      <div class="flex flex-wrap gap-2">
        <button type="button" class="btn-outline !py-2" :disabled="disabled" @click="openPicker">
          Pilih dari library
        </button>
        <button
          type="button"
          class="btn-outline !py-2"
          :disabled="disabled || uploading"
          @click="fileInput?.click()"
        >
          {{ uploading ? 'Mengupload...' : 'Upload' }}
        </button>
        <button v-if="current" type="button" class="btn-ghost !py-2 text-red-600" :disabled="disabled" @click="remove">
          Hapus
        </button>
      </div>

      <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onFile">
    </div>

    <input v-model="current" type="text" class="field" placeholder="/uploads/... atau https://...">

    <p v-if="!connected && lastError" class="text-xs text-amber-600 dark:text-amber-400">
      {{ lastError }}
    </p>

    <Teleport to="body">
      <div v-if="open" class="fixed inset-0 z-50 grid place-items-center bg-slate-900/60 p-4">
        <div class="max-h-[80vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-xl dark:bg-brand-950">
          <div class="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-white/10">
            <h3 class="text-base font-semibold">
              Media library
            </h3>
            <button type="button" class="btn-ghost !px-3 !py-2" @click="open = false">
              <UiIcon name="close" :size="18" />
            </button>
          </div>
          <div class="max-h-[60vh] overflow-y-auto p-5">
            <p v-if="loading" class="text-sm text-slate-500">
              Memuat...
            </p>
            <p v-else-if="!items.length" class="text-sm text-slate-500">
              Belum ada media. Gunakan tombol Upload.
            </p>
            <div v-else class="grid grid-cols-3 gap-3 sm:grid-cols-5">
              <button
                v-for="item in items"
                :key="item.id"
                type="button"
                class="grid aspect-square place-items-center overflow-hidden rounded-lg border transition hover:border-brand-500"
                :class="item.url === current ? 'border-brand-600 ring-2 ring-brand-500/30' : 'border-slate-200 dark:border-white/10'"
                @click="pick(item.url)"
              >
                <img :src="absolute(item.url)" :alt="item.fileName || item.url" class="h-full w-full object-contain">
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>