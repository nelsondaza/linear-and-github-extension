import { useState } from 'react'

function IndexPopup() {
  const [data, setData] = useState('')

  return (
    <div
      style={{
        padding: 16,
      }}
    >
      <h2>
        Welcome to your sidepanel{' '}
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

export default IndexPopup
