import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import axios from "axios";
import Login from "./components/Login";
import Register from "./components/register";
import Addpost from "./components/Addpost";
import Modifypost from "./components/Modifypost";
import Cookies from "js-cookie";

export default function App() {
  //variables
  const [posts, setposts] = useState([]);
  const [user, setUser] = useState("");
  const [loading, setloading] = useState(true);
  //handlers
  const userhandler = (user) => {
    setUser(user);
  };
  const [userId, setUserID] = useState("");
  const userIdhandler = (userid) => {
    setUserID(userid);
  };
  useEffect(() => {
    // setloading(true);
    const getuser = async () => {
      const token = Cookies.get("token");
      if (token) {
        const { data } = await axios.post("http://localhost:8080/user", {
          token,
        });
        setUser(data.username);
        setUserID(data.userId);
      }
    };
    const getdata = async () => {
      const res = await axios.get("http://localhost:8080/");
      setposts(res.data);
      setloading(false);
    };
    getuser();
    getdata();
  }, []);
  //addpost
  const addpost = (post) => {
    const newposts = [...posts, post];
    setposts(newposts);
  };

  //delete post
  const deletepost = (id) => {
    let newposts = [...posts];
    const index = newposts.findIndex((post) => post._id === id);
    newposts.splice(index, 1);
    setposts(newposts);
  };

  //modify post ui
  const modifypost = (newpost) => {
    let newposts = [...posts];
    const postIdx = newposts.findIndex((post) => post._id === newpost._id);
    newposts[postIdx] = newpost;
    setposts(newposts);
  };
  //logout
  const logout = () => {
    setUser("");
    setUserID("");
    Cookies.remove("token");
  };
  //pagination
  const [selectedPage, setpage] = useState(1);
  const pagehander = (num) => {
    setpage(num);
  };
  const pagesize = 5;
  const pagenum = Math.ceil(posts.length / pagesize);
  const start = (selectedPage - 1) * pagesize;
  const end = start + pagesize;
  const pageposts = posts.slice(start, end);
  return (
    <>
      <Navbar user={user} logout={logout} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              posts={pageposts}
              pagenum={pagenum}
              selectedPage={selectedPage}
              pagehander={pagehander}
              // user={user}
              userId={userId}
              deletepost={deletepost}
              loading={loading}
            />
          }
        />
        <Route
          path="/login"
          element={
            <Login userhandler={userhandler} userIdhandler={userIdhandler} />
          }
        />
        <Route
          path="/register"
          element={
            <Register userhandler={userhandler} userIdhandler={userIdhandler} />
          }
        />
        <Route
          path="/addpost"
          element={<Addpost userId={userId} addpost={addpost} user={user} />}
        />
        <Route
          path="/modify/:id"
          element={<Modifypost posts={posts} modifypost={modifypost} />}
        />
      </Routes>
    </>
  );
}
