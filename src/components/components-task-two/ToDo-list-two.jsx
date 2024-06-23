import { useEffect, useState } from "react";
import styles from './ToDo-list-two.module.css';
import useAddTodo from "../../hooks/useAdd";
import useDeleteTodo from "../../hooks/useDelete";
import useSearchAndSort from '../../hooks/useSearch'
import useChangeTodo from "../../hooks/useChange";

export const TodoTwo = () => {
    const [todos, setTodos] = useState([]);
    const [todo, setTodo] = useState(""); 
    const { addTodo, loading, error, updateAddTodos } = useAddTodo(); 
    const { deleteTodo,updateDeleteTodos } = useDeleteTodo();
    const { changeTodo, updateChangeTodos } = useChangeTodo();
    const [localTitle, setLocalTitle] = useState();
    const { toggleSortMode, handleSearchChange, displayedTodos, isSorted, search } = useSearchAndSort(todos)

    useEffect(() => {

        fetch('http://localhost:3000/todos')
            .then((response) => response.json())
            .then((loadedTodos) => {
                setTodos(loadedTodos);
            })
            .catch((error) => {
                console.error("Ошибка при загрузке задач: ", error);
            })
            
    }, [ updateDeleteTodos, updateAddTodos, updateChangeTodos]);

    const handleAdd = () => {
        const newTodo = { title: todo, text: todo }; 
        addTodo(newTodo); 
        setTodo(""); 
    };


    const handleDelete = (id) => {
        deleteTodo(id) 
    }

    const handleTitleChange = (e) => {
        setLocalTitle(e.target.value);
      };
      const toggleEdit = (id) => {
            setTodos(todos.map(todo => {
                 if (todo.id === id) {
                return {
                    ...todo,
                    isEditing: !todo.isEditing, 
                };
            }
            return todo;
        }));
    };
      const handleSave = (id) => {
        changeTodo(id, { title: localTitle });
        toggleEdit(id);
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
                    disabled={loading}
                    onClick={handleAdd}
                >
                    Добавить задачу
                </button>
                {loading && <p>Загрузка...</p>}
                {error && <p className={styles.error}>Ошибка: {error}</p>}
            </div>
            <div className={styles.todosContainer}>
                <input 
                className={styles.todoInput}
                type="text" 
                value={search} 
                onChange={handleSearchChange} 
                placeholder="Поиск по задачам"/>
                <button onClick={toggleSortMode}>
                    {isSorted ? 'Вернуть изначальный порядок' : 'Сортировать по алфавиту'}
                </button>
                <div>
                    {displayedTodos.map((todo) => (
                        <div key={todo.id} className={styles.todoItem}>
                            {todo.isEditing ? (
                                <>
                                    <input
                                        value={todo.localTitle}
                                        onChange={(e) => handleTitleChange(e, todo.id)}
                                        placeholder="Заголовок"
                                    />
                                    <button onClick={() => handleSave(todo.id)}>
                                        Сохранить
                                    </button>
                                </>
                            ) : (
                                <>
                                    <span>{todo.title}</span>
                                    <button onClick={() => toggleEdit(todo.id)}>Редактировать</button>
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
