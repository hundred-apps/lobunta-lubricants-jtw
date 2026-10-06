<script setup lang="ts">
import type { CareerItem } from '~/types/content'

const { locale, t } = useI18n()

const { data: careers } = await useCms<CareerItem[]>('careers', 'all')
const { data: settings } = await useCompany()

const openRoles = computed(() => careers.value.filter((item) => item.isOpen))

function mailtoLink(job: CareerItem) {
  const subject = encodeURIComponent(`Application: ${job.title.en} (${job.slug})`)
  const body = encodeURIComponent([
    `Position: ${job.title.en}`,
    `Location: ${job.location.en}`,
    '',
    'CV:',
    '',
    'Portfolio / LinkedIn:'
  ].join('\n'))
  return `mailto:${settings.value?.email || ''}?subject=${subject}&body=${body}`
}

useSeoMeta({
  title: () => `${t('career.title')} | Lobunta Lubricants`,
  description: () => t('career.intro')
})
</script>

<template>
  <div>
    <PageHero
      :eyebrow="$t('nav.career')"
      :title="$t('career.heading')"
      :intro="$t('career.intro')"
    />

    <section class="section">
      <div class="container-page">
        <UiSectionHeading :heading="$t('career.openPositions')" />

        <div v-if="openRoles.length" class="mt-8 space-y-5">
          <article v-for="job in openRoles" :key="job.id" class="card p-6 sm:p-8">
            <div class="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 class="text-xl">
                  {{ pick(job.title) }}
                </h2>
                <div class="mt-3 flex flex-wrap gap-2">
                  <span class="chip">
                    <UiIcon name="map-pin" :size="13" class="mr-1" />{{ pick(job.location) }}
                  </span>
                  <span class="chip">
                    <UiIcon name="clock" :size="13" class="mr-1" />{{ pick(job.employmentType) }}
                  </span>
                  <span class="chip">
                    <UiIcon name="factory" :size="13" class="mr-1" />{{ pick(job.department) }}
                  </span>
                </div>
              </div>
              <p class="text-xs text-ink-mute">
                {{ $t('career.postedOn') }} {{ formatDate(job.postedAt, locale) }}
              </p>
            </div>

            <ProseBlock :html="pick(job.description)" class="mt-4" />

            <div v-if="pickList(job.requirements).length" class="mt-6 rounded-xl bg-brand-50 p-5 dark:bg-white/5">
              <h3 class="text-sm font-semibold uppercase tracking-wider text-brand-800 dark:text-brand-200">
                {{ $t('career.requirements') }}
              </h3>
              <ul class="mt-3 space-y-2 text-sm">
                <li v-for="(item, index) in pickList(job.requirements)" :key="index" class="flex gap-2">
                  <UiIcon name="check" :size="16" class="mt-0.5 text-brand-600 dark:text-brand-400" />
                  <span>{{ item }}</span>
                </li>
              </ul>
            </div>

            <a :href="mailtoLink(job)" class="btn-primary mt-6">
              <UiIcon name="mail" :size="16" />
              {{ $t('career.apply') }}
            </a>
          </article>
        </div>
        <p v-else class="prose-lkr mt-8">
          {{ $t('career.empty') }}
        </p>
      </div>
    </section>
  </div>
</template>