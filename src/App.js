import React, {useState, useEffect} from "react";
import List from './Components/List';
import Add from './Components/Add'
const getLocalStorage = () => {
    let list = localStorage.getItem('list');
    if(list){
        return ( list = JSON.parse(localStorage.getItem('list')))
    }else {
        return []
    }
}

const date = new Date()

const defaultDate = date.toLocaleDateString('vn-VN').slice(0, 10)

const initialState = {
    title: "",
    description: "",
    date: defaultDate,
    priority: "Normal",
    isCompleted: false,
}



function App() {
    const [list, setList] = useState(getLocalStorage());
    const [isEditing, setIsEditing] = useState(false);

    const [task, setTask] = useState(initialState);

    const handleChange = (e) => {
        e.preventDefault()
        const value = e.target.value;
        const name = e.target.name;
        setTask({...task, [name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!task.title){
            alert("please enter title")
        } else
        {
            const newItem = {id: new Date().getTime().toString(), ...task}
            setList([...list, newItem])
            setTask({title: "", description: "", date: "", priority: "Normal"})
            alert("success")
        }
    }

    const handleEdit = (index) => {
        if(isEditing === index) {
            return setIsEditing(null)
        }
        setIsEditing(index)

    }

    const removeTask = (id) => {
        setList(list.filter((item) => item.id !== id))
    }


    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list))
    }, [list])



    return (
        <>
            <div className='container'>
                <main className='section-center'>
                    <Add handleChange={handleChange} handleSubmit={handleSubmit} task={task}/>
                    <List task={task}
                          list={list}
                          setTask={setTask}
                          setList={setList}
                          isEditing={isEditing}
                          handleEdit={handleEdit}
                          removeTask={removeTask}
                         />
                </main>
            </div>
        </>
    )

}

export default App;
