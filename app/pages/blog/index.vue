<script setup lang="ts">
import type { PostItem } from '~/types/content'

const { locale, t } = useI18n()

const { data: posts } = await useCms<PostItem[]>('posts', 'published')

const sorted = computed(() =>
  [...posts.value].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
)

useSeoMeta({
  title: () => `${t('blog.title')} | Lobunta Lubricants`,
  description: () => t('blog.intro')
})
</script>

<template>
  <div>
    <PageHero
      :eyebrow="$t('nav.blog')"
      :title="$t('blog.heading')"
      :intro="$t('blog.intro')"
    />

    <section class="section">
      <div class="container-page">
        <div v-if="sorted.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <article v-for="post in sorted" :key="post.id" class="card flex flex-col overflow-hidden">
            <NuxtLink :to="`/${locale}/blog/${post.slug}`" class="flex h-full flex-col">
              <div class="aspect-[16/9] bg-brand-50 dark:bg-white/5">
                <img v-if="post.cover" :src="post.cover" :alt="pick(post.title)" class="h-full w-full object-cover" loading="lazy">
              </div>
              <div class="flex flex-1 flex-col p-5">
                <div class="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                  <span>{{ pick(post.category) }}</span>
                  <span class="text-ink-mute">{{ $t('blog.readingTime', { minutes: post.readingMinutes }) }}</span>
                </div>
                <h2 class="mt-2 text-lg leading-snug">
                  {{ pick(post.title) }}
                </h2>
                <p class="prose-lkr mt-3 flex-1 text-sm line-clamp-3">
                  {{ pick(post.excerpt) }}
                </p>
                <p class="mt-4 text-xs text-ink-mute">
                  {{ $t('blog.publishedOn') }} {{ formatDate(post.publishedAt, locale) }}
                </p>
              </div>
            </NuxtLink>
          </article>
        </div>
        <p v-else class="prose-lkr">
          {{ $t('blog.empty') }}
        </p>
      </div>
    </section>
  </div>
</template>