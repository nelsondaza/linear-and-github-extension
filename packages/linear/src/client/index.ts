import { LinearClient } from '@linear/sdk'

// Api key authentication
export const linearClient = new LinearClient({
  apiKey: process.env.PLASMO_PUBLIC_LINEAR_PERSONAL_API_KEY,
})
