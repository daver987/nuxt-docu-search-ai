import { z } from 'zod'
import type { FormSubmitEvent } from '#ui/types'

const MessageSchema = z.object({
  role: z.enum(['user', 'assistant', 'system']),
  content: z.string().min(2, 'Must be at least 2 characters'),
  id: z.number().optional(),
})

type Message = z.infer<typeof MessageSchema>

export function useChat() {
  const input = useState<Message>('message', () => ({
    role: 'user',
    content: '',
  }))
  const messages = useState<Message[]>('messages', () => [])
  const isLoading = ref(false)

  const addMessage = (message: Message) => {
    messages.value.push(message)
  }

  async function onSubmit(event: FormSubmitEvent<Message>) {
    isLoading.value = true
    addMessage({ ...event.data, id: messages.value.length })
    const returnedMessage = await $fetch<Message>('/api/chat', {
      method: 'POST',
      body: event.data,
    })
  }

  return {
    input,
    messages,
    isLoading,
    onSubmit,
  }
}
