import { LinearClient } from '@linear/sdk'
import { Storage } from '@plasmohq/storage'

export const LINEAR_API_KEY_STORAGE_KEY = 'LINEAR_API_KEY'

const storage = new Storage()

let linearClient: LinearClient | undefined

// eslint-disable-next-line unicorn/prefer-top-level-await
storage.get(LINEAR_API_KEY_STORAGE_KEY).then((apiKey) => {
  linearClient = new LinearClient({ apiKey })
})

storage.watch({
  [LINEAR_API_KEY_STORAGE_KEY]: (apiKey) => {
    linearClient = new LinearClient({ apiKey: apiKey.newValue })
  },
})

export const useLinearClient = () => linearClient

export const getLinearClient = () => linearClient
