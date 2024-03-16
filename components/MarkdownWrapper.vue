<script setup lang="ts">
import { watch, ref, type Ref } from '#imports'
import MarkdownIt from 'markdown-it'
import Shikiji from 'markdown-it-shikiji'

interface Props {
  md: string | null
}

const props = withDefaults(defineProps<Props>(), {
  md: null,
})

const renderedMarkdown: Ref<string> = ref('')

const md = new MarkdownIt()

md.use(
  await Shikiji({
    themes: {
      light: 'nord',
      dark: 'nord',
    },
  })
)

watch(
  () => props.md,
  (newValue) => {
    if (newValue) {
      renderedMarkdown.value = md.render(newValue)
    }
  },
  { immediate: true }
)
</script>

<template>
  <div v-if="renderedMarkdown" v-html="renderedMarkdown"></div>
</template>
