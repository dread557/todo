export interface Todo {
  id: number;
  task: string;
  start_time: string;
  end_time: string;
  date: Date | null;
}

export interface NewTodo {
  id: number;
  task: string;
  start_time: string;
  end_time: string;
  date: Date | null;
}
