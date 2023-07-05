import React, {useState} from 'react'
import './App.css';

//Components
import ListTodos from './components/ListTodos';
import InputTodo from './components/InputTodo';

function App() {

  let [newList, setNewList] = useState()

  return (
    <>
    <div className='container'>
      <InputTodo setNewList={setNewList}/>
      <ListTodos newItem={newList}/>
    </div>
      
    </>
  );
}

export default App;
