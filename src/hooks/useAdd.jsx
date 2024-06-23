import { useState } from "react";

function useAddTodo() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [updateAddTodos, setUpdateAddTodos] = useState(false);

  
  const addTodo = (todo) => {
    setLoading(true);
    setError(null); 

    fetch('http://localhost:3000/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(todo),
    })
    .then((response) => {
    
      if (!response.ok) {
        throw new Error("Ошибка при добавлении задачи");
      }
      return response.json();
    })
    .then((response) => {
      console.log(`${todo.title} добавлено! Ответ сервера:`, response);
      setUpdateAddTodos(!updateAddTodos); 
    })
    .catch((error) => {
      setError(error.message); 
    })
    .finally(() => {
      setLoading(false);
    });
  };

  return { addTodo, loading, error, updateAddTodos, setLoading, setUpdateAddTodos };
}

export default useAddTodo;