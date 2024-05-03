import React, { FormEvent, useContext, useEffect, useState } from "react";
import { Task, TaskCreate } from "../utils/type";
import axios from "axios";
import ThemeContext from "../context/ThemeContext";
import { newTaskObj } from "../utils/newObj";

function Home() {
  const [newTask, setNewTask] = useState<boolean>(false)
  const [newTaskForm, setNewTaskForm] = useState<TaskCreate>(newTaskObj)
  const [tasks, setTasks] = useState<Task[]>([])
  const { token } = useContext(ThemeContext);
  const { title, description } = newTaskForm

  useEffect(() => {
    const fetch = async () => {
      const tasksFetch = await axios.get('http://localhost:3000/task', {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      })

      setTasks(tasksFetch.data)
    }
    
    fetch()
  }, [])

  const saveTask = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const taskFetch = await axios.post('http://localhost:3000/task', {
      title,
      description
    }, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
    
    setTasks([...tasks, taskFetch.data])
    setNewTaskForm(newTaskObj)
    setNewTask(false)
  }

  const deleteTask = async (id: number) => {
    await axios.delete(`http://localhost:3000/task/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })

    const t = tasks.filter((task) => task.id !== id)
    setTasks(t)
  }

  // const updateTask = async (taskToUpdate: any, id: number) => {
  //   await axios.put(`http://localhost:3000/task/${id}`, {
  //     ...taskToUpdate
  //   }, {
  //     headers: {
  //       'Authorization': `Bearer ${token}`,
  //     }
  //   })

  //   const t = tasks.filter((task) => task.id !== id)
  //   setTasks(t)
  // }

  const toggleTaskValue = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setNewTaskForm({
      ...newTaskForm,
      [event.target.name]: event.target.value 
    })
  }

  return (
    <>
      <button type="button" onClick={ () => setNewTask(!newTask) }>+ Adicionar tarefa</button>
      {
        newTask &&
        <form onSubmit={ saveTask }>
          <label>
            <p>title</p>
            <input
            type="text"
            name="title"
            value={ newTaskForm.title }
            id="title"
            onChange={ (event) => toggleTaskValue(event)}
            />
          </label>
          <label>
            <p>description</p>
            <input
            type="text"
            name="description"
            value={ newTaskForm.description }
            id="description"
            onChange={ (event) => toggleTaskValue(event)}
            />
          </label>
          <button type="submit">Save</button>
        </form>
      }
      {
        tasks.length > 0 &&
        tasks.map((task) => {
          return (
            <ul key={ task.id }>
              <h3>{task.title}</h3>
              <li>{task.description}</li>
              <p>{task.status}</p>
              <button type="button">Editar</button >
              <button type="button" onClick={ () => deleteTask(task.id)}>X</button >
            </ul>
          )
        })
      }
    </>
  )
}

export default Home;