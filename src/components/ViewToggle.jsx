import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleView } from "../redux/postsSlice";
import { GridIcon, ListIcon } from "./Icons";

export default function ViewToggle() {
  const dispatch = useDispatch();
  const { gridView } = useSelector((state) => state.posts);

  return (
    <div className="bg-white p-3 rounded-md shadow-md">
      <h3 className="text-sm font-semibold mb-3">View Toggle</h3>
      <div className="flex gap-2">
        {/* 🧩 LIST button (now triggers GRID view) */}
        <button
          onClick={() => gridView && dispatch(toggleView())}
          className={`flex-1 p-3 rounded-lg transition-all ${
            gridView
              ? "bg-gray-100 text-gray-400 hover:bg-gray-200"
              : "bg-emerald-400 text-white"
          }`}
        >
          <div className="mx-auto w-6 h-6 flex items-center justify-center">
            <ListIcon size={24} />
          </div>
        </button>

        {/* 🧩 GRID button (now triggers LIST view) */}
        <button
          onClick={() => !gridView && dispatch(toggleView())}
          className={`flex-1 p-3 rounded-lg transition-all ${
            !gridView
              ? "bg-gray-100 text-gray-400 hover:bg-gray-200"
              : "bg-gray-200 text-gray-900"
          }`}
        >
          <div className="mx-auto w-6 h-6 flex items-center justify-center">
            <GridIcon size={20} />
          </div>
        </button>
      </div>
    </div>
  );
}
