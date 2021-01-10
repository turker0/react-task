import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import useModal from "./useModal";

export const initialState = [
  {
    date: +Date.now(),
    text: "Lorem1",
    isDone: true,
  },
  {
    date: +Date.now() + 1,
    text: "Lorem2",
    isDone: true,
  },
  {
    date: +Date.now() + 2,
    text: "Lorem3",
    isDone: true,
  },
  {
    date: 1610011823141,
    text: "Lorem4",
    isDone: true,
  },
  {
    date: 1610011823143,
    text: "Lorem5",
    isDone: true,
  },
  {
    date: 1610011823145,
    text: "Lorem6",
    isDone: true,
  },
  {
    date: 1610011823147,
    text: "Lorem7",
    isDone: true,
  },
];

interface TodoItem {
  date: number;
  text: string;
  isDone: boolean;
}

let storage = window.localStorage;

const useTodos = () => {
  const [todos, setTodos] = React.useState<TodoItem[]>(
    JSON.parse(storage.getItem("todos-app") || "[]")
  );
  const [renderedTodos, setRenderedTodos] = useState<any>();
  const { toggleModalVisible } = useModal();

  useEffect(() => {
    let days = new Map();
    todos.forEach((item) => {
      const startOfDay = dayjs(item.date).startOf("day").unix();

      if (days.has(startOfDay)) {
        days.set(startOfDay, [...days.get(startOfDay), item]);
      } else {
        days.set(startOfDay, [item]);
      }
    });
    storage.setItem("todos-app", JSON.stringify(todos));

    console.log(
      `todos: ${todos}, \nrenderedTodos: ${renderedTodos}, \ndays: ${days}`
    );

    setRenderedTodos(days);
  }, [todos, renderedTodos]);

  useEffect(() => {
    if (storage.getItem("todos-app")) {
      setTodos(JSON.parse(storage.getItem("todos-app") || "[]"));
    } else {
      setTodos(initialState);
    }
  }, []);

  const addItem = (item: TodoItem) => {
    setTodos([...todos, item]);
    toggleModalVisible();
  };

  const deleteItem = (date: number) => {
    setTodos(todos.filter((item) => item.date !== date));
  };

  const setValueByKey = (
    date: number,
    key: string,
    newValue: string | boolean
  ) => {
    setTodos(
      todos.map((item) => {
        if (item.date === date) {
          return {
            ...item,
            [key]: newValue,
          };
        }
        return item;
      })
    );
  };

  return {
    renderedTodos,
    addItem,
    deleteItem,
    setValueByKey,
  };
};

export default useTodos;
