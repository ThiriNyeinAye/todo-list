import "../App.css";
import React, { ChangeEvent } from "react";
import { ITask } from "../Interfaces";

type Props = {
  handleTaskChange: (e: ChangeEvent<HTMLInputElement>) => void;
  todoList: ITask[];
  filterValue: Object;
  handleCheckTodo: (e: ChangeEvent<HTMLInputElement>) => void;
  handleUpdateIndex: (id: string) => void;
  updateId: string;
  handleAddTodo: () => void;
  task: string;
  handleUpdateChangeTask: (e: ChangeEvent<HTMLInputElement>, id:string) => void;
  handleDeleteTask: (id: string) => void;
  handleUpdateTask: (id: string) => void;
};

const TodoList: React.FC<Props> = ({
  handleTaskChange,
  handleUpdateChangeTask,
  handleUpdateTask,
  handleAddTodo,
  todoList,
  filterValue,
  handleCheckTodo,
  handleUpdateIndex,
  handleDeleteTask,
  updateId, task
}) => {
  const listStyle = {
    width: "100%",
  };
  const itemStyle = {
    width: "100%",
    background: "#FFFFFF",
    margin: "10px",
    borderRadius: "9999px",
    height: "46px",
  };
  const headerRowStyle = {
    justifyContent: "space-between",
    padding: 0,
    margin: 0,
    width: "400px",
  };
  const labelStyle = {
    margin: "13px",
  };

    const list =
    filterValue === "all"
      ? todoList
      : filterValue === "done"
      ? todoList.filter((td) => td.completed)
      : todoList.filter((td) => !td.completed);
  

  return (
    <div style={listStyle}>
      {list.map((v, k) =>
        v.id === updateId? (
          <div key={k} style={itemStyle}>
            <div className="flex-row" style={headerRowStyle}>
              <div className="flex-column">
                <label style={labelStyle}>
                  <input
                    type="text"
                    id="toDoInput"
                    name="toDoTxt"
                    value={v.title}
                    placeholder="Add your todo"
                    size={40}
                    onChange={(e) => handleUpdateChangeTask(e, v.id)}
                  />
                </label>
              </div>
              <div className="flex-column">
                <button
                  className="btnSave"
                  onClick={() => handleUpdateTask(v.id)}
                  style={{ backgroundColor: "#585292", color: "#FFFFFF" }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div key={k} style={itemStyle}>
            <div className="flex-row" style={headerRowStyle}>
              <label style={labelStyle}>
                <input
                  type="checkbox"
                  onChange={handleCheckTodo}
                  value={v.id}
                  checked={v.completed}
                />{" "}
                {
                  v.completed ? (
                    <span style={{opacity:0.5}}><s>{v.title}</s></span>
                  ) : (
                    <span>{v.title}</span>
                  )
                }
                
              </label>
              <div id="listAction">
                <span>...</span>
                <div className="actionMenu">
                  <span onClick={() => handleUpdateIndex(v.id)}>Edit</span>
                  <span onClick={() => {handleDeleteTask(v.id)}}>Delete</span>
                </div>
              </div>
            </div>
          </div>
        )
      )}

      <div style={itemStyle}>
        <div className="flex-row" style={headerRowStyle}>
          <div className="flex-column">
            <label style={labelStyle}>
              <input
                type="text"
                id="toDoInput"
                name="toDoTxt"
                value={task}
                onChange={(e) => handleTaskChange(e)}
                placeholder="Add your todo"
                size={40}
              />
            </label>
          </div>
          <div className="flex-column">
            <button
              className="btnSave"
              onClick={handleAddTodo}
              style={{ backgroundColor: "#585292", color: "#FFFFFF" }}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
