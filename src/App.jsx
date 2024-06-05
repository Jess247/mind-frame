import { useState } from 'react'


function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
        <div>
          <p>Focus</p>
          <p>Weather</p>
        </div>
        <div>
          <time>
            <span id='hour'>1</span>:<span id='minutes'>00</span>
          </time>
          <p>
            I am constantly growing and evolving into a better person
          </p>
        </div>
    </main>
  )
}

export default App
