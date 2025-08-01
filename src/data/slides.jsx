import React from 'react'
import CodeBlock from '../components/CodeBlock'
import LifecycleDiagram from '../components/LifecycleDiagram'
import ComparisonTable from '../components/ComparisonTable'
import InfoBox from '../components/InfoBox'
import { TimerDemo, DataFetchDemo, MemoryLeakDemo } from '../components/InteractiveDemo'

const slides = [
  {
    id: 1,
    title: "React 19 Component Lifecycle (Functional Approach)",
    content: (
      <div>
        <InfoBox type="new" title="React 19 Updates">
          <p>React 19 introduces improved concurrent features, better error boundaries, enhanced server components support, and automatic batching while maintaining the same useEffect patterns you know.</p>
        </InfoBox>

        <h3>Traditional Component Lifecycle</h3>
        <LifecycleDiagram />
        
        <p>In class components, we had explicit lifecycle methods like <span className="highlight">componentDidMount</span>, <span className="highlight">componentDidUpdate</span>, and <span className="highlight">componentWillUnmount</span>.</p>
        
        <h3>Functional Components with useEffect in React 19</h3>
        <p>With functional components, <span className="highlight">useEffect</span> simulates all lifecycle events in a single, flexible hook. React 19 maintains full backward compatibility while improving performance.</p>
        
        <CodeBlock language="jsx" title="Basic useEffect Example">
{`import React, { useEffect, useState } from 'react'

function MyComponent() {
  const [count, setCount] = useState(0)

  // This effect runs after every render
  // React 19: Better performance with automatic batching
  useEffect(() => {
    console.log('Component rendered or updated')
    
    // React 19: Improved scheduling and prioritization
    document.title = \`Count: \${count}\`
  })

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  )
}`}
        </CodeBlock>

        <InfoBox type="success" title="Key Insight">
          <p>React 19's improved concurrent rendering, better error recovery, and enhanced performance with automatic batching make useEffect even more powerful and predictable.</p>
        </InfoBox>
      </div>
    )
  },
  {
    id: 2,
    title: "Effect Variations with React 19 Examples",
    content: (
      <div>
        <h3>Three Main Patterns <span className="react19-badge">Enhanced in React 19</span></h3>
        
        <h4>1. Run Once on Mount (Empty Dependency Array)</h4>
        <CodeBlock language="jsx" title="Mount Effect with React 19">
{`useEffect(() => {
  // React 19: Better handling of strict mode double execution
  console.log('Component mounted!')
  
  // React 19: Improved fetch with automatic AbortController
  const controller = new AbortController()
  fetch('/api/user', { signal: controller.signal })
    .then(response => response.json())
    .then(data => setUser(data))
    .catch(error => {
      if (error.name !== 'AbortError') {
        console.error('Fetch failed:', error)
      }
    })
    
  return () => controller.abort()
}, []) // Empty dependency array = mount only`}
        </CodeBlock>

        <h4>2. Run on State/Props Changes (With Dependencies)</h4>
        <CodeBlock language="jsx" title="Dependency Effect">
{`const [userId, setUserId] = useState(1)

useEffect(() => {
  // React 19: Better concurrent handling of state updates
  console.log('User ID changed to:', userId)
  
  // React 19: Automatic batching prevents unnecessary re-renders
  fetchUserProfile(userId).then(profile => {
    setUserData(profile)
    setLastUpdated(new Date())
  })
}, [userId]) // React 19: Better dependency tracking`}
        </CodeBlock>

        <h4>3. Run on Every Render (No Dependency Array)</h4>
        <CodeBlock language="jsx" title="Every Render Effect">
{`useEffect(() => {
  // React 19: Improved performance for frequent updates
  console.log('Component rendered')
  
  // React 19: Better handling of DOM updates
  updateDocumentTitle()
  measurePerformance()
}) // No dependency array = every render`}
        </CodeBlock>

        <InfoBox type="new" title="React 19 Improvements">
          <ul>
            <li><strong>Automatic Batching:</strong> Multiple state updates are automatically batched</li>
            <li><strong>Better Strict Mode:</strong> Improved handling of development double-execution</li>
            <li><strong>Enhanced Concurrency:</strong> Better prioritization of effect execution</li>
            <li><strong>Improved Error Boundaries:</strong> Better error recovery in effects</li>
          </ul>
        </InfoBox>

        <ComparisonTable 
          headers={['Pattern', 'When it runs', 'React 19 Enhancement']}
          rows={[
            ['useEffect(fn, [])', 'Once on mount', 'Better strict mode handling'],
            ['useEffect(fn, [dep])', 'When dep changes', 'Improved dependency tracking'],
            ['useEffect(fn)', 'Every render', 'Automatic batching optimization']
          ]}
        />
      </div>
    )
  },
  {
    id: 3,
    title: "Multiple useEffect Calls in React 19",
    content: (
      <div>
        <h3>Separation of Concerns <span className="react19-badge">Optimized</span></h3>
        <p>React 19's improved concurrent features make multiple effects even more efficient:</p>

        <CodeBlock language="jsx" title="Multiple Effects Example">
{`function UserDashboard({ userId }) {
  const [user, setUser] = useState(null)
  const [notifications, setNotifications] = useState([])

  // Effect 1: Fetch user data when userId changes
  // React 19: Better concurrent handling
  useEffect(() => {
    const controller = new AbortController()
    
    async function fetchUser() {
      try {
        const response = await fetch(\`/api/users/\${userId}\`, {
          signal: controller.signal
        })
        const userData = await response.json()
        setUser(userData)
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Failed to fetch user:', error)
        }
      }
    }
    
    fetchUser()
    return () => controller.abort()
  }, [userId])

  // Effect 2: Set up scroll listener (runs once)
  // React 19: Improved event handling
  useEffect(() => {
    function handleScroll() {
      // React 19: Better performance with passive listeners
      if (window.scrollY > 500) {
        loadMoreNotifications()
      }
    }

    // React 19: Automatic passive listener optimization
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Effect 3: Update document title when user changes
  // React 19: Automatic batching with DOM updates
  useEffect(() => {
    if (user) {
      // React 19: Better DOM update scheduling
      document.title = \`Dashboard - \${user.name}\`
      
      // Multiple DOM updates are automatically batched
      document.querySelector('meta[name="description"]')
        ?.setAttribute('content', \`\${user.name}'s dashboard\`)
    }
    
    return () => {
      document.title = 'Dashboard'
    }
  }, [user])

  return <div>...</div>
}`}
        </CodeBlock>

        <InfoBox type="new" title="React 19 Multiple Effect Benefits">
          <ul>
            <li><strong>Concurrent Execution:</strong> Effects can run in parallel when possible</li>
            <li><strong>Better Prioritization:</strong> Important effects get higher priority</li>
            <li><strong>Improved Error Isolation:</strong> One effect failing doesn't break others</li>
            <li><strong>Enhanced Developer Tools:</strong> Better debugging support for multiple effects</li>
            <li><strong>Automatic Optimization:</strong> React 19 automatically optimizes effect scheduling</li>
          </ul>
        </InfoBox>

        <InfoBox type="success" title="Performance Benefits in React 19">
          <ul>
            <li><strong>Smarter scheduling:</strong> Effects are batched and prioritized intelligently</li>
            <li><strong>Reduced re-renders:</strong> Better dependency tracking prevents unnecessary updates</li>
            <li><strong>Concurrent safety:</strong> Effects work seamlessly with concurrent features</li>
            <li><strong>Memory efficiency:</strong> Improved cleanup and garbage collection</li>
          </ul>
        </InfoBox>
      </div>
    )
  },
  {
    id: 4,
    title: "Cleanup Deep Dive in React 19",
    content: (
      <div>
        <h3>Enhanced Cleanup Patterns <span className="react19-badge">Improved</span></h3>
        <p>React 19 provides better cleanup handling and memory management:</p>

        <h4>Example 1: Timer Cleanup with React 19</h4>
        <CodeBlock language="jsx" title="Timer with Enhanced Cleanup">
{`function Timer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    // React 19: Better timer precision and cleanup
    const intervalId = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)

    // React 19: Enhanced cleanup with better error handling
    return () => {
      clearInterval(intervalId)
      console.log('Timer cleaned up')
      
      // React 19: Cleanup is more reliable in concurrent mode
    }
  }, []) // React 19: Better strict mode handling

  return <div>Seconds: {seconds}</div>
}`}
        </CodeBlock>

        <h4>Example 2: Event Listener Cleanup</h4>
        <CodeBlock language="jsx" title="Event Listener with React 19">
{`function WindowSize() {
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    function updateSize() {
      // React 19: Automatic batching of multiple state updates
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    // React 19: Better event listener optimization
    const options = { passive: true }
    window.addEventListener('resize', updateSize, options)
    updateSize() // Set initial size

    // React 19: More reliable cleanup
    return () => {
      window.removeEventListener('resize', updateSize, options)
      // React 19: Better memory management
    }
  }, [])

  return <div>{size.width} x {size.height}</div>
}`}
        </CodeBlock>

        <h4>Example 3: Advanced API Request Cleanup</h4>
        <CodeBlock language="jsx" title="API Request with AbortController">
{`function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // React 19: Built-in AbortController support
    const controller = new AbortController()
    let cancelled = false

    async function fetchUser() {
      try {
        setLoading(true)
        setError(null)
        
        // React 19: Better fetch integration
        const response = await fetch(\`/api/users/\${userId}\`, {
          signal: controller.signal,
          // React 19: Enhanced request options
          priority: 'high'
        })
        
        if (!response.ok) {
          throw new Error(\`HTTP \${response.status}\`)
        }
        
        const userData = await response.json()
        
        // React 19: Automatic batching prevents unnecessary re-renders
        if (!cancelled) {
          setUser(userData)
          setLoading(false)
        }
      } catch (error) {
        if (!cancelled && error.name !== 'AbortError') {
          // React 19: Better error boundary integration
          setError(error.message)
          setLoading(false)
        }
      }
    }

    fetchUser()

    // React 19: Enhanced cleanup with better guarantees
    return () => {
      cancelled = true
      controller.abort()
      
      // React 19: Cleanup is more predictable
      console.log('Fetch cancelled for user:', userId)
    }
  }, [userId])

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  return user ? <div>{user.name}</div> : null
}`}
        </CodeBlock>

        <InfoBox type="new" title="React 19 Cleanup Improvements">
          <ul>
            <li><strong>Better AbortController Support:</strong> Native integration with fetch API</li>
            <li><strong>Enhanced Memory Management:</strong> More predictable cleanup execution</li>
            <li><strong>Concurrent Mode Safety:</strong> Cleanup works properly with interruptions</li>
            <li><strong>Error Boundary Integration:</strong> Cleanup errors are handled gracefully</li>
            <li><strong>Development Mode:</strong> Better warnings for missing cleanup</li>
          </ul>
        </InfoBox>
      </div>
    )
  },
  {
    id: 5,
    title: "Common Mistakes in React 19",
    content: (
      <div>
        <h3>Updated Patterns for React 19 <span className="react19-badge">Enhanced</span></h3>
        
        <h4>1. Async Functions in useEffect</h4>
        
        <InfoBox type="warning" title="❌ Still Wrong in React 19">
          <CodeBlock language="jsx">
{`// This still doesn't work in React 19!
useEffect(async () => {
  const data = await fetchData()
  setData(data)
}, [])`}
          </CodeBlock>
        </InfoBox>

        <InfoBox type="success" title="✅ React 19 Best Practice">
          <CodeBlock language="jsx">
{`useEffect(() => {
  const controller = new AbortController()
  
  async function fetchData() {
    try {
      // React 19: Enhanced fetch with better error handling
      const response = await fetch('/api/data', {
        signal: controller.signal,
        // React 19: New request priority hints
        priority: 'high'
      })
      
      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`)
      }
      
      const data = await response.json()
      setData(data)
    } catch (error) {
      if (error.name !== 'AbortError') {
        // React 19: Better error boundary support
        setError(error.message)
      }
    }
  }
  
  fetchData()
  
  // React 19: More reliable cleanup
  return () => controller.abort()
}, [])`}
          </CodeBlock>
        </InfoBox>

        <h4>2. Missing Dependencies (React 19 helps catch these!)</h4>
        
        <InfoBox type="warning" title="❌ Wrong Way">
          <CodeBlock language="jsx">
{`function SearchResults({ searchTerm, filters }) {
  const [results, setResults] = useState([])
  
  useEffect(() => {
    // React 19: Better linting will catch this
    fetchSearchResults(searchTerm, filters).then(setResults)
  }, []) // Missing dependencies!
  
  return <div>...</div>
}`}
          </CodeBlock>
        </InfoBox>

        <InfoBox type="success" title="✅ React 19 Enhanced Pattern">
          <CodeBlock language="jsx">
{`function SearchResults({ searchTerm, filters }) {
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  
  useEffect(() => {
    // React 19: Better dependency tracking
    const controller = new AbortController()
    
    async function search() {
      setLoading(true)
      try {
        const data = await fetchSearchResults(searchTerm, filters, {
          signal: controller.signal
        })
        setResults(data)
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Search failed:', error)
        }
      } finally {
        setLoading(false)
      }
    }
    
    search()
    return () => controller.abort()
  }, [searchTerm, filters]) // React 19: Better linting support
  
  return <div>...</div>
}`}
          </CodeBlock>
        </InfoBox>

        <h4>3. Infinite Re-render Prevention</h4>
        
        <InfoBox type="success" title="✅ React 19 Solution with useMemo">
          <CodeBlock language="jsx">
{`import { useMemo } from 'react'

