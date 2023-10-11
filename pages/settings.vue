<script setup lang="ts">
const toast = useToast()
const formRef = ref()
const state = ref({})

const handleSubmit = () => {
  return toast.add({ title: 'Feature not yet implemented' })
}
</script>

<template>
  <UContainer class="p-6">
    <UForm ref="formRef" :state="state" @submit.prevent="handleSubmit">
      <UCard class="mx-auto max-w-4xl">
        <template #header>
          <h2 class="text-2xl">Settings</h2>
        </template>

        <UFormGroup name="apikey" label="Open AI Api Key">
          <UInput type="text" placeholder="Enter API key..." />
        </UFormGroup>
        <template #footer>
          <UButton type="submit">Save API Key</UButton>
        </template>
      </UCard>
    </UForm>
    <UNotifications />
  </UContainer>
</template>
