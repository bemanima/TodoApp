import ProfilePage from "@/components/template/ProfilePage";
import { getSession } from "next-auth/react";

const profile = () => {
  return <ProfilePage />;
};

export default profile;

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
    props: {},
  };
}
