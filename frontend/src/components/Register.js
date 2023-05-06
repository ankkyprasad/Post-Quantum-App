import React from "react";
import { Label, TextInput, Checkbox, Button, Card } from "flowbite-react";

export const Register = () => {
  return (
    <Card className="w-2/6 mx-auto mt-16">
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 text-center">
        Register
      </h5>
      <form className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="name1" value="Name" />
          </div>
          <TextInput
            id="name1"
            type="text"
            placeholder="John Doe"
            required={true}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email1" value="Email" />
          </div>
          <TextInput
            id="email1"
            type="email"
            placeholder="john@doe.com"
            required={true}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password1" value="Password" />
          </div>
          <TextInput id="password1" type="password" required={true} />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="password2" value="Confirm Password" />
          </div>
          <TextInput id="password2" type="password" required={true} />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Card>
  );
};
