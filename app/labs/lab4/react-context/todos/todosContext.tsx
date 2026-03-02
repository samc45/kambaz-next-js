"use client";
import { createContext, useContext, useState, type ReactNode } from "react";

export type Todo = {
  id: string;
  title: string;
};

export type TodoDraft = {
  id?: string;
  title: string;
};

export type TodosContextState = {
  todos: Todo[];
  todo: TodoDraft;
  addTodo: () => void;
  updateTodo: () => void;
  setTodo: (todo: TodoDraft) => void;
  deleteTodo: (todoId: string) => void;
};

const TodosContext = createContext<TodosContextState | undefined>(undefined);

export function TodosProvider({ children }: { children: ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "1", title: "Learn React" },
    { id: "2", title: "Learn Node" },
  ]);
  const [todo, setTodo] = useState<TodoDraft>({ title: "Learn Go" });

  const addTodo = () => {
    if (!todo.title.trim()) {
      return;
    }
    setTodos([
      ...todos,
      { ...todo, id: new Date().getTime().toString(), title: todo.title.trim() },
    ]);
    setTodo({ title: "" });
  };

  const updateTodo = () => {
    if (!todo.id || !todo.title.trim()) {
      return;
    }
    const updatedTodo: Todo = { id: todo.id, title: todo.title.trim() };
    setTodos(todos.map((item) => (item.id === updatedTodo.id ? updatedTodo : item)));
    setTodo({ title: "" });
  };

  const deleteTodo = (todoId: string) => {
    setTodos(todos.filter((item) => item.id !== todoId));
    if (todo.id === todoId) {
      setTodo({ title: "" });
    }
  };

  const value: TodosContextState = { todos, todo, addTodo, updateTodo, setTodo, deleteTodo };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodosContext);
  return context;
}
