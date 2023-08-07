<script setup lang="ts">
import { ref, watch } from '#imports'
import { MdPreview } from 'md-editor-v3'
import { useChat } from 'ai/vue'

const { messages, input, handleSubmit } = useChat()

const form = ref()
const state = {
  inputState: input,
}
const chatContainer = ref(null)

const scrollToBottom = () => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
}

watch(
  input,
  () => {
    scrollToBottom()
  },
  { immediate: true }
)
</script>

<template>
  <div ref="chatContainer">
    <main class="min-h-[75dvh]">
      <template v-for="message in messages" :key="message.id">
        <div
          v-if="message.role === 'user'"
          class="border-b border-black/10 p-8 dark:bg-gray-700"
        >
          <div class="mx-auto max-w-4xl">
            <Icon class="mr-1.5" size="24px" name="solar:user-linear" />
            <span> {{ message.content }}</span>
          </div>
        </div>
        <div
          v-else
          class="border-b border-black/10 bg-gray-200 p-8 dark:bg-gray-800"
        >
          <div class="mx-auto max-w-4xl">
            <span class="pb-12 text-lg font-medium">Nuxt-AI</span>
            <span
              ><MdPreview
                language="en-US"
                theme="dark"
                :editorId="message.id"
                :modelValue="message.content"
            /></span>
          </div>
        </div>
      </template>
    </main>

    <div
      class="sticky bottom-0 z-40 flex shrink-0 items-center gap-x-6 border-t border-black/10 bg-gray-200 px-4 shadow-sm dark:border-white/5 dark:bg-gray-900 sm:px-6 lg:px-8"
    >
      <div class="mx-auto w-full max-w-4xl bg-gray-200 py-8 dark:bg-gray-900">
        <UForm ref="form" :state="state" @submit.prevent="handleSubmit">
          <UFormGroup
            name="chatQuestion"
            help="Tip: For best results, make sure to include the main keyword related to your query.
"
          >
            <div class="relative">
              <UTextarea
                v-model="input"
                placeholder="Type your Nuxt 3 query here... e.g., 'How do I set up middleware in Nuxt 3?'"
                autoresize
                :rows="3"
                class="pr-10"
                size="sm"
                @keydown.enter.prevent="handleSubmit"
                @keydown.shift.enter="(event: any) => event.stopPropagation()"
              />
              <UButton
                icon="i-heroicons-paper-airplane"
                type="submit"
                size="sm"
                color="primary"
                square
                variant="solid"
                class="absolute bottom-2 right-2"
              />
            </div>
          </UFormGroup>
        </UForm>
      </div>
    </div>
  </div>
</template>
