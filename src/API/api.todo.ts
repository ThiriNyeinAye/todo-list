import { ITask } from "../Interfaces";
export const baseURL = "http://localhost:3001/todos";

export const getAllTodos = async (callback: any) => {
    return fetch(baseURL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => callback(null, data))
      .catch((err) => callback(err.toString(), null));
};

export const postTodos = async (data:ITask,callback: any) => {
    return fetch(baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({ title: data.title, completed: data.completed})
    })
    .then((res) => res.json())
    .then((data) => callback(null, data))
    .catch((err) => callback(err.toString(), null));
};
export const updateTodos = async (data:ITask, callback: any) => {
    return fetch(baseURL+`/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({title: data.title, completed: data.completed})
      })
        .then((res) => res.json())
        .then((data) => callback(null, data))
        .catch((err) => callback(err.toString(), null));
};
export const deleteTodos = async (id:string, callback: any) => {
    return fetch(baseURL+`/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Accept: "*/*",
            "Access-Control-Allow-Origin": "*",
        },
    })
        .then((res) => res.json())
        .then((data) => callback(null, data))
        .catch((err) => callback(err.toString(), null));
};