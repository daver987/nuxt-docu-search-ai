<script setup lang="ts">
import { useChat } from 'ai/vue'
import { nextTick } from '#imports'
import { MdPreview } from 'md-editor-v3'

const { messages, input, handleInputChange, handleSubmit } = useChat()

const colorMode = useColorMode()
const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (value) => (colorMode.preference = value ? 'light' : 'dark'),
})

const isOpen = ref(false)
const q = ref('')
const navInput = ref('')

defineShortcuts({
  meta_k: {
    usingInput: true,
    handler: () => {
      isOpen.value = !isOpen.value
    },
  },
})

const countAndCompleteCodeBlocks = (text: string) => {
  const codeBlocks = text.split('```').length - 1
  if (codeBlocks && codeBlocks % 2 !== 0) {
    return text + '\n```\n'
  }
  return text
}

watch(
  () => messages.value,
  () => {
    nextTick(() => {
      scrollToBottom(document.querySelector('.message-container'))
    })
  },
  {
    deep: true,
  }
)
</script>

<template>
  <div class="fixed h-screen w-full dark:bg-gray-900">
    <div
      class="sticky top-0 z-40 mx-auto flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 px-4 shadow-sm sm:px-6 lg:px-8"
    >
      <div class="mx-auto flex w-full max-w-7xl justify-between">
        <div class="flex-1">
          <a class="text-xl">Nuxt DocuSearch AI</a>
        </div>
        <div class="flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6">
          <div class="relative max-w-xs">
            <UInput
              class="cursor-pointer"
              v-model="navInput"
              name="navInput"
              placeholder="Search..."
              icon="i-heroicons-magnifying-glass-20-solid"
              :ui="{ icon: { trailing: { pointer: '' } } }"
              @click="isOpen = true"
            >
              <template #trailing>
                <UButton
                  v-show="q !== ''"
                  color="gray"
                  variant="link"
                  icon="i-heroicons-x-mark-20-solid"
                  :padded="false"
                  @click="q = ''"
                />
                <UKbd class="p-0.5">⌘ K</UKbd>
              </template>
            </UInput>
          </div>
          <ClientOnly>
            <UButton
              :icon="
                isDark
                  ? 'i-heroicons-moon-20-solid'
                  : 'i-heroicons-sun-20-solid'
              "
              color="gray"
              variant="ghost"
              aria-label="Theme"
              @click="isDark = !isDark"
            />
            <template #fallback>
              <div class="h-8 w-8 rounded-full" />
            </template>
          </ClientOnly>
        </div>
      </div>
    </div>
    <UContainer class="h-full p-6">
      <UCard
        class="card-component mx-auto max-h-[650px] w-full max-w-4xl px-1"
        :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
      >
        <template #header> Query the Nuxt Documentation...</template>

        <template v-for="message in messages" :key="message.id">
          <UCard
            class="m-1 mb-2 whitespace-pre-wrap py-2"
            v-if="message.role === 'user'"
          >
            <div class="message-container align-center text-pre-wrap">
              <Icon class="mr-1.5" size="24px" name="solar:user-linear" />
              <span> {{ message.content }}</span>
            </div>
          </UCard>
          <UCard v-else class="space-y-4">
            <span class="pb-12 text-lg font-medium">Nuxt-AI</span>
            <span
              ><MdPreview
                language="en-US"
                theme="dark"
                :editorId="message.id"
                :modelValue="message.content"
            /></span>
          </UCard>
        </template>

        <template #footer>
          <form @submit="handleSubmit">
            <UInput
              @change="handleInputChange"
              v-model="input"
              name="chatQuestion"
              placeholder="Search..."
              icon="i-heroicons-magnifying-glass-20-solid"
              :ui="{ icon: { trailing: { pointer: '' } } }"
            >
              <template #trailing>
                <UButton
                  v-show="q !== ''"
                  color="gray"
                  variant="link"
                  icon="i-heroicons-x-mark-20-solid"
                  :padded="false"
                  @click="q = ''"
                />
              </template>
            </UInput>
          </form>
        </template>
      </UCard>
    </UContainer>
  </div>
</template>

<style scoped>
.card-component {
  overflow-y: auto !important;
}
</style>
