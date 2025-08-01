import React from 'react'
import './InfoBox.css'

function InfoBox({ type = 'info', title, children }) {
  const getIcon = () => {
    switch (type) {
      case 'success': return '✅'
      case 'warning': return '⚠️'
      case 'error': return '❌'
      case 'new': return '🆕'
      default: return 'ℹ️'
    }
  }

  return (
    <div className={`info-box info-box--${type}`}>
      <div className="info-box-header">
        <span className="info-box-icon">{getIcon()}</span>
        {title && <span className="info-box-title">{title}</span>}
      </div>
      <div className="info-box-content">
        {children}
      </div>
    </div>
  )
}

export default InfoBox