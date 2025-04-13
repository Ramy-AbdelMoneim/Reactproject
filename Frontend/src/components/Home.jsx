import React from "react";
import Post from "./Post";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
export default function Home({
  posts,
  pagenum,
  selectedPage,
  pagehander,
  userId,
  deletepost,
  loading,
}) {
  //for pagination
  let pages = [];
  for (let i = 1; i <= pagenum; i++) {
    pages.push(i);
  }
  const navigate = useNavigate();
  //navigate on addpost page
  const addpost = () => {
    navigate("/addpost");
  };
  if (loading) {
    return (
      <>
        <div className="w-full h-screen flex items-center justify-center">
          <span className="loading loading-infinity loading-xl"></span>
        </div>
      </>
    );
  }
  return (
    <>
      <ToastContainer theme="dark" />
      {posts.length < 1 && (
        <div className="text-7xl text-center mt-10">
          {" "}
          There are no posts yet!
        </div>
      )}
      <div className="max-w-4xl m-auto">
        {posts.map((post) => (
          <Post
            key={post._id}
            id={post._id}
            title={post.title}
            body={post.body}
            by={post.by}
            imgurl={post.imgurl}
            userId={userId}
            DBuserId={post.userId}
            deletepost={deletepost}
          />
        ))}
      </div>
      {userId && (
        <div className="w-full relative">
          <button
            className=" btn relative float-end right-80 bg-green-500 transition-all hover:scale-105 mt-3
         "
            onClick={addpost}
          >
            Add a post
          </button>
        </div>
      )}
      {pagenum > 1 && (
        <div className="join w-full justify-center">
          {pages.map((num) => (
            <button
              className={`join-item btn ${
                selectedPage === num ? "btn-active" : ""
              }`}
              key={num}
              onClick={() => pagehander(num)}
            >
              {num}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
