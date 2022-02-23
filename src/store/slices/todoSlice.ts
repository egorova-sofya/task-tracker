import { RootState } from './../index';
import { ITodo } from "./../../types/data";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "@reduxjs/toolkit";

interface ITodos {
  todos: Array<ITodo>;
  status: string | null;
  error: Error | unknown;
}

export const fetchTodos = createAsyncThunk(
  "todos/fetchTodos",
  //первый аргумент можно передать через dispatch. но это должен быть именно один элемнт. Иначе создаем массив или объект
  //вторым аргументом можно достать state and dispatch
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );

      if (!response.ok) {
        throw new Error("server error");
      }
      // console.log(response);
      const data = await response.json();

      return data;
    } catch (error) {
      let result = (error as Error).message;
      return rejectWithValue(result);
    }
  }
);

export const deleteTodo = createAsyncThunk(
  "todos/deleteTodo",

  async (id: number | undefined, { rejectWithValue, dispatch }) => {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("can't delete task. Server error");
      }

      dispatch(removeTodo(id));
      console.log(response);
    } catch (error) {
      let result = (error as Error).message;
      return rejectWithValue(result);
    }
  }
);

// export const useAppSelector: TypedUseSelectorHook<RootState> = getState;


export const toggleStatus = createAsyncThunk(
  'todos/toggleStatus',
  async function (id, {rejectWithValue, dispatch, getState }) {

    const todo = getState().todos.todos.find(todo => todoSlice.id === id)
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos/${id}', {
        method: 'PATCH',
        headers: {
          'Content-Type' : 'application/json',

        },
        body: JSON.stringify((
          completed: !todo.completed
        ))
      })

      if (!response.ok) {
        throw new Error("can't toggle status. Server error");
      }

      const data = await response.json()
      console.log(data)

      dispatch(toggleTodoComplete(id))

    }
    catch(error) {
      let result = (error as Error).message;
      return rejectWithValue(result);
    }

  }
)

const initialState: ITodos = {
  todos: [],
  status: null,
  error: null,
};

// const setError = (state: ITodos, action: PayloadAction<Error>) => {
const setError = (state: ITodos, action: PayloadAction<unknown | Error>) => {
  state.status = "rejected";
  state.error = action.payload;
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo(state, action: PayloadAction<ITodo>) {
      // console.log(state);
      // console.log(action);

      state.todos.push({
        id: 1,
        title: action.payload.title,
        complete: action.payload.complete || false,
      });
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
      console.log(state.todos);
    },
    toggleTodoComplete(state, action) {
      const toggleTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      toggleTodo!.complete = !toggleTodo!.complete;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchTodos.pending, (state) => {
      state.status = "loading";
      state.error = null;
    });

    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.status = "resolve";
      state.todos = action.payload;
    });

    // builder.addCase(fetchTodos.rejected, (state, action) => {
    //   state.status = "rejected";
    //   state.error = action.payload;
    // });

    builder.addCase(fetchTodos.rejected, (state, action) => {
      setError(state, action);
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      setError(state, action);
    });
    builder.addCase(toggleStatus.rejected, (state, action) => {
      setError(state, action);
    });
  },
});

export const { addTodo, removeTodo, toggleTodoComplete } = todoSlice.actions;

export default todoSlice.reducer;
