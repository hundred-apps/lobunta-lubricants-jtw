<script setup lang="ts">
import { findEntity } from '~/admin/entityConfig'
import type { FieldDef } from '~/admin/entityConfig'

definePageMeta({ layout: 'admin' })

const route = useRoute()
const router = useRouter()
const { get, create, update, remove, lastError } = useAdminApi()

const key = computed(() => String(route.params.entity || ''))
const rawId = computed(() => String(route.params.id || ''))
const entity = computed(() => findEntity(key.value))
const isNew = computed(() => rawId.value === 'new')

if (!entity.value) {
  throw createError({ statusCode: 404, statusMessage: 'Unknown admin section', fatal: true })
}

const model = ref<Record<string, unknown>>({})
const loading = ref(!isNew.value)
const saving = ref(false)
const notice = ref<{ type: 'ok' | 'error'; text: string } | null>(null)

/** Nilai awal dari definisi field supaya field baru tidak undefined. */
function emptyValue(field: FieldDef): unknown {
  switch (field.kind) {
    case 'toggle': return false
    case 'number': return 0
    case 'repeater': return []
    case 'pair': return []
    case 'tags': return []
    case 'image': return ''
    case 'password': return ''
    default:
      return field.bilingual ? { id: '', en: '' } : ''
  }
}

function defaults(fields: FieldDef[]): Record<string, unknown> {
  const result: Record<string, unknown> = {}
  for (const field of fields) result[field.name] = emptyValue(field)
  return result
}

onMounted(async () => {
  model.value = defaults(entity.value!.fields)
  if (!isNew.value) {
    const row = await get<Record<string, unknown>>(key.value, rawId.value)
    if (row) model.value = { ...defaults(entity.value!.fields), ...row }
  }
})

/** Buang key yang tidak ada di form agar payload tetap bersih. */
function payload(): Record<string, unknown> {
  const allowed = new Set(entity.value!.fields.map((field) => field.name))
  const result: Record<string, unknown> = {}
  for (const [name, value] of Object.entries(model.value)) {
    if (allowed.has(name)) result[name] = value
  }
  return result
}

async function save() {
  notice.value = null
  saving.value = true
  const body = payload()
  const result = isNew.value
    ? await create<Record<string, unknown>>(key.value, body)
    : await update<Record<string, unknown>>(key.value, rawId.value, body)
  saving.value = false

  if (result === null) {
    notice.value = { type: 'error', text: lastError.value || 'Gagal menyimpan data.' }
    return
  }

  notice.value = { type: 'ok', text: isNew.value ? 'Data dibuat.' : 'Perubahan disimpan.' }
  if (isNew.value && result.id !== undefined) {
    await router.replace(`/admin/${key.value}/${result.id}`)
  } else if (result.id !== undefined) {
    model.value = { ...defaults(entity.value!.fields), ...result }
  }
}

async function destroy() {
  if (isNew.value) return
  const done = await remove(key.value, rawId.value)
  if (done) {
    await router.push(`/admin/${key.value}`)
  } else {
    notice.value = { type: 'error', text: lastError.value || 'Gagal menghapus data.' }
  }
}

useSeoMeta({ title: () => `${isNew.value ? 'Tambah' : 'Ubah'} ${entity.value?.singular} | CMS Lobunta` })
</script>

<template>
  <div v-if="entity" class="space-y-5">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <NuxtLink :to="`/admin/${entity.key}`" class="text-sm text-brand-700 hover:underline dark:text-brand-300">
          &larr; {{ entity.label }}
        </NuxtLink>
        <h1 class="mt-1 text-2xl">
          {{ isNew ? `Tambah ${entity.singular.toLowerCase()}` : `Ubah ${entity.singular.toLowerCase()}` }}
        </h1>
        <p v-if="!isNew" class="text-xs text-slate-500">
          ID {{ rawId }}
        </p>
      </div>

      <div class="flex flex-wrap gap-2">
        <button v-if="!isNew" type="button" class="btn-ghost text-red-600" @click="destroy">
          Hapus
        </button>
        <button type="button" class="btn-outline" :disabled="saving" @click="router.push(`/admin/${entity.key}`)">
          Batal
        </button>
        <button type="button" class="btn-primary" :disabled="saving || loading" @click="save">
          {{ saving ? 'Menyimpan...' : 'Simpan' }}
        </button>
      </div>
    </div>

    <p
      v-if="notice"
      class="rounded-lg px-4 py-3 text-sm"
      :class="notice.type === 'ok'
        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
        : 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300'"
      role="status"
    >
      {{ notice.text }}
    </p>

    <div v-if="loading" class="card px-5 py-10 text-center text-sm text-slate-500">
      Memuat data...
    </div>

    <form v-else class="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
      <div class="card space-y-6 p-6">
        <AdminField
          v-for="field in entity.fields"
          :key="field.name"
          v-model="model[field.name]"
          :field="field"
        />
      </div>

      <aside class="space-y-4">
        <div class="card p-5 text-sm text-slate-600 dark:text-slate-300">
          <h2 class="text-base">
            Endpoint
          </h2>
          <p class="mt-2 font-mono text-xs break-all">
            {{ isNew ? `POST /api/v1/admin/${entity.key}` : `PUT /api/v1/admin/${entity.key}/${rawId}` }}
          </p>
          <p class="mt-3 text-xs">
            Field bilingual dikirim sebagai objek <code class="font-mono">{ "id": "", "en": "" }</code>.
          </p>
        </div>
      </aside>
    </form>
  </div>
</template>