import { useState } from "react";
import RadioButton from "../element/RadioButton";
import { GrAddCircle } from "react-icons/gr";
import { BsAlignStart } from "react-icons/bs";
import { FiSettings } from "react-icons/fi";
import { AiOutlineFileSearch } from "react-icons/ai";
import { MdDoneAll } from "react-icons/md";
import { Statuses } from "@/enums/TodoStatus";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddTodoPage = () => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("todo");

  const components = {
    BsAlignStart,
    FiSettings,
    AiOutlineFileSearch,
    MdDoneAll,
  };

  const addHandler = async () => {
    const res = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify({ title, status }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    if (data.status === "success") {
      setTitle("");
      setStatus("todo");
      toast.success("Todo added!");
    }
  };

  return (
    <div className="add-form">
      <h2>
        <GrAddCircle /> Add New Todo
      </h2>
      <div className="add-form__input">
        <div className="add-form__input--first">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            placeholder="Write todo title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="add-form__input--second">
          {Statuses.map((item) => {
            const IconName = components[item.icon];
            return (
              <RadioButton
                key={item.id}
                status={status}
                setStatus={setStatus}
                value={item.value}
                title={item.title}
              >
                <IconName />
              </RadioButton>
            );
          })}
        </div>
        <button onClick={addHandler}>Add</button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddTodoPage;
