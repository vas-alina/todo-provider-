import { useState, useEffect } from "react";

const UseGetTodos = () => {
    const [todos, setTodos] = useState([]);
   

    const fetchTodos = () => {
        fetch('http://localhost:3000/todos')
        .then((response) => response.json())
        .then((loadedTodos) => {
            setTodos(loadedTodos);
        })
        .catch((error) => {
            console.error(" FОшибка при загрузке задач: ", error);
        })
    }
    useEffect(() => {
        fetchTodos()
            
    }, []);
    
    
    return {todos, setTodos, fetchTodos};
};

export default UseGetTodos;