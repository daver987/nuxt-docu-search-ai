<script setup lang="ts">
import { ref, watch } from '#imports'
import hljs from 'highlight.js'
import { marked } from 'marked'
import { mangle } from 'marked-mangle'
import { gfmHeadingId } from 'marked-gfm-heading-id'
import { markedHighlight } from 'marked-highlight'

const options = { prefix: 'nuxt-' }
marked.use(
  markedHighlight({
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext'
      console.log(language)
      return hljs.highlightAuto(code).value
    },
    langPrefix: 'hljs language-',
  }),
  gfmHeadingId(options),
  mangle()
)

// Component props
const props = defineProps({
  markdown: String,
})

// Computed properties
const compiledMarkdown = ref('')

// Watchers
watch(
  () => props.markdown,
  (newMarkdown) => {
    if (typeof newMarkdown === 'string') {
      compiledMarkdown.value = marked(newMarkdown)
    }
  },
  { immediate: true }
)
</script>

<template>
  <div class="w-full pb-4 pt-4">
    <div v-html="compiledMarkdown"></div>
  </div>
</template>
