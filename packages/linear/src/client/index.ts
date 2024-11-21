import { LinearClient } from '@linear/sdk'
import { Storage } from '@plasmohq/storage'

export const LINEAR_API_KEY_STORAGE_KEYS = 'LINEAR_API_KEYS'

const storage = new Storage()

const linearClientsMap = new Map<string, LinearClient>()

const loadLinearClients = (apiKeys: Record<string, string>) => {
  Object.entries(apiKeys).forEach(([teamId, apiKey]) => {
    if (teamId && apiKey) {
      linearClientsMap.set(teamId.toLowerCase(), new LinearClient({ apiKey }))
    }
  })
}

// eslint-disable-next-line unicorn/prefer-top-level-await
storage.get<Record<string, string> | undefined>(LINEAR_API_KEY_STORAGE_KEYS).then((apiKeys) => {
  if (apiKeys) {
    loadLinearClients(apiKeys)
  }
})

storage.watch({
  [LINEAR_API_KEY_STORAGE_KEYS]: (apiKeys) => {
    if (apiKeys.newValue) {
      loadLinearClients(apiKeys.newValue)
    }
  },
})

export const useLinearClient = (teamId: string) => linearClientsMap.get(teamId.split('-').at(0).toLowerCase())

export const getLinearClient = (teamId: string) => linearClientsMap.get(teamId.split('-').at(0).toLowerCase())
