import TodoList from "components/Todo/TodoList";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import { FC } from "react";
import { addTodo } from "store/slices/todoSlice";

const TodoPage: FC = () => {
  const [value, setValue] = useState("");
  const { status, error } = useAppSelector((state) => state.todos);

  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  const addTask = () => {
    dispatch(addTodo({ title: value }));
    setValue("");
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  const handleKetDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  console.log(error);

  return (
    <>
      <input
        value={value}
        onChange={handleChange}
        onKeyDown={handleKetDown}
        type="text"
        ref={inputRef}
      />
      <button onClick={addTask}>Add</button>

      {status === "loading" && <h2>loading</h2>}
      {error && <h2>an errored: {error}</h2>}
      <TodoList />
    </>
  );
};

export default TodoPage;
