import HomePage from "@/components/template/HomePage";
import { getSession } from "next-auth/react";

const index = () => {
  return <HomePage />;
};

export default index;

export async function getServerSideProps({ req }) {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}
