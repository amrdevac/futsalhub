// pages/protected.tsx

import { getSession } from "next-auth/react";

const ProtectedPage = () => {
  return <div>Protected Content</div>;
};

export async function getServerSideProps(context: any) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default ProtectedPage;
