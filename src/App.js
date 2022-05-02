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

//default date
const defaultDate = new Date().toISOString().slice(0, 10)

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

    /* Handle form add new task */
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

    //Handle form edit
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

      //Disable past date
    const disablePastDate = () => {

        const today = new Date()
        const dd = String("0" + (today.getDate()+ 1)).slice(-2)
        const mm = String("0" + (today.getMonth() + 1)).slice(-2)
        const yyyy = today.getFullYear()
        return yyyy + "-" + mm + "-" + dd;

    }

    return (
        <>
            <div className='container'>
                <main className='section-center'>
                    <Add handleChange={handleChange} handleSubmit={handleSubmit} task={task} disablePastDate={disablePastDate}/>
                    <List task={task}
                          list={list}
                          setList={setList}
                          isEditing={isEditing}
                          handleEdit={handleEdit}
                          removeTask={removeTask}
                          disablePastDate={disablePastDate}
                         />
                </main>
            </div>
        </>
    )

}

export default App;
