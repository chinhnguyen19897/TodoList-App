import React from 'react'

// eslint-disable-next-line react/prop-types
const FormAddTodo = ({ handleChange, handleTaskAdded, initialState, disablePastDate }) => {
  // eslint-disable-next-line react/prop-types
  const { title, description, date, priority } = initialState

  return (
        <>
            <section className='add-form'>
                <header>
                    <h4>Add new task</h4>
                </header>
                <form>
                    <input type="text" value={title} name="title" onChange={handleChange} className='input' placeholder="Add new task..."/>
                    <div className='description'>
                        <label>Description</label>
                        <textarea value={description} name="description" onChange={handleChange}>
                        </textarea>
                    </div>
                    <div className='options'>
                        <div className='date'>
                            <label>Due Date</label>
                            <input type="date" name="date" min={disablePastDate()} defaultValue="2022-03-05" value={date} onChange={handleChange} className='input input-date'/>
                        </div>
                        <div className='priority'>
                            <label>Priority</label>
                            <select onChange={handleChange} name='priority' className='input input-priority' value={priority}>
                                <option value="Low">Low</option>
                                <option value='Normal'>Normal</option>
                                <option value='High'>High</option>
                            </select>
                        </div>
                    </div>
                    <button onClick={handleTaskAdded} className="btn btn-add">Add</button>
                </form>
            </section>
        </>
  )
}

export default FormAddTodo
