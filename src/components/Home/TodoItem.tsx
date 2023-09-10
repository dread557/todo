import { Todo } from "@/app/type";
import React, { useState } from "react";
import { addAMPM } from "../../../getTime";

interface TodoComponentProps extends Todo {
  setShowDetail: (arg: boolean) => void;
  setTodoDetails: (arg: Todo) => void;
}

const TodoItem: React.FC<TodoComponentProps> = ({
  task,
  start_time,
  end_time,
  id,
  date,
  setShowDetail,
  setTodoDetails,
}) => {
  const handleShowDetails = () => {
    setTodoDetails({
      task: task,
      start_time: start_time,
      end_time: end_time,
      id: id,
      date: date,
    });
    setShowDetail(true);
  };
  if (!date) {
    return null;
  }

  return (
    <button
      className="flex h-[7.2rem] w-full items-center justify-between bg-gray-50 border-b border-gray-200 p-6 focus:bg-[#EAEDFE]"
      onClick={handleShowDetails}
    >
      <div className="flex items-center gap-3">
        <input type="checkbox" />
        <div className="flex flex-col gap-2 items-start">
          <p className="text-[1.4rem] text-gray-900 font-medium">{task}</p>
          <p className="text-gray-600 text-[1.4rem]">
            {addAMPM(start_time)} - {addAMPM(end_time)}
          </p>
        </div>
      </div>
      <p className="text-[1.4rem]">{new Date(date).toDateString()}</p>
    </button>
  );
};

export default TodoItem;
