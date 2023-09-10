"use client";
import { NewTodo, Todo } from "@/app/type";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import supabase from "../../utils/supabase";
import { generateNumericID } from "@/lib/generateId";

interface TodoContextProps {
  isLoading: boolean;
  todos: Todo[];
  errors: string | undefined;
  addTodo: (todo: Todo) => void;
  editTodo: (todo: NewTodo) => void;
  deleteTodo: (id: number | undefined) => void;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showEditModal: boolean;
  setShowEditModal: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TodoContextProviderProps {
  children: ReactNode;
}

export const TodoContext = createContext<TodoContextProps | undefined>(
  undefined
);

const TodoContextProvider: React.FC<TodoContextProviderProps> = ({
  children,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [errors, setErrors] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTodos = async () => {
      const { data, error } = await supabase.from("todos").select("*");
      if (error) {
        console.error("Error fetching todos:", error.message);
      } else {
        setTodos(data);
      }
      setIsLoading(false);
    };

    fetchTodos();
  }, []);

  const addTodo = async (todo: Todo) => {
    const { data, error } = await supabase.from("todos").insert([
      {
        task: todo.task,
        start_time: todo.start_time,
        end_time: todo.end_time,
        id: todo.id,
        date: todo.date,
      },
    ]);
    if (error) {
      console.error("Error adding todo:", error.message);
      setErrors(error.message);
    } else {
      if (data) {
        setTodos([...todos, data[0]]);
      }
    }
  };

  const editTodo = async (newTodo: NewTodo) => {
    const { data, error } = await supabase
      .from("todos")
      .update({
        task: newTodo.task,
        start_time: newTodo.start_time,
        end_time: newTodo.end_time,
        date: newTodo.date,
      })
      .eq("id", newTodo.id);
    if (error) {
      console.error("Error updating todo:", error.message);
    } else {
      const updatedTodos = todos.map((todo) =>
        todo.id === newTodo.id
          ? {
              ...todo,
              task: newTodo.task,
              start_time: newTodo.start_time,
              end_time: newTodo.end_time,
              date: newTodo.date,
            }
          : todo
      );
      setTodos(updatedTodos);
    }
  };

  const deleteTodo = async (id: number | undefined) => {
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) {
      console.error("Error deleting task:", error.message);
    } else {
      const updatedTodos = todos.filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    }
  };

  const value = {
    isLoading,
    errors,
    todos,
    addTodo,
    editTodo,
    deleteTodo,
    showModal,
    setShowModal,
    showEditModal,
    setShowEditModal,
  };
  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoContextProvider;
