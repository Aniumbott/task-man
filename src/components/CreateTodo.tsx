// Import Modules
import React from "react";
import { ActionIcon } from "@mantine/core";
import { Plus } from "tabler-icons-react";
import { Timestamp } from "firebase/firestore";

// Main Function
function CreateTodo(props: any) {
  const { setTodoList, todoList } = props;

  // Function to create new todo
  const createTodo = () => {
    let newTodo = {
      title: "New Todo",
      description: "remaining",
      due: Timestamp.fromDate(new Date()),
      timestamp: Timestamp.fromDate(new Date()),
      status: false,
    };
    setTodoList([...todoList, newTodo]);
  };

  return (
    <div className="create-todo-container">
      <ActionIcon variant="filled" color="blue" onClick={() => {}}>
        <Plus onClick={() => createTodo()} />
      </ActionIcon>

      {/* Style */}
      <style>
        {`
            .create-todo-container {
                margin: 5rem auto;
                display: flex;
                justify-content: center;
            }
          `}
      </style>
    </div>
  );
}

export default CreateTodo;
