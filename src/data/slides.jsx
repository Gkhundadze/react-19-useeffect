import React from 'react'
import CodeBlock from '../components/CodeBlock'
import InfoBox from '../components/InfoBox'

const slides = [
  {
    id: 1,
    title: 'useEffect Lifecycle',
    content: (
      <div>
        <InfoBox type="info" title="React 19: What Changed?">
          <p>React 19 improves performance and how effects run, but the <code>useEffect</code> hook is still used the same way as before.</p>
        </InfoBox>

        <h3>Old Class Component Methods</h3>
        <ul>
          <li><code>componentDidMount</code> – when component starts</li>
          <li><code>componentDidUpdate</code> – when it updates</li>
          <li><code>componentWillUnmount</code> – when it stops</li>
        </ul>

        <h3>Now with useEffect</h3>
        <p><code>useEffect</code> can do all three. It's used inside functional components.</p>

        <CodeBlock language="jsx" title="Basic Example">
          {`import React, { useEffect, useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    console.log('Component rendered')
    document.title = \`Count: \${count}\`
  })

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Add</button>
    </div>
  )
}`}
        </CodeBlock>

        <InfoBox type="success" title="Key Point">
          <p><code>useEffect</code> runs after your component renders — React 19 just makes it faster and safer.</p>
        </InfoBox>
      </div>
    )
  },
  {
    id: 2,
    title: '3 Ways to Use useEffect',
    content: (
      <div>
        <h3>useEffect Patterns</h3>

        <h4>1. Run only on mount</h4>
        <p>Use an empty dependency array <code>[]</code> to run once when the component loads.</p>
        <CodeBlock language="jsx">
          {`useEffect(() => {
  console.log('Runs once')
}, [])`}
        </CodeBlock>

        <h4>2. Run when specific data changes</h4>
        <p>React watches the dependencies and re-runs the effect if any of them change.</p>
        <CodeBlock language="jsx">
          {`useEffect(() => {
  console.log('Count changed')
}, [count])`}
        </CodeBlock>

        <h4>3. Run after every render</h4>
        <p>No dependency array? That means the effect runs after every render.</p>
        <CodeBlock language="jsx">
          {`useEffect(() => {
  console.log('Runs every time')
})`}
        </CodeBlock>

        <InfoBox type="success" title="React 19 Improves">
          <ul>
            <li>How effects are scheduled</li>
            <li>Performance and cleanup</li>
            <li>Strict mode debugging</li>
          </ul>
        </InfoBox>
      </div>
    )
  },
  {
    id: 3,
    title: 'Multiple useEffect Calls: Separate Concerns',
    content: (
      <div>
        <h3>Why Use Multiple useEffect?</h3>
        <p>Separate your logic to keep effects focused and easier to manage.</p>

        <h4>Example: Title Update</h4>
        <CodeBlock language="jsx">
          {`useEffect(() => {
  document.title = \`Count: \${count}\`
}, [count])`}
        </CodeBlock>

        <h4>Example: Fetch Data on Mount</h4>
        <CodeBlock language="jsx">
          {`useEffect(() => {
  async function fetchData() {
    const res = await fetch('/api/data')
    const json = await res.json()
    console.log(json)
  }
  fetchData()
}, [])`}
        </CodeBlock>

        <h4>Example: Scroll Listener</h4>
        <CodeBlock language="jsx">
          {`useEffect(() => {
  function onScroll() {
    console.log('User scrolled')
  }
  window.addEventListener('scroll', onScroll)
  return () => window.removeEventListener('scroll', onScroll)
}, [])`}
        </CodeBlock>

        <InfoBox type="info" title="Benefits">
          <ul>
            <li>Improves code readability</li>
            <li>Makes debugging easier</li>
            <li>Separates side effects cleanly</li>
          </ul>
        </InfoBox>
      </div>
    )
  },
  {
    id: 4,
    title: 'Cleaning Up Effects: Why and How',
    content: (
      <div>
        <h3>What is Cleanup?</h3>
        <p>Cleanup functions run before the next effect or when the component unmounts to prevent problems.</p>

        <h4>Memory Leaks</h4>
        <p>If you forget cleanup, intervals or subscriptions keep running, wasting resources.</p>

        <CodeBlock language="jsx" title="Timer Cleanup Example">
          {`useEffect(() => {
  const timer = setInterval(() => {
    console.log('Tick')
  }, 1000)

  return () => {
    clearInterval(timer)
    console.log('Timer cleared')
  }
}, [])`}
        </CodeBlock>

        <h4>Other Examples</h4>
        <ul>
          <li>WebSocket connections</li>
          <li>Event listeners (scroll, resize)</li>
          <li>Subscriptions or external APIs</li>
        </ul>

        <InfoBox type="warning" title="Why Cleanup Matters">
          <ul>
            <li>Prevents memory leaks</li>
            <li>Stops unnecessary background work</li>
            <li>Improves app performance</li>
          </ul>
        </InfoBox>
      </div>
    )
  },
  {
    id: 5,
    title: 'Using WebSockets with useEffect',
    content: (
      <div>
        <h3>Real-Time Data with WebSockets</h3>
        <p>Manage live connections and clean up with useEffect.</p>

        <CodeBlock language="jsx" title="WebSocket React Example">
          {`import React, { useEffect, useState } from 'react'

function WebSocketDemo() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const ws = new WebSocket('wss://example.com/socket')

    ws.onmessage = (event) => {
      setMessages(prev => [...prev, event.data])
    }

    return () => {
      ws.close()
    }
  }, [])

  return (
    <div>
      <h4>Messages</h4>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  )
}`}
        </CodeBlock>
      </div>
    )
  },
  {
    id: 6,
    title: 'Avoiding Common useEffect Mistakes',
    content: (
      <div>
        <h3>Beginner Traps to Avoid</h3>

        <h4>❌ Mistake: Async in useEffect directly</h4>
        <CodeBlock language="jsx">
          {`useEffect(async () => {
  const res = await fetch('/api')
}, []) // ❌ not allowed`}
        </CodeBlock>

        <h4>✅ Correct Way</h4>
        <CodeBlock language="jsx">
          {`useEffect(() => {
  async function fetchData() {
    const res = await fetch('/api')
    const data = await res.json()
    console.log(data)
  }
  fetchData()
}, [])`}
        </CodeBlock>

        <h4>❌ Forgetting Dependencies</h4>
        <p>React needs to know which values your effect depends on.</p>

        <CodeBlock language="jsx">
          {`useEffect(() => {
  doSomethingWith(props.value)
}, []) // ❌ missing props.value`}
        </CodeBlock>

        <h4>✅ Correct</h4>
        <CodeBlock language="jsx">
          {`useEffect(() => {
  doSomethingWith(props.value)
}, [props.value])`}
        </CodeBlock>
      </div>
    )
  },
  {
  id: 7,
  title: 'When useEffect Depends on Objects/Functions',
  content: (
    <div>
      <h3>Stable References with useMemo and useCallback</h3>

      <p>If you use an object or function inside <code>useEffect</code>, React might re-run the effect too often unless that object stays the same.</p>

      <h4>❌ Wrong: Fresh object each render</h4>
      <CodeBlock language="jsx">
        {`const config = { theme: 'dark' }
useEffect(() => {
  doSomething(config)
}, [config]) // ❌ will re-run every time`}
      </CodeBlock>

      <h4>✅ Fix with useMemo</h4>
      <CodeBlock language="jsx">
        {`const config = useMemo(() => ({ theme: 'dark' }), [])
useEffect(() => {
  doSomething(config)
}, [config]) // ✅ only runs once`}
      </CodeBlock>

      <h4>✅ useCallback for Functions</h4>
      <CodeBlock language="jsx">
        {`const handleClick = useCallback(() => {
  console.log('clicked')
}, [])

useEffect(() => {
  window.addEventListener('click', handleClick)
  return () => window.removeEventListener('click', handleClick)
}, [handleClick])`}
      </CodeBlock>

      <InfoBox type="info" title="Quick Tips">
        <ul>
          <li><strong>useCallback</strong> memoizes a function itself to keep its reference stable — useful for event handlers or functions passed as props.</li>
          <li><strong>useMemo</strong> memoizes the result/value of a function call — useful to avoid expensive recalculations.</li>
          <li>Choose <code>useCallback</code> for functions, and <code>useMemo</code> for computed values.</li>
        </ul>
      </InfoBox>

      <InfoBox type="info" title="Why This Matters">
        <p>Without <code>useMemo</code> or <code>useCallback</code>, React sees new values and re-runs effects too much.</p>
      </InfoBox>
    </div>
  )
}
]

export default slides
