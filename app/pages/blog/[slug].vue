<script setup lang="ts">
import type { PostItem } from '~/types/content'

const route = useRoute()
const { locale, t } = useI18n()

const slug = computed(() => String(route.params.slug || ''))
const { data: posts } = await useCms<PostItem[]>('posts', 'published')

const post = computed(() => posts.value.find((item) => item.slug === slug.value) ?? null)

if (!post.value) {
  throw createError({ statusCode: 404, statusMessage: 'Post not found', fatal: true })
}

useSeoMeta({
  title: () => `${pick(post.value!.title)} | Lobunta Lubricants`,
  description: () => pick(post.value!.excerpt),
  ogType: 'article'
})
</script>

<template>
  <article v-if="post" class="pb-16">
    <PageHero
      :eyebrow="pick(post.category)"
      :title="pick(post.title)"
      :intro="pick(post.excerpt)"
      :image="post.cover"
    />

    <div class="container-page grid gap-10 pt-10 lg:grid-cols-[1.6fr_0.4fr]">
      <ProseBlock :html="pick(post.body)" />

      <aside class="space-y-6">
        <div class="card p-5 text-sm">
          <p class="text-xs uppercase tracking-wider text-ink-mute">
            {{ $t('blog.publishedOn') }}
          </p>
          <p class="mt-1 font-medium">
            {{ formatDate(post.publishedAt, locale) }}
          </p>
          <p class="mt-4 text-xs uppercase tracking-wider text-ink-mute">
            {{ $t('blog.readingTime', { minutes: post.readingMinutes }) }}
          </p>
          <p v-if="post.author" class="mt-4 text-xs uppercase tracking-wider text-ink-mute">
            {{ post.author }}
          </p>
        </div>
        <NuxtLink :to="`/${locale}/blog`" class="btn-outline w-full">
          <UiIcon name="arrow-right" :size="16" style="transform: rotate(180deg)" />
          {{ $t('blog.backToBlog') }}
        </NuxtLink>
      </aside>
    </div>
  </article>
</template>