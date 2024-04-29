import { useState } from "react";

function Home() {
  const [newTask, setnewTask] = useState<boolean>(false)

  const saveTask = () => {

  }

  return (
    <>
      <button type="button" onClick={ () => setnewTask(!newTask) }>+ Adicionar tarefa</button>
      {
        newTask &&
        <form>
          <label htmlFor="">
            <p>title</p>
            <input type="text" name="" id="" />
          </label>
          <p>description</p>
          <button type="submit" onClick={ saveTask }>Save</button>
        </form>
      }
    </>
  )
}

export default Home;