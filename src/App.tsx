import './App.css'
import Login from './pages/Login'
import Home from './pages/Home'
import ThemeContext from './context/ThemeContext';
import { useState } from 'react';

function App() {
  const [token, setToken] = useState<string>('');

  return (
    <>
      <ThemeContext.Provider value={{ token, setToken }}>
        <Login />
        {/* <Home /> */}
      </ThemeContext.Provider>
    </>
  )
}

export default App
