<script setup lang="ts">
import type { ProductItem } from '~/types/content'

defineProps<{ product: ProductItem }>()

const { data: categories } = await useCms<import('~/types/content').ProductCategory[]>('product-categories', 'all')
const { locale } = useI18n()

function categoryName(slug: string) {
  const found = categories.value.find((item) => item.slug === slug)
  return found ? pick(found.name) : ''
}
</script>

<template>
  <article class="card flex flex-col overflow-hidden">
    <div class="aspect-[4/3] w-full bg-brand-50 dark:bg-white/5">
      <img
        v-if="product.image"
        :src="product.image"
        :alt="pick(product.name)"
        class="h-full w-full object-cover"
        loading="lazy"
      >
      <div v-else class="grid h-full w-full place-items-center text-brand-300 dark:text-white/20">
        <UiIcon name="lab" :size="48" :stroke-width="1.2" />
      </div>
    </div>
    <div class="flex flex-1 flex-col p-5">
      <p class="text-[11px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
        {{ categoryName(product.categorySlug) }}
      </p>
      <h3 class="mt-2 text-base">
        {{ pick(product.name) }}
      </h3>
      <p v-if="product.sku" class="mt-1 font-mono text-xs text-ink-mute">
        {{ product.sku }}
      </p>
      <p class="prose-lkr mt-3 flex-1 text-sm line-clamp-3">
        {{ pick(product.description) }}
      </p>
      <dl v-if="product.spec?.length" class="mt-4 space-y-1.5 border-t border-slate-100 pt-4 text-xs dark:border-white/10">
        <div v-for="spec in product.spec" :key="spec.label.en" class="flex justify-between gap-4">
          <dt class="text-ink-soft dark:text-slate-400">{{ pick(spec.label) }}</dt>
          <dd class="text-right font-medium">{{ pick(spec.value) }}</dd>
        </div>
      </dl>
    </div>
  </article>
</template>