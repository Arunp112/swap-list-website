import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../redux/postsSlice";

export default function Pagination() {
  const { data, currentPage, itemsPerPage } = useSelector(
    (state) => state.posts
  );
  const dispatch = useDispatch();

  const totalPages = Math.ceil(data.length / itemsPerPage);

  // If there are no posts, don't render pagination
  if (totalPages === 0) return null;

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3 mt-6 px-2">
      {/* Prev Button */}
      <button
        onClick={() => dispatch(setPage(Math.max(1, currentPage - 1)))}
        disabled={currentPage === 1}
        className={`px-3 sm:px-4 py-1 sm:py-2 rounded text-sm sm:text-base transition-colors ${
          currentPage === 1
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        Prev
      </button>

      {/* Page Numbers */}
      <div className="flex flex-wrap justify-center gap-2 max-w-full overflow-x-auto">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => dispatch(setPage(i + 1))}
            className={`px-3 sm:px-4 py-1 sm:py-2 rounded text-sm sm:text-base transition-colors ${
              currentPage === i + 1
                ? "bg-green-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        onClick={() => dispatch(setPage(Math.min(totalPages, currentPage + 1)))}
        disabled={currentPage === totalPages}
        className={`px-3 sm:px-4 py-1 sm:py-2 rounded text-sm sm:text-base transition-colors ${
          currentPage === totalPages
            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
            : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        Next
      </button>
    </div>
  );
}
