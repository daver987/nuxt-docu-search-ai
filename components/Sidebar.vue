<script lang="ts" setup>
import { ref } from '#imports'
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

const links = [
  {
    label: 'Chats',
    to: '/',
    icon: 'i-heroicons-chat-bubble-bottom-center-text',
    color: 'text-green-500',
  },
  {
    label: 'Settings',
    to: '/settings',
    icon: 'i-heroicons-cog-6-tooth',
    color: 'text-green-500',
  },
]

const logoutLink = [
  {
    label: 'Logout',
    to: '#',
    icon: 'i-heroicons-arrow-left-on-rectangle',
    current: false,
  },
]

const sidebarOpen = ref(false)
</script>

<template>
  <TransitionRoot as="template" :show="sidebarOpen">
    <Dialog
      class="relative z-50 xl:hidden"
      as="div"
      @close="sidebarOpen = false"
    >
      <TransitionChild
        as="template"
        enter="transition-opacity ease-linear duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-gray-950/80" />
      </TransitionChild>

      <div class="fixed inset-0 flex">
        <TransitionChild
          as="template"
          enter="transition ease-in-out duration-300 transform"
          enter-from="-translate-x-full"
          enter-to="translate-x-0"
          leave="transition ease-in-out duration-300 transform"
          leave-from="translate-x-0"
          leave-to="-translate-x-full"
        >
          <DialogPanel class="relative mr-16 flex w-full max-w-xs flex-1">
            <TransitionChild
              as="template"
              enter="ease-in-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in-out duration-300"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <div
                class="absolute left-full top-0 flex w-16 justify-center pt-5"
              >
                <UButton
                  class="-m-2.5 p-2.5"
                  type="button"
                  @click="sidebarOpen = false"
                >
                  <span class="sr-only">Close sidebar</span>
                  <Icon
                    class="h-6 w-6 text-white"
                    name="heroicons:x-mark"
                    aria-hidden="true"
                  />
                </UButton>
              </div>
            </TransitionChild>
            <!-- Sidebar component -->
            <div
              class="flex grow flex-col gap-y-5 overflow-y-auto px-6 ring-1 ring-white/10 dark:bg-gray-950"
            >
              <div class="flex h-16 shrink-0 items-center">
                <NuxtImg
                  class="h-8 w-auto"
                  src="/favicon.ico"
                  alt="Nuxt Logo"
                />
              </div>
              <nav class="flex flex-1 flex-col">
                <ul class="flex flex-1 flex-col gap-y-7" role="list">
                  <li>
                    <ul class="-mx-2 space-y-1" role="list">
                      <li v-for="item in links" :key="item.label">
                        <NuxtLink
                          class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                          active-class="bg-gray-800 text-white"
                          :to="item.to"
                        >
                          <Icon
                            class="h-6 w-6 shrink-0"
                            :name="item.icon"
                            aria-hidden="true"
                          />
                          {{ item.label }}
                        </NuxtLink>
                      </li>
                    </ul>
                  </li>
                  <li class="-mx-6 mt-auto">
                    <NuxtLink
                      class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                      href="#"
                    >
                      <Icon
                        class="h-8 w-8 rounded-full dark:bg-gray-800"
                        name="heroicons:user-circle"
                      />
                      <span class="sr-only">App User</span>
                      <span aria-hidden="true">User</span>
                    </NuxtLink>
                  </li>
                </ul>
              </nav>
            </div>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>

  <!-- Static sidebar for desktop -->
  <div class="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
    <div
      class="flex grow flex-col overflow-y-auto bg-gray-300 px-6 ring-1 ring-black/10 dark:bg-gray-950 dark:ring-white/5"
    >
      <ULink class="flex h-16 shrink-0 items-center justify-around" to="/">
        <NuxtImg class="h-8 w-auto" src="/favicon.ico" alt="Nuxt Logo" />
        <span class="mr-8">Nuxt DocuSearch AI</span>
      </ULink>
      <UDivider class="mb-8" />
      <div class="flex flex-col justify-between h-full pb-4">
        <UVerticalNavigation :ui="{ base: 'gap-4' }" :links="links" />
        <UVerticalNavigation :links="logoutLink" />
      </div>
    </div>
  </div>
</template>
