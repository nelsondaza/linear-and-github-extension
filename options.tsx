import { useStorage } from '@plasmohq/storage/hook'
// eslint-disable-next-line import/no-unresolved
import iconImage from 'data-base64:~assets/icon.svg'
import { useEffect, useState } from 'react'

import { LINEAR_API_KEY_STORAGE_KEY } from '@repo/linear'
import { Input, setTooltipRoot } from '@repo/ui'

import './style.css'

function Options() {
  const [apiKey, setApiKey] = useStorage(LINEAR_API_KEY_STORAGE_KEY)
  const [data, setData] = useState(apiKey?.replace(/./g, '*') || '')

  useEffect(() => {
    document.body.style.fontSize = '16px'
  }, [])

  return (
    <div className="flex flex-col gap-2 p-2 *:p-2" ref={setTooltipRoot}>
      <div className="flex items-center gap-2 text-xl font-bold border rounded">
        <img alt="LAGE Icon" className="size-8" src={iconImage} />
        <div>LAGE Options</div>
      </div>
      <div className="flex flex-col gap-2 border rounded">
        <div className="font-bold text-lg">Linear configuration</div>
        <div className="border-b" />
        <div>
          <Input
            label="API KEY"
            labelComment={
              <a href="https://nelsondaza.github.io/linear-and-github-extension/API_KEY.html" target="linear_api_key">
                see docs here
              </a>
            }
            labelInfo="This item is store secretly"
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="lin_api_c9X..."
            value={apiKey || ''}
          />
        </div>
      </div>
      <h2 className="p-2 rounded border">
        Welcome to your options{' '}
        <a href="https://www.plasmo.com" rel="noreferrer" target="_blank">
          Plasmo
        </a>{' '}
        Extension!
      </h2>
      <input onChange={(e) => setData(e.target.value)} value={data} />
      <a href="https://docs.plasmo.com" rel="noreferrer" target="_blank">
        View Docs
      </a>
    </div>
  )
}

export default Options
