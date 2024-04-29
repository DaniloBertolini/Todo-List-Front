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
  token: string,
  setToken: React.Dispatch<React.SetStateAction<string>>
};