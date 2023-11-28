import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/authOption";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";

const middleware = (handler) => async (req, res) => {
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB" });
  }

  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in!" });
  }

  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User doesn't exist!" });
  }

  req.customData = { user };

  return handler(req, res);
};

export default middleware;
