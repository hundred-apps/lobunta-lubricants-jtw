<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

useSeoMeta({
  title: () => `${t('meta.privacyTitle')} | Lobunta Lubricants`,
  description: () => t('meta.privacyDescription')
})
</script>

<template>
  <div>
    <section class="section">
      <div class="container-page">
        <UiSectionHeading
          :eyebrow="pick($t('nav.privacy'))"
          :heading="t('privacy.heading')"
          :body="t('privacy.intro')"
        />
        <div class="prose-lkr max-w-3xl">
          <p v-if="t('privacy.body.id')">{{ t('privacy.body.id') }}</p>
          <p v-if="t('privacy.body.en')">{{ t('privacy.body.en') }}</p>
        </div>
        <p class="mt-8 text-xs text-ink-mute">
          {{ $t('blog.publishedOn') }} {{ new Date().toLocaleDateString() }}
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