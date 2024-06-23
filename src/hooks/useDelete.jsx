import { useState } from "react";

function useDeleteTodo() {
  
  // const [updateTodos, setUpdateTodos] = useState(false);
  const [isDeletingTodo, setIsDeletingTodo] = useState(false)
  const [updateDeleteTodos, setUpdateDeleteTodos] = useState(false)
  const deleteTodo = (id) => {
    setIsDeletingTodo(true)

    fetch(`http://localhost:3000/todos/${id}`, {
      method: 'DELETE', 
    })
    
      .then((rawResponse) => rawResponse.json())
      .then((response) => {
          console.log(` Удалено, ответ сервера: `, response);
          setUpdateDeleteTodos(!updateDeleteTodos);
      })
      .finally(() => setIsDeletingTodo(false));
};

  return { deleteTodo, updateDeleteTodos, isDeletingTodo };
}

export default useDeleteTodo;