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
    class="top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-black/10 bg-gray-200 px-4 shadow-sm dark:border-white/5 dark:bg-gray-950 sm:px-6 lg:px-8"
  >
    <span>Query the Nuxt Documentation...</span>
    <div class="flex flex-1 justify-end gap-x-4 lg:gap-x-6">
      <UButton
        size="xl"
        variant="link"
        color="white"
        :padded="false"
        icon="i-ion-logo-github"
        to="https://github.com/daver987/nuxt-docu-search-ai"
        aria-label="Github Link"
      />
    </div>
  </div>
</template>
