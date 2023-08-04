<script setup lang="ts">
import { ref, onUpdated } from '#imports'
import { MdPreview } from 'md-editor-v3'
import { useChat } from 'ai/vue'

const { messages, input, handleSubmit } = useChat()

const form = ref()
const state = {
  inputState: input,
}
const chatContainer = ref(null)

onUpdated(() => {
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight
  }
})
</script>

<template>
  <div>
    <main class="min-h-[75dvh]" ref="chatContainer">
      <template v-for="message in messages" :key="message.id">
        <div v-if="message.role === 'user'" class="bg-gray-700 p-8">
          <div class="mx-auto max-w-4xl">
            <Icon class="mr-1.5" size="24px" name="solar:user-linear" />
            <span> {{ message.content }}</span>
          </div>
        </div>
        <div v-else class="bg-gray-800 p-8">
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
    <!-- Rest of the template -->
  </div>
</template>
      class="sticky bottom-0 z-40 flex shrink-0 items-center gap-x-6 border-t border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8"
    >
      <div class="mx-auto w-full max-w-4xl bg-gray-900 py-8">
        <UForm ref="form" :state="state" @submit.prevent="handleSubmit">
          <UFormGroup name="chatQuestion">
            <div class="relative">
              <UTextarea
                v-model="input"
                placeholder="Ask any question to the AI about Nuxt 3..."
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
