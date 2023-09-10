"use client";
import Image from "next/image";
import React, { useContext, useState } from "react";
import Button from "../Button";
import { TodoContext } from "@/contexts/TodoContext";
import { generateNumericID } from "@/lib/generateId";
import Calendar from "@/components/Calendar/Calendar";

const AddTask: React.FC = ({}) => {
  const [task, setTask] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const todoContext = useContext(TodoContext);
  const [errorMessage, seterrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  if (!todoContext) {
    return null;
  }
  const { setShowModal, addTodo, errors } = todoContext;

  const openCalendar = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsCalendarOpen(!isCalendarOpen);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    if (!task.trim() || !startTime || !endTime || !startDate) {
      // Handle validation error
      return;
    }
    setLoading(true);
    try {
      addTodo({
        task: task,
        start_time: startTime,
        end_time: endTime,
        id: generateNumericID(),
        date: startDate,
      });
      setTask("");
      setStartTime("");
      setEndTime("");
      setShowModal(false);
    } catch (error) {
      if (errors) {
        seterrorMessage(errors);
      }
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <div className="bg-[rgba(0,0,0,.3)] fixed z-10 top-0 bottom-0 left-0 right-0">
      <form
        onSubmit={handleSubmit}
        className="bg-white border p-6 w-[90%] sm:w-[300px] shadow-xl mx-auto relative top-[20%] rounded-md"
      >
        <header className="flex justify-between items-center mb-4">
          <p className="text-[1.8rem] font-semibold text-gray-900">Add task</p>
          <button onClick={() => setShowModal(false)}>
            <Image src={"/x-close.svg"} width={24} height={24} alt="close" />
          </button>
        </header>
        <textarea
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="min-h-[140px] border w-full p-3 rounded-lg  outline-gray-300"
        />
        <div className="flex flex-col sm:flex-row justify-between gap-10 mt-4">
          <button
            className="px-4 text-sm border rounded-lg h-10"
            onClick={openCalendar}
          >
            {startDate?.toLocaleDateString()}
          </button>

          <div className="flex justify-between gap-2">
            <input
              className=" w-[30%] sm:w-full py-[10px] px-2 border h-10 rounded-lg"
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <input
              className="w-[30%] sm:w-full py-[10px] px-2 border h-10 rounded-lg"
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="flex gap-2">
            <Image src={"/bell.svg"} alt="bell" width={16} height={16} />
            <p>10 Minute before</p>
          </span>
          <Image src={"/x-close.svg"} alt="close" width={16} height={16} />
        </div>
        <Calendar
          isCalendarOpen={isCalendarOpen}
          setIsCalendarOpen={setIsCalendarOpen}
          startDate={startDate}
          setStartDate={setStartDate}
        />
        <p className="text-red-500">{errorMessage}</p>
        <footer className="flex justify-between gap-3 mt-8">
          <Button
            onClick={() => setShowModal(false)}
            mode={"secondary"}
            width={"170px"}
          >
            Cancel
          </Button>
          <Button
            type={"submit"}
            onClick={() => {}}
            mode={"primary"}
            width={"170px"}
          >
            {loading ? "Adding..." : "Add"}
          </Button>
        </footer>
      </form>
    </div>
  );
};

export default AddTask;
