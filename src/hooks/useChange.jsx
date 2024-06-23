import { useState } from "react";

function useChangeTodo() {
  
  const [isChangeTodo, setIsChangeTodo] = useState(false)
  const [updateChangeTodos, setUpdateChangeTodos] = useState(false)
  
  const changeTodo = (id, newData) => {
    setIsChangeTodo(true)

    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'PUT', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify(newData) 
    })
    
    .then((response) => response.json())
    .then((responseData) => {
      setUpdateChangeTodos(prev => !prev); 
      console.log("Изменено:", responseData); 
    })
    .catch((error) => console.error("Ошибка изменения задачи:", error)) 
    .finally(() => setIsChangeTodo(false));
  };
  

  return { isChangeTodo, changeTodo, updateChangeTodos };
}

export default useChangeTodo;

