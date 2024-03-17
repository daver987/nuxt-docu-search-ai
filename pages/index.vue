<script setup lang="ts">
import { vAutoAnimate } from '@formkit/auto-animate'
import type { FormSubmitEvent } from '#ui/types'
import { z } from 'zod'
import type { Ref } from '#imports'
import { useWebSocket } from '@vueuse/core'
import MarkdownIt from 'markdown-it'
import Shiki from '@shikijs/markdown-it'

useSeoMeta({
  title: 'AI Powered Nuxt 3 Documentation Search',
  description:
    'Experience the power of AI in searching the Nuxt 3 documentation with NuxtDocuSearchAi. Discover content faster and more efficiently.',
  ogTitle: 'NuxtDocuSearchAi - AI Powered Nuxt 3 Documentation Search',
  ogDescription:
    'Unleash the potential of AI driven search for Nuxt 3 documentation. Dive into topics with unprecedented ease.',
  ogImage: '/images/nuxt-og-image.png',
  ogUrl: 'https://nuxtDocusearchAI.com',
  twitterTitle: 'Discover Nuxt 3 Docs with AI - NuxtDocuSearchAI',
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

const md = MarkdownIt()

md.use(
  await Shiki({
    themes: {
      light: 'one-dark-pro',
      dark: 'one-dark-pro',
    },
  })
)

const schema = z.object({
  content: z.string().min(1).max(5000),
})

type ChatMessage = z.infer<typeof schema>

const state: Ref<ChatMessage> = ref({
  content: '',
})

const history = ref<Array<{ content: string; role: string; id: number }>>([])
const url = useRequestURL()
const idNumber = ref(0)
const { data, send } = useWebSocket(`wss://${url.host}/api/ws/chat`)

watch(data, (newValue) => {
  console.log('New data received:', newValue) // Added logging for new data reception
  if (newValue) {
    const lastMessage = history.value[history.value.length - 1]
    console.log('Last message in history:', lastMessage) // Added logging for last message
    if (lastMessage && lastMessage.role === 'assistant') {
      lastMessage.content += useParsedEscapedString(newValue)
      history.value.splice(history.value.length - 1, 1, lastMessage)
      console.log(
        'Updated last assistant message with new content:',
        lastMessage
      )
    } else {
      history.value.push({
        content: newValue,
        role: 'assistant',
        id: idNumber.value++,
      })
      console.log('Added new assistant message to history:', newValue) // Added logging for new message addition
    }
  }
})

async function onSubmit(event: FormSubmitEvent<ChatMessage>) {
  console.log('Form submitted with data:', event.data) // Added logging for form submission
  history.value.push({
    content: event.data.content,
    role: 'user',
    id: idNumber.value++,
  })
  console.log('Added new user message to history:', event.data.content) // Added logging for new message addition
  send(JSON.stringify(event.data))
  console.log('Sent data to WebSocket:', JSON.stringify(event.data)) // Added logging for WebSocket data send
  state.value.content = ''
  console.log('Cleared state content after submission') // Added logging for state content clearance
}

const handleTextareaKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault()
    onSubmit({ data: state.value } as FormSubmitEvent<ChatMessage>)
  } else if (event.shiftKey && event.key === 'Enter') {
    event.stopPropagation()
    state.value.content += '\n'
  }
}
</script>

<template>
  <div>
    <main
      class="min-h-[75dvh] prose prose-sm dark:prose-invert max-w-none"
      v-auto-animate
    >
      <div class="mx-auto max-w-4xl">
        <div class="px-8">
          <div>
            <template v-for="message in history" :key="message.id">
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
                  <span class="pb-12 text" style="font-size: 1.5rem"
                    >Nuxt-AI</span
                  >
                  <div
                    class="prose prose-sm dark:prose-invert max-w-none"
                    v-html="md.render(message.content)"
                  ></div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>
    </main>

    <div
      class="sticky bottom-0 z-40 flex shrink-0 items-center gap-x-6 border-t border-black/10 bg-gray-200 px-4 shadow-sm dark:border-white/5 dark:bg-gray-950 sm:px-6 lg:px-8"
    >
      <div
        class="mx-auto w-full max-w-4xl bg-gray-200 pb-3 pt-6 dark:bg-gray-950"
      >
        <UForm :schema="schema" :state="state" @submit="onSubmit">
          <UFormGroup
            name="content"
            help="Tip: For best results, make sure to include the main keyword related to your query."
          >
            <div class="relative">
              <UTextarea
                v-model="state.content"
                placeholder="Type your Nuxt query here... e.g., 'Can you show me an advanced example of how to use useState?'"
                :autoresize="true"
                :rows="3"
                size="sm"
                @keydown.enter="handleTextareaKeydown"
                @keydown.shift.enter="handleTextareaKeydown"
              />
              <UButton
                class="absolute bottom-2 right-2"
                icon="i-heroicons-paper-airplane"
                type="submit"
                size="sm"
                color="primary"
                :square="true"
                variant="solid"
              />
            </div>
          </UFormGroup>
        </UForm>
      </div>
    </div>
  </div>
</template>

<style>
code {
  padding: 12px;
}
</style>
