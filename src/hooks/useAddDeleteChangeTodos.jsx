import { useState } from "react";

export const UseAddDeleteChangeTodos = () => {
    const [updateAddTodos, setUpdateAddTodos] = useState(false);
    const [updateDeleteTodos, setUpdateDeleteTodos] = useState(false);
    const [updateChangeTodos, setUpdateChangeTodos] = useState(false);

    const addTodo = (todo) => {
        
    
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
            console.log("Новая задача добавлена! Ответ сервера:", response);
          setUpdateAddTodos(!updateAddTodos); 
        })
        .catch((error) => {
          error(error.message); 
        })
        .finally(() => {
        });
      };

      const deleteTodo = (id) => {
        setUpdateDeleteTodos(true)
    
        fetch(`http://localhost:3000/todos/${id}`, {
          method: 'DELETE', 
        })
        
          .then((rawResponse) => rawResponse.json())
          .then((response) => {
              console.log(` Удалено, ответ сервера: `, response);
              setUpdateDeleteTodos(!updateDeleteTodos);
          })
          .finally(() => setUpdateDeleteTodos(false));
    };

    const changeTodo = (id, newData) => {
        setUpdateChangeTodos(true)
    
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
        .finally(() => setUpdateChangeTodos(false));
      };
    
    return { updateAddTodos, addTodo, updateDeleteTodos, deleteTodo, updateChangeTodos, changeTodo, setUpdateChangeTodos };
};

// export default UseAddDeleteChangeTodos;