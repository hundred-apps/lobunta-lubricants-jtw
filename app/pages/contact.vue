<script setup lang="ts">
import type { SiteSettings } from '~/types/content'

const { locale, t } = useI18n()
const { data: settings } = await useCompany()

const details = computed(() => {
  if (!settings.value) return []
  const value: SiteSettings = settings.value
  return [
    { icon: 'map-pin', label: t('common.address'), value: pick(value.address), href: undefined },
    { icon: 'phone', label: t('common.callUs'), value: value.phone.join(' / '), href: `tel:+62${value.phone[0]?.replace(/^0/, '')}` },
    { icon: 'mail', label: t('common.email'), value: value.email, href: `mailto:${value.email}` },
    { icon: 'clock', label: t('common.openHours'), value: pick(value.officeHours), href: undefined }
  ]
})

useSeoMeta({
  title: () => `${t('contact.title')} | Lobunta Lubricants`,
  description: () => t('contact.intro')
})
</script>

<template>
  <div>
    <PageHero
      :eyebrow="$t('nav.contact')"
      :title="$t('contact.heading')"
      :intro="$t('contact.intro')"
    />

    <section class="section">
      <div class="container-page grid gap-10 lg:grid-cols-[1fr_1fr]">
        <div class="space-y-6">
          <h2 class="text-xl">
            {{ $t('contact.officeTitle') }}
          </h2>
          <ul class="space-y-4">
            <li
              v-for="item in details"
              :key="item.label"
              class="card flex items-start gap-4 p-5"
            >
              <span class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300">
                <UiIcon :name="item.icon" :size="20" />
              </span>
              <span>
                <span class="block text-xs uppercase tracking-wider text-ink-mute">{{ item.label }}</span>
                <component
                  :is="item.href ? 'a' : 'span'"
                  :href="item.href"
                  class="mt-1 block font-medium text-brand-900 dark:text-white"
                  :class="item.href ? 'hover:text-brand-600 hover:underline dark:hover:text-brand-300' : ''"
                >
                  {{ item.value }}
                </component>
              </span>
            </li>
          </ul>

          <div
            v-if="settings"
            class="overflow-hidden rounded-2xl border border-slate-200 dark:border-white/10"
          >
            <iframe
              title="Lobunta Lubricants"
              src="https://www.openstreetmap.org/export/embed.html?bbox=106.9750%2C-6.2900%2C107.0200%2C-6.2600&layer=mapnik&marker=-6.2750%2C106.9975"
              class="h-72 w-full"
              loading="lazy"
            />
          </div>
        </div>

        <ContactForm :settings="settings" />
      </div>
    </section>

    <section class="section section-alt">
      <div class="container-page">
        <NuxtLink :to="`/${locale}/products`" class="btn-outline">
          {{ $t('nav.products') }}
          <UiIcon name="arrow-right" :size="16" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>