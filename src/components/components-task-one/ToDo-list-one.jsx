
import { useEffect, useState } from "react";
import styles from './ToDo-list-one.module.css'

export const TodoOne = () => {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(true);
    
        const timer = setTimeout(() => {
          fetch('https://jsonplaceholder.typicode.com/todos')
            .then((loadedData) => loadedData.json())
            
            .then((loadedTodos) => {
              setTodos(loadedTodos);
            })
            
            .finally(() => setIsLoading(false));
            
        }, 2000); 
        return () => clearTimeout(timer);
      }, []); 

      return(
        <div>
          {isLoading ? <p>Загрузка..</p> : todos.slice(0, 10).map(({ id, title, completed }) => (
            <div key={id} className={styles.todos}>
              <span className={`${styles.circle} ${completed ? styles['completed-circle'] : styles['not-completed-circle']}`}>
              </span>
              {title}
            </div>
          ))}
        </div>
      );
}


{/* <div key={id}>{title} - {completed} руб</div> */}