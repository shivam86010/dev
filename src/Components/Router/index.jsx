import React from 'react'
import { Route , Routes } from 'react-router-dom'
import TerminalHomePage from '../../Pages/TerminalHome/index'
import InteractiveStoryMode from '../../Pages/InteractiveStoryMode/index'
import ProjectsLabShowcase from '../../Pages/Projects-lab-showcase'
function index() {
  return (
      <Routes>
        <Route path='/' element={<TerminalHomePage />} />
        <Route path='/terminalhomepage' element={<TerminalHomePage />} />
        <Route  path='/interactivestorymode' element={<InteractiveStoryMode />} />
        <Route path='/projects-lab-showcase' element={<ProjectsLabShowcase/>}/>

      </Routes>
  )
}

export default index
