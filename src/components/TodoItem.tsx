// Import Modules
import { Group, Modal, Button, Input } from "@mantine/core";
import React, { useState, useEffect } from "react";
import {
  Trash,
  SwitchHorizontal,
  ChevronUp,
  ChevronDown,
} from "tabler-icons-react";
import { Timestamp } from "firebase/firestore";

// TodoItem Component
function TodoItem(props: any) {
  const { todoList, setTodoList, id } = props;
  const [readable, setReadable] = useState(true);
  const [opened, setOpened] = useState(false);

  // temp variable for todo data
  let tododata = todoList[id].description;

  // Richtext Editor Component

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

  //   useEffect(() => {
  //     window.localStorage.setItem("todoList", JSON.stringify(todoList));
  //   }, [todoList]);

  // Main Component
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

        <div className="richtext"></div>
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
          {/* due date using TimeStamp */}
          <p>
            {Timestamp.fromDate(new Date(todoList[id].timestamp.seconds * 1000))
              .toDate()
              .toLocaleDateString()}
          </p>
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

        .todo-caption{
          width: 100%;
          margin: 0.5rem 0;
          pading: 0.5rem;
        }

        .todo-color-input{
          margin: 0.5rem 0;
        }
        .todo-caption-button{
        position: absolute;
          left: 0;
          margin-left: 2rem;
          border-radius: 0;
          max-width: calc(100% - 4rem);
          min-width: calc(100% - 4rem);
          min-height: 4rem;
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
        `}</style>
    </div>
  );
}

export default TodoItem;
