import { FC, useEffect } from "react";
import TodoItem from "./TodoItem";
import { ITodo } from "../../types/data";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { fetchTodos, removeTodo, toggleStatus } from "store/slices/todoSlice";

// interface iTodoListProps {
//   items: ITodo[];
//   removeTodo: (id: number) => void;
//   toggleTodo: (id: number) => void;
// }

// const TodoList: FC<iTodoListProps> = () => {
const TodoList = () => {
  const state = useAppSelector((state) => state);
  const todos = state.todos.todos;
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);
  return (
    <>
      {todos.map((item) => (
        <TodoItem
          key={item.id}
          removeTodo={removeTodo}
          toggleTodo={toggleStatus}
          {...item}
        />
      ))}
    </>
  );
};

export default TodoList;
