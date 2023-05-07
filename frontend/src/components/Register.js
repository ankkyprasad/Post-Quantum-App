import React, { useState } from "react";
import { Label, TextInput, Checkbox, Button, Card } from "flowbite-react";
import { useMutation} from "@tanstack/react-query";
import { useNavigate } from 'react-router-dom'
import { registerUser } from "../services/Api";

export const Register = () => {
  const navigate = useNavigate();
  const [user,setUser] = useState({
    name:'',
    email:'',
    password1:'',
    password2:'',
  }); 

  const mutation = useMutation({
    mutationFn: (data) => {
      return registerUser(data)
    },
    onSuccess:(response)=>{
     if(response.status!=201) return alert('Something went wrong, Try again!')
     else{
      navigate('/login')
     }
    }
  });


  const handleChange = (e) => {
  setUser((pre) => {
    return {...pre, [e.target.name]:e.target.value}
  })
  }

  const handleSubmit = (e) => {
  e.preventDefault();
  if(user.password1!==user.password2) return alert("Passwords do not match")
  
  const data ={
    email: user.email,
    name: user.name,
    password: user.password1
  }
  mutation.mutate(data)
  }
  return (
    <Card className="w-2/6 mx-auto mt-16">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 text-center">
        Register
      </h5>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name1" value="Name" />
          </div>
          <TextInput
            id="name1"
            name="name"
            type="text"
            placeholder="John Doe"
            required={true}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            name="email"
            placeholder="john@doe.com"
            required={true}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Password" />
          </div>
          <TextInput id="password1" name="password1" type="password" required={true} onChange={handleChange}/>
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password2" value="Confirm Password" />
          </div>
          <TextInput id="password2" name="password2" type="password" required={true} onChange={handleChange}/>
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Card>
  );
};
