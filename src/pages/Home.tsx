// modules
import { useEffect, useState } from "react";

// components
import { Input, Select } from "@mantine/core";
import TodoItem from "../components/TodoItem";
import Notification from "../components/Notification";
import CreateTodo from "../components/CreateTodo";
import { Badge } from "@mantine/core";

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
      due: new Date(),
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

  // Update localStorage
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  // main
  return (
    <div>
      <h1>TaskMan</h1>
      <div className="todos-container">
        <div className="controls">
          <div className="search">
            <Input
              onChange={(e) => {
                setFilter(e.target.value);
                console.log(filter);
              }}
              placeholder="Search..."
            ></Input>
          </div>
          <div className="filter">
            <Select
              placeholder="Search..."
              onSearchChange={(e) => {
                console.log(filter);
              }}
              defaultValue="All"
              nothingFound="No options"
              data={["All", "Done", "Remaining"]}
            />
          </div>
          <CreateTodo todoList={todoList} setTodoList={setTodoList} />
        </div>
        {todoList.map((todo: any, id: number) => {
          //   console.log(id);
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
                max-width: 6rem;
                margin: 0 1rem;
            }
      
            .log-out {
              position: fixed;
              left: 0;
              bottom: 0;
              margin: 1rem;
            }

          `}</style>
      <Notification />
    </div>
  );
}

export default Home;
