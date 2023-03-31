// Modules
import { Group, Modal, Button, Input, Textarea } from "@mantine/core";
import { useState } from "react";
import {
  Trash,
  SwitchHorizontal,
  ChevronUp,
  ChevronDown,
} from "tabler-icons-react";

// Components
import { Badge } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";

function TodoItem(props: any) {
  const { todoList, setTodoList, id } = props;
  const [readable, setReadable] = useState(true);
  const [opened, setOpened] = useState(false);
  let tododata = todoList[id].description;

  // Event Handlers
  const shiftUp = (id: any) => {
    let ind = id - 1;
    if (id === 0) {
      ind = todoList.length - 1;
    }
    let temp = todoList[ind];
    todoList[ind] = todoList[id];
    todoList[id] = temp;
    setTodoList([...todoList]);
  };
  const shiftDown = (id: any) => {
    let ind = id + 1;
    if (id === todoList.length - 1) {
      ind = 0;
    }
    let temp = todoList[ind];
    todoList[ind] = todoList[id];
    todoList[id] = temp;
    setTodoList([...todoList]);
  };
  const swapStatus = (id: any) => {
    todoList[id].status = todoList[id].status === true ? false : true;
    setTodoList([...todoList]);
  };

  // Main
  return (
    <div>
      {/* Pop Up Modal */}
      <Modal
        opened={opened}
        title="Todo Details"
        onClose={() => setOpened(false)}
      >
        <Input
          className="todo-caption"
          variant="filled"
          defaultValue={todoList[id].title}
          disabled={readable}
          onChange={(e: any) => {
            todoList[id].title = e.target.value;
          }}
        />

        <Textarea
          className="todo-description"
          variant="filled"
          defaultValue={todoList[id].description}
          disabled={readable}
          onChange={(e: any) => {
            tododata = e.target.value;
          }}
        />
        <DateTimePicker
          className="todo-due"
          variant="filled"
          defaultValue={todoList[id].due}
          placeholder="Pick date and time"
          onChange={(e: any) => {
            todoList[id].due = e;
          }}
          maw={400}
          mx="auto"
          disabled={readable}
        />
        <div className="modal-buttons">
          <Button
            className="edit-save-delete"
            onClick={() => {
              todoList[id].description = tododata;
              setTodoList([...todoList]);
              readable ? setReadable(false) : setReadable(true);
            }}
          >
            {readable ? "Edit" : "Save"}
          </Button>

          <Button
            className="edit-save-delete"
            color="red"
            onClick={() => {
              todoList.splice(id, 1);
              setTodoList([...todoList]);
              setOpened(false);
            }}
          >
            <Trash />
          </Button>
        </div>
      </Modal>

      {/* Todo Item */}
      <Group className="todo-item" position="center">
        <Button
          className="todo-caption-button"
          variant="default"
          onClick={() => setOpened(true)}
        >
          <p>{todoList[id].title}</p>
          <Badge color="dark" className="badge">
            {todoList[id].due.toDateString()}&nbsp;
            <span style={{ color: "#0f9437" }}>
              {todoList[id].due.getHours()}:{todoList[id].due.getMinutes()}
            </span>
          </Badge>
        </Button>

        {/* Left buttons */}
        <div
          className="todo-color"
          style={{
            backgroundColor: todoList[id].status ? "green" : "red",
            left: 0,
            borderRadius: " 0.5rem 0 0 0.5rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <ChevronUp
            size="1rem"
            color="white"
            className="todo-chevron"
            onClick={() => shiftUp(id)}
          />
          <p
            style={{
              margin: "0.3rem 0",
              fontFamily: "sans-serif",
              color: "white",
              fontSize: "0.8rem",
            }}
          >
            {id + 1}
          </p>
          <ChevronDown
            size="1rem"
            color="white"
            onClick={() => shiftDown(id)}
            className="todo-chevron"
          />
        </div>

        {/* Right buttons */}
        <div
          className="todo-color border"
          style={{
            backgroundColor: todoList[id].status ? "green" : "red",
            right: 0,
          }}
          onClick={() => swapStatus(id)}
        >
          <SwitchHorizontal color="white" className="todo-chevron" />
        </div>
      </Group>

      {/* Style */}
      <style>{`
        .todo-item{
          margin-top: 1rem;
          min-height: 4rem;
        }
       
        .todo-caption-button{
          position: absolute;
          left: 0;
          margin-left: 2rem;
          border-radius: 0;
          max-width: calc(100% - 4rem);
          min-width: calc(100% - 4rem);
          min-height: 4rem;
          display: flex;
        }
        .todo-caption-button p{
            max-width: 70ch;
        }
        .badge{
            position: absolute;
            right: 0;
            margin-right: 0.5rem;
        }

        .todo-caption, .todo-description, .todo-due{
            margin: 0.5rem 0;
            max-width: 100%;
          }
        
          .mantine-Modal-content{
            overflow-y: unset;
          }
        .mantine-DateInput-root div{
            z-index: 1005 !important;
        }
        
        .todo-color{
          zindex: 10;
         position: absolute;
          min-height: 4rem;
          min-width: 2rem;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 0 0.5rem 0.5rem 0;
        }
        .todo-color p{
          magin: 0;
        }
        .modal-buttons{
          padding: 0.5rem 0;
          minwidth:100%;
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
        }
        .todo-chevron:hover{
          cursor: pointer;
          stroke: black;
        }
        .edit-save-delete{
          margin-left: 0.5rem;
        }

        @media only screen and (max-width: 600px) {

        .todo-caption-button p{
            max-width: 15ch;
        }

        `}</style>
    </div>
  );
}

export default TodoItem;
