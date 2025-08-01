import React, { useState, useEffect } from 'react'
import './InteractiveDemo.css'

function InteractiveDemo({ title, children, controls }) {
  return (
    <div className="interactive-demo">
      <div className="demo-header">
        <h4>{title}</h4>
      </div>
      <div className="demo-content">
        <div className="demo-controls">
          {controls}
        </div>
        <div className="demo-output">
          {children}
        </div>
      </div>
    </div>
  )
}

// Timer Demo Component
export function TimerDemo() {
  const [isRunning, setIsRunning] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [logs, setLogs] = useState([])

  const addLog = (message) => {
    setLogs(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${message}`])
  }

  useEffect(() => {
    let intervalId = null
    
    if (isRunning) {
      addLog('⚡ Timer started - useEffect runs')
      intervalId = setInterval(() => {
        setSeconds(prev => prev + 1)
      }, 1000)
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId)
        addLog('🧹 Cleanup function runs - interval cleared')
      }
    }
  }, [isRunning])

  return (
    <InteractiveDemo 
      title="🔴 Live Timer Demo - Watch useEffect in Action!"
      controls={
        <>
          <button 
            className="demo-button"
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? '⏸️ Stop Timer' : '▶️ Start Timer'}
          </button>
          <button 
            className="demo-button secondary"
            onClick={() => {
              setSeconds(0)
              addLog('🔄 Timer reset')
            }}
          >
            🔄 Reset
          </button>
        </>
      }
    >
      <div className="timer-display">
        <div className="timer-value">⏱️ {seconds}s</div>
        <div className="timer-status">
          Status: {isRunning ? '🟢 Running' : '🔴 Stopped'}
        </div>
      </div>
      <div className="demo-logs">
        <strong>useEffect Activity Log:</strong>
        {logs.map((log, index) => (
          <div key={index} className="log-entry">{log}</div>
        ))}
      </div>
    </InteractiveDemo>
  )
}

// Data Fetching Demo Component
export function DataFetchDemo() {
  const [userId, setUserId] = useState(1)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false)
  const [logs, setLogs] = useState([])

  const addLog = (message) => {
    setLogs(prev => [...prev.slice(-3), `${new Date().toLocaleTimeString()}: ${message}`])
  }

  useEffect(() => {
    const controller = new AbortController()
    
    async function fetchUser() {
      setLoading(true)
      addLog(`🔄 Fetching user ${userId}...`)
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        if (!controller.signal.aborted) {
          const userData = {
            id: userId,
            name: `User ${userId}`,
            email: `user${userId}@example.com`,
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`
          }
          setUser(userData)
          addLog(`✅ User ${userId} loaded successfully`)
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          addLog(`❌ Error: ${error.message}`)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchUser()

    return () => {
      controller.abort()
      addLog(`🛑 Request for user ${userId} cancelled (cleanup)`)
    }
  }, [userId])

  return (
    <InteractiveDemo 
      title="🌐 Live Data Fetching Demo - See Dependencies in Action!"
      controls={
        <>
          <button 
            className="demo-button"
            onClick={() => setUserId(prev => prev + 1)}
          >
            👤 Next User
          </button>
          <button 
            className="demo-button secondary"
            onClick={() => setUserId(1)}
          >
            🔄 Reset to User 1
          </button>
        </>
      }
    >
      <div className="user-display">
        {loading ? (
          <div className="loading">🔄 Loading user {userId}...</div>
        ) : user ? (
          <div className="user-card">
            <img src={user.avatar} alt={user.name} className="user-avatar" />
            <div className="user-info">
              <h5>{user.name}</h5>
              <p>{user.email}</p>
              <small>ID: {user.id}</small>
            </div>
          </div>
        ) : (
          <div>No user loaded</div>
        )}
      </div>
      <div className="demo-logs">
        <strong>useEffect Activity Log:</strong>
        {logs.map((log, index) => (
          <div key={index} className="log-entry">{log}</div>
        ))}
      </div>
    </InteractiveDemo>
  )
}

// Memory Leak Demo Component
export function MemoryLeakDemo() {
  const [showBadTimer, setShowBadTimer] = useState(false)
  const [showGoodTimer, setShowGoodTimer] = useState(false)
  const [logs, setLogs] = useState([])

  const addLog = (message) => {
    setLogs(prev => [...prev.slice(-5), `${new Date().toLocaleTimeString()}: ${message}`])
  }

  return (
    <InteractiveDemo 
      title="⚠️ Memory Leak Demo - Bad vs Good Patterns"
      controls={
        <>
          <button 
            className="demo-button warning"
            onClick={() => {
              setShowBadTimer(!showBadTimer)
              addLog(showBadTimer ? 'Bad timer unmounted' : 'Bad timer mounted')
            }}
          >
            {showBadTimer ? '🛑 Stop Bad Timer' : '⚠️ Start Bad Timer'}
          </button>
          <button 
            className="demo-button"
            onClick={() => {
              setShowGoodTimer(!showGoodTimer)
              addLog(showGoodTimer ? 'Good timer unmounted' : 'Good timer mounted')
            }}
          >
            {showGoodTimer ? '🛑 Stop Good Timer' : '✅ Start Good Timer'}
          </button>
        </>
      }
    >
      <div className="timer-comparison">
        <div className="timer-section">
          <h5>❌ Bad Timer (Memory Leak)</h5>
          {showBadTimer && <BadTimer onLog={addLog} />}
        </div>
        <div className="timer-section">
          <h5>✅ Good Timer (Proper Cleanup)</h5>
          {showGoodTimer && <GoodTimer onLog={addLog} />}
        </div>
      </div>
      <div className="demo-logs">
        <strong>Activity Log:</strong>
        {logs.map((log, index) => (
          <div key={index} className="log-entry">{log}</div>
        ))}
      </div>
    </InteractiveDemo>
  )
}

// Bad Timer Component (no cleanup)
function BadTimer({ onLog }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    onLog('❌ Bad timer effect runs (no cleanup)')
    const interval = setInterval(() => {
      setCount(prev => prev + 1)
      onLog('❌ Bad timer tick (will continue after unmount!)')
    }, 1000)
    
    // No cleanup! Memory leak!
  }, [])

  return <div className="timer-display bad">Bad: {count}s</div>
}

// Good Timer Component (with cleanup)
function GoodTimer({ onLog }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    onLog('✅ Good timer effect runs (with cleanup)')
    const interval = setInterval(() => {
      setCount(prev => prev + 1)
      onLog('✅ Good timer tick')
    }, 1000)
    
    return () => {
      clearInterval(interval)
      onLog('🧹 Good timer cleanup runs - interval cleared')
    }
  }, [])

  return <div className="timer-display good">Good: {count}s</div>
}

export default InteractiveDemo