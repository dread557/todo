import React, { useContext, useState } from "react";
import Button from "../Button";
import Image from "next/image";
import Calendar from "@/components/Calendar/Calendar";
import { TodoContext } from "@/contexts/TodoContext";
import { NewTodo } from "@/app/type";

const EditTask: React.FC<NewTodo> = ({
  task,
  end_time,
  start_time,
  date,
  id,
}) => {
  const [newTask, setNewTask] = useState(task);
  const [newStartTime, setNewStartTime] = useState(start_time);
  const [newEndTime, setNewEndTime] = useState(end_time);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const todoContext = useContext(TodoContext);
  const [errorMessage, seterrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  if (!todoContext) {
    return null;
  }
  const { editTodo, errors, setShowEditModal } = todoContext;

  const openCalendar = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setIsCalendarOpen(!isCalendarOpen);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    if (!newTask?.trim() || !newStartTime || !newEndTime || !startDate) {
      // Handle validation error
      return;
    }
    setLoading(true);
    try {
      editTodo({
        id: id,
        task: newTask,
        start_time: newStartTime,
        end_time: newEndTime,
        date: startDate,
      });
      setNewTask("");
      setNewStartTime("");
      setNewEndTime("");
      setShowEditModal(false);
    } catch (error) {
      if (errors) {
        seterrorMessage(errors);
      }
    } finally {
      setLoading(false);
    }
  };
  console.log("hhh", typeof startDate);

  return (
    <div className="bg-[rgba(0,0,0,.3)] fixed z-10 top-0 bottom-0 left-0 right-0">
      <form
        onSubmit={handleSubmit}
        className="bg-white border p-6 w-[300px] shadow-xl mx-auto relative top-[20%] rounded-md"
      >
        <header className="flex justify-between items-center mb-4">
          <p className="text-[1.8rem] font-semibold text-gray-900">Edit task</p>
          <button onClick={() => setShowEditModal(false)}>
            <Image src={"/x-close.svg"} width={24} height={24} alt="close" />
          </button>
        </header>
        <textarea
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
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
              value={newStartTime}
              onChange={(e) => setNewStartTime(e.target.value)}
            />
            <input
              className=" w-[30%] sm:w-full py-[10px] px-2 border h-10 rounded-lg"
              type="time"
              value={newEndTime}
              onChange={(e) => setNewEndTime(e.target.value)}
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
            onClick={() => setShowEditModal(false)}
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
            {loading ? "Updating..." : "Update"}
          </Button>
        </footer>
      </form>
    </div>
  );
};

export default EditTask;
