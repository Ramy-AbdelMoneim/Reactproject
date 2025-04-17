import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import PostTable from "./PostTable";

export default function Modifypost({ posts, modifypost }) {
  const { id } = useParams();
  const [form, setform] = useState({
    title: "",
    body: "",
    imgurl: "",
    userId: "",
    by: "",
  });
  const post = posts.find((post) => post._id === id);
  for (let i in post) {
    if (post[i] == null) {
      post[i] = "";
    }
  }
  useEffect(() => {
    const newform = { ...form, ...post };
    setform(newform);
  }, []);
  const formhandler = (e) => {
    const newform = { ...form, [e.target.name]: "" + e.target.value };
    setform(newform);
  };

  const navigate = useNavigate();
  const modifyhandler = async (e) => {
    e.preventDefault();
    const res = await Modifydb(form._id);
    modifypost(res);
    const notify = () => toast("✔ Post has been Modified");
    notify();
    navigate("/");
  };
  //modify in db
  const Modifydb = async (id) => {
    const { data } = await axios.post(
      "http://localhost:8080/modify/" + id,
      form
    );
    return data;
  };
  return (
    <PostTable
      form={form}
      formhandler={formhandler}
      Submithandler={modifyhandler}
      BtnValue={"Modify"}
    />
  );
}
