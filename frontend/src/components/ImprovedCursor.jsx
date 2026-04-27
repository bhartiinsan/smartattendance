import { useEffect, useRef } from 'react'

function ImprovedCursor() {
  const cursorRef = useRef(null)
  const mousePos = useRef({ x: 0, y: 0 })
  const cursorPos = useRef({ x: 0, y: 0 })
  const rafId = useRef(null)

  useEffect(() => {
    let lastTime = 0
    const targetFPS = 120
    const frameTime = 1000 / targetFPS
    
    const updateCursor = (currentTime) => {
      if (currentTime - lastTime >= frameTime) {
        cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * 0.25
        cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * 0.25
        
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0)`
        }
        
        lastTime = currentTime
      }
      
      rafId.current = requestAnimationFrame(updateCursor)
    }

    const handleMouseMove = (e) => {
      mousePos.current.x = e.clientX - 12
      mousePos.current.y = e.clientY - 12
    }

    const handleMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1'
      }
    }

    const handleMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0'
      }
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    
    updateCursor()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      if (rafId.current) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="clean-cursor"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '24px',
        height: '24px',
        background: 'rgba(99, 102, 241, 0.8)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: 0,
        backdropFilter: 'blur(2px)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        willChange: 'transform'
      }}
    />
  )
}

export default ImprovedCursor