function OptimizedComponent({ data }) {
  const [processedData, setProcessedData] = useState(null)
  
  // React 19: Better memoization performance
  const stableConfig = useMemo(() => ({
    sortBy: 'name',
    filterBy: data.category,
    includeInactive: false
  }), [data.category])
  
  useEffect(() => {
    // React 19: This won't cause infinite loops
    const processed = processData(data, stableConfig)
    setProcessedData(processed)
  }, [data, stableConfig]) // Safe with useMemo
  
  return <div>...</div>
}`}
          </CodeBlock>
        </InfoBox>

        <InfoBox type="new" title="React 19 Developer Experience">
          <ul>
            <li><strong>Enhanced ESLint Rules:</strong> Better detection of effect mistakes</li>
            <li><strong>Improved DevTools:</strong> Better visualization of effect dependencies</li>
            <li><strong>Better Error Messages:</strong> More helpful warnings and errors</li>
            <li><strong>Strict Mode Improvements:</strong> Better development-time error catching</li>
          </ul>
        </InfoBox>
      </div>
    )
  },
  {
    id: 6,
    title: "React 19 Best Practices",
    content: (
      <div>
        <h3>Enhanced Patterns for React 19 <span className="react19-badge">Latest</span></h3>

        <h4>1. Multiple Small Effects with React 19 Optimizations</h4>
        <CodeBlock language="jsx" title="Optimized Multiple Effects">
{`// ✅ React 19: Automatic effect batching and prioritization
function Dashboard({ userId, theme, locale }) {
  // Effect for user data - high priority
  useEffect(() => {
    const controller = new AbortController()
    fetchUser(userId, { signal: controller.signal }).then(setUser)
    return () => controller.abort()
  }, [userId])
  
  // Effect for theme - low priority, batched
  useEffect(() => {
    document.body.className = theme
    document.documentElement.setAttribute('data-theme', theme)
  }, [theme])
  
  // Effect for locale - medium priority
  useEffect(() => {
    import(\`/locales/\${locale}.js\`).then(setLocaleData)
  }, [locale])
  
  // Effect for analytics - background priority
  useEffect(() => {
    // React 19: Better scheduler integration
    scheduler.postTask(() => {
      analytics.track('dashboard_view', { userId, theme, locale })
    }, { priority: 'background' })
  }, [userId, theme, locale])
}`}
        </CodeBlock>

        <h4>2. Advanced Custom Hooks with React 19</h4>
        <CodeBlock language="jsx" title="Enhanced Custom Hook">
{`// React 19: Enhanced custom hook with better error handling
function useApiData(url, options = {}) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // React 19: Better memoization
  const stableOptions = useMemo(() => ({
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  }), [options.headers])
  
  useEffect(() => {
    const controller = new AbortController()
    
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)
        
        // React 19: Enhanced fetch with automatic retries
        const response = await fetch(url, {
          ...stableOptions,
          signal: controller.signal,
          // React 19: Priority hints
          priority: stableOptions.priority || 'auto'
        })
        
        if (!response.ok) {
          throw new Error(\`HTTP \${response.status}: \${response.statusText}\`)
        }
        
        const result = await response.json()
        
        // React 19: Automatic batching
        setData(result)
        setLoading(false)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err)
          setLoading(false)
        }
      }
    }
    
    fetchData()
    
    return () => {
      controller.abort()
      // React 19: Better cleanup guarantees
    }
  }, [url, stableOptions])
  
  // React 19: Return stable object reference
  return useMemo(() => ({ 
    data, 
    loading, 
    error,
    // React 19: Built-in refetch functionality
    refetch: () => fetchData()
  }), [data, loading, error])
}

// Usage with React 19 enhancements
function UserProfile({ userId }) {
  const { data: user, loading, error, refetch } = useApiData(
    \`/api/users/\${userId}\`,
    { priority: 'high' }
  )
  
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>
  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={refetch}>Refresh</button>
    </div>
  )
}`}
        </CodeBlock>

        <h4>3. React 19 Enhanced ESLint Configuration</h4>
        <CodeBlock language="json" title="Updated ESLint Config">
{`// .eslintrc.js - Updated for React 19
{
  "extends": [
    "react-app",
    "@react/recommended"
  ],
  "plugins": ["react-hooks"],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    // React 19: New rules for better effect handling
    "react/prefer-concurrent-mode": "warn",
    "react/no-unstable-concurrent-features": "error"
  },
  "settings": {
    "react": {
      "version": "19"
    }
  }
}`}
        </CodeBlock>

        <InfoBox type="new" title="React 19 Advanced Features">
          <ul>
            <li><strong>Enhanced Server Components:</strong> Better SSR integration with useEffect</li>
            <li><strong>Improved Suspense:</strong> Better error boundaries and fallback handling</li>
            <li><strong>Automatic Batching:</strong> All state updates are batched by default</li>
            <li><strong>Priority-based Scheduling:</strong> Effects can specify priority levels</li>
            <li><strong>Better DevTools:</strong> Enhanced debugging and profiling capabilities</li>
            <li><strong>Concurrent Features:</strong> useEffect works seamlessly with time-slicing</li>
          </ul>
        </InfoBox>

        <InfoBox type="success" title="React 19 Key Takeaways">
          <ul>
            <li>Keep effects focused and use React 19's automatic optimizations</li>
            <li>Leverage enhanced error boundaries and cleanup guarantees</li>
            <li>Use priority hints for better performance</li>
            <li>Take advantage of improved developer tools and linting</li>
            <li>Embrace concurrent features for better user experience</li>
            <li>Use enhanced custom hooks patterns for better reusability</li>
          </ul>
        </InfoBox>
      </div>
    )
  },
  {
    id: 7,
    title: "Interactive Examples - See useEffect in Action!",
    content: (
      <div>
        <InfoBox type="new" title="🎮 Hands-on Learning">
          <p>These interactive demos let you see exactly when useEffect runs, when cleanup happens, and how dependencies work. Click the buttons and watch the logs!</p>
        </InfoBox>

        <h3>Timer Demo - Mount, Update, Unmount</h3>
        <p>Watch how useEffect handles timer setup and cleanup:</p>
        <TimerDemo />

        <h3>Data Fetching Demo - Dependency Changes</h3>
        <p>See how changing dependencies triggers new effects and cleanup:</p>
        <DataFetchDemo />

        <h3>Memory Leak Demo - Good vs Bad Patterns</h3>
        <p>Compare proper cleanup vs memory leaks in real-time:</p>
        <MemoryLeakDemo />

        <InfoBox type="success" title="Key Observations">
          <ul>
            <li><strong>Cleanup Always Runs:</strong> Before new effect and on unmount</li>
            <li><strong>Dependencies Matter:</strong> Changes trigger new effect cycles</li>
            <li><strong>Memory Leaks:</strong> Happen when cleanup is missing</li>
            <li><strong>React 19:</strong> Better error handling and stricter cleanup enforcement</li>
          </ul>
        </InfoBox>
      </div>
    )
  },
  {
    id: 8,
    title: "Real-World Use Cases and Patterns",
    content: (
      <div>
        <h3>🌐 API Integration Patterns</h3>
        
        <h4>1. Data Fetching with Loading States</h4>
        <CodeBlock language="jsx" title="Complete Data Fetching Hook">
{`function useApi(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    
    async function fetchData() {
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch(url, {
          signal: controller.signal,
          headers: {
            'Authorization': \`Bearer \${getToken()}\`,
            'Content-Type': 'application/json'
          }
        })
        
        if (!response.ok) {
          throw new Error(\`HTTP \${response.status}: \${response.statusText}\`)
        }
        
        const result = await response.json()
        
        // React 19: Automatic batching
        setData(result)
        setLoading(false)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
          setLoading(false)
        }
      }
    }
    
    fetchData()
    
    return () => {
      controller.abort()
      console.log('API request cancelled')
    }
  }, [url])
  
  return { data, loading, error }
}`}
        </CodeBlock>

        <h4>2. WebSocket Connection Management</h4>
        <CodeBlock language="jsx" title="WebSocket with Reconnection">
{`function useWebSocket(url, options = {}) {
  const [socket, setSocket] = useState(null)
  const [connectionStatus, setConnectionStatus] = useState('Connecting')
  const [messageHistory, setMessageHistory] = useState([])

  useEffect(() => {
    let ws = null
    let reconnectTimeoutId = null
    let reconnectAttempts = 0
    
    function connect() {
      try {
        ws = new WebSocket(url)
        setSocket(ws)
        
        ws.onopen = () => {
          console.log('WebSocket connected')
          setConnectionStatus('Connected')
          reconnectAttempts = 0
        }
        
        ws.onmessage = (event) => {
          const message = JSON.parse(event.data)
          setMessageHistory(prev => [...prev.slice(-99), message])
        }
        
        ws.onclose = (event) => {
          console.log('WebSocket closed', event.code, event.reason)
          setConnectionStatus('Disconnected')
          
          // Auto-reconnect logic
          if (!event.wasClean && reconnectAttempts < 5) {
            reconnectAttempts++
            setConnectionStatus(\`Reconnecting... (\${reconnectAttempts}/5)\`)
            reconnectTimeoutId = setTimeout(connect, 2000 * reconnectAttempts)
          }
        }
        
        ws.onerror = (error) => {
          console.error('WebSocket error:', error)
          setConnectionStatus('Error')
        }
      } catch (error) {
        console.error('WebSocket connection failed:', error)
        setConnectionStatus('Error')
      }
    }
    
    connect()
    
    return () => {
      if (reconnectTimeoutId) {
        clearTimeout(reconnectTimeoutId)
      }
      if (ws) {
        ws.close(1000, 'Component unmounting')
      }
    }
  }, [url])
  
  const sendMessage = useCallback((message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message))
    }
  }, [socket])
  
  return { socket, connectionStatus, messageHistory, sendMessage }
}`}
        </CodeBlock>

        <h4>3. Local Storage Synchronization</h4>
        <CodeBlock language="jsx" title="Sync State with localStorage">
{`function useLocalStorage(key, initialValue) {
  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(\`Error loading \${key} from localStorage:\`, error)
      return initialValue
    }
  })

  // Update localStorage when state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue))
      
      // Dispatch custom event for cross-tab synchronization
      window.dispatchEvent(new CustomEvent('localStorageChange', {
        detail: { key, value: storedValue }
      }))
    } catch (error) {
      console.error(\`Error saving \${key} to localStorage:\`, error)
    }
  }, [key, storedValue])

  // Listen for changes from other tabs
  useEffect(() => {
    function handleStorageChange(e) {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue))
        } catch (error) {
          console.error('Error parsing localStorage value:', error)
        }
      }
    }
    
    function handleCustomStorageChange(e) {
      if (e.detail.key === key) {
        setStoredValue(e.detail.value)
      }
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('localStorageChange', handleCustomStorageChange)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('localStorageChange', handleCustomStorageChange)
    }
  }, [key])

  return [storedValue, setStoredValue]
}`}
        </CodeBlock>

        <InfoBox type="success" title="Production-Ready Patterns">
          <ul>
            <li><strong>Error Handling:</strong> Always handle network failures gracefully</li>
            <li><strong>Loading States:</strong> Provide immediate user feedback</li>
            <li><strong>Cleanup:</strong> Cancel requests and close connections</li>
            <li><strong>Reconnection:</strong> Implement retry logic for critical connections</li>
            <li><strong>Cross-tab Sync:</strong> Keep state consistent across browser tabs</li>
          </ul>
        </InfoBox>
      </div>
    )
  },
  {
    id: 9,
    title: "Performance Optimization and Monitoring",
    content: (
      <div>
        <h3>⚡ React 19 Performance Features</h3>

        <InfoBox type="new" title="React 19 Performance Improvements">
          <ul>
            <li><strong>Automatic Batching:</strong> All state updates are batched automatically</li>
            <li><strong>Concurrent Rendering:</strong> Better prioritization of updates</li>
            <li><strong>Enhanced Suspense:</strong> Better loading state management</li>
            <li><strong>Improved DevTools:</strong> Better performance profiling</li>
          </ul>
        </InfoBox>

        <h4>1. Optimizing Effect Dependencies</h4>
        <CodeBlock language="jsx" title="Memoization Patterns">
{`function OptimizedComponent({ config, filters }) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  // ❌ Bad: Object recreated every render
  const badSearchParams = {
    query: config.query,
    filters: filters,
    sort: 'name'
  }

  // ✅ Good: Stable object reference
  const searchParams = useMemo(() => ({
    query: config.query,
    filters: filters,
    sort: 'name'
  }), [config.query, filters])

  // ❌ Bad: Function recreated every render
  const badFetchData = async () => {
    const response = await api.search(searchParams)
    return response.data
  }

  // ✅ Good: Stable function reference
  const fetchData = useCallback(async () => {
    const response = await api.search(searchParams)
    return response.data
  }, [searchParams])

  useEffect(() => {
    let cancelled = false
    
    async function loadData() {
      setLoading(true)
      try {
        const result = await fetchData()
        if (!cancelled) {
          setData(result)
        }
      } catch (error) {
        if (!cancelled) {
          console.error('Search failed:', error)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }
    
    loadData()
    
    return () => {
      cancelled = true
    }
  }, [fetchData]) // Stable dependency

  return (
    <div>
      {loading ? 'Loading...' : \`\${data.length} results\`}
    </div>
  )
}`}
        </CodeBlock>

        <h4>2. Debouncing and Throttling</h4>
        <CodeBlock language="jsx" title="Performance Patterns">
{`// Debounced search hook
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// Throttled scroll hook
function useThrottle(callback, delay) {
  const callbackRef = useRef(callback)
  const lastRun = useRef(Date.now())

  useEffect(() => {
    callbackRef.current = callback
  }, [callback])

  return useCallback((...args) => {
    if (Date.now() - lastRun.current >= delay) {
      callbackRef.current(...args)
      lastRun.current = Date.now()
    }
  }, [delay])
}

// Usage example
function SearchComponent() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState([])
  
  // Debounce search input
  const debouncedSearchTerm = useDebounce(searchTerm, 300)
  
  // Throttle scroll events
  const throttledScroll = useThrottle(() => {
    console.log('Scroll event handled')
  }, 100)

  useEffect(() => {
    if (debouncedSearchTerm) {
      // This only runs 300ms after user stops typing
      searchAPI(debouncedSearchTerm).then(setResults)
    }
  }, [debouncedSearchTerm])

  useEffect(() => {
    window.addEventListener('scroll', throttledScroll)
    return () => window.removeEventListener('scroll', throttledScroll)
  }, [throttledScroll])

  return (
    <div>
      <input 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
      />
      <div>{results.length} results</div>
    </div>
  )
}`}
        </CodeBlock>

        <h4>3. Performance Monitoring</h4>
        <CodeBlock language="jsx" title="React 19 Performance Monitoring">
{`function usePerformanceMonitor(componentName) {
  const renderCount = useRef(0)
  const [performanceData, setPerformanceData] = useState({})

  useEffect(() => {
    renderCount.current += 1
    
    // React 19: Enhanced Performance API
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries()
      const reactEntries = entries.filter(entry => 
        entry.name.includes('⚛️') || entry.name.includes(componentName)
      )
      
      if (reactEntries.length > 0) {
        setPerformanceData(prev => ({
          ...prev,
          lastRender: reactEntries[reactEntries.length - 1].duration,
          averageRender: (prev.averageRender || 0 + reactEntries[reactEntries.length - 1].duration) / 2,
          renderCount: renderCount.current
        }))
      }
    })
    
    observer.observe({ entryTypes: ['measure', 'navigation'] })
    
    return () => observer.disconnect()
  })

  // Log slow renders in development
  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && performanceData.lastRender > 16) {
      console.warn(\`Slow render detected in \${componentName}:\`, {
        duration: performanceData.lastRender,
        renderCount: performanceData.renderCount
      })
    }
  }, [performanceData, componentName])

  return performanceData
}

// Usage
function MyComponent() {
  const perf = usePerformanceMonitor('MyComponent')
  
  // Component logic...
  
  return (
    <div>
      {process.env.NODE_ENV === 'development' && (
        <div style={{ fontSize: '0.8rem', color: '#666' }}>
          Renders: {perf.renderCount} | Last: {perf.lastRender?.toFixed(2)}ms
        </div>
      )}
      {/* Component content */}
    </div>
  )
}`}
        </CodeBlock>

        <InfoBox type="success" title="Performance Best Practices">
          <ul>
            <li><strong>Stable References:</strong> Use useMemo and useCallback for objects/functions in dependencies</li>
            <li><strong>Debounce Inputs:</strong> Prevent excessive API calls from user input</li>
            <li><strong>Throttle Events:</strong> Limit high-frequency events like scroll/resize</li>
            <li><strong>Monitor Performance:</strong> Track render times and identify bottlenecks</li>
            <li><strong>Leverage React 19:</strong> Take advantage of automatic batching and concurrent features</li>
          </ul>
        </InfoBox>
      </div>
    )
  },
  {
    id: 10,
    title: "Testing useEffect Hooks",
    content: (
      <div>
        <h3>🧪 Comprehensive Testing Strategies</h3>

        <InfoBox type="info" title="Testing Philosophy">
          <p>Test behavior, not implementation. Focus on what users see and experience, not internal hook mechanics.</p>
        </InfoBox>

        <h4>1. Testing Effects with React Testing Library</h4>
        <CodeBlock language="jsx" title="Basic Effect Testing">
{`import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi } from 'vitest' // or jest

function DataComponent({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchUser() {
      setLoading(true)
      try {
        const response = await fetch(\`/api/users/\${userId}\`)
        const userData = await response.json()
        setUser(userData)
      } catch (error) {
        console.error('Failed to fetch user:', error)
      } finally {
        setLoading(false)
      }
    }
    
    fetchUser()
  }, [userId])

  if (loading) return <div>Loading...</div>
  if (!user) return <div>No user found</div>
  return <div>Hello, {user.name}!</div>
}

// Test file
describe('DataComponent', () => {
  beforeEach(() => {
    // Mock fetch
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.resetAllMocks()
  })

  test('loads and displays user data', async () => {
    // Arrange
    const mockUser = { id: 1, name: 'John Doe' }
    fetch.mockResolvedValueOnce({
      json: async () => mockUser
    })

    // Act
    render(<DataComponent userId={1} />)

    // Assert initial loading state
    expect(screen.getByText('Loading...')).toBeInTheDocument()

    // Wait for data to load
    await waitFor(() => {
      expect(screen.getByText('Hello, John Doe!')).toBeInTheDocument()
    })

    // Verify API was called correctly
    expect(fetch).toHaveBeenCalledWith('/api/users/1')
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  test('refetches data when userId changes', async () => {
    // Setup mocks for different users
    fetch
      .mockResolvedValueOnce({
        json: async () => ({ id: 1, name: 'John Doe' })
      })
      .mockResolvedValueOnce({
        json: async () => ({ id: 2, name: 'Jane Smith' })
      })

    const { rerender } = render(<DataComponent userId={1} />)

    // Wait for first user to load
    await waitFor(() => {
      expect(screen.getByText('Hello, John Doe!')).toBeInTheDocument()
    })

    // Change userId prop
    rerender(<DataComponent userId={2} />)

    // Should show loading again
    expect(screen.getByText('Loading...')).toBeInTheDocument()

    // Wait for second user to load
    await waitFor(() => {
      expect(screen.getByText('Hello, Jane Smith!')).toBeInTheDocument()
    })

    expect(fetch).toHaveBeenCalledTimes(2)
  })
})`}
        </CodeBlock>

        <h4>2. Testing Cleanup Functions</h4>
        <CodeBlock language="jsx" title="Cleanup Testing">
{`function TimerComponent() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return <div>Count: {count}</div>
}

test('cleans up interval on unmount', async () => {
  // Mock setInterval and clearInterval
  const mockSetInterval = vi.fn(() => 123) // Return fake interval ID
  const mockClearInterval = vi.fn()
  
  vi.stubGlobal('setInterval', mockSetInterval)
  vi.stubGlobal('clearInterval', mockClearInterval)

  const { unmount } = render(<TimerComponent />)

  // Verify interval was set up
  expect(mockSetInterval).toHaveBeenCalledWith(expect.any(Function), 1000)

  // Unmount component
  unmount()

  // Verify cleanup was called
  expect(mockClearInterval).toHaveBeenCalledWith(123)
})`}
        </CodeBlock>

        <h4>3. Testing Custom Hooks</h4>
        <CodeBlock language="jsx" title="Custom Hook Testing">
{`import { renderHook, act } from '@testing-library/react'

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)

  const increment = useCallback(() => {
    setCount(prev => prev + 1)
  }, [])

  const decrement = useCallback(() => {
    setCount(prev => prev - 1)
  }, [])

  const reset = useCallback(() => {
    setCount(initialValue)
  }, [initialValue])

  return { count, increment, decrement, reset }
}

describe('useCounter', () => {
  test('initializes with default value', () => {
    const { result } = renderHook(() => useCounter())
    expect(result.current.count).toBe(0)
  })

  test('initializes with custom value', () => {
    const { result } = renderHook(() => useCounter(10))
    expect(result.current.count).toBe(10)
  })

  test('increments count', () => {
    const { result } = renderHook(() => useCounter())
    
    act(() => {
      result.current.increment()
    })
    
    expect(result.current.count).toBe(1)
  })

  test('resets to initial value when initial value changes', () => {
    const { result, rerender } = renderHook(
      ({ initialValue }) => useCounter(initialValue),
      { initialProps: { initialValue: 0 } }
    )

    act(() => {
      result.current.increment()
      result.current.increment()
    })
    
    expect(result.current.count).toBe(2)

    // Change initial value
    rerender({ initialValue: 5 })
    
    act(() => {
      result.current.reset()
    })
    
    expect(result.current.count).toBe(5)
  })
})`}
        </CodeBlock>

        <h4>4. Mocking and Integration Testing</h4>
        <CodeBlock language="jsx" title="Integration Testing">
{`// Mock API module
vi.mock('../api/userService', () => ({
  fetchUser: vi.fn(),
  updateUser: vi.fn()
}))

import { fetchUser, updateUser } from '../api/userService'

test('full user interaction flow', async () => {
  const user = userEvent.setup()
  
  // Mock API responses
  fetchUser.mockResolvedValue({ id: 1, name: 'John', email: 'john@example.com' })
  updateUser.mockResolvedValue({ id: 1, name: 'John Updated', email: 'john@example.com' })

  render(<UserProfile userId={1} />)

  // Wait for initial load
  await waitFor(() => {
    expect(screen.getByText('John')).toBeInTheDocument()
  })

  // Click edit button
  await user.click(screen.getByRole('button', { name: /edit/i }))

  // Update name
  const nameInput = screen.getByLabelText(/name/i)
  await user.clear(nameInput)
  await user.type(nameInput, 'John Updated')

  // Save changes
  await user.click(screen.getByRole('button', { name: /save/i }))

  // Verify API call
  expect(updateUser).toHaveBeenCalledWith(1, {
    name: 'John Updated',
    email: 'john@example.com'
  })

  // Verify UI update
  await waitFor(() => {
    expect(screen.getByText('John Updated')).toBeInTheDocument()
  })
})`}
        </CodeBlock>

        <InfoBox type="success" title="Testing Best Practices">
          <ul>
            <li><strong>Test User Behavior:</strong> Focus on what users see and do</li>
            <li><strong>Mock External Dependencies:</strong> APIs, timers, and browser APIs</li>
            <li><strong>Test Cleanup:</strong> Verify resources are properly cleaned up</li>
            <li><strong>Use waitFor:</strong> Handle asynchronous operations properly</li>
            <li><strong>Test Edge Cases:</strong> Error states, network failures, race conditions</li>
            <li><strong>Integration Tests:</strong> Test complete user workflows</li>
          </ul>
        </InfoBox>
      </div>
    )
  },
  {
    id: 11,
    title: "Debugging and Troubleshooting",
    content: (
      <div>
        <h3>🔍 Debugging useEffect Issues</h3>

        <InfoBox type="info" title="React 19 DevTools Enhancements">
          <p>React 19 includes improved DevTools with better effect tracking, dependency visualization, and performance profiling.</p>
        </InfoBox>

        <h4>1. Common Issues and Solutions</h4>

        <InfoBox type="warning" title="Infinite Loop Debug Pattern">
          <CodeBlock language="jsx">
{`// ❌ Problem: Infinite loop
function ProblematicComponent({ data }) {
  const [processedData, setProcessedData] = useState([])

  useEffect(() => {
    // This creates a new object every time!
    const config = { sortBy: 'name', filters: data.filters }
    
    const processed = processData(data.items, config)
    setProcessedData(processed)
  }, [data, processedData]) // processedData causes infinite loop!

  return <div>{processedData.length} items</div>
}

// ✅ Solution: Fix dependencies and object creation
function FixedComponent({ data }) {
  const [processedData, setProcessedData] = useState([])

  // Stable config object
  const config = useMemo(() => ({
    sortBy: 'name',
    filters: data.filters
  }), [data.filters])

  useEffect(() => {
    const processed = processData(data.items, config)
    setProcessedData(processed)
  }, [data.items, config]) // Correct dependencies

  return <div>{processedData.length} items</div>
}`}
          </CodeBlock>
        </InfoBox>

        <h4>2. React 19 Debugging Tools</h4>
        <CodeBlock language="jsx" title="Enhanced Debugging Utilities">
{`// Custom debugging hook for React 19
function useEffectDebugger(effectHook, dependencies, dependencyNames = []) {
  const previousDeps = useRef(dependencies)
  const changedDeps = useRef([])

  useEffect(() => {
    // Check which dependencies changed
    const changes = dependencies.reduce((acc, dependency, index) => {
      if (previousDeps.current[index] !== dependency) {
        const depName = dependencyNames[index] || index
        acc.push({
          name: depName,
          before: previousDeps.current[index],
          after: dependency
        })
      }
      return acc
    }, [])

    if (changes.length > 0) {
      console.group('🔍 useEffect dependency changes:')
      changes.forEach(change => {
        console.log(\`📝 \${change.name}:\`, {
          from: change.before,
          to: change.after
        })
      })
      console.groupEnd()
      changedDeps.current = changes
    }

    previousDeps.current = dependencies

    // Run the actual effect
    return effectHook()
  }, dependencies)

  // Return debug info
  return {
    lastChangedDeps: changedDeps.current,
    allDeps: dependencies
  }
}

// Usage
function DebuggableComponent({ userId, filters }) {
  const [user, setUser] = useState(null)

  const debugInfo = useEffectDebugger(
    () => {
      console.log('🎯 Effect running with:', { userId, filters })
      fetchUser(userId, filters).then(setUser)
    },
    [userId, filters],
    ['userId', 'filters']
  )

  // Development-only debug panel
  if (process.env.NODE_ENV === 'development') {
    console.log('Debug info:', debugInfo)
  }

  return user ? <div>{user.name}</div> : <div>Loading...</div>
}`}
        </CodeBlock>

        <h4>3. Performance Debugging</h4>
        <CodeBlock language="jsx" title="Effect Performance Monitor">
{`function useEffectPerformance(name, effectFn, deps) {
  useEffect(() => {
    const startTime = performance.now()
    console.log(\`⏱️ Starting effect: \${name}\`)

    const cleanup = effectFn()

    const endTime = performance.now()
    const duration = endTime - startTime
    
    if (duration > 10) { // Warn if effect takes longer than 10ms
      console.warn(\`⚠️ Slow effect detected: \${name} took \${duration.toFixed(2)}ms\`)
    } else {
      console.log(\`✅ Effect completed: \${name} in \${duration.toFixed(2)}ms\`)
    }

    return () => {
      const cleanupStart = performance.now()
      if (cleanup) cleanup()
      const cleanupEnd = performance.now()
      console.log(\`🧹 Cleanup for \${name} took \${(cleanupEnd - cleanupStart).toFixed(2)}ms\`)
    }
  }, deps)
}

// Usage
function PerformanceAwareComponent() {
  const [data, setData] = useState([])

  useEffectPerformance(
    'data-fetch',
    () => {
      const controller = new AbortController()
      
      fetch('/api/heavy-data', { signal: controller.signal })
        .then(response => response.json())
        .then(setData)
        .catch(error => {
          if (error.name !== 'AbortError') {
            console.error('Fetch failed:', error)
          }
        })

      return () => controller.abort()
    },
    []
  )

  return <div>{data.length} items loaded</div>
}`}
        </CodeBlock>

        <h4>4. Memory Leak Detection</h4>
        <CodeBlock language="jsx" title="Memory Leak Detector">
{`// Development utility to detect potential memory leaks
function useMemoryLeakDetector(componentName) {
  const mountTime = useRef(Date.now())
  const timers = useRef(new Set())
  const listeners = useRef(new Set())
  const requests = useRef(new Set())

  // Track timers
  const originalSetInterval = window.setInterval
  const originalSetTimeout = window.setTimeout
  const originalClearInterval = window.clearInterval
  const originalClearTimeout = window.clearTimeout

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return

    // Override timer functions to track them
    window.setInterval = (...args) => {
      const id = originalSetInterval(...args)
      timers.current.add(id)
      console.log(\`📅 \${componentName}: Timer created (\${id})\`)
      return id
    }

    window.clearInterval = (id) => {
      originalClearInterval(id)
      timers.current.delete(id)
      console.log(\`🗑️ \${componentName}: Timer cleared (\${id})\`)
    }

    return () => {
      // Restore original functions
      window.setInterval = originalSetInterval
      window.clearInterval = originalClearInterval

      // Check for leaks
      if (timers.current.size > 0) {
        console.error(\`❌ Memory leak detected in \${componentName}:\`, {
          unclearedTimers: Array.from(timers.current),
          mountDuration: Date.now() - mountTime.current
        })
      } else {
        console.log(\`✅ \${componentName}: Clean unmount, no leaks detected\`)
      }
    }
  }, [componentName])

  return {
    activeTimers: timers.current.size,
    activeListeners: listeners.current.size,
    activeRequests: requests.current.size
  }
}

// Usage
function ComponentWithMemoryTracking() {
  const leakDetector = useMemoryLeakDetector('ComponentWithMemoryTracking')

  useEffect(() => {
    const timer = setInterval(() => {
      console.log('Timer tick')
    }, 1000)

    return () => {
      clearInterval(timer) // This cleanup prevents memory leak
    }
  }, [])

  return (
    <div>
      {process.env.NODE_ENV === 'development' && (
        <div>Active resources: {leakDetector.activeTimers} timers</div>
      )}
    </div>
  )
}`}
        </CodeBlock>

        <h4>5. DevTools Integration</h4>
        <CodeBlock language="jsx" title="React DevTools Integration">
{`// Custom hook that integrates with React DevTools
function useDevToolsInfo(componentName, data) {
  useEffect(() => {
    if (typeof window !== 'undefined' && window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      // Send custom data to DevTools
      window.__REACT_DEVTOOLS_GLOBAL_HOOK__.onCommitFiberRoot = (
        rendererID,
        root,
        priorityLevel
      ) => {
        console.log('DevTools: Component updated:', {
          component: componentName,
          data: data,
          timestamp: new Date().toISOString()
        })
      }
    }

    // React 19: Enhanced profiler integration
    if (typeof window !== 'undefined' && window.performance?.mark) {
      window.performance.mark(\`\${componentName}-effect-start\`)
      
      return () => {
        window.performance.mark(\`\${componentName}-effect-end\`)
        window.performance.measure(
          \`\${componentName}-effect-duration\`,
          \`\${componentName}-effect-start\`,
          \`\${componentName}-effect-end\`
        )
      }
    }
  }, [componentName, data])
}`}
        </CodeBlock>

        <InfoBox type="success" title="Debugging Checklist">
          <ul>
            <li><strong>Check Dependencies:</strong> Use React DevTools to inspect effect dependencies</li>
            <li><strong>Add Logging:</strong> Log when effects run and clean up</li>
            <li><strong>Monitor Performance:</strong> Track effect execution time</li>
            <li><strong>Detect Memory Leaks:</strong> Ensure all resources are cleaned up</li>
            <li><strong>Use Profiler:</strong> Identify performance bottlenecks</li>
            <li><strong>Test Edge Cases:</strong> Component unmounting, prop changes, error states</li>
          </ul>
        </InfoBox>
      </div>
    )
  },
  {
    id: 12,
    title: "Migration from Class Components",
    content: (
      <div>
        <h3>🔄 Class to Hooks Migration Guide</h3>

        <InfoBox type="info" title="Why Migrate to React 19 Hooks?">
          <p>React 19 hooks provide better performance, simpler code, improved concurrent features, and enhanced developer experience compared to class components.</p>
        </InfoBox>

        <h4>1. Lifecycle Method Equivalents</h4>
        
        <ComparisonTable 
          headers={['Class Lifecycle', 'Hook Equivalent', 'React 19 Enhancement']}
          rows={[
            ['componentDidMount', 'useEffect(() => {}, [])', 'Better strict mode handling'],
            ['componentDidUpdate', 'useEffect(() => {})', 'Automatic batching'],
            ['componentWillUnmount', 'useEffect(() => () => {})', 'Enhanced cleanup guarantees'],
            ['getDerivedStateFromProps', 'useMemo, useState', 'Better memoization'],
            ['shouldComponentUpdate', 'React.memo, useMemo', 'Automatic optimization'],
            ['componentDidCatch', 'Error Boundary (still class)', 'Better error recovery']
          ]}
        />

        <h4>2. Step-by-Step Migration Example</h4>

        <InfoBox type="warning" title="Before: Class Component">
          <CodeBlock language="jsx">
{`class UserProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      loading: true,
      error: null,
      posts: []
    }
    this.abortController = new AbortController()
  }

  async componentDidMount() {
    await this.fetchUserData()
    this.setupEventListeners()
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.setState({ loading: true, error: null })
      await this.fetchUserData()
    }
  }

  componentWillUnmount() {
    this.abortController.abort()
    this.cleanupEventListeners()
  }

  fetchUserData = async () => {
    try {
      const [userResponse, postsResponse] = await Promise.all([
        fetch(\`/api/users/\${this.props.userId}\`, {
          signal: this.abortController.signal
        }),
        fetch(\`/api/users/\${this.props.userId}/posts\`, {
          signal: this.abortController.signal
        })
      ])

      const user = await userResponse.json()
      const posts = await postsResponse.json()

      this.setState({ user, posts, loading: false })
    } catch (error) {
      if (error.name !== 'AbortError') {
        this.setState({ error: error.message, loading: false })
      }
    }
  }

  setupEventListeners = () => {
    window.addEventListener('resize', this.handleResize)
  }

  cleanupEventListeners = () => {
    window.removeEventListener('resize', this.handleResize)
  }

  handleResize = () => {
    // Handle window resize
  }

  render() {
    const { user, loading, error, posts } = this.state

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error: {error}</div>
    if (!user) return <div>User not found</div>

    return (
      <div>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
        <h2>Posts ({posts.length})</h2>
        {posts.map(post => (
          <div key={post.id}>{post.title}</div>
        ))}
      </div>
    )
  }
}`}
          </CodeBlock>
        </InfoBox>

        <InfoBox type="success" title="After: React 19 Functional Component">
          <CodeBlock language="jsx">
{`function UserProfile({ userId }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [posts, setPosts] = useState([])

  // Effect for fetching data when userId changes
  useEffect(() => {
    const abortController = new AbortController()
    
    async function fetchUserData() {
      try {
        setLoading(true)
        setError(null)

        // React 19: Better concurrent handling of multiple requests
        const [userResponse, postsResponse] = await Promise.all([
          fetch(\`/api/users/\${userId}\`, {
            signal: abortController.signal
          }),
          fetch(\`/api/users/\${userId}/posts\`, {
            signal: abortController.signal
          })
        ])

        const userData = await userResponse.json()
        const postsData = await postsResponse.json()

        // React 19: Automatic batching of state updates
        setUser(userData)
        setPosts(postsData)
        setLoading(false)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message)
          setLoading(false)
        }
      }
    }

    fetchUserData()

    return () => {
      abortController.abort()
    }
  }, [userId]) // Only re-run when userId changes

  // Separate effect for event listeners (runs once)
  useEffect(() => {
    function handleResize() {
      // Handle window resize
    }

    window.addEventListener('resize', handleResize)
    
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // Empty dependency array = componentDidMount/componentWillUnmount

  // Early returns for loading/error states
  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  if (!user) return <div>User not found</div>

  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
      <h2>Posts ({posts.length})</h2>
      {posts.map(post => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  )
}`}
          </CodeBlock>
        </InfoBox>

        <h4>3. Advanced Migration Patterns</h4>
        <CodeBlock language="jsx" title="Complex State and Lifecycle Migration">
{`// Before: Complex class component
class ComplexComponent extends React.Component {
  state = {
    data: [],
    filters: { status: 'all', search: '' },
    sorting: { field: 'name', direction: 'asc' },
    pagination: { page: 1, limit: 10 }
  }

  componentDidMount() {
    this.loadData()
    this.setupSubscriptions()
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.filters !== this.state.filters ||
      prevState.sorting !== this.state.sorting ||
      prevState.pagination !== this.state.pagination
    ) {
      this.loadData()
    }
  }
  
  // ... rest of class component
}

// After: React 19 functional component with custom hooks
function useComplexState() {
  const [data, setData] = useState([])
  const [filters, setFilters] = useState({ status: 'all', search: '' })
  const [sorting, setSorting] = useState({ field: 'name', direction: 'asc' })
  const [pagination, setPagination] = useState({ page: 1, limit: 10 })

  // Memoize query parameters to prevent unnecessary re-renders
  const queryParams = useMemo(() => ({
    ...filters,
    ...sorting,
    ...pagination
  }), [filters, sorting, pagination])

  return {
    data, setData,
    filters, setFilters,
    sorting, setSorting,
    pagination, setPagination,
    queryParams
  }
}

function ComplexComponent() {
  const {
    data, setData,
    filters, setFilters,
    sorting, setSorting,
    pagination, setPagination,
    queryParams
  } = useComplexState()

  // Effect for loading data when query parameters change
  useEffect(() => {
    const controller = new AbortController()
    
    async function loadData() {
      try {
        const response = await fetch('/api/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(queryParams),
          signal: controller.signal
        })
        
        const result = await response.json()
        setData(result.data)
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Failed to load data:', error)
        }
      }
    }

    loadData()

    return () => controller.abort()
  }, [queryParams]) // React 19: Better dependency tracking

  // Separate effect for subscriptions
  useEffect(() => {
    const subscription = subscribeToUpdates((update) => {
      setData(prev => updateDataWithSubscription(prev, update))
    })

    return () => subscription.unsubscribe()
  }, [])

  return (
    <div>
      {/* Component JSX */}
    </div>
  )
}`}
        </CodeBlock>

        <h4>4. Migration Checklist</h4>
        <InfoBox type="success" title="Step-by-Step Migration Process">
          <ul>
            <li><strong>1. Convert State:</strong> Replace this.state with useState hooks</li>
            <li><strong>2. Split Effects:</strong> Separate concerns into multiple useEffect hooks</li>
            <li><strong>3. Handle Dependencies:</strong> Properly define effect dependencies</li>
            <li><strong>4. Add Cleanup:</strong> Convert componentWillUnmount to effect cleanup</li>
            <li><strong>5. Optimize Performance:</strong> Use useMemo and useCallback</li>
            <li><strong>6. Extract Custom Hooks:</strong> Create reusable logic</li>
            <li><strong>7. Test Thoroughly:</strong> Verify behavior matches original</li>
            <li><strong>8. Leverage React 19:</strong> Use new features and optimizations</li>
          </ul>
        </InfoBox>

        <InfoBox type="new" title="React 19 Migration Benefits">
          <ul>
            <li><strong>Simpler Code:</strong> Less boilerplate, more readable</li>
            <li><strong>Better Performance:</strong> Automatic batching and optimizations</li>
            <li><strong>Enhanced Features:</strong> Concurrent rendering, better Suspense</li>
            <li><strong>Easier Testing:</strong> More straightforward to test hooks</li>
            <li><strong>Future-Proof:</strong> Ready for upcoming React features</li>
          </ul>
        </InfoBox>
      </div>
    )
  }
]

export default slides