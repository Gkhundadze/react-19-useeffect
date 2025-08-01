import React from 'react'
import './LifecycleDiagram.css'

function LifecycleDiagram() {
  return (
    <div className="lifecycle-diagram">
      <div className="lifecycle-stage">
        <div className="stage-icon">🚀</div>
        <div className="stage-title">Mounting</div>
        <div className="stage-description">Component created and inserted into DOM</div>
      </div>
      <div className="lifecycle-arrow">→</div>
      <div className="lifecycle-stage">
        <div className="stage-icon">🔄</div>
        <div className="stage-title">Updating</div>
        <div className="stage-description">Component re-renders due to state/prop changes</div>
      </div>
      <div className="lifecycle-arrow">→</div>
      <div className="lifecycle-stage">
        <div className="stage-icon">🗑️</div>
        <div className="stage-title">Unmounting</div>
        <div className="stage-description">Component removed from DOM</div>
      </div>
    </div>
  )
}

export default LifecycleDiagram