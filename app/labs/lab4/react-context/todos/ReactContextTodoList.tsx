"use client";
import { Button, FormControl, ListGroup, ListGroupItem } from "react-bootstrap";
import { Todo, TodosContextState, TodosProvider, useTodos } from "./todosContext";

function TodoListItems() {
  const { todos, todo, addTodo, updateTodo, setTodo, deleteTodo }: TodosContextState = useTodos()!;

  return (
    <div id="wd-todo-list-context">
      <h2>RC Todo List</h2>
      <ListGroup>
        <ListGroupItem>
          <Button onClick={addTodo} id="wd-add-todo-context-click">
            Add
          </Button>
          <Button onClick={updateTodo} id="wd-update-todo-context-click">
            Update
          </Button>
          <FormControl
            value={todo.title}
            onChange={(e) => setTodo({ ...todo, title: e.target.value })}
          />
        </ListGroupItem>
        {todos.map((item: Todo) => (
          <ListGroupItem key={item.id}>
            <Button
              onClick={() => deleteTodo(item.id)}
              id="wd-delete-todo-context-click"
            >
              Delete
            </Button>
            <Button
              onClick={() => setTodo(item)}
              id="wd-set-todo-context-click"
            >
              Edit
            </Button>
            {item.title}
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}

export default function ReactContextTodoList() {
  return (
    <TodosProvider>
      <TodoListItems />
    </TodosProvider>
  );
}
