import React from 'react'
import 'react-router-dom'
import photo from "../src/images/bubbles-1985152_640.webp"
function Home(){
    return (
      <div class="home">
        <img src={photo} alt='homePhoto' className='photo'/>
      </div>
    )
}

export default Home