<script lang="ts" setup>
import { ref } from '#imports'

const colorMode = useColorMode()
const isDark = computed({
  get: () => colorMode.value === 'dark',
  set: (value) => (colorMode.preference = value ? 'light' : 'dark'),
})

const isOpen = ref(false)
</script>

<template>
  <div
    class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8"
  >
    <span>Query the Nuxt Documentation...</span>
    <div class="flex flex-1 justify-end gap-x-4 self-stretch lg:gap-x-6">
      <ClientOnly>
        <UButton
          :icon="
            isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
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
</template>
