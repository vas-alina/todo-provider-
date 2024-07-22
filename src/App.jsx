
import './index.css'
import TodoContainer from './components/TodolistContainer'
import { TodoProvider } from './providers/TodoProvider'
function App() {
  


  return (
    <>
      <div className='container'>
        <h1>TODO LIST</h1>
        <div className="main">
          
          <TodoProvider>
            <TodoContainer />
          </TodoProvider>
        </div>
      </div>
     
    </>
  )
}

export default App
