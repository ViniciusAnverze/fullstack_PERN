import {useState} from 'react'

function InputTodo(props){

    let [content, setContent] = useState('')

    async function addData(e){
        e.preventDefault()

        try {
            const response = await fetch('http://localhost:5000/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content: content
                })
            })
            const responseJson = await response.json()
            props.setNewList(responseJson)
        } catch (error) {
            console.log(error.message)
        }
        setContent('')
    }

    return <>
        <h1 className='mt-5 text-center'>ToDo List</h1>
        <form className='d-flex mt-5' onSubmit={addData}>
            <input type='text' className='form-control' value={content} onChange={(e) => {
                setContent(e.target.value)
            }}/>
            <button className='btn btn-success' type='submit'>Add</button>
        </form>
    </>
}

export default InputTodo