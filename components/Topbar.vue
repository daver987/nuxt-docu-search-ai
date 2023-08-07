<script lang="ts" setup>
const colorMode = useColorMode()

const isDark = computed({
  get() {
    return colorMode.value === 'dark'
  },
  set() {
    colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
  },
})
</script>

<template>
  <div
    class="top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-black/10 bg-gray-200 px-4 shadow-sm dark:border-white/5 dark:bg-gray-900 sm:px-6 lg:px-8"
  >
    <span>Query the Nuxt Documentation...</span>
    <div class="flex flex-1 justify-end gap-x-4 lg:gap-x-6">
      <ClientOnly>
        <UButton
          :icon="
            isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'
          "
          color="green"
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
