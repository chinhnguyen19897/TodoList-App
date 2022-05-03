import React from 'react'

// eslint-disable-next-line react/prop-types
const FormAddTodo = ({ handleChange, handleSubmit, task, disablePastDate }) => {
  return (
        <>
            <section className='add-form'>
                <header>
                    <h4>Add new task</h4>
                </header>
                <form>
                    {/* eslint-disable-next-line react/prop-types */}
                    <input type="text" value={task.title} name="title" onChange={handleChange} className='input' placeholder="Add new task..."/>
                    <div className='description'>
                        <label>Description</label>
                        {/* eslint-disable-next-line react/prop-types */}
                        <textarea value={task.description} name="description" onChange={handleChange}>
                        </textarea>
                    </div>
                    <div className='options'>
                        <div className='date'>
                            <label>Due Date</label>
                            {/* eslint-disable-next-line react/prop-types */}
                            <input type="date" name="date" min={disablePastDate()} defaultValue="2022-03-05" value={task.date} onChange={handleChange} className='input input-date'/>
                        </div>
                        <div className='priority'>
                            <label>Priority</label>
                            {/* eslint-disable-next-line react/prop-types */}
                            <select onChange={handleChange} name='priority' className='input input-priority' value={task.priority}>
                                <option value="Low">Low</option>
                                <option value='Normal'>Normal</option>
                                <option value='High'>High</option>
                            </select>
                        </div>
                    </div>
                    <button onClick={handleSubmit} className="btn btn-add">Add</button>
                </form>
            </section>
        </>
  )
}

export default FormAddTodo
