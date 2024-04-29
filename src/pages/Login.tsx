import { FormEvent, useContext, useState } from "react";
import { User } from "../utils/type";
import { newUser } from "../utils/newObj";
import axios from "axios";
import ThemeContext from "../context/ThemeContext";
// import { useNavigate } from "react-router-dom";

function Login() {
  const [login, setLogin] = useState<boolean>(true)
  const [user, setUser] = useState<User>(newUser)
  const themeContext = useContext(ThemeContext);
  // const navigate = useNavigate();

  const toggleLogin = (): void => {
    setUser(newUser)
    setLogin(!login)
  }

  const toggleUserValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setUser({
      ...user,
      [event.target.name]: event.target.value 
    })
  } 

  const submitLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const loginSuccessful = await axios.post('http://localhost:3000/user/signin', user)
    themeContext.setToken(loginSuccessful.data.token)
  }

  return (
    <>
      {
        login ?
        <div>
          <h1>Bem-vindo!</h1>
          <h2>Novo no site? <a onClick={ toggleLogin }>Registre-se</a></h2>
          <form onSubmit={ submitLogin }>
            <label>
              <p>Usuário</p>
              <input type="text" name="username" id="username" value={ user.username } onChange={ (event) => toggleUserValue(event)} />
            </label>
            <label>
              <p>Password</p>
              <input type="text" name="password" id="password" value={ user.password } onChange={ (event) => toggleUserValue(event)} />
            </label>
            
            <button type="submit">Login</button>
          </form>
        </div> :
        <div>
          <h1>Registre-se</h1>
          <h2>Já tem cadastro? <a onClick={ toggleLogin }>Login</a></h2>
          <form>
            <label>
              <p>Usuário</p>
              <input type="text" name="username" id="username" value={ user.username } onChange={ (event) => toggleUserValue(event)} />
            </label>
            <label>
              <p>Password</p>
              <input type="text" name="password" id="password" value={ user.password } onChange={ (event) => toggleUserValue(event)} />
            </label>
                  
            <button type="submit">Register</button>
          </form>
        </div>
      }
    </>
  )
}

export default Login;