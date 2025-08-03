import React from 'react'
import CodeBlock from '../components/CodeBlock'
import InfoBox from '../components/InfoBox'

// StatusIcon Component - Teal/Pink theme (inline for now)
const StatusIcon = ({ 
  type = 'success', 
  size = 'medium', 
  className = '',
  onClick,
  title,
  style = {}
}) => {
  const baseStyle = {
    width: size === 'small' ? '24px' : size === 'large' ? '60px' : '40px',
    height: size === 'small' ? '24px' : size === 'large' ? '60px' : '40px',
    borderRadius: '50%',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    transition: 'all 0.3s ease',
    cursor: onClick ? 'pointer' : 'default',
    border: '3px solid',
    ...style
  }

  const successStyle = {
    ...baseStyle,
    background: 'linear-gradient(135deg, #4fd1c7, #38b2ac)',
    borderColor: '#319795',
    boxShadow: '0 4px 12px rgba(79, 209, 199, 0.3)'
  }

  const errorStyle = {
    ...baseStyle,
    background: 'linear-gradient(135deg, #fc8181, #f687b3)',
    borderColor: '#d53f8c',
    boxShadow: '0 4px 12px rgba(252, 129, 129, 0.3)'
  }

  const handleMouseEnter = (e) => {
    if (onClick) {
      e.target.style.transform = 'scale(1.1)'
    }
  }

  const handleMouseLeave = (e) => {
    if (onClick) {
      e.target.style.transform = 'scale(1)'
    }
  }

  // Checkmark component
  const Checkmark = () => {
    const checkSize = {
      small: { width: '8px', height: '4px', top: '7px', left: '5px' },
      medium: { width: '12px', height: '6px', top: '12px', left: '12px' },
      large: { width: '18px', height: '9px', top: '18px', left: '18px', borderWidth: '4px' }
    }

    return (
      <div
        style={{
          width: checkSize[size].width,
          height: checkSize[size].height,
          border: `${checkSize[size].borderWidth || '3px'} solid white`,
          borderTop: 'none',
          borderRight: 'none',
          transform: 'rotate(-45deg)',
          position: 'absolute',
          top: checkSize[size].top,
          left: checkSize[size].left
        }}
      />
    )
  }

  // X mark component
  const XMark = () => {
    const xSize = {
      small: { width: '10px', height: '2px' },
      medium: { width: '16px', height: '3px' },
      large: { width: '24px', height: '4px' }
    }

    return (
      <div style={{ 
        position: 'relative',
        width: '10px',
        height: '10px'
        }}>
        <div
          style={{
            width: xSize[size].width,
            height: xSize[size].height,
            background: 'white',
            borderRadius: '2px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(45deg)',
          }}
        />
        <div
          style={{
            width: xSize[size].width,
            height: xSize[size].height,
            background: 'white',
            borderRadius: '2px',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(-45deg)',
          }}
        />
      </div>
    )
  }

  return (
    <div
      style={type === 'success' ? successStyle : errorStyle}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title={title || (type === 'success' ? 'Success' : 'Error')}
      className={className}
    >
      {type === 'success' ? <Checkmark /> : <XMark />}
    </div>
  )
}

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

        <InfoBox type="warning" title="Key Point">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <p><code>useEffect</code> runs after your component renders — React 19 just makes it faster and safer.</p>
          </div>
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <StatusIcon type="success" size="small" />
          <h4>1. Run only on mount</h4>
        </div>
        <p>Use an empty dependency array <code>[]</code> to run once when the component loads.</p>
        <CodeBlock language="jsx">
          {`useEffect(() => {
  console.log('Runs once')
}, [])`}
        </CodeBlock>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <StatusIcon type="success" size="small" />
          <h4>2. Run when specific data changes</h4>
        </div>
        <p>React watches the dependencies and re-runs the effect if any of them change.</p>
        <CodeBlock language="jsx">
          {`useEffect(() => {
  console.log('Count changed')
}, [count])`}
        </CodeBlock>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <StatusIcon type="error" size="small" />
          <h4>3. Run after every render (use carefully!)</h4>
        </div>
        <p>No dependency array? That means the effect runs after every render.</p>
        <CodeBlock language="jsx">
          {`useEffect(() => {
  console.log('Runs every time')
})`}
        </CodeBlock>

        <InfoBox title="React 19 Improves">
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <StatusIcon type="success" size="small" />
          <h4>Example: Title Update</h4>
        </div>
        <CodeBlock language="jsx">
          {`useEffect(() => {
  document.title = \`Count: \${count}\`
}, [count])`}
        </CodeBlock>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <StatusIcon type="success" size="small" />
          <h4>Example: Fetch Data on Mount</h4>
        </div>
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <StatusIcon type="success" size="small" />
          <h4>Example: Scroll Listener</h4>
        </div>
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <StatusIcon type="error" size="small" />
          <h4>Memory Leaks</h4>
        </div>
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <StatusIcon type="success" size="small" />
          <h4>Other Examples</h4>
        </div>
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
          <StatusIcon type="success" size="medium" />
          <h3>Real-Time Data with WebSockets</h3>
        </div>
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

        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#f0f9ff', borderRadius: '8px', border: '2px solid #4fd1c7' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <StatusIcon type="success" size="small" />
            <strong>Connection established</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <StatusIcon type="success" size="small" />
            <span>Cleanup function will close connection on unmount</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 6,
    title: 'Avoiding Common useEffect Mistakes',
    content: (
      <div>
        <h3>Beginner Traps to Avoid</h3>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <StatusIcon type="error" size="small" />
          <h4>Mistake: Async in useEffect directly</h4>
        </div>
        <CodeBlock language="jsx">
          {`useEffect(async () => {
  const res = await fetch('/api')
}, []) // not allowed`}
        </CodeBlock>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <StatusIcon type="success" size="small" />
          <h4>Correct Way</h4>
        </div>
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <StatusIcon type="error" size="small" />
          <h4>Forgetting Dependencies</h4>
        </div>
        <p>React needs to know which values your effect depends on.</p>

        <CodeBlock language="jsx">
          {`useEffect(() => {
  doSomethingWith(props.value)
}, []) // missing props.value`}
        </CodeBlock>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <StatusIcon type="success" size="small" />
          <h4>Correct</h4>
        </div>
        <CodeBlock language="jsx">
          {`useEffect(() => {
  doSomethingWith(props.value)
}, [props.value])`}
        </CodeBlock>

        <div style={{ marginTop: '20px', padding: '15px', backgroundColor: '#fef2f2', borderRadius: '8px', border: '2px solid #fc8181' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
            <StatusIcon type="error" size="small" />
            <strong>Common Result: Infinite re-renders or stale data</strong>
          </div>
        </div>
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <StatusIcon type="error" size="small" />
          <h4>Wrong: Fresh object each render</h4>
        </div>
        <CodeBlock language="jsx">
          {`const config = { theme: 'dark' }
useEffect(() => {
  doSomething(config)
}, [config]) // will re-run every time`}
        </CodeBlock>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <StatusIcon type="success" size="small" />
          <h4>Fix with useMemo</h4>
        </div>
        <CodeBlock language="jsx">
          {`const config = useMemo(() => ({ theme: 'dark' }), [])
useEffect(() => {
  doSomething(config)
}, [config]) // only runs once`}
        </CodeBlock>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
          <StatusIcon type="success" size="small" />
          <h4>useCallback for Functions</h4>
        </div>
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
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
            <StatusIcon type="success" size="small" style={{ marginTop: '2px' }} />
            <div>
              <ul>
                <li><strong>useCallback</strong> memoizes a function itself to keep its reference stable — useful for event handlers or functions passed as props.</li>
                <li><strong>useMemo</strong> memoizes the result/value of a function call — useful to avoid expensive recalculations.</li>
                <li>Choose <code>useCallback</code> for functions, and <code>useMemo</code> for computed values.</li>
              </ul>
            </div>
          </div>
        </InfoBox>

        <InfoBox type="info" title="Why This Matters">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <StatusIcon type="error" size="small" />
            <p>Without <code>useMemo</code> or <code>useCallback</code>, React sees new values and re-runs effects too much.</p>
          </div>
        </InfoBox>
      </div>
    )
  },
   {
    id: 8,
    title: 'Next Steps: Advanced useEffect Topics',
    content: (
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
          <StatusIcon type="success" size="medium" />
          <h3>What to Learn Next</h3>
        </div>
        <p>You've mastered the basics! Here are important advanced topics to explore:</p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '25px' }}>
          
          <div>
            <h4 style={{ color: '#319795', borderBottom: '2px solid #4fd1c7', paddingBottom: '5px' }}>🔧 Essential Skills</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <StatusIcon type="success" size="small" />
                <span><strong>Error Handling</strong> - Try/catch in async effects</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <StatusIcon type="success" size="small" />
                <span><strong>AbortController</strong> - Cancel pending requests</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <StatusIcon type="success" size="small" />
                <span><strong>useLayoutEffect</strong> - DOM measurements & animations</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <StatusIcon type="success" size="small" />
                <span><strong>Conditional Effects</strong> - Smart effect execution</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#d53f8c', borderBottom: '2px solid #fc8181', paddingBottom: '5px' }}>🚀 Advanced Patterns</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <StatusIcon type="error" size="small" />
                <span><strong>Race Conditions</strong> - Handle overlapping effects</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <StatusIcon type="error" size="small" />
                <span><strong>Custom Hooks</strong> - Reusable effect logic</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <StatusIcon type="error" size="small" />
                <span><strong>Performance Optimization</strong> - Avoid unnecessary re-runs</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <StatusIcon type="error" size="small" />
                <span><strong>Testing Effects</strong> - Mock and test async operations</span>
              </li>
            </ul>
          </div>
        </div>

        <div style={{ marginTop: '30px', padding: '20px', backgroundColor: '#f7fafc', borderRadius: '12px', border: '2px solid #e2e8f0' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <StatusIcon type="success" size="small" />
            Practical Examples to Try
          </h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div>
              <strong>🌐 Real-World Projects:</strong>
              <ul style={{ marginTop: '8px', fontSize: '14px' }}>
                <li>Build a live chat app (WebSockets)</li>
                <li>Create an auto-save feature (LocalStorage)</li>
                <li>Make a polling dashboard (API intervals)</li>
              </ul>
            </div>
            <div>
              <strong>🔍 Debug & Optimize:</strong>
              <ul style={{ marginTop: '8px', fontSize: '14px' }}>
                <li>Use React DevTools Profiler</li>
                <li>Practice with console.log strategies</li>
                <li>Learn to identify memory leaks</li>
              </ul>
            </div>
          </div>
        </div>

        <InfoBox type="info" title="Your Learning Journey">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
            <StatusIcon type="success" size="small" style={{ marginTop: '2px' }} />
            <div>
              <p><strong>You now understand:</strong> Basic useEffect patterns, dependencies, cleanup, and common mistakes.</p>
              <p><strong>Next challenge:</strong> Build a real project that combines multiple effects and handles edge cases!</p>
              <p><strong>Pro tip:</strong> Start with error handling and AbortController - they'll save you hours of debugging.</p>
            </div>
          </div>
        </InfoBox>

        <div style={{ textAlign: 'center', marginTop: '25px', padding: '15px', backgroundColor: '#4fd1c7', borderRadius: '8px' }}>
          <h3 style={{ color: 'white', margin: 0 }}>🎓 Keep Learning & Building!</h3>
          <p style={{ color: 'white', margin: '5px 0 0 0', fontSize: '16px' }}>
            The best way to master useEffect is through practice and real projects.
          </p>
        </div>
      </div>
    )
  }
]

export default slides