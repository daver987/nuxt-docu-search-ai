<script setup lang="ts">
import { useChat } from 'ai/vue'

const { messages, input, handleInputChange, handleSubmit } = useChat()

const colorMode = useColorMode()
const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (value: boolean) => (colorMode.preference = value ? 'dark' : 'light'),
})

// Define state variables
const isOpen = ref(false)
const q = ref('')
const navInput = ref('')

// Define shortcut keys with defineShortcuts
defineShortcuts({
  meta_k: {
    usingInput: true,
    handler: () => {
      isOpen.value = !isOpen.value
    },
  },
})
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
      <div>
        <UButton label="Open" @click="isOpen = true" />

        <UModal class="max-h-[500px]" v-model="isOpen">
          <UCard
            class="card-component mx-auto max-h-[650px] w-full max-w-3xl px-1"
            :ui="{ divide: 'divide-y divide-gray-100 dark:divide-gray-800' }"
          >
            <template #header> Query the Nuxt Documentation...</template>
            <div class="card-component max-h-[450px] w-full">
              <UCard
                v-for="message in messages"
                :key="message.id"
                class="m-1 mb-2 whitespace-pre-wrap"
              >
                <span
                  ><Icon
                    class="mr-1.5"
                    size="24px"
                    :name="
                      message.role === 'user'
                        ? 'solar:user-linear'
                        : 'solar:soundwave-square-line-duotone'
                    "
                  />
                  <span class="ml-1">{{
                    message.role === 'user' ? 'User: ' : 'AI: '
                  }}</span>
                  <span class="ml-1">{{ message.content }}</span></span
                >
              </UCard>
            </div>
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
        </UModal>
      </div>
    </UContainer>
  </div>
</template>

<style scoped>
.card-component {
  overflow-y: auto !important;
}
</style>
