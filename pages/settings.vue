<script setup lang="ts">
const formRef = ref()
const state = ref({})
const handleSubmit = () => {
  return console.log('Submitted')
}
</script>

<template>
  <UContainer class="p-6">
    <UCard class="mx-auto max-w-4xl">
      <template #header>
        <h2 class="text-2xl">Settings</h2>
      </template>
      <UForm ref="formRef" :state="state" @submit.prevent="handleSubmit">
        <UFormGroup name="apikey" label="Open AI Api Key">
          <UInput type="text" placeholder="Enter API key..." />
        </UFormGroup>
      </UForm>
      <template #footer>
        <UButton>Save API Key</UButton>
      </template>
    </UCard>
  </UContainer>
</template>
