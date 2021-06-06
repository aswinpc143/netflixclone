import React from 'react'
import NavBar from './Components/NavBar/NavBar'
import "./Components/NavBar/NavBar.css"
import './App.css'
import {actions,originals} from './Urls'
import Banner from './Components/Banner/Banner'
import RowPost from './Components/RowPost/RowPost'

function App() {
  return (
    <div>
      <NavBar/>
      <Banner/>"
      <RowPost url={originals} title='Netflix Originals'/>
      <RowPost url={actions} title='Actions' isSmall />
    </div>
  )
}

export default App
