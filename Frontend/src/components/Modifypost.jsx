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
    await Modifydb(form._id);
    navigate("/");
  };
  //modify in db
  const Modifydb = async (id) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8080/modify/" + id,
        form
      );
      modifypost(data);
      const notify = () => toast("✔ Post has been Modified");
      notify();
    } catch (err) {
      console.log(err);
      const notify = () =>
        toast.error("❌ Error has occured while Modifying Post");
      notify();
    }
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
