// Import Modules
import { Button } from "@mantine/core";
import { Plus } from "tabler-icons-react";

function CreateTodo(props: any) {
  const { setTodoList, todoList } = props;

  // Event Handlers
  const createTodo = () => {
    let newTodo = {
      title: "New Todo",
      description: "Default Description",
      due: new Date(Date.now() + 60 * 60 * 1000),
      timestamp: new Date(),
      status: false,
    };
    setTodoList([...todoList, newTodo]);
  };

  // Main
  return (
    <div className="create-todo-container">
      <Button variant="filled" color="blue" onClick={() => {}}>
        <Plus onClick={() => createTodo()} />
      </Button>

      {/* Style */}
      <style>
        {`
            .create-todo-container {
                display: flex;
                justify-content: center;
            }
          `}
      </style>
    </div>
  );
}

export default CreateTodo;
