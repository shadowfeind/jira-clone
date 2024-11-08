import { getCurrent } from "@/features/auth/queries";
import { MembersList } from "@/features/members/component/members-list";
import { redirect } from "next/navigation";

const MembersPage = async () => {
  const user = await getCurrent();
  if (!user) redirect("/sign-in");

  return <MembersList />;
};

export default MembersPage;
