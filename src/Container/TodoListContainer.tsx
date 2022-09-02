import React, { FC, ChangeEvent, useState, useEffect } from "react";
import "../App.css";
import FilterBox from "../Components/FilterBox";
import ProgressBar from "../Components/ProgressBar";
import TodoList from "../Components/TodoList";
import { ITask } from "../Interfaces";
import { getAllTodos, postTodos, deleteTodos, updateTodos } from "../API/api.todo";

const TodoListContainer: FC = () => {
  const [filterValue, setFilterValue] = useState<Object>(options[0].value);
  const [task, setTask] = useState<string>("");
  const [todoList, setTodoList] = useState<ITask[]>([]);
  const [updateId, setUpdateId] = useState<string>("");

  useEffect(() => {
    getAllTodoList();
  }, []);

  const getAllTodoList = ():void => {
    getAllTodos((err: any, data: any) => {
      if (data) {
        setTodoList(data);
      } else {
        alert(err);
      }
    });
  }
 
  const headerRowStyle = {
    justifyContent: "space-between",
    padding: "0px 3px 0px 3px",
  };

  const handleFilterChange = (event: ChangeEvent<HTMLSelectElement>): void => {
    setFilterValue(event.target.value);
  };

  const handleTaskChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setTask(event.target.value);
  };

  const handleCheckTodo = (event: ChangeEvent<HTMLInputElement>): void => {
    const id = event.target.value;
    const temp = [...todoList];
    const index = temp.findIndex((i) => i.id === id);
    temp[index].completed = !temp[index].completed;
    setTodoList(temp);
  };

  const handleUpdateIndex = (id: string): void => {
    setUpdateId(id);
  };

  const handleUpdateChangeTask = (event: ChangeEvent<HTMLInputElement>, id: string): void => {
    const temp = [...todoList];
    const index = temp.findIndex((i) => i.id === id);
    temp[index].title = event.target.value;
    setTodoList(temp);
  };

  const handleUpdateTask = (id:string): void => {
    const newTask = todoList.find(td => td.id === id);
    if(newTask){
      const dataList = { ...newTask, editable:false };
      updateTodos(dataList, (err:any, data:any) => {
        if (data) {
          window.location.reload();
        } else {
          alert(err);
        }
      });
    }
    
  }

  const handleDeleteTask = (id:string): void => {
    deleteTodos(id, (err:any, data:any) => {
      if (data) {
        getAllTodoList();
      } else {
        alert(err);
      }
    })
  };

  const handleAddTodo = (): void => {
    const newTask = { id: "", title: task, completed: false, editable: false };
    setTodoList([...todoList, newTask]);
    setTask("");
    postTodos(newTask, (err:any, data:any) => {
      if (data) {
        getAllTodoList();
      } else {
        alert(err);
      }
    });
  };

  return (
    <div className="container">
      <div className="list-container">
        <div className="flex-row">
          <ProgressBar todoList={todoList}/>
        </div>
        <div className="flex-row" style={headerRowStyle}>
          <div className="flex-column">
            <h4 style={{ fontWeight: "bold" }}>Tasks</h4>
          </div>
          <div className="flex-column">
            <FilterBox handleFilterChange={handleFilterChange} />
          </div>
        </div>
        <div className="flex-row">
          <TodoList
            handleTaskChange={handleTaskChange}
            handleUpdateIndex={handleUpdateIndex}
            handleAddTodo={handleAddTodo}
            handleCheckTodo={handleCheckTodo}
            handleUpdateTask = {handleUpdateTask}
            handleUpdateChangeTask={handleUpdateChangeTask}
            todoList={todoList}
            filterValue={filterValue}
            updateId={updateId}
            task={task}
            handleDeleteTask={handleDeleteTask}
          />
        </div>
      </div>
      <div className="todoList"></div>
    </div>
  );
};

const options = [
  { value: "all", label: "All" },
  { value: "done", label: "Done" },
  { value: "undone", label: "Undone" },
];

export default TodoListContainer;
