import { useState } from 'react'
import './App.css'
import './index.css';
import './components/Sidebar'
import Sidebar from './components/Sidebar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Sidebar/>

  )
}

export default App
