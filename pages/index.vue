<script setup lang="ts">
import { ref, watch } from '#imports'
import { useChat } from 'ai/vue'
import type { Message } from 'ai'
import type { Ref } from 'vue'
import { vAutoAnimate } from '@formkit/auto-animate'
import { MdPreview } from 'md-editor-v3'
import { useParsedEscapedString } from '~/composables/useParsedEscapedString'

useSeoMeta({
  title: 'NuxtDocuSearchAi - AI Powered Nuxt 3 Documentation Search',
  description:
    'Experience the power of AI in searching the Nuxt 3 documentation with NuxtDocuSearchAi. Discover content faster and more efficiently.',
  ogTitle: 'NuxtDocuSearchAi - AI Powered Nuxt 3 Documentation Search',
  ogDescription:
    'Unleash the potential of AI driven search for Nuxt 3 documentation. Dive into topics with unprecedented ease.',
  ogImage: '/images/nuxt-og-image.png',
  ogUrl: 'https://nuxtDocusearchAi.com',
  twitterTitle: 'Discover Nuxt 3 Docs with AI - NuxtDocuSearchAi',
  twitterDescription:
    'Transform your documentation search experience with AI-powered NuxtDocuSearchAi. Find what you need in seconds.',
  twitterImage: '/images/nuxt-og-image.png',
  twitterCard: 'summary',
})

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  link: [
    {
      rel: 'icon',
      type: 'image/png',
      href: '/favicon.ico',
    },
  ],
})

definePageMeta({
  keepalive: true,
  colorMode: 'dark',
})

const { messages, input, handleSubmit, isLoading } = useChat({
  headers: { 'Content-Type': 'application/json' },
})
const parsedMessages: Ref<Message[]> = ref([])

watch(messages, (newMessages) => {
  parsedMessages.value = newMessages.map((message) => {
    if (message.role === 'assistant') {
      return {
        ...message,
        content: useParsedEscapedString(message.content),
      }
    }
    return message
  })
})

watch(isLoading, async (newValue) => {
  if (!newValue) {
    console.log('Done Loading', messages)
  }
})

const handleTextareaKeydown = (
  event: KeyboardEvent,
  submitFunction: Function
) => {
  if (event.shiftKey) {
    event.preventDefault()
    input.value += '\n'
  } else {
    submitFunction(event)
  }
}
</script>

<template>
  <div>
    <main class="min-h-[75dvh]" v-auto-animate>
      <template v-for="message in parsedMessages" :key="message.id">
        <div
          class="border-b border-black/10 p-8 dark:bg-gray-700"
          v-if="message.role === 'user'"
        >
          <div class="mx-auto max-w-4xl">
            <Icon class="mr-1.5" size="24px" name="solar:user-linear" />
            <span> {{ message.content }}</span>
          </div>
        </div>
        <div
          class="border-b border-black/10 bg-gray-200 p-8 dark:bg-gray-800"
          v-else
        >
          <div class="mx-auto max-w-4xl">
            <span class="pb-12 text-lg font-medium">Nuxt-AI</span>
            <span
              ><MdPreview
                language="en-US"
                theme="dark"
                :editorId="message.id"
                :modelValue="message.content"
                scrollAuto
                readonly
                autoDetectCode
            /></span>
          </div>
        </div>
      </template>
    </main>

    <div
      class="sticky bottom-0 z-40 flex shrink-0 items-center gap-x-6 border-t border-black/10 bg-gray-200 px-4 shadow-sm dark:border-white/5 dark:bg-gray-950 sm:px-6 lg:px-8"
    >
      <div
        class="mx-auto w-full max-w-4xl bg-gray-200 pb-3 pt-6 dark:bg-gray-950"
      >
        <form @submit.prevent="handleSubmit">
          <UFormGroup
            name="chatQuestion"
            help="Tip: For best results, make sure to include the main keyword related to your query."
          >
            <div class="relative">
              <UTextarea
                v-model="input"
                placeholder="Type your Nuxt query here... e.g., 'Can you show me an advanced example of how to use useState?'"
                autoresize
                :rows="3"
                size="sm"
                @keydown.enter="
                  (event: KeyboardEvent) =>
                    handleTextareaKeydown(event, handleSubmit)
                "
                @keydown.shift.enter="(event: any) => event.stopPropagation()"
              />
              <UButton
                class="absolute bottom-2 right-2"
                icon="i-heroicons-paper-airplane"
                type="submit"
                size="sm"
                color="primary"
                square
                variant="solid"
                @click="handleSubmit"
              />
            </div>
          </UFormGroup>
        </form>
      </div>
    </div>
  </div>
</template>

<style>
code {
  padding: 12px;
}
</style>
