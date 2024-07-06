
import './index.css'
// import { TodoOne } from './components/components-task-one/ToDo-list-one'
import { Todo } from './components/components-task-two/ToDo-list-two'
function App() {
  


  return (
    <>
      <div className='container'>
        <h1>TODO LIST</h1>
        <div className="main">
          <Todo/>
          {/* <TodoOne /> */}
        </div>
      </div>
     
    </>
  )
}

export default App
