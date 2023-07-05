import { useState, useEffect } from "react";

import EditTodo from "./EditTodo";

function ListTodos(props){

    const [todos, setTodos] = useState([])
    const [deleteState, setdeleteState] = useState()
    const [editHandler, setEditHandler] = useState(false)
    const [id, setId] = useState()
    const [formerContent, setFormerContent] = useState()

    async function getTodos(){
        const response = await fetch('http://localhost:5000/todos')
        const todosList = await response.json()
        setTodos(todosList)
    }

    async function deleteTodo(id){
        const response = await fetch('http://localhost:5000/todos/'+id, {
            method: 'DELETE'
        })
        setdeleteState(response)
    }

    useEffect(() => {
        getTodos()
    }, [props.newItem, deleteState, editHandler])

    return (
        <>
        <hr className="my-5"></hr>
        {editHandler ? <EditTodo id={id} editHandler={setEditHandler} formerContent={formerContent}/> : <></>}
        <div className="list-inline mr-2">
        {todos.map((todo) => {
            return (
                <>
                <div className="d-flex justify-content-between align-items-center">
                    <li className="h3" id={todo.todo_id}>{todo.content}</li>
                    <div>
                        <button className="btn btn-danger mx-3" onClick={() => {
                            deleteTodo(todo.todo_id)
                        }}>Delete</button>
                        <button className="btn btn-warning ml-2" onClick={() => {
                            setFormerContent(todo.content)
                            setId(todo.todo_id)
                            setEditHandler(!editHandler)
                        }}>Edit</button>
                    </div>
                </div>
                <hr></hr>
                </>
            )
        })}
        </div>
        </>
    )
}

export default ListTodos