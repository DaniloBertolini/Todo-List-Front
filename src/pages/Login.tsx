import { useContext, useState } from "react";
import { User } from "../utils/type";
import { newInputFocused, newUser } from "../utils/newObj";
import axios from "axios";
import ThemeContext from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [inputFocused, setInputFocused] = useState(newInputFocused);
  const [login, setLogin] = useState<boolean>(true)
  const [user, setUser] = useState<User>(newUser)
  const [secret, setSecret] = useState<boolean>(true)
  const { setToken, setUsername } = useContext(ThemeContext);
  const navigate = useNavigate();

  const toggleLogin = (): void => {
    setUser(newUser)
    setLogin(!login)
    setSecret(true)
  }

  const toggleFocused = (name: string, set: boolean): void => {
    setInputFocused({
      ...inputFocused,
      [name]: set 
    })
  }

  const toggleSecret = () => {
    setSecret(!secret)
  }

  const toggleUserValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({
      ...user,
      [event.target.name]: event.target.value 
    })
  }

  const submitLogin = async () => {
    const loginSuccessful = await axios.post('http://localhost:3000/user/signin', user)

    if (loginSuccessful) {
      setToken(loginSuccessful.data.token)
      setUsername(user.username)
      navigate('/home')
    }
  }

  const submitSubscribe = async () => {
    const subscribeSuccessful = await axios.post('http://localhost:3000/user/signup', user)

    if (subscribeSuccessful) {
      setToken(subscribeSuccessful.data.token)
      setUsername(user.username)
      navigate('/home')
    }
  }

  return (
    <body className="bg-[#F2F2F2] h-screen flex justify-center items-center font-mono">
      <div className="bg-white w-[390px] h-[650px] rounded-xl shadow-lg flex flex-col items-center relative">
        {
          login ?
          <>
            <h1 className="text-4xl font-semibold py-20">Bem-vindo!</h1>
            <form className="w-2/3">
              <label className="relative">
                <p className="pl-2 text-gray-500">Usuário</p>
                <input
                className="outline-none p-2 w-full"
                type="text"
                name="username"
                id="username"
                value={ user.username }
                onClick={() => {
                  toggleFocused('username', true)
                }}
                onBlur={() => {
                  toggleFocused('username', false)
                }}
                onChange={ (event) => toggleUserValue(event)}
                />
                <div className="bottom-0 h-[2px] bg-slate-400 mb-14"></div>
                <div className={`bottom-0 h-[2px] w-full bg-gradient-to-r from-[#22D4FD] to-[#B523FF] transition-all duration-500 ${inputFocused.username ? 'opacity-100' : 'opacity-0'} absolute`}></div>
              </label>

              <label className="relative">
                <p className="pl-2 mt-6 text-gray-500">Password</p>
                <input 
                className="outline-none p-2 w-full" 
                type={ (secret) ? 'password' : 'text'}
                name="password" 
                id="password" 
                value={ user.password } 
                onClick={() => {
                  toggleFocused('password', true)
                }}
                onBlur={() => {
                  toggleFocused('password', false)
                }}
                onChange={ (event) => toggleUserValue(event)} 
                />
                <div className="bottom-0 h-[2px] bg-slate-400 mb-14"></div>
                <div className={`bottom-0 h-[2px] w-full bg-gradient-to-r from-[#22D4FD] to-[#B523FF] transition-all duration-500 ${inputFocused.password ? 'opacity-100' : 'opacity-0'} absolute`}></div>
                <button
                onClick={ toggleSecret }
                type="button"
                className="absolute right-0 top-8">
                  {
                    secret ?
                    <img src="./eyeClosed.svg" alt="eyeClosed" /> :
                    <img src="./eyeOpen.svg" alt="eyeOpen" />
                  }
                  </button>
              </label>
              
            </form>
            <button className="bg-blue-100 shadow-xl text-white uppercase w-2/3 rounded-full py-3 bg-gradient-to-r
            hover:scale-125 from-[#22D4FD] to-[#B523FF] transition-all duration-500 ease-[cubic-bezier(.49,1.42,.91,.98)]" type="button" onClick={ submitLogin }>Login</button>
            <h2 className="absolute bottom-6">Novo no site? <a className="underline underline-offset-2" onClick={ toggleLogin }>Registre-se</a></h2>
          </> :
          <>
            <h1 className="text-4xl font-semibold py-20">Registre-se</h1>
            <form  className="w-2/3">
              <label className="relative">
                <p className="pl-2 text-gray-500">Usuário</p>
                <input
                className="outline-none p-2 w-full"
                type="text"
                name="username"
                id="username"
                value={ user.username }
                onClick={() => {
                  toggleFocused('username', true)
                }}
                onBlur={() => {
                  toggleFocused('username', false)
                }}
                onChange={ (event) => toggleUserValue(event)}
                />
                <div className="bottom-0 h-[2px] bg-slate-400 mb-14"></div>
                <div className={`bottom-0 h-[2px] w-full bg-gradient-to-r from-[#22D4FD] to-[#B523FF] transition-all duration-500 ${inputFocused.username ? 'opacity-100' : 'opacity-0'} absolute`}></div>
              </label>

              <label className="relative">
                <p className="pl-2 mt-6 text-gray-500">Password</p>
                <input
                className="outline-none p-2 w-full" 
                type={ (secret) ? 'password' : 'text'} 
                name="password"
                id="password" 
                value={ user.password } 
                onClick={() => {
                  toggleFocused('password', true)
                }}
                onBlur={() => {
                  toggleFocused('password', false)
                }}
                onChange={ (event) => toggleUserValue(event)} 
                />
                <div className="bottom-0 h-[2px] bg-slate-400 mb-14"></div>
                <div className={`bottom-0 h-[2px] w-full bg-gradient-to-r from-[#22D4FD] to-[#B523FF] transition-all duration-500 ${inputFocused.password ? 'opacity-100' : 'opacity-0'} absolute`}></div>
                <button
                onClick={ toggleSecret }
                type="button"
                className="absolute right-0 top-8">
                  {
                    secret ?
                    <img src="./eyeClosed.svg" alt="eyeClosed" /> :
                    <img src="./eyeOpen.svg" alt="eyeOpen" />
                  }
                  </button>
              </label>
            </form>
            <button className="bg-blue-100 shadow-xl text-white uppercase w-2/3 rounded-full py-3 bg-gradient-to-l
            hover:scale-125 from-[#22D4FD] to-[#B523FF] transition-all duration-500 ease-[cubic-bezier(.49,1.42,.91,.98)]" type="button" onClick={ submitSubscribe }>Register</button>
            <h2 className="absolute bottom-6">Já tem cadastro? <a className="underline underline-offset-2" onClick={ toggleLogin }>Login</a></h2>
          </>
        }
      </div>
    </body>
  )
}

export default Login;