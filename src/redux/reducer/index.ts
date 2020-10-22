import ActionType from "../actions/actionType";
import { Action, TodoItem } from "../actions";

export interface State {
  todoList: TodoItem[];
}

export const initState: State = {
  todoList: [],
};

export default (state = initState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionType.add_todo:
      return {
        todoList: [...state.todoList, { ...payload }],
      };
  }
};
