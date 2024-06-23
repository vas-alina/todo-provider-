import { useState, useEffect } from "react";
import useAddTodo from "./useAdd";
import useDeleteTodo from "./useDelete";


function useGetTodo() {
    const { updateAddTodos } = useAddTodo();
    const { updateDeleteTodos} = useDeleteTodo();
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
  
    const fetchTodos = () => {
        setIsLoading(true);
        fetch('http://localhost:3000/todos')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Не удалось загрузить задачи');
                }
                return response.json();
            })
            .then(loadedTodos => {
                setTodos(loadedTodos);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Ошибка при загрузке задач: ", error);
                setError(error.toString());
                setIsLoading(false);
            });
    };

    useEffect(() => {
        fetchTodos();
    }, [updateAddTodos, updateDeleteTodos]);

    return { todos, fetchTodos, isLoading, error };
}

export default useGetTodo;