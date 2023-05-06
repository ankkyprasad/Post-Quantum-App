import { Label, TextInput, Checkbox, Button, Card } from "flowbite-react";
import React from "react";

export const Login = () => {
  return (
    <Card className="w-2/6 mx-auto mt-16">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 text-center">
        Login
      </h5>
      <form className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="name@flowbite.com"
            required={true}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Password" />
          </div>
          <TextInput id="password1" type="password" required={true} />
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
