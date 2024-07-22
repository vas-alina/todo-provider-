import { useEffect } from "react";
import useTodoContext from "../hooks/useTodoContext";
import UseGetTodos from '../hooks/useGetTodos';
import { UseAddDeleteChangeTodos } from '../hooks/useAddDeleteChangeTodos';
import { UseSortAndSearchTodos } from "../hooks/useSortAndSearchTodos";
import TodolistLayer from '../layers/TodolistLayer'
import { TodoProvider } from "../providers/TodoProvider";

 const TodoContainer = () => {
    
    const { todo, setTodo } = useTodoContext();
//console.log(useTodoContext())
    const { todos, fetchTodos, isLoading, error } = UseGetTodos();
    const { addTodo, 
        deleteTodo, 
        changeTodo, 
        updateChangeTodos, 
        updateDeleteTodos, 
        updateAddTodos } = UseAddDeleteChangeTodos();
    const { isSorted, 
        search, 
        handleSearchChange, 
        displayedTodos = [], 
        toggleSortMode, 
        toggleEdit, 
        handleDelete, 
        handleTitleChange, 
        handleSave, 
        editingTodoId } = UseSortAndSearchTodos(todos, deleteTodo, changeTodo);
    
    useEffect(() => {
        fetchTodos();
    }, [updateChangeTodos, updateDeleteTodos, updateAddTodos, fetchTodos]);
    
    const handleAdd = () => {
        const newTodo = { title: todo, text: todo }; 
        addTodo(newTodo); 
        setTodo(""); 
    };
// console.log(todo)
    return (
        <TodoProvider>
            <TodolistLayer
                todo={todo}
                setTodo={setTodo}
                isLoading={isLoading}
                error={error}
                handleAdd={handleAdd}
                search={search}
                handleSearchChange={handleSearchChange}
                isSorted={isSorted}
                toggleSortMode={toggleSortMode}
                displayedTodos={displayedTodos}
                toggleEdit={toggleEdit}
                handleDelete={handleDelete}
                handleTitleChange={handleTitleChange}
                handleSave={handleSave}
                editingTodoId={editingTodoId}       
            />
        </TodoProvider>
    );

};

export default TodoContainer;