<script setup lang="ts">
import type { PromotionItem } from '~/types/content'

const { t } = useI18n()

const { data: promotions } = useCms<PromotionItem[]>('promotions', 'all')

const active = computed(() =>
  [...promotions.value].filter((item) => item.isActive).sort((a, b) => a.order - b.order)
)

useSeoMeta({
  title: () => `${t('promotion.title')} | Lobunta Lubricants`,
  description: () => t('promotion.intro')
})
</script>

<template>
  <div>
    <PageHero
      :eyebrow="$t('nav.promotion')"
      :title="$t('promotion.heading')"
      :intro="$t('promotion.intro')"
    />

    <section class="section">
      <div class="container-page">
        <div v-if="active.length" class="grid gap-6 lg:grid-cols-2">
          <article v-for="promo in active" :key="promo.id" class="card overflow-hidden">
            <div class="aspect-[16/9] bg-brand-50 dark:bg-white/5">
              <img v-if="promo.cover" :src="promo.cover" :alt="pick(promo.title)" class="h-full w-full object-cover" loading="lazy">
            </div>
            <div class="p-6 sm:p-8">
              <h2 class="mt-2 text-xl">
                {{ pick(promo.title) }}
              </h2>
              <p v-if="pick(promo.description)" class="prose-lkr mt-2 text-sm">
                {{ pick(promo.description) }}
              </p>
              <ProseBlock :html="pick(promo.body)" class="mt-4" />
              <div v-if="promo.products && promo.products.length > 0" class="mt-6 rounded-xl bg-slate-50 p-4 text-xs dark:bg-white/5">
                <h3 class="font-semibold uppercase tracking-wider text-ink-mute">
                  {{ $t('promotion.products') }}
                </h3>
                <span v-for="product in promo.products" :key="product" class="ml-2 text-brand-600 dark:text-brand-300">
                  {{ product }}
                </span>
              </div>
            </div>
          </article>
        </div>
        <p v-else class="prose-lkr">
          {{ $t('promotion.empty') }}
        </p>
      </div>
    </section>

    <CtaBanner
      :heading="t('services.contactCta')"
      :body="t('contact.intro')"
      :button-label="t('nav.contact')"
      button-to="/contact"
    />
  </div>
</template>