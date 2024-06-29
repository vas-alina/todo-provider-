import { useEffect, useState } from "react";
import styles from './ToDo-list-two.module.css';
import { UseAddDeleteChangeTodos } from "../../hooks/useAddDeleteChangeTodos";
import UseGetTodos from "../../hooks/useGetTodos";
import { UseSortAndSearchTodos } from "../../hooks/useSortAndSearchTodos"; 

export const Todo = () => {
    const [todo, setTodo] = useState('');
    
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
        displayedTodos, 
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
   
      return (
        <div className={styles.app}>
            <div className={styles.fixedContainer}>
                <input
                    className={styles.todoInput}
                    value={todo}
                    onChange={(e) => setTodo(e.target.value)}
                    placeholder="Задача"
                />
                <button
                    disabled={isLoading}
                    onClick={handleAdd}
                >
                    Добавить задачу
                </button>
                {isLoading && <p>Загрузка...</p>}
                {error && <p className={styles.error}>Ошибка: {error}</p>}
            </div>
            <div className={styles.todosContainer}>
                <input type="text" value={search} onChange={handleSearchChange} />
                <button onClick={toggleSortMode}>
                    {isSorted ? 'Вернуть изначальный порядок' : 'Сортировать по алфавиту'}
                </button>
                <div>
                    {displayedTodos.map((todo) => (
                        <div key={todo.id} className={styles.todoItem}>
                            {editingTodoId === todo.id  ? (
                                <>
                                    <input 
                                        className={styles.toggleInput}
                                        value={todo.localTitle}
                                        onChange={(e) => handleTitleChange(e, todo.id)}
                                        placeholder="Новый текст для задачи"
                                    />
                                    <button  className={styles.buttonSave} onClick={() => handleSave(todo.id)}>
                                        Сохранить
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span className={styles.todoText}>{todo.title}</span>
                                    <button onClick={
                                        () => {
                                
                                            toggleEdit(todo.id)}}>Редактировать</button>
                                    <button onClick={() => handleDelete(todo.id)}>Удалить</button>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
