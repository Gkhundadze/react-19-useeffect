import React, { useState, useEffect } from 'react'
import slides from '../data/slides'
import Navigation from './Navigation'
import './Slideshow.css'

function Slideshow() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide(prev => Math.min(prev + 1, slides.length - 1))
  }

  const prevSlide = () => {
    setCurrentSlide(prev => Math.max(prev - 1, 0))
  }

  const goToSlide = (index) => {
    setCurrentSlide(index)
  }

  // React 19: Enhanced keyboard navigation with better event handling
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault()
        nextSlide()
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prevSlide()
      }
      if (e.key >= '1' && e.key <= '9') {
        const slideIndex = parseInt(e.key) - 1
        if (slideIndex < slides.length) {
          goToSlide(slideIndex)
        }
      }
    }
    
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [])

  // React 19: Enhanced slide tracking with better performance
  useEffect(() => {
    // Update document title
    document.title = `${slides[currentSlide].title} - React 19 useEffect Learning`
    
    // Track slide progress in localStorage
    localStorage.setItem('slideshow-progress', JSON.stringify({
      currentSlide,
      timestamp: Date.now(),
      totalSlides: slides.length
    }))
  }, [currentSlide])

  // React 19: Code syntax highlighting effect
  useEffect(() => {
    // Trigger Prism highlighting after slide change
    if (window.Prism) {
      window.Prism.highlightAll()
    }
  }, [currentSlide])

  return (
    <div className="slideshow-container">
      <header className="slideshow-header">
        <h1>📚 Session 7: React 19 Component Lifecycle and useEffect</h1>
        <p>Interactive Learning Guide for Modern React Functional Components</p>
        <div className="react-version-badge">React 19.0</div>
      </header>

      <main className="slide-content">
        {slides.map((slide, index) => (
          <div 
            key={slide.id} 
            className={`slide ${index === currentSlide ? 'active' : ''}`}
            data-slide-id={slide.id}
          >
            <h2>{slide.title}</h2>
            <div className="slide-body">
              {slide.content}
            </div>
          </div>
        ))}
      </main>

      <Navigation
        currentSlide={currentSlide}
        totalSlides={slides.length}
        onNext={nextSlide}
        onPrev={prevSlide}
        onGoTo={goToSlide}
      />
    </div>
  )
}

export default Slideshow