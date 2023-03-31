// modules
import { useEffect, useState } from "react";

// components
import { Input, Select } from "@mantine/core";
import TodoItem from "../components/TodoItem";
import CreateTodo from "../components/CreateTodo";
import logo from "../assets/taskman-logo.svg";

// Todo type
type Todo = {
  title: string;
  description: string;
  due: Date;
  timestamp: Date;
  status: boolean;
};

// Todo parser
function parseTodoList(todoList: Todo[]) {
  let parsedTodoList: Todo[] = [];
  todoList.forEach((todo) => {
    parsedTodoList.push({
      title: todo.title,
      description: todo.description,
      due: new Date(todo.due),
      timestamp: new Date(todo.timestamp),
      status: todo.status,
    });
  });
  return parsedTodoList;
}

function Home() {
  // states
  const default_data: Todo[] = [
    {
      title: "New Todo",
      description: "Default Description",
      due: new Date(Date.now() + 60 * 60 * 1000),
      timestamp: new Date(),
      status: false,
    },
  ];
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todoList") == null
      ? default_data
      : parseTodoList(JSON.parse(localStorage.getItem("todoList") || "[]"))
  );
  const [filter, setFilter] = useState("All");

  // Notify
  const Notify = (todo: any) => {
    new window.Notification("TaskMan", {
      body: `Task "${todo.title}" is due!`,
      icon: logo,
    });
  };

  // Cehck Due
  const checkDue = () => {
    todoList.forEach((todo: any) => {
      if (todo.status === false && todo.due <= Date.now()) {
        Notify(todo);
      }
      // console.log("Checking...");
    });
  };

  // Update localStorage
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  // Due date checkup
  useEffect(() => {
    setInterval(() => {
      checkDue();
    }, 60000);
  }, []);

  // main
  return (
    <div>
      <a href="#" className="logo">
        <img src={logo} alt="TaskMan Logo" />
      </a>
      <div className="todos-container">
        <div className="controls">
          <div className="search">
            <Input
              onChange={(e) => {
                setFilter(e.target.value);
                // console.log(filter);
              }}
              placeholder="Search..."
            ></Input>
          </div>
          <div className="filter">
            <Select
              placeholder="Search..."
              onSearchChange={(e) => {
                // console.log(filter);
              }}
              onChange={(e) => {
                setFilter(e ? e : "All");
                // console.log(filter);
              }}
              defaultValue="All"
              nothingFound="No options"
              data={["All", "Done", "Remaining"]}
            />
          </div>
          <CreateTodo todoList={todoList} setTodoList={setTodoList} />
        </div>
        {todoList.map((todo: any, id: number) => {
            // console.log(id);
          if (
            filter === "All" ||
            (filter === "Done" && todo.status === true) ||
            (filter === "Remaining" && todo.status === false) ||
            todo.title.toLowerCase().includes(filter.toLowerCase()) ||
            todo.description.toLowerCase().includes(filter.toLowerCase())
          ) {
            return (
              <TodoItem
                id={id}
                todoList={todoList}
                setTodoList={setTodoList}
                key={id}
              />
            );
          }
          id++;
        })}
      </div>

      {/* Create a new todo */}

      {/* Style */}
      <style>{`
            .log{
              position: fixed;
              top: 0;
              left: 0;
              margin: 1rem;
              display: flex;

            }
            .logo img{
              height: 5rem;
            }
            .todos-container {
                position: relative;
                min-height: 5rem;
                max-width: 50rem;
                margin: 3rem auto;
                display: flex;
                flex-direction: column;
                flex-wrap: wrap;
                align-items: flex-end;
                justify-content: flex-start;
            }

            .controls{
                display: flex;
                justify-content: flex-start;
                width: 100%;
            }

            .search {
                width: 100%;
                max-width: calc(min(40rem, 50vw));
            }

            .filter{
                max-width: 7rem;
                margin: 0 1rem;
            }
      
            .log-out {
              position: fixed;
              left: 0;
              bottom: 0;
              margin: 1rem;
            }

          `}</style>
    </div>
  );
}

export default Home;
