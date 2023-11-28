import User from "@/models/User";
import { sortTodos } from "@/utils/sortTodos";
import middleware from "../../middleware/_middleware";

async function handler(req, res) {
  const user = req.customData.user;

  if (req.method === "POST") {
    const { title, status } = req.body;

    if (!title || !status) {
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid data!" });
    }

    user.todos.push({ title, status });
    user.save();

    return res
      .status(201)
      .json({ status: "success", message: "Todo created!" });
  } else if (req.method === "GET") {
    const sortedData = sortTodos(user.todos);
    res.status(200).json({ status: "success", data: { todos: sortedData } });
  } else if (req.method === "PATCH") {
    const { id, status } = req.body;

    if (!id || !status) {
      return res
        .status(422)
        .json({ status: "failed", message: "Invalid data" });
    }

    const result = await User.updateOne(
      { "todos._id": id },
      { $set: { "todos.$.status": status } }
    );

    res.status(200).json({ status: "success" });
  }
}

export default middleware(handler);
