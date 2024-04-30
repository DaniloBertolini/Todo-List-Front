export type User = {
  username: string,
  password: string
}

export type LoginSuccessfull = {
  data: { 
    token: string
  }
}

export type ThemeContextType = {
  username: string,
  token: string,
  setToken: React.Dispatch<React.SetStateAction<string>>
  setUsername: React.Dispatch<React.SetStateAction<string>>
};