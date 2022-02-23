import { useAppDispatch } from "hooks/redux-hooks";
import { FC } from "react";
import { deleteTodo, removeTodo, toggleStatus } from "store/slices/todoSlice";
import { ITodo } from "../../types/data";

interface ITodoItem extends ITodo {
  removeTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
}

const TodoItem: FC<ITodoItem> = ({ id, title, complete }) => {
  const dispatch = useAppDispatch();

  return (
    <>
      <input
        type="checkbox"
        checked={complete}
        onChange={() => {
          dispatch(toggleStatus(id));
        }}
      />
      {title}
      <button
        onClick={() => {
          dispatch(deleteTodo(id));
        }}
      >
        x
      </button>
    </>
  );
};

export default TodoItem;
