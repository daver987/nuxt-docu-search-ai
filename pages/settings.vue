<script setup lang="ts">
definePageMeta({
  colorMode: 'dark',
})
const toast = useToast()
const formRef = ref()
const state = ref({})
const temperature = ref(0.3)

const handleSubmit = () => {
  return toast.add({ title: 'Feature not yet implemented' })
}
</script>

<template>
  <UContainer class="p-6 space-y-4">
    <UCard class="mx-auto max-w-4xl">
      <template #header><h2 class="text-2xl">Model Settings</h2></template>
      <UFormGroup label="Temperature">
        <URange
          id="range"
          v-model="temperature"
          :min="0"
          :max="1"
          placeholder="Temperature"
          :value="0"
          name="range"
          :step="0.1"
          size="sm"
        />
        {{ temperature }}
      </UFormGroup>
    </UCard>
    <UForm ref="formRef" :state="state" @submit.prevent="handleSubmit">
      <UCard class="mx-auto max-w-4xl">
        <template #header>
          <h2 class="text-2xl">Settings</h2>
        </template>

        <UFormGroup name="apikey" label="Open AI Api Key">
          <UInput type="text" :disabled="true" placeholder="Enter API key..." />
        </UFormGroup>
        <template #footer>
          <UButton
            @click="toast.add({ title: 'Feature not yet implemented' })"
            type="button"
            >Save API Key
          </UButton>
        </template>
      </UCard>
    </UForm>
  </UContainer>
</template>
