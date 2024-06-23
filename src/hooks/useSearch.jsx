
import { useState } from "react";

function useSearchAndSort(todos) {
const [isSorted, setIsSorted] = useState(false); 
    const [search, setNewSearch] = useState("");

    const toggleSortMode = () => {
        setIsSorted(!isSorted);
    };
  

        const handleSearchChange = (e) => {
            setNewSearch(e.target.value);
        };
    
        const filteredTodos = todos.filter((todo) =>
            search === "" || todo.title.toLowerCase().includes(search.toLowerCase())
        );
    
        const displayedTodos = isSorted
            ? filteredTodos.sort((a, b) => a.title.localeCompare(b.title))
            : filteredTodos;
        
    return { toggleSortMode, handleSearchChange, displayedTodos, isSorted, search };
  }
  
  export default useSearchAndSort;