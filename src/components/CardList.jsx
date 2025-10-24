import React from "react";
import { useSelector } from "react-redux";
import CardItem from "./CardItem";

export default function CardList() {
  const { data, currentPage, itemsPerPage, gridView } = useSelector(
    (state) => state.posts
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visiblePosts = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div
      className={`${
        gridView
          ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          : "flex flex-col gap-3"
      }`}
    >
      {visiblePosts.map((post) => (
        <CardItem key={post.id} post={post} grid={gridView} />
      ))}
    </div>
  );
}
