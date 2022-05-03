import React, {useState, useEffect} from "react";
import Alert from "./Alert";




const List = ({list, setList, handleEdit, isEditing, removeTask, disablePastDate, alert, showAlert, setIsEditing, defaultDate}) => {
    const initialState = {
    title: "",
    description: "",
    date: defaultDate,
    priority: "Normal",
    isCompleted: false,
}
    const [search, setSearch] = useState("")
    const [checked, setChecked] = useState(false)
    const [itemFilter, setItemFilter] = useState([])
    const [newTask, setNewTask] = useState(initialState)

    console.log(newTask)
    // Handle search task
    const handleSearch = (e) => {
        const value = e.target.value;
        setSearch(value)
        if(search !== ''){
            const filterItem = list.filter((item) => {
                return Object.values(item).join('').toLowerCase().includes(value.toLowerCase())
            })
            setItemFilter(filterItem)
        }else {
            return list
        }

    }

    const handleCheck = () => {
        setChecked(!checked)
    }

    //Update task
    const changeUpdate = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setNewTask({...newTask, [name]: value})

    }

    const updateTask = (id) => {
      setList(
          list.map((item) => {
              if(item.id === id){
                  return {...item, title: newTask.title, description: newTask.description, date: newTask.date, priority: newTask.priority, isComplete: false}
              }
              return item
          })
      )
        setNewTask({title: "", description: "", date: "", priority: "Normal", isComplete: false})
        setIsEditing(false)

    }

    // Handle bulk action
    const completeTodo = index => {
        const newTodos = [...list];
        newTodos[index].isCompleted = true;
        setList(newTodos);
        setChecked(false)

  };
        const handleRemove = () => {
            showAlert(true, 'success', 'All items removed')
        setList([])
        handleCheck()
    }



    return (
        <>
            <section className="list-section">
                {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
                 <div className='list-container'>
                         <h4>To Do List</h4>
                    <div className='form-control'>
                        <input type="search" className='search input' placeholder='Search...' onChange={handleSearch} value={search}/>
                    </div>
            {
                search.length > 1 ? (
                    itemFilter.map((item, index) => {
                        const {id, title, description, priority, date} = item
                        return (
                            <>
                                <article className="task-list" key={index}>
                                    <div className="wrapper-check">
                                        <input type='checkbox' defaultChecked={checked} onClick={handleCheck} style={{marginRight: '10px'}}/>
                                        <span>{title}</span>
                                    </div>
                                    <div className='wrapper-btn'>
                                        <button className='btn btn-detail' onClick={() => handleEdit(index)}>Detail</button>
                                        <button className='btn btn-remove' onClick={() => removeTask(id)}>Remove</button>
                                    </div>
                                </article>
                                {
                                    isEditing === index ?
                                        (<div className='form-update'>
                                            <form onSubmit={e => e.preventDefault()}>

                                                            <input type="text" value={newTask.title} name="title" onChange={changeUpdate} className='input'/>
                                                        <div className='description'>
                                                            <span>Description</span>
                                                            <textarea  name="description" value={newTask.description} onChange={changeUpdate} />
                                                        </div>
                                                        <div className='options'>
                                                            <div className='date'>
                                                                <label>Due Date</label>
                                                                <input type="date" name="date" min={disablePastDate()} value={newTask.date} onChange={changeUpdate} className='input input-date'/>
                                                            </div>
                                                            <div className='priority'>
                                                                <label>Priority</label>
                                                                <select name='priority' className='input input-date' onChange={changeUpdate} value={newTask.priority}>
                                                                    <option value="Low">Low</option>
                                                                    <option value='Normal'>Normal</option>
                                                                    <option value='High'>High</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <button onClick={() => updateTask(id)} className='btn btn-add'>Update</button>


                                                    })
                                                }
                                            </form>

                                        </div>) : false
                                }
                            </>
                        )
                    })
                ) : ( list.map((item, index) => {
                    const {id, title, description, priority, date, isCompleted} = item
                    return (
                        <>
                            <article className={ isCompleted ? "task-list completed" : "task-list" } key={index}>
                                <div className="wrapper-check">
                                    <input type='checkbox' defaultChecked={checked} onClick={handleCheck} style={{marginRight: '10px'}}/>
                                    <span>{title}</span>
                                </div>
                                <div className='wrapper-btn'>
                                    <button className='btn btn-detail' onClick={() => handleEdit(index, id)}>Detail</button>
                                    <button className='btn btn-remove' onClick={() => removeTask(id)}>Remove</button>
                                </div>
                            </article>
                            {
                                isEditing === index ?
                                    (<div className='form-update'>
                                            <form onSubmit={e => e.preventDefault()}>

                                                            <input type="text" value={newTask.title} name="title" onChange={changeUpdate} className='input'/>
                                                        <div className='description'>
                                                            <span>Description</span>
                                                            <textarea  name="description" value={newTask.description} onChange={changeUpdate} />
                                                        </div>
                                                        <div className='options'>
                                                            <div className='date'>
                                                                <label>Due Date</label>
                                                                <input type="date" name="date" min={disablePastDate()} value={newTask.date} onChange={changeUpdate} className='input input-date'/>
                                                            </div>
                                                            <div className='priority'>
                                                                <label>Priority</label>
                                                                <select name='priority' className='input input-date' onChange={changeUpdate} value={newTask.priority}>
                                                                    <option value="Low">Low</option>
                                                                    <option value='Normal'>Normal</option>
                                                                    <option value='High'>High</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <button onClick={() => updateTask(id)} className='btn btn-add'>Update</button>

                                            </form>
                                    </div>) : false
                            }

                        {
                            checked ? (<div className='bulk-action'>
                                <span>Bulk action:</span>
                                <div className='wrapper-btn'>
                                    <button className='btn btn-done' onClick={() => completeTodo(index)}>Done</button>
                                    <button className='btn btn-remove' onClick={handleRemove}>Remove</button>
                                </div>
                            </div>) : false
                        }
                        </>
                    )
                })
                )
            }
                 </div>

            </section>
        </>
    );
}

export default List;