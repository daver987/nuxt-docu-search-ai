<script setup lang="ts">
import { ref } from '#imports'
import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/vue'

interface Props {
  loading: boolean
  onSubmit: (event: any) => Promise<void>
}

defineProps<Props>()

const assignees = [
  { name: 'Unassigned', value: null },
  {
    name: 'Wade Cooper',
    value: 'wade-cooper',
    avatar:
      'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
]
const labels = [
  { name: 'Unlabelled', value: null },
  { name: 'Engineering', value: 'engineering' },
]
const dueDates = [
  { name: 'No due date', value: null },
  { name: 'Today', value: 'today' },
]

const assigned = ref(assignees[0])
const labelled = ref(labels[0])
const dated = ref(dueDates[0])
</script>
<template>
  <form class="relative" @submit="onSubmit">
    <div class="overflow-hidden rounded-lg border border-gray-300 shadow-sm">
      <label class="sr-only" for="content">Content</label>
      <textarea
        class="w-full pl-2 pt-2.5 resize-none border-0 focus:ring-0 sm:text-sm sm:leading-6 focus-ring-0 focus:outline-none"
        id="content"
        rows="2"
        name="content"
        placeholder="Type your Nuxt query here... e.g., 'Can you show me an advanced example of how to use useState?'"
      />

      <!-- Spacer element to match the height of the toolbar -->
      <div aria-hidden="true">
        <div class="py-2">
          <div class="h-9" />
        </div>
        <div class="h-px" />
        <div class="py-2">
          <div class="py-px">
            <div class="h-9" />
          </div>
        </div>
      </div>
    </div>

    <div class="absolute inset-x-px bottom-0">
      <!-- Actions: These are just examples to demonstrate the concept, replace/wire these up however makes sense for your project. -->
      <div class="flex flex-nowrap justify-end space-x-2 px-2 py-2 sm:px-3">
        <Listbox class="flex-shrink-0" v-model="assigned" as="div">
          <ListboxLabel class="sr-only">Assign</ListboxLabel>
          <div class="relative">
            <ListboxButton
              class="relative inline-flex items-center whitespace-nowrap rounded-full px-2 py-2 text-sm font-medium sm:px-3"
            >
              <Icon
                class="h-5 w-5 flex-shrink-0 sm:-ml-1"
                v-if="assigned.value === null"
                name="heroicons:user-circle"
                aria-hidden="true"
              />

              <img
                class="h-5 w-5 flex-shrink-0 rounded-full"
                v-else
                :src="assigned.avatar"
                alt=""
              />

              <span
                :class="[
                  assigned.value === null ? '' : 'text-gray-900',
                  'hidden truncate sm:ml-2 sm:block',
                ]"
                >{{ assigned.value === null ? 'Assign' : assigned.name }}</span
              >
            </ListboxButton>

            <transition
              leave-active-class="transition ease-in duration-100"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                class="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg py-3 text-base shadow ring-0 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <ListboxOption
                  v-for="assignee in assignees"
                  v-slot="{ active }"
                  as="template"
                  :key="assignee.value"
                  :value="assignee"
                >
                  <li
                    :class="[
                      active ? 'bg-gray-100' : 'bg-white',
                      'relative cursor-default select-none px-3 py-2',
                    ]"
                  >
                    <div class="flex items-center">
                      <NuxtImg
                        class="h-5 w-5 flex-shrink-0 rounded-full"
                        v-if="assignee.avatar"
                        :src="assignee.avatar"
                        alt=""
                      />
                      <Icon
                        class="h-5 w-5 flex-shrink-0"
                        v-else
                        name="heroicons:user-circle"
                        aria-hidden="true"
                      />
                      <span class="ml-3 block truncate font-medium">{{
                        assignee.name
                      }}</span>
                    </div>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>

        <Listbox class="flex-shrink-0" v-model="labelled" as="div">
          <ListboxLabel class="sr-only">Add a label</ListboxLabel>
          <div class="relative">
            <ListboxButton
              class="relative inline-flex items-center whitespace-nowrap rounded-full px-2 py-2 text-sm font-medium sm:px-3"
            >
              <Icon
                name="heroicons:tag"
                :class="[
                  labelled.value === null ? 'text-gray-300' : 'text-gray-500',
                  'h-5 w-5 flex-shrink-0 sm:-ml-1',
                ]"
                aria-hidden="true"
              />
              <span
                :class="[
                  labelled.value === null ? '' : 'text-gray-900',
                  'hidden truncate sm:ml-2 sm:block',
                ]"
                >{{ labelled.value === null ? 'Label' : labelled.name }}</span
              >
            </ListboxButton>

            <transition
              leave-active-class="transition ease-in duration-100"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                class="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg py-3 text-base shadow ring-0 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <ListboxOption
                  v-for="label in labels"
                  v-slot="{ active }"
                  as="template"
                  :key="label.value"
                  :value="label"
                >
                  <li
                    :class="[
                      active ? 'bg-gray-100' : 'bg-white',
                      'relative cursor-default select-none px-3 py-2',
                    ]"
                  >
                    <div class="flex items-center">
                      <span class="block truncate font-medium">{{
                        label.name
                      }}</span>
                    </div>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>

        <Listbox class="flex-shrink-0" v-model="dated" as="div">
          <ListboxLabel class="sr-only">Add a due date</ListboxLabel>
          <div class="relative">
            <ListboxButton
              class="relative inline-flex items-center whitespace-nowrap rounded-full px-2 py-2 text-sm font-medium sm:px-3"
            >
              <Icon
                name="heroicons:calendar"
                :class="[
                  dated.value === null ? 'text-gray-300' : 'text-gray-500',
                  'h-5 w-5 flex-shrink-0 sm:-ml-1',
                ]"
                aria-hidden="true"
              />
              <span
                :class="[
                  dated.value === null ? '' : 'text-gray-900',
                  'hidden truncate sm:ml-2 sm:block',
                ]"
                >{{ dated.value === null ? 'Due date' : dated.name }}</span
              >
            </ListboxButton>

            <transition
              leave-active-class="transition ease-in duration-100"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                class="absolute right-0 z-10 mt-1 max-h-56 w-52 overflow-auto rounded-lg py-3 text-base shadow ring-0 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <ListboxOption
                  v-for="dueDate in dueDates"
                  v-slot="{ active }"
                  as="template"
                  :key="dueDate.value"
                  :value="dueDate"
                >
                  <li
                    :class="[
                      active ? 'bg-gray-100' : 'bg-white',
                      'relative cursor-default select-none px-3 py-2',
                    ]"
                  >
                    <div class="flex items-center">
                      <span class="block truncate font-medium">{{
                        dueDate.name
                      }}</span>
                    </div>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
      </div>
      <div
        class="flex items-center justify-between space-x-3 border-t px-2 py-2 sm:px-3"
      >
        <div class="flex">
          <button
            class="group -my-2 -ml-2 inline-flex items-center rounded-full px-3 py-2 text-left"
            type="button"
          >
            <Icon
              class="-ml-1 mr-2 h-5 w-5 group-hover:text-gray-500"
              name="heroicons:paper-clip"
              aria-hidden="true"
            />
            <span class="text-sm italic group-hover:text-gray-600"
              >Attach a file</span
            >
          </button>
        </div>
        <div class="flex-shrink-0">
          <UButton
            icon="i-heroicons-paper-airplane"
            size="sm"
            color="primary"
            :square="true"
            variant="solid"
            :loading="loading"
            type="submit"
          />
        </div>
      </div>
    </div>
  </form>
</template>
