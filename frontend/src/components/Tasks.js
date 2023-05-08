import React, { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTask, getAllTask, updateTask } from '../services/Api';


const Tasks = () => {
    const queryClient = useQueryClient()
    const [task,setTask] = useState('')
    const { isLoading, error, data } = useQuery({
    queryKey: ['getAllTask'],
    queryFn: () => getAllTask(),
    select: (data) =>{
      return data.data.data
    }
  });


  const mutationAdd = useMutation({
    mutationFn: (data) => {
      return createTask(data)
    },
    onSuccess:(response)=>{
     if(response.status!=201) return alert('Something went wrong, Try again!')
     else{
        queryClient.invalidateQueries(["getAllTask"])
     }
    }
  });




  const handleAdd = async(e) => {
  e.preventDefault();
  mutationAdd.mutate({name:task})
  }

  const handleUpdate = async(e) => {
    e.preventDefault();
 }

const handleDelete = async(e) => {
    e.preventDefault();
 }
  return (
    <>
        <div>
            <input type="text" name='name' value={task} onChange={(e)=> setTask(e.target.value)}/>
            <br />
            <br />
            <div style={{display:"flex"}}>
            <button style={{backgroundColor:"grey",borderRadius:"2px",marginLeft:"5px"}} onClick={handleAdd}>Add</button>
            <button style={{backgroundColor:"green",borderRadius:"2px",marginLeft:"5px"}} onClick={handleUpdate}>Update</button>
            <button style={{backgroundColor:"red",borderRadius:"2px",marginLeft:"5px"}} onClick={handleDelete}>Delete</button>
            </div>

            {
                isLoading? "loading..."
    :
    error? "Something went wrong"
    :
                data.map((e,i)=>{
                return (
                    <div key={i}>
                     <h1>{e.name}</h1>
                     <p>{e.completed?"true":"false"}</p>
                   </div> 
                )
            })}
            
        </div>
    </>
  )
}

export default Tasks