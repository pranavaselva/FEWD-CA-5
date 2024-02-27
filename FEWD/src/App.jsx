import './App.css'
import Main from './Component/Main'
import Form from './Component/Form'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/form' element={<Form/>}/>
      <Route path='*' element={<h1>404 Page not found</h1>}/>
    </Routes>
  )
}

export default App
