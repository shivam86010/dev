import React from 'react'
import { Route , Routes } from 'react-router-dom'
import TerminalHomePage from '../../Pages/TerminalHome/index'
function index() {
  return (
      <Routes>
        <Route path='/' element={<TerminalHomePage />} />
      </Routes>
  )
}

export default index
