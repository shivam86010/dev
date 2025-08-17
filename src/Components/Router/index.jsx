import React from 'react'
import { Route , Routes } from 'react-router-dom'
import TerminalHomePage from '../../Pages/TerminalHome/index'
import InteractiveStoryMode from '../../Pages/InteractiveStory/index'
function index() {
  return (
      <Routes>
        <Route path='/' element={<TerminalHomePage />} />
        <Route path='/terminalhomepage' element={<TerminalHomePage />} />
        <Route  path='/interactivestorymode' element={<InteractiveStoryMode />} />
      </Routes>
  )
}

export default index
