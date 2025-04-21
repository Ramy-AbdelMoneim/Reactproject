import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import PostTable from "./PostTable";
export default function Addpost({ userId, addpost, user }) {
  const [form, setform] = useState({
    title: "",
    body: "",
    imgurl: "",
    userId: "",
    by: "",
  });
  const formhandler = (e) => {
    const newform = { ...form, [e.target.name]: "" + e.target.value };
    setform(newform);
  };
  const navigate = useNavigate();
  //form handler
  const addposthandler = (e) => {
    e.preventDefault();
    let newform = { ...form, userId: userId, by: user };
    setform(newform);
    addpostDB(newform);
  };

  //adding post to DB
  const addpostDB = async (DBform) => {
    try {
      navigate("/");
      const res = await axios.post("http://localhost:8080/add", DBform);
      addpost(res.data);
      const notify = () => toast("✔ Post has been added");
      notify();
    } catch (err) {
      console.log(err);
      const notify = () => toast.error("❌ Error has been occured");
      notify();
    }
  };
  return (
    <PostTable
      form={form}
      formhandler={formhandler}
      Submithandler={addposthandler}
      BtnValue={"Add post"}
    />
  );
}
