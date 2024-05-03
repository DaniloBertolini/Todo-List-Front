export type User = {
  username: string,
  password: string
}

export type LoginSuccessfull = {
  data: { 
    token: string
  }
}

export type TaskCreate = {
	title: string,
	description: string,
}

export type TaskToUpdate = {
	title: string,
	description: string,
  status: string,
}

export type Task = {
  id: number,
  title: string,
  description: string,
  status: string,
  userId: number
}

export type ThemeContextType = {
  username: string,
  token: string,
  setToken: React.Dispatch<React.SetStateAction<string>>
  setUsername: React.Dispatch<React.SetStateAction<string>>
};
