import React from "react";
import { useDispatch } from "react-redux";
import { removePost } from "../redux/postsSlice";
import { CloseIcon } from "./Icons";

export default function CardItem({ post, grid }) {
  const dispatch = useDispatch();

  const avatars = [
    "https://i.pravatar.cc/150?img=1",
    "https://i.pravatar.cc/150?img=2",
    "https://i.pravatar.cc/150?img=3",
    "https://i.pravatar.cc/150?img=4",
    "https://i.pravatar.cc/150?img=5",
  ];

  const images = [
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=250&fit=crop",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop",
    "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400&h=250&fit=crop",
    "https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&h=250&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop",
  ];

  const avatar = avatars[(post.id - 1) % avatars.length];
  const cardImage = images[(post.id - 1) % images.length];

  return (
    <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-4 flex justify-center items-center gap-2">
    {     !grid && (<img
              src={avatar}
              alt="Avatar"
              className="w-10 h-10 rounded-full object-cover flex-shrink-0"
            />)}
      <div className="p-1">
        
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3 flex-1">
           
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base line-clamp-1">
                {post.title}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Mon, 21 Dec 2020 14:57 GMT
              </p>
            </div>
          </div>
          <button
            onClick={() => dispatch(removePost(post.id))}
            className="text-red-400 hover:text-red-600 transition-colors flex-shrink-0 ml-2"
          >
            <CloseIcon size={22} />
          </button>
        </div>

        {!grid && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2 sm:line-clamp-3">
            {post.body}
          </p>
        )}

        {grid && (
          <img
            src={cardImage}
            alt="Post"
            className="w-full h-40 sm:h-48 object-cover rounded-lg"
          />
        )}
      </div>
      </div>
    </div>
  );
}
