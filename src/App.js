import { useState } from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

function App() {
  //showing different interface by default
  const [showAddTask, setShowAddTask] = useState(false)

  //initialising various tasks
  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: 'Dentist',
        day: 'Sep 5th at 2:30 pm',
        reminder: true,
    },
    {
        id: 2,
        text: 'Groceries Shopping',
        day: 'Sep 6th at 1:30 pm',
        reminder: true,
    },
    {
        id: 3,
        text: 'Start of University',
        day: 'Oct 1st at 2:30 pm',
        reminder: true,
    }
  ])

  //add task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1
    const newTask = {id, ...task}
    setTasks([...tasks, newTask])
  }

  //delete task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //toggle reminder
  const toggleReminder = (id) => {
    setTasks(tasks.map((task) => task.id === id ? { ...task, reminder: !task.reminder } : task))
  }

  return ( 
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd = {showAddTask}/>
          <Route path = '/' exact render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask}/>}
              {tasks.length > 0 ? (<Tasks tasks = { tasks } 
              onDelete = {deleteTask} 
              onToggle = {toggleReminder}/>) : ('No tasks to show!')}
            </>
          )}/>
          <Route path = '/about' component={About}/>
        <Footer />
      </div>
    </Router>
  )
}

export default App;
