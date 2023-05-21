import AdminUI from "@/components/AdminUI";

export async function getStaticProps() {
  const response = await fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json');
  const data = await response.json();

  return {
    props: {
      users: data,
    },
  };
}

export default function AdminPage({users}) {
  return (
    <main className="flex justify-center flex-col items-center">
      <h1 className="text-3xl py-5">Admin UI</h1>
      <AdminUI users={users} />
    </main>
  );
}
