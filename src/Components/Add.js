import React from 'react';



const Add = ({handleChange, handleSubmit, task}) => {

    const disableDate = () => {
        let today, dd, mm, yyyy;
        today = new Date()
        dd = today.getDate() + 1;
        mm = today.getMonth() + 1;
        yyyy = today.getFullYear();
        return mm+"/"+dd+"/"+yyyy;
    }

    return (
        <>
            <section className='add-form'>
                <header>
                    <h4>Add new task</h4>
                </header>
                <form>
                    <input type="text" value={task.title} name="title" onChange={handleChange} className='input' placeholder="Add new task..."/>
                    <div className='description'>
                        <label>Description</label>
                        <textarea value={task.description} name="description" onChange={handleChange}>
                        </textarea>
                    </div>
                    <div className='options'>
                        <div className='date'>
                            <label>Due Date</label>
                            <input type="date" name="date" min={disableDate()} defaultValue={task.date} value={task.date} onChange={handleChange} className='input input-date'/>
                        </div>
                        <div className='priority'>
                            <label>Priority</label>
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
    );
}

export default Add;