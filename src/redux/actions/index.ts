import { v4 as uuidv4 } from "uuid";
import ActionType from "./actionType";

export interface TodoItem {
  key: string;
  value: string;
  done: boolean;
}

export interface Action {
  type: string;
  payload: TodoItem;
}

export const addTodo = (value: string) => {
  const key = uuidv4();
  const newTodo = {
    key,
    value,
    done: false,
  };

  return {
    type: ActionType.add_todo,
    payload: {
      ...newTodo,
    },
  };
};
