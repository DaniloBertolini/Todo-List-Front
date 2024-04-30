import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import ThemeContext from './context/ThemeContext';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

function App() {
  const [token, setToken] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  return (
    <ThemeContext.Provider value={{ token, setToken, username, setUsername }}>
      <Routes>
        <Route path='/' Component={ Login }/>
        <Route path='/home' Component={ Home }/>
      </Routes>
    </ThemeContext.Provider>
  )
}

export default App
