// Import Modules
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { Button } from "@mantine/core";
import { doc, setDoc } from "firebase/firestore";

// Import Components
import base from "../components/firebase";
import CreateTodo from "../components/CreateTodo";
import TodoItem from "../components/TodoItem";
import { Select } from "@mantine/core";
// Main Function
function Home(props: any) {
  // States
  const { auth, db } = base;
  const { user, setUser } = props;
  const default_data = user.todoList;
  const [todoList, setTodoList] = useState(user.todoList);
  const [filter, setFilter] = useState("All");
  // Log Out Function
  function logOut() {
    signOut(auth);
  }

  // Update DB
  useEffect(() => {
    if (todoList != default_data) {
      let u = user;
      u.todoList = todoList;
      const updateUser = async (u: any) => {
        const update = await setDoc(doc(db, "users", u.id), u);
      };
      updateUser(u).then(() => {
        setUser(u);
      });
    } else {
    }
  }, [todoList]);

  // Update local TodoList
  useEffect(() => {
    setTodoList(user.todoList);
  }, [user]);

  return (
    <div>
      <h1>TaskMan</h1>
      {/* Todo Continers */}

      <div className="todos-container">
        <div className="filter">
          <Select
            placeholder="Pick one"
            onSearchChange={(e) => {
              setFilter(e);
              console.log(filter);
            }}
            defaultValue="All"
            nothingFound="No options"
            data={["All", "Done", "Remaining"]}
          />
        </div>
        {todoList.map((todo: any, id: number) => {
          //   console.log(id);
          if (
            filter === "All" ||
            (filter === "Done" && todo.status === true) ||
            (filter === "Remaining" && todo.status === false)
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
      <CreateTodo todoList={todoList} setTodoList={setTodoList} />

      {/* SignOut */}
      <Button color="red" onClick={logOut} className="log-out">
        Sign Out
      </Button>
      {/* Style */}
      <style>{`

            .todos-container {
                position: relative;
                min-height: 5rem;
                width: 50rem;
                margin: 3rem auto;
                display: flex;
                flex-direction: column;
                flex-wrap: wrap;
                align-items: flex-end;
                justify-content: flex-start;
            }

            .filter{
                width: 10rem;

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
