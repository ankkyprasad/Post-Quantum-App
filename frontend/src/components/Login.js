import { Label, TextInput, Checkbox, Button, Card } from "flowbite-react";
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/Api";

export const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const mutation = useMutation({
    mutationFn: (data) => {
      return loginUser(data);
    },
    onSuccess: (response) => {
      if (response.status != 200)
        return alert("Something went wrong, Try again!");
      else {
        console.log("response: ", response);
        navigate("/tasks");
      }
    },
  });

  const handleChange = (e) => {
    setUser((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(user);
  };

  return (
    <Card className="w-2/6 mx-auto mt-16">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 text-center">
        Login
      </h5>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            name="email"
            placeholder="name@flowbite.com"
            required={true}
            onChange={handleChange}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Password" />
          </div>
          <TextInput
            id="password1"
            type="password"
            name="password"
            required={true}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="remember" />
          <Label htmlFor="remember">Remember me</Label>
        </div>
        <Button type="submit">Login</Button>
      </form>
    </Card>
  );
};
