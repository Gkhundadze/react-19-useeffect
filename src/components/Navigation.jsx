import React from 'react'
import './Navigation.css'

function Navigation({ currentSlide, totalSlides, onNext, onPrev, onGoTo }) {
  return (
    <nav className="slideshow-navigation">
      <button 
        className="nav-button prev" 
        onClick={onPrev} 
        disabled={currentSlide === 0}
        aria-label="Previous slide"
      >
        ← Previous
      </button>
      
      <div className="slide-indicators">
        {Array.from({ length: totalSlides }, (_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => onGoTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
      
      <div className="slide-counter">
        {currentSlide + 1} / {totalSlides}
      </div>
      
      <button 
        className="nav-button next" 
        onClick={onNext} 
        disabled={currentSlide === totalSlides - 1}
        aria-label="Next slide"
      >
        Next →
      </button>
    </nav>
  )
}

export default Navigation