import React from 'react'
import './header.css'
function Home() {
  return (
    <header className='header'>
      <div className="container">
        <div className="overlay">
          <div className="neo4j">
            <h1 className="text">
              NEO<span className='letter'>4</span>J
            </h1>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Home