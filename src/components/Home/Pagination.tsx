import { TodoContext } from "@/contexts/TodoContext";
import Image from "next/image";
import React, { useContext, useState } from "react";

interface PaginationTypes {
  totalPages: number;
  currentPage: number;
  handlePageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationTypes> = ({
  totalPages,
  handlePageChange,
  currentPage,
}) => {
  return (
    <div className="flex justify-between items-center pt-5 mt-8">
      <button
        disabled={currentPage === 1}
        className="flex gap-1 items-center text-sm font-semibold"
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <Image src={"/arrow-left.svg"} alt="previous" width={20} height={20} />
        Previous
      </button>
      <div className="flex justify-center gap-8">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "font-bold" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>

      {currentPage < totalPages ? (
        <button
          className="flex gap-1 items-center text-sm font-semibold"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
          <Image
            src={"/arrow-right.svg"}
            alt="next"
            width={20}
            height={20}
          />{" "}
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Pagination;
