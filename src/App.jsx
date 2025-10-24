import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, toggleFeedback } from "./redux/postsSlice";
import Loader from "./components/Loader";
import CardList from "./components/CardList";
import Pagination from "./components/Pagination";
import ViewToggle from "./components/ViewToggle";
import FeedbackModal from "./components/FeedbackModal";

export default function App() {
  const dispatch = useDispatch();
  const { loading, showFeedback } = useSelector((state) => state.posts);

  useEffect(() => {
    const timer = setTimeout(() => dispatch(fetchPosts()), 2000);
    return () => clearTimeout(timer);
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">
      {/* SIDEBAR */}
      <div className="w-full md:w-64  p-6 flex flex-col gap-6 shadow-2xl rounded-md">
        <div className="flex items-center gap-3 bg-white p-3 rounded-md shadow-md">
          <img
            src="https://i.pravatar.cc/150?img=8"
            alt="User"
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="text-sm font-semibold text-gray-900">Hi Reader,</p>
            <p className="text-xs text-gray-500">Here's your News!</p>
          </div>
        </div>

        <ViewToggle />

        <div className="bg-white p-3 rounded-md shadow-md">
          <h3 className="text-sm font-semibold mb-3">Have Feedback?</h3>
          <button
            onClick={() => dispatch(toggleFeedback())}
            className="w-full bg-emerald-400 text-white py-3 rounded-lg hover:bg-emerald-500 transition-colors font-medium"
          >
            We're Listening!
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 sm:p-6 md:p-8">
        <CardList />
        <Pagination />
      </div>

      {showFeedback && <FeedbackModal />}
    </div>
  );
}
