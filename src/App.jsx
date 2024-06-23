
import './App.css'
// import { TodoOne } from './components/components-task-one/ToDo-list-one'
import { TodoTwo } from './components/components-task-two/ToDo-list-two'
// import { Todo2 } from './components/components-task-three/ToDo2'
function App() {
  


  return (
    <>
      <div>
        <h1>ToDo</h1>
        <div className="main">
          {/* <Todo2/> */}
          <TodoTwo/>
          {/* <TodoOne /> */}
        </div>
      </div>
     
    </>
  )
}

export default App
