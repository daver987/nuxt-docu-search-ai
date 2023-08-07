<script lang="ts" setup>
import { ref } from '#imports'
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from '@headlessui/vue'

const navigation = [
  {
    name: 'Chats',
    href: '/',
    icon: 'heroicons:chat-bubble-bottom-center-text',
    current: false,
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: 'heroicons:cog-6-tooth',
    current: true,
  },
]

const sidebarOpen = ref(false)
</script>

<template>
  <TransitionRoot as="template" :show="sidebarOpen">
    <Dialog
      as="div"
      class="relative z-50 xl:hidden"
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
        <div class="fixed inset-0 bg-gray-900/80" />
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
                <button
                  type="button"
                  class="-m-2.5 p-2.5"
                  @click="sidebarOpen = false"
                >
                  <span class="sr-only">Close sidebar</span>
                  <Icon
                    name="heroicons:x-mark"
                    class="h-6 w-6 text-white"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </TransitionChild>
            <!-- Sidebar component, swap this element with another sidebar if you like -->
            <div
              class="flex grow flex-col gap-y-5 overflow-y-auto px-6 ring-1 ring-white/10 dark:bg-gray-900"
            >
              <div class="flex h-16 shrink-0 items-center">
                <img class="h-8 w-auto" src="/favicon.ico" alt="Nuxt Logo" />
              </div>
              <nav class="flex flex-1 flex-col">
                <ul role="list" class="flex flex-1 flex-col gap-y-7">
                  <li>
                    <ul role="list" class="-mx-2 space-y-1">
                      <li v-for="item in navigation" :key="item.name">
                        <NuxtLink
                          active-class="bg-gray-800 text-white"
                          :href="item.href"
                          class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                        >
                          <Icon
                            :name="item.icon"
                            class="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {{ item.name }}
                        </NuxtLink>
                      </li>
                    </ul>
                  </li>
                  <li class="-mx-6 mt-auto">
                    <NuxtLink
                      href="#"
                      class="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                    >
                      <Icon
                        name="heroicons:user-circle"
                        class="h-8 w-8 rounded-full dark:bg-gray-800"
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
      class="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-300 px-6 ring-1 ring-black/10 dark:bg-gray-900 dark:ring-white/5"
    >
      <ULink to="/" class="flex h-16 shrink-0 items-center justify-around">
        <img class="h-8 w-auto" src="/favicon.ico" alt="Nuxt Logo" />
        <span class="mr-8">Nuxt DocuSearch AI</span>
      </ULink>
      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" class="-mx-2 space-y-1">
              <li v-for="item in navigation" :key="item.name">
                <NuxtLink
                  :to="item.href"
                  active-class="bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white"
                  class="group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 hover:bg-gray-400 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-gray-800"
                >
                  <Icon
                    :name="item.icon"
                    class="gray-900 dark:gray-200 h-6 w-6 shrink-0"
                    aria-hidden="true"
                  />
                  {{ item.name }}
                </NuxtLink>
              </li>
            </ul>
          </li>

          <!--            logged in user-->
          <li class="-mx-6 mt-auto">
            <NuxtLink
              href="#"
              class="flex items-center gap-x-4 border border-x-0 border-b-0 border-t-white/5 bg-gray-200 px-6 py-3 text-sm font-semibold leading-6 hover:bg-gray-400 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-900/90"
            >
              <Icon name="heroicons:user-circle" class="h-8 w-8 rounded-full" />
              <span class="sr-only">User</span>
              <span aria-hidden="true">User</span>
            </NuxtLink>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>
