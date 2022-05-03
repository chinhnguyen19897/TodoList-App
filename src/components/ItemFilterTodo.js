import React from 'react'

// eslint-disable-next-line react/prop-types
const ItemFilterTodo = ({ data, index, checked, handleCheck, handleEdit, removeTask, changeUpdate, newTask, isEditing, disablePastDate, updateTask, completeTodo, handleRemove }) => {
  // eslint-disable-next-line react/prop-types
  const { id, title, isCompleted } = data
  return (
                            <>
                                <article className={ isCompleted ? 'task-list completed' : 'task-list' } key={index}>
                                    <div className="wrapper-check">
                                        <input type='checkbox' defaultChecked={checked} onClick={handleCheck} style={{ marginRight: '10px' }}/>
                                        <span>{title}</span>
                                    </div>
                                    <div className='wrapper-btn'>
                                        <button className='btn btn-detail' onClick={() => handleEdit(index, id)}>Detail</button>
                                        <button className='btn btn-remove' onClick={() => removeTask(id)}>Remove</button>
                                    </div>
                                </article>
                                {
                                    isEditing === index
                                      ? (<div className='form-update'>
                                            <form onSubmit={e => e.preventDefault()}>

                                                {/* eslint-disable-next-line react/prop-types */}
                                                            <input type="text" value={newTask.title} name="title" onChange={changeUpdate} className='input'/>
                                                        <div className='description'>
                                                            <span>Description</span>
                                                            {/* eslint-disable-next-line react/prop-types */}
                                                            <textarea name="description" value={newTask.description} onChange={changeUpdate} />
                                                        </div>
                                                        <div className='options'>
                                                            <div className='date'>
                                                                <label>Due Date</label>
                                                                {/* eslint-disable-next-line react/prop-types */}
                                                                <input type="date" name="date" min={disablePastDate()} value={newTask.date} onChange={changeUpdate} className='input input-date'/>
                                                            </div>
                                                            <div className='priority'>
                                                                <label>Priority</label>
                                                                {/* eslint-disable-next-line react/prop-types */}
                                                                <select name='priority' className='input input-date' onChange={changeUpdate} value={newTask.priority}>
                                                                    <option value="Low">Low</option>
                                                                    <option value='Normal'>Normal</option>
                                                                    <option value='High'>High</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <button onClick={() => updateTask(id)} className='btn btn-add'>Update</button>
                                            </form>

                                        </div>)
                                      : false
                                }
                            </>
  )
}

export default ItemFilterTodo
