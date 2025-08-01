import React, { useEffect, useRef } from 'react'
import './CodeBlock.css'

function CodeBlock({ children, language = 'jsx', title }) {
  const codeRef = useRef(null)

  useEffect(() => {
    if (codeRef.current && window.Prism) {
      window.Prism.highlightElement(codeRef.current)
    }
  }, [children])

  return (
    <div className="code-block-container">
      {title && <div className="code-block-title">{title}</div>}
      <div className="code-block">
        <pre>
          <code ref={codeRef} className={`language-${language}`}>
            {children}
          </code>
        </pre>
      </div>
    </div>
  )
}

export default CodeBlock