<script setup lang="ts">
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const { data: settings } = await useCompany()

useSeoMeta({
  title: () => `${t('meta.profileTitle')} | Lobunta Lubricants`,
  description: () => t('meta.profileDescription')
})
</script>

<template>
  <div>
    <section class="section">
      <div class="container-page">
        <UiSectionHeading
          :eyebrow="$t('nav.profile')"
          :heading="t('profile.heading')"
          :body="t('profile.intro')"
        />
        <div class="container-page grid gap-12 lg:grid-cols-[1.4fr_0.6fr]">
          <ProseBlock :html="t('profile.body')" />

          <aside v-if="settings" class="space-y-6">
            <div class="card p-6">
              <h2 class="text-base">
                {{ $t('profile.contactTitle') }}
              </h2>
              <dl class="mt-4 space-y-4 text-sm">
                <div>
                  <dt class="text-xs uppercase tracking-wider text-ink-mute">
                    {{ $t('profile.legalName') }}
                  </dt>
                  <dd class="mt-0.5 font-medium">{{ settings.legalName }}</dd>
                </div>
                <div>
                  <dt class="text-xs uppercase tracking-wider text-ink-mute">
                    {{ $t('common.address') }}
                  </dt>
                  <dd class="mt-0.5">{{ pick(settings.address) }}</dd>
                </div>
                <div>
                  <dt class="text-xs uppercase tracking-wider text-ink-mute">
                    {{ $t('common.callUs') }}
                  </dt>
                  <dd class="mt-0.5 space-y-1">
                    <a
                      v-for="phone in settings.phone"
                      :key="phone"
                      :href="`tel:+62${phone.replace(/^0/, '')}`"
                      class="block font-medium text-brand-700 hover:underline dark:text-brand-300"
                    >
                      {{ phone }}
                    </a>
                    <span class="block text-ink-soft dark:text-slate-400">
                      {{ $t('profile.fax') }}: 021-8480521
                    </span>
                  </dd>
                </div>
                <div>
                  <dt class="text-xs uppercase tracking-wider text-ink-mute">
                    {{ $t('common.email') }}
                  </dt>
                  <dd class="mt-0.5">
                    <a :href="`mailto:${settings.email}`" class="font-medium text-brand-700 hover:underline dark:text-brand-300">
                      {{ settings.email }}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt class="text-xs uppercase tracking-wider text-ink-mute">
                    {{ $t('common.openHours') }}
                  </dt>
                  <dd class="mt-0.5">{{ pick(settings.officeHours) }}</dd>
                </div>
              </dl>
            </div>

            <div class="card p-6">
              <p class="text-sm text-ink-soft dark:text-slate-300">
                {{ $t('common.downloadProfile') }}
              </p>
              <a
                v-if="settings"
                :href="whatsappLink(settings.whatsapp, 'Halo, saya ingin menerima company profile dalam format PDF.')"
                target="_blank"
                rel="noopener"
                class="btn-primary mt-4 w-full"
              >
                <UiIcon name="document" :size="16" />
                {{ $t('career.requestProfile') }}
              </a>
            </div>
          </aside>
        </div>
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