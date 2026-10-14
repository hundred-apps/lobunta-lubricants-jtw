<script setup lang="ts">
import type { SiteSettings } from "~/types/content";

const { locale, t } = useI18n();
const { data: settings } = await useCompany();

const details = computed(() => {
  if (!settings.value) return [];
  const value: SiteSettings = settings.value;
  return [
    {
      icon: "map-pin",
      label: t("common.address") + " " + t("contact.officeTitle"),
      value: pick(value.address),
      href: undefined,
    },
    {
      icon: "phone",
      label: t("common.callUs"),
      value: value.phone.join(" / "),
      href: `tel:+62${value.phone[0]?.replace(/^0/, "")}`,
    },
    {
      icon: "mail",
      label: t("common.email"),
      value: value.email,
      href: `mailto:${value.email}`,
    },
    {
      icon: "clock",
      label: t("common.openHours"),
      value: pick(value.officeHours),
      href: undefined,
    },
  ];
});

useSeoMeta({
  title: () => `${t("contact.title")} | Lobunta Lubricants`,
  description: () => t("contact.intro"),
});
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
          <ul class="space-y-4">
            <li
              v-for="item in details"
              :key="item.label"
              class="card flex items-start gap-4 p-5"
            >
              <span
                class="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-700 dark:bg-white/10 dark:text-brand-300"
              >
                <UiIcon :name="item.icon" :size="20" />
              </span>
              <span>
                <span
                  class="block text-xs uppercase tracking-wider text-ink-mute"
                  >{{ item.label }}</span
                >
                <component
                  :is="item.href ? 'a' : 'span'"
                  :href="item.href"
                  class="mt-1 block font-medium text-brand-900 dark:text-white"
                  :class="
                    item.href
                      ? 'hover:text-brand-600 hover:underline dark:hover:text-brand-300'
                      : ''
                  "
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d294.7722262050964!2d106.91145251673001!3d-6.268131890420157!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e698d38a48819c1%3A0xda59f5e90d59bb4f!2sLobunta%20Pelumas%20%2F%20Jual%20Oli%20Pertamina!5e0!3m2!1sid!2sid!4v1791799489522!5m2!1sid!2sid"
              width="600"
              height="450"
              style="border: 0"
              allowfullscreen="true"
              loading="lazy"
              referrerpolicy="strict-origin-when-cross-origin"
              class="h-72 w-full"
            />
          </div>
        </div>

        <ContactForm />
      </div>
    </section>

    <section class="section section-alt">
      <div class="container-page">
        <NuxtLink :to="`/${locale}/products`" class="btn-outline">
          {{ $t("nav.products") }}
          <UiIcon name="arrow-right" :size="16" />
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
