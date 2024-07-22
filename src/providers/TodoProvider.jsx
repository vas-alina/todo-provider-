 import { createContext, useState  } from "react";

 const TodoContext = createContext();

 const initialTodoListState = ''

 const TodoProvider = ({ children }) => {
    const [ todo, setTodo ] = useState(initialTodoListState)

    const contextValue = {
        todo,
        setTodo,
    }

    return (
        <TodoContext.Provider value={contextValue}>
            {children} 
        </TodoContext.Provider>
    );
 };

 
 
 export { TodoContext, TodoProvider };