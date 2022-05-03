import React, { useState, useEffect } from 'react'
import TodoList from './components/TodoList'
import FormAddTodo from './components/AddFormTodo'

const getLocalStorage = () => {
  let list = localStorage.getItem('list')
  if (list) {
    return (list = JSON.parse(localStorage.getItem('list')))
  } else {
    return []
  }
}

// default date
const defaultDate = new Date().toISOString().slice(0, 10)

const initialState = {
  title: '',
  description: '',
  date: defaultDate,
  priority: 'Normal',
  isCompleted: false
}

function App () {
  const [list, setList] = useState(getLocalStorage())
  const [isEditing, setIsEditing] = useState(false)
  const [task, setTask] = useState(initialState)
  const [alert, setAlert] = useState({ show: false, type: '', msg: '' })

  // Handle form add new task
  const handleChange = (e) => {
    e.preventDefault()
    const value = e.target.value
    const name = e.target.name
    setTask({ ...task, [name]: value })
  }

  const handleTaskAdded = (e) => {
    // Add task to
    e.preventDefault()
    if (!task.title) {
      showAlert(false, 'danger', 'please enter value')
    } else {
      const newItem = { id: new Date().getTime().toString(), ...task }
      setList([...list, newItem])
      setTask(initialState)
      showAlert(true, 'success', 'item added to the list')
    }
  }

  const removeTask = (id) => {
    showAlert(true, 'danger', 'item removed')
    setList(list.filter((item) => item.id !== id))
  }

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(list))
  }, [list])

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg })
  }

  // Disable past date
  const disablePastDate = () => {
    const today = new Date()
    const dd = String('0' + (today.getDate() + 1)).slice(-2)
    const mm = String('0' + (today.getMonth() + 1)).slice(-2)
    const yyyy = today.getFullYear()
    return yyyy + '-' + mm + '-' + dd
  }

  return (
        <>
            <div className='container'>
                <main className='section-center'>
                    <FormAddTodo handleChange={handleChange}
                         handleSubmit={handleTaskAdded}
                         task={task}
                         disablePastDate={disablePastDate}
                    initialState={initialState}/>
                    <TodoList task={task}
                          list={list}
                          setList={setList}
                          isEditing={isEditing}
                          removeTask={removeTask}
                          disablePastDate={disablePastDate}
                          alert={alert}
                          showAlert={showAlert}
                          setIsEditing={setIsEditing}
                          defaultDate={defaultDate}
                         />
                </main>
            </div>
        </>
  )
}

export default App
