import axios from "axios";
import React, { useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
export default function Register({ userhandler, userIdhandler }) {
  const [form, setform] = useState({
    username: "",
    password: "",
  });
  //check for filling mail and password
  const [check, setcheck] = useState(true);
  const formhandler = (e) => {
    const newform = { ...form, [e.target.name]: e.target.value };
    setform(newform);
  };
  const navigate = useNavigate();
  // sending data to DB and checking it
  const registerhandler = async (e) => {
    e.preventDefault();
    if (!form.password || !form.username) {
      setcheck(true);
    } else {
      setcheck(false);
      const { data } = await axios.post("http://localhost:8080/register", form);
      Cookies.set("token", data[0]);
      userhandler(data[1]);
      userIdhandler(data[2]);
      navigate("/");
    }
  };
  return (
    <>
      <div className=" flex flex-col items-center justify-center">
        <div className="block relative w-full max-w-md top-50">
          <form>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={form.username}
              className="input  block"
              onChange={formhandler}
            />
            <label htmlFor="password">password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              className="input  block"
              onChange={formhandler}
            />
            {check && (
              <div className="text-red-500">
                You must fill up the mail and password
              </div>
            )}
            <button
              className="btn mt-5 bg-green-400 relative left-65 transition-all hover:scale-105 "
              onClick={registerhandler}
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
