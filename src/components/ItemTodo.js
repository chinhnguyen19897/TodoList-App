import React from 'react'

// eslint-disable-next-line react/prop-types
const ItemTodo = ({ data, index, checked, handleCheck, handleEdit, removeTask, changeUpdate, newTask, isEditing, disablePastDate, updateTask, completeTodo, handleRemove }) => {
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

                                                            <input type="text" value={newTask.title} name="title" onChange={changeUpdate} className='input'/>
                                                        <div className='description'>
                                                            <span>Description</span>
                                                            <textarea name="description" value={newTask.description} onChange={changeUpdate} />
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
                                    </div>)
                                  : false
                            }

                        {
                            checked
                              ? (<div className='bulk-action'>
                                <span>Bulk action:</span>
                                <div className='wrapper-btn'>
                                    <button className='btn btn-done' onClick={() => completeTodo(index)}>Done</button>
                                    <button className='btn btn-remove' onClick={handleRemove}>Remove</button>
                                </div>
                            </div>)
                              : false
                        }
                        </>
  )
}

export default ItemTodo
