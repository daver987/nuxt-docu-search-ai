<script setup lang="ts">
import { ref, watch } from '#imports'
import { useInfiniteScroll } from '@vueuse/core'

const el: Ref<HTMLElement | null> = ref(null)

const messages = useState('messages')

function scrollToBottom() {
  if (typeof window !== 'undefined' && el.value) {
    el.value.scrollTop = el.value.scrollHeight
  }
}
useInfiniteScroll(
  el,
  () => {
    scrollToBottom()
  },
  { distance: 10 }
)

watch(
  messages,
  () => {
    scrollToBottom()
    console.log('Watch has run')
  },
  { immediate: true }
)
</script>

<template>
  <div>
    <Sidebar />
    <div class="min-h-screen bg-gray-100 dark:bg-gray-800 xl:pl-72" ref="el">
      <Topbar />
      <NuxtPage />
    </div>
  </div>
</template>

<style>
.side-fade-enter-active,
.side-fade-leave-active {
  transition: all 0.4s ease-in-out;
}

.side-fade-enter-from,
.side-fade-leave-to {
  transform: translateX(-10%);
  opacity: 0;
}
</style>
