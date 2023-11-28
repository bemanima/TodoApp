import middleware from "@/middleware/_middleware";
import { verifyPassword } from "@/utils/auth";

async function handler(req, res) {
  const user = req.customData.user;

  if (req.method === "POST") {
    const { name, lastName, password } = req.body;

    const isValid = verifyPassword(password, user.password);

    if (!isValid) {
      return res
        .status(422)
        .json({ status: "failed", message: "Password is incorrect!" });
    }

    user.name = name;
    user.lastName = lastName;
    user.save();

    res.status(200).json({
      status: "success",
      data: { name, lastName, email: session.user.email },
    });
  } else if (req.method === "GET") {
    res.status(200).json({
      status: "success",
      data: { name: user.name, lastName: user.lastName, email: user.email },
    });
  }
}

export default middleware(handler);
