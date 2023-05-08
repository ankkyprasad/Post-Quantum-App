import { Navbar } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

export const Nav = () => {
  return (
    <Navbar fluid={true} rounded={true}>
      <Navbar.Brand to="/navbars">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Todo List"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Todo List
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link>
          <Link to="/">Home</Link>
        </Navbar.Link>
        <Navbar.Link>
          <Link to="/tasks">Task</Link>
        </Navbar.Link>
        <Navbar.Link>
          <Link to="/login">Login</Link>
        </Navbar.Link>
        <Navbar.Link>
          <Link to="/register">Register</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
};
