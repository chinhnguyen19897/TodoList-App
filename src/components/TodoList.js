import React, { useState } from 'react'
import Alert from './Alert'
import ItemTodo from './ItemTodo'
import FilterItemTodo from './FilterItemTodo'
// eslint-disable-next-line react/prop-types
const TodoList = ({ list, setList, isEditing, removeTask, disablePastDate, alert, showAlert, setIsEditing, defaultDate }) => {
  const initialState = {
    title: '',
    description: '',
    date: defaultDate,
    priority: 'Normal',
    isCompleted: false
  }
  const [search, setSearch] = useState('')
  const [checked, setChecked] = useState(false)
  const [itemFilter, setItemFilter] = useState([])
  const [newTask, setNewTask] = useState(initialState)

  // Handle search task
  const handleSearch = (e) => {
    const value = e.target.value
    setSearch(value)
    if (search !== '') {
      // eslint-disable-next-line react/prop-types
      const filterItem = list.filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(value.toLowerCase())
      })
      setItemFilter(filterItem)
    } else {
      return list
    }
  }

  // Handle form edit
  const handleEdit = (index, id) => {
    if (isEditing === index) {
      return setIsEditing(null)
    }
    // eslint-disable-next-line react/prop-types
    const newItem = list.find((item) => {
      return item.id === id
    })
    setNewTask(newItem)
    setIsEditing(index)
  }

  const handleCheck = () => {
    setChecked(!checked)
  }

  // Update task
  const changeUpdate = (e) => {
    const value = e.target.value
    const name = e.target.name

    setNewTask({ ...newTask, [name]: value })
  }

  const updateTask = (id) => {
    setList(
      // eslint-disable-next-line react/prop-types
      list.map((item) => {
        if (item.id === id) {
          return { ...item, title: newTask.title, description: newTask.description, date: newTask.date, priority: newTask.priority, isComplete: false }
        }
        return item
      })
    )
    setNewTask(initialState)
    setIsEditing(false)
  }

  // Handle bulk action
  const completeTodo = index => {
    const newTodos = [...list]
    newTodos[index].isCompleted = true
    setList(newTodos)
    setChecked(false)
  }
  const handleRemove = () => {
    showAlert(true, 'success', 'All items removed')
    setList([])
    handleCheck()
  }

  return (
      <>
        <section className="list-section">
          {/* eslint-disable-next-line react/prop-types */}
          {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
          <div className='list-container'>
            <h4>To Do List</h4>
            <div className='form-control'>
              <input type="search" className='search input' placeholder='Search...' onChange={handleSearch} value={search}/>
            </div>
            {
              search.length > 1
                ? (
                    itemFilter.map((item, index) => (
                          // eslint-disable-next-line react/jsx-key
                          <FilterItemTodo data={item} index={index}
                                          checked={checked}
                                          handleCheck={handleCheck}
                                          handleEdit={handleEdit}
                                          removeTask={removeTask}
                                          changeUpdate={changeUpdate}
                                          newTask={newTask}
                                          isEditing={isEditing}
                                          disablePastDate={disablePastDate}
                                          updateTask={updateTask}
                                          completeTodo={completeTodo}
                                          handleRemove={handleRemove}
                          />
                    ))
                  )
                  // eslint-disable-next-line react/prop-types
                : (
              // eslint-disable-next-line react/prop-types
                    list.map((item, index) => (
                          // eslint-disable-next-line react/jsx-key
                          <ItemTodo
                              index={index}
                              data={item}
                              checked={checked}
                              handleCheck={handleCheck}
                              handleEdit={handleEdit}
                              removeTask={removeTask}
                              changeUpdate={changeUpdate}
                              newTask={newTask}
                              isEditing={isEditing}
                              disablePastDate={disablePastDate}
                              updateTask={updateTask}
                              completeTodo={completeTodo}
                              handleRemove={handleRemove}
                          />
                    ))
                  )
            }
          </div>
        </section>
      </>
  )
}

export default TodoList
