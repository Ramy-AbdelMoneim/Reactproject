import React from "react";

export default function PostTable({
  form,
  formhandler,
  Submithandler,
  BtnValue,
}) {
  return (
    <>
      <div className=" flex flex-col items-center justify-center">
        <div className="block relative w-full max-w-md top-50">
          <form>
            <label htmlFor="title">Post title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              className="input  block"
              onChange={formhandler}
            />
            <label htmlFor="body">Post content</label>
            <input
              type="text"
              name="body"
              value={form.body}
              className="input  block"
              onChange={formhandler}
            />
            <label htmlFor="imgurl">img url</label>
            <input
              type="text"
              name="imgurl"
              value={form.imgurl}
              className="input  block"
              onChange={formhandler}
            />
            <button
              className="btn mt-5 bg-green-400 relative left-65 transition-all hover:scale-105 "
              onClick={Submithandler}
            >
              {BtnValue}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
