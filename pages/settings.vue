<script setup lang="ts">
//scripts here
</script>

<template>
  <UContainer class="p-6">
    <UCard class="mx-auto max-w-4xl"
      ><h2>Settings</h2>
      <UFormGroup name="apikey" label="Open AI Api Key">
        <UInput type="text" placeholder="Enter API key..." />
      </UFormGroup>
      <template #footer>
        <UButton>Save API Key</UButton>
      </template>
    </UCard>
  </UContainer>
</template>
