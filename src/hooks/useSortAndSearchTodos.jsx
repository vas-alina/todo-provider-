import { useState } from "react";

export const UseSortAndSearchTodos = (todos, deleteTodo, changeTodo) => {
    const [isSorted, setIsSorted] = useState(false);
    const [search, setNewSearch] = useState("");
    const [editingTodoId, setEditingTodoId] = useState(null);
    const [localTitle, setLocalTitle] = useState("");

    const filteredTodos = todos.filter(todo =>
        search === "" || (typeof todo.title === 'string' && todo.title.toLowerCase().includes(search.toLowerCase()))
    );

    const displayedTodos = isSorted
        ? filteredTodos.sort((a, b) => a.title.localeCompare(b.title))
        : filteredTodos;

        const handleSearchChange = (e) => {
            setNewSearch(e.target.value);
        };

        const toggleSortMode = () => {
            setIsSorted(!isSorted);
        };

        
    const toggleEdit = (id) => {
        setEditingTodoId(prevId => prevId === id ? null : id);
    };

    const handleDelete = (id) => {
        deleteTodo(id) 
    }

    const handleTitleChange = (e) => {
        setLocalTitle(e.target.value);
      };
    
      const handleSave = (id) => {
        changeTodo(id, { title: localTitle });
        toggleEdit(id)
      };


    
    return { isSorted, setIsSorted, search, handleSearchChange, displayedTodos, toggleSortMode, toggleEdit, handleDelete, handleTitleChange, handleSave, editingTodoId };
};
