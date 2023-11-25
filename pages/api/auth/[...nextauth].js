import NextAuth from "next-auth";
import { authOptions } from "@/utils/authOption";

export default NextAuth(authOptions);
