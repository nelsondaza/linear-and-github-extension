import { useStorage } from '@plasmohq/storage/hook'
// eslint-disable-next-line import/no-unresolved
import iconImage from 'data-base64:~assets/icon.svg'
import { useEffect, useRef, useState } from 'react'

import { LINEAR_API_KEY_STORAGE_KEYS } from '@repo/linear'
import { Input, setTooltipRoot } from '@repo/ui'

import './style.css'

function TeamAPIKEYInput(props: {
  apiKey: string
  index: number
  onChange: (index: number, teamId: string, apiKey: string) => void
  teamId: string
}) {
  const timeoutRef = useRef<NodeJS.Timeout>()
  const [teamId, setTeamId] = useState(props.teamId)
  const [apiKey, setApiKey] = useState(props.apiKey)

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      props.onChange(props.index, teamId, apiKey)
    }, 500)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [teamId, apiKey])

  useEffect(() => {
    setTeamId(props.teamId)
    setApiKey(props.apiKey)
    return () => {
      clearTimeout(timeoutRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex gap-2">
      <Input
        className="shrink"
        defaultValue={props.teamId || ''}
        inputClassName="uppercase"
        label="TEAM Identifier"
        maxLength={10}
        onChange={(e) => setTeamId(e.target.value)}
        placeholder="LAGE"
      />
      <Input
        className="grow"
        defaultValue={props.apiKey || ''}
        label="API KEY"
        labelInfo="This item is stored secretly"
        onChange={(e) => setApiKey(e.target.value)}
        placeholder="lin_api_c9X..."
      />
    </div>
  )
}

function Options() {
  const [apiKeys, setApiKeys] = useStorage<Record<string, string>>(LINEAR_API_KEY_STORAGE_KEYS)
  const objectEntries = Object.entries(apiKeys || {})
  const sourceEntries = [
    objectEntries.at(0) || ['', ''],
    objectEntries.at(1) || ['', ''],
    objectEntries.at(2) || ['', ''],
  ]

  const [entries, setEntries] = useState(sourceEntries)

  useEffect(() => {
    setEntries(sourceEntries)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKeys])

  const setApiKey = async (index: number, teamId: string, apiKey: string) => {
    setEntries((prev) => {
      const newEntries = [...prev]
      newEntries[index] = [teamId, apiKey.match(/^\*+$/) ? prev[index][1] : apiKey]
      return newEntries
    })
  }

  const saveKeys = async () => {
    await setApiKeys({
      [entries[0][0]]: entries[0][1],
      [entries[1][0]]: entries[1][1],
      [entries[2][0]]: entries[2][1],
    })
  }

  return (
    <div className="flex flex-col gap-2 p-2 *:p-2" ref={setTooltipRoot}>
      <div className="flex items-center gap-2 text-xl font-bold border rounded">
        <img alt="LAGE Icon" className="size-8" src={iconImage} />
        <div>LAGE Options</div>
      </div>
      <div className="flex flex-col gap-2 border rounded">
        <div className="font-bold text-lg">Linear configurations</div>
        <div>
          The extension requires to interact with the Linear API in order to access and manipulate data such as updating
          or retrieving issues and tasks per each TEAM you work with.
          <div className="px-2 text-sm">
            <b>Team identifier: </b> is the prefix of your issue ID:{' '}
            <div className="inline-flex gap-1 font-bold text-sm">
              <div>LAGE-123</div>
              <div>→</div>
              <div>LAGE</div>
            </div>
          </div>
          <div className="px-2 text-sm">
            <b>API KEY: </b>
            <a
              className="border-dashed border-b-2"
              href="https://nelsondaza.github.io/linear-and-github-extension/linear_API_KEY.html"
              target="linear_api_key"
            >
              click here to see docs
            </a>
          </div>
        </div>
        <div />
        {sourceEntries.map(([teamId, apiKey], index) => (
          <TeamAPIKEYInput
            key={`${index}-${teamId}-${apiKey}`}
            apiKey={apiKey.replace(/./g, '*')}
            index={index}
            onChange={setApiKey}
            teamId={teamId}
          />
        ))}
        <div className="border-b" />
        <div>
          <button
            className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 font-bold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            onClick={saveKeys}
            type="button"
          >
            Save keys
          </button>
        </div>
      </div>
    </div>
  )
}

export default Options
