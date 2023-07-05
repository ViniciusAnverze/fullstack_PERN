import { useState } from "react"

function EditTodo(props) {

    const [newTodo, setNewTodo] = useState(props.formerContent)

    async function changeTodo(e) {
        e.preventDefault()

        await fetch('http://localhost:5000/todos/' + props.id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: newTodo
            })
        })
        closeEdit()
    }

    function closeEdit() {
        props.editHandler(false)
    }


    return (
        <div className="">
            <div className="modal">
                <div className="modal-content">
                    <span className="close" onClick={closeEdit}>&times;</span>
                    <h2>Edit ToDo</h2>
                    <form className='d-flex mt-5' onSubmit={(e) => {changeTodo(e)}}>
                        <input type='text' className='form-control' value={newTodo} onChange={(e) => {
                            setNewTodo(e.target.value)
                        }} />
                        <button className='btn btn-success' type='submit'>Update</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditTodo