import AdminUI from "@/components/AdminUI";
import Head from "next/head";

export async function getStaticProps() {
  const response = await fetch(
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
  );
  const data = await response.json();

  return {
    props: {
      users: data,
    },
  };
}

export default function AdminPage({ users }) {
  return (
    <>
      <Head>
        <title>AdminUI</title>
        <meta name="description" content="welcome to Admin UI" />
        <link rel="icon" href="/admin.png" />
      </Head>
      <main className="flex justify-center flex-col items-center">
        <h1 className="text-3xl py-2">Admin UI</h1>
        <AdminUI users={users} />
      </main>
    </>
  );
}
