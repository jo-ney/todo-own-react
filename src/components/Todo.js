import { useEffect, useState } from "react"

export default function Todo(){
    const [todos, setTodos] = useState([])
    const [title, setTitle] = useState('')
    const[description, setDescription] = useState('')

    const [editId, setEditId] = useState(-1)
    const [editTitle, setEditTitle] = useState('')
    const[editDescription, setEditDescription] = useState('')

    const [message, setMessage] = useState('')
    const [error, setError] = useState('')

    const apiUrl = 'https://todo-own-node.onrender.com/'

    useEffect(()=>{
        getLists()
    }, [])

    const getLists = () => {
        fetch(apiUrl+'todoOwn')
        .then((res)=>res.json())
        .then((res)=>{
            setTodos(res)
        })
        .catch((error) =>console.log(error))
    }
    //create
    function addTodo(){
        setMessage('')
        if(title.trim() != '' && description.trim() != ''){
            fetch(apiUrl+'addTodo',{
                method:"POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({title, description})
            })
            .then((res)=>{
                if(res.ok){
                    setTodos([...todos, {title, description}])
                    setTitle('')
                    setDescription('')
                    
                    return res.json()
                }
                else{
                    //set error
                    console.log("erroe")
                }
            })
            .then((res)=>{
                setMessage(res.message)
                    setTimeout(()=>{
                        setMessage('')
                    },3000)
            })
            .catch(()=>{
                setError("Unable to create list!")
            })
        }
    }
    //delete 
    function deleteList(id){
        if(window.confirm('Are you sure want to delete ?')){
            fetch(apiUrl+'deleteTodo/'+id,{
                method: "DELETE",
            })
            .then((res)=>{
                const updatedTodos = todos.filter((items)=> items._id != id)
                setTodos(updatedTodos)
                
                return res.json()
            })
            .then((res)=>{
                setMessage(res.message)
                setTimeout(()=>{
                    setMessage('')
                },3000)
            })
        }
        
    }

    //update
    const editTodo = (item) => {
        setEditId(item._id)
        setEditTitle(item.title)
        setEditDescription(item.description)
    }

    //update
    function update(id){
        fetch(apiUrl+'updateTodo/'+id,{
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({editTitle, editDescription})
        })
        .then((res)=>{
            if(res.ok){
                const updatedTodos = todos.map((item)=>{
                    if(item._id == id){
                        item.title = editTitle
                        item.description = editDescription
                    }
                    return item
                })
                setTodos(updatedTodos)
                setEditTitle('')
                setEditDescription('')
                
                return res.json()
            } else{
                //set error
                setError("Unable to update todo item")
            }
        }).then((res)=>{
            setMessage(res.message)
            setTimeout(()=>{
                setMessage('')
            },3000)
        })
        setEditId(-1)
    }

    return<section className='flex flex-col p-10 gap-3 m-auto md:w-1/2'>
            <h1 className='text-white text-center font-bold'>Todo</h1>
                <div className="text-center  max-sm:flex max-sm:flex-col">
                    <input onChange={(e)=>setTitle(e.target.value)} value={title} className='border rounded border-black me-2 p-1' placeholder='Title' />
                    <input onChange={(e)=>setDescription(e.target.value)} value={description} className='border rounded border-black me-2 p-1' placeholder='Description' />
                    <input onClick={addTodo} className='btn  max-sm:w-[50px] max-sm:ms-auto max-sm:me-auto' type='submit' value='Add' />
                </div>

                <h3 className="text-green-500">{message}</h3>
                <h3 className="text-red-500">{error}</h3>
            <ol className="list-decimal text-white sm:m-auto">
                {
                    todos.map((item)=><>
                        {editId == -1 || editId !== item._id ? <> <li className="mx-3" key={item._id}>{item.title} : {item.description}</li>
                        <button className="btn-edit ms-3 me-1 mt-1 mb-3" onClick={()=>editTodo(item)} >Edit</button><button className='btn-delete mt-1 mb-3' value={item._id} onClick={(e)=>{deleteList(e.target.value)}} >Delete</button></>
                        :
                        <><li className="mx-3"><input onChange={(e)=>setEditTitle(e.target.value)} value={editTitle} className='text-black border rounded border-black me-2 p-1' placeholder='Title' />
                <input onChange={(e)=>setEditDescription(e.target.value)} value={editDescription} className='text-black border rounded border-black me-2 p-1' placeholder='Description' /></li>
                <button className="btn ms-3 mt-1 mb-3" value={item._id} onClick={(e)=>{update(e.target.value)}} >Update</button> <button className='btn-edit mt-2 mb-3' value={item._id} onClick={()=>{setEditId(-1)}} >Cancel</button></>
                        }
                        {/* {editId == -1 || editId !== item._id ? <button className="btn me-3 mt-2 mb-3" onClick={()=>editTodo(item)} >Edit</button> : <button className="btn me-3 mt-2 mb-3" value={item._id} onClick={(e)=>{update(e.target.value)}} >Update</button>}
                        {editId == -1 || editId !== item._id ? <button className='btn mt-2 mb-3' value={item._id} onClick={(e)=>{deleteList(e.target.value)}} >Delete</button> : <button className='btn mt-2 mb-3' value={item._id} onClick={()=>{setEditId(-1)}} >Cancel</button>} */}
                    </>
                    )
                }
            </ol>
        </section>
}