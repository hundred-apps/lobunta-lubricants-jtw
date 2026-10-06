<script setup lang="ts">
import { findEntity } from '~/admin/entityConfig'

definePageMeta({ layout: 'admin' })

const route = useRoute()
const router = useRouter()
const { list, remove, lastError } = useAdminApi()

const key = computed(() => String(route.params.entity || ''))
const entity = computed(() => findEntity(key.value))

if (!entity.value) {
  throw createError({ statusCode: 404, statusMessage: 'Unknown admin section', fatal: true })
}

const rows = ref<Array<Record<string, unknown>>>([])
const total = ref(0)
const loading = ref(true)
const keyword = ref('')
const page = ref(1)
const limit = 20
const pendingDelete = ref<Record<string, unknown> | null>(null)
const deleting = ref(false)

async function load() {
  loading.value = true
  const target = entity.value
  if (!target) {
    loading.value = false
    return
  }
  const result = await list<Record<string, unknown>>(key.value, {
    q: keyword.value || undefined,
    page: page.value,
    limit,
    sort: target.defaultSort,
    order: 'asc'
  })
  rows.value = result.data
  total.value = result.total
  loading.value = false
}

watch([page, keyword], () => load())

async function confirmDelete() {
  if (!pendingDelete.value) return
  deleting.value = true
  const done = await remove(key.value, String(pendingDelete.value.id ?? ''))
  deleting.value = false
  pendingDelete.value = null
  if (done) await load()
}

const pageCount = computed(() => Math.max(1, Math.ceil(total.value / limit)))

useSeoMeta({ title: () => `${entity.value?.label} | CMS Lobunta` })
</script>

<template>
  <div v-if="entity" class="space-y-5">
    <div class="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h1 class="text-2xl">
          {{ entity.label }}
        </h1>
        <p v-if="entity.help" class="mt-1 text-sm text-slate-600 dark:text-slate-300">
          {{ entity.help }}
        </p>
        <p class="mt-1 text-xs text-slate-500">
          {{ total }} data
        </p>
      </div>

      <div class="flex flex-wrap items-center gap-2">
        <input
          v-model="keyword"
          type="search"
          class="field !w-64"
          placeholder="Cari data..."
        >
        <button type="button" class="btn-outline !py-2" :disabled="loading" @click="load">
          <UiIcon name="check" :size="16" />
          Muat ulang
        </button>
        <NuxtLink v-if="!entity.readOnly" :to="`/admin/${entity.key}/new`" class="btn-primary !py-2">
          Tambah {{ entity.singular.toLowerCase() }}
        </NuxtLink>
      </div>
    </div>

    <AdminDataTable
      :columns="entity.columns"
      :rows="rows"
      :loading="loading"
      :error="lastError"
      @edit="(id) => router.push(`/admin/${key}/${id}`)"
      @remove="(row) => pendingDelete = row"
    />

    <div v-if="pageCount > 1" class="flex items-center justify-between text-sm">
      <button type="button" class="btn-outline !py-2" :disabled="page <= 1" @click="page -= 1">
        Sebelumnya
      </button>
      <span class="text-slate-500">
        Halaman {{ page }} dari {{ pageCount }}
      </span>
      <button type="button" class="btn-outline !py-2" :disabled="page >= pageCount" @click="page += 1">
        Berikutnya
      </button>
    </div>

    <Teleport to="body">
      <div v-if="pendingDelete" class="fixed inset-0 z-50 grid place-items-center bg-slate-900/60 p-4">
        <div class="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-brand-950">
          <h2 class="text-lg">
            Hapus {{ entity.singular.toLowerCase() }}?
          </h2>
          <p class="mt-2 text-sm text-slate-600 dark:text-slate-300">
            Tindakan ini tidak bisa dibatalkan di backend. Lanjutkan hanya jika yakin.
          </p>
          <div class="mt-6 flex justify-end gap-2">
            <button type="button" class="btn-outline" @click="pendingDelete = null">
              Batal
            </button>
            <button type="button" class="btn-accent" :disabled="deleting" @click="confirmDelete">
              {{ deleting ? 'Menghapus...' : 'Ya, hapus' }}
            </button>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>