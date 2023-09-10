import React, { useContext } from "react";
import Button from "../UI/Button";
import Image from "next/image";
import { Todo } from "@/app/type";
import { addAMPM } from "../../../getTime";
import { TodoContext } from "@/contexts/TodoContext";

interface TodoDetailProp {
  setShowDetail: (arg: boolean) => void;
  todo: Todo | undefined;
}

const TodoDetail: React.FC<TodoDetailProp> = ({ setShowDetail, todo }) => {
  const todoContext = useContext(TodoContext);
  if (!todoContext) {
    return null;
  }
  const { deleteTodo, setShowEditModal } = todoContext;
  const handleDelete = (id: number | undefined) => {
    const askDelete = confirm("Are you sure you want to delete this todo?");
    if (askDelete === true) {
      deleteTodo(id);
      window.location.reload();
    }
  };

  if (!todo?.date) {
    return null;
  }
  return (
    <div className="bg-white p-6 w-full h-full md:w-[80%] border shadow-xl mx-auto relative md:rounded-md rounded-t-[30px]">
      <header className="flex justify-end mb-4">
        <button onClick={() => setShowDetail(false)}>
          <Image src={"/x-close.svg"} width={24} height={24} alt="close" />
        </button>
      </header>
      <div>
        <h4 className="font-bold text-[1.8rem] mb-8">{todo?.task}</h4>
        <div className="flex flex-col gap-[9px]">
          <span className="flex gap-2 items-center">
            <Image
              src={"/calendar.svg"}
              width={20}
              height={20}
              alt="calendar"
            />
            <p className="text-[1.6rem]">
              {new Date(todo?.date).toDateString()}
            </p>
          </span>
          <span className="flex gap-2 items-center">
            <Image src={"/clock.svg"} width={20} height={20} alt="calendar" />
            <p className="text-[1.4rem]">
              {addAMPM(todo?.start_time)} - {addAMPM(todo?.end_time)}
            </p>
          </span>
        </div>
        <footer className="flex justify-between gap-3 mt-8">
          <Button
            onClick={() => handleDelete(todo?.id)}
            mode={"secondary"}
            width={"162.5px"}
            height="39px"
          >
            Delete
          </Button>
          <Button
            type={"submit"}
            onClick={() => setShowEditModal(true)}
            mode={"primary"}
            width={"162.5px"}
            height="39px"
          >
            Edit
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default TodoDetail;
