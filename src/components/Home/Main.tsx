"use client";
import React, { useContext, useState } from "react";
import AddTask from "../UI/Modals/Addtask";
import { TodoContext } from "@/contexts/TodoContext";
import { getGreeting } from "@/lib/greeting";
import Button from "../UI/Button";
import Image from "next/image";
import TodoItem from "./TodoItem";
import TodoDetail from "./TodoDetail";
import { Todo } from "@/app/type";
import EditTask from "../UI/Modals/EditTask";
import Pagination from "./Pagination";
import CalendarInline from "../Calendar/CalendarInline";

const Main = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [todoDetails, setTodoDetails] = useState<Todo>();
  const [currentPage, setCurrentPage] = useState(1);
  const todoContext = useContext(TodoContext);
  if (!todoContext) {
    return null;
  }
  const { showModal, setShowModal, showEditModal, todos, isLoading } =
    todoContext;
  const itemsPerPage = 4;
  const indexOfLastTodo = currentPage * itemsPerPage;
  const indexOfFirstTodo = indexOfLastTodo - itemsPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const totalPages = Math.ceil(todos.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };
  return (
    <main className="px-4 sm:px-16">
      <section className="flex mt-12 justify-between items-center">
        <div>
          <p className="text-[3rem] font-semibold text-gray-900">
            {getGreeting()}
          </p>
          <span className="text-gray-600 text-[1.6rem]">
            You got some task to do.{" "}
          </span>
        </div>
        <Button
          className="hidden sm:flex"
          onClick={() => {
            setShowModal(true);
          }}
          mode={"primary"}
          width={"17.6rem"}
        >
          <Image src={"/plus.svg"} alt="add task" width={20} height={20} />
          Create New
        </Button>
      </section>
      <section className="flex mt-14">
        <section className="w-full md:w-[70%] pr-5">
          <h1 className="text-[1.6rem]">My Todos</h1>
          {isLoading ? (
            <div className="flex items-center justify-center">
              <Image
                className="animate-spin"
                src={"/load.svg"}
                alt="loading"
                width={24}
                height={24}
              />
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {currentTodos.map((todo) => (
                <div key={todo.id}>
                  <TodoItem
                    id={todo.id}
                    task={todo.task}
                    start_time={todo.start_time}
                    end_time={todo.end_time}
                    setShowDetail={setShowDetail}
                    setTodoDetails={setTodoDetails}
                    date={todo.date}
                  />
                </div>
              ))}
              {todos.length > itemsPerPage && (
                <Pagination
                  currentPage={currentPage}
                  handlePageChange={handlePageChange}
                  totalPages={totalPages}
                />
              )}
            </div>
          )}
        </section>
        {!showDetail && <CalendarInline />}
        <aside
          className="absolute md:relative md:block w-full bottom-0 left-0 z-10 h-[60vh] md:h-fit md:w-[30%] border-l border-[#EAECF0] md:pl-6"
          style={{
            display: showDetail ? "block" : "none",
          }}
        >
          {showDetail ? (
            <TodoDetail todo={todoDetails} setShowDetail={setShowDetail} />
          ) : null}
        </aside>
      </section>
      {showModal && <AddTask />}
      {showEditModal && todoDetails ? (
        <EditTask
          id={todoDetails?.id}
          task={todoDetails?.task}
          start_time={todoDetails?.start_time}
          end_time={todoDetails?.end_time}
          date={todoDetails?.date}
        />
      ) : null}
    </main>
  );
};

export default Main;
