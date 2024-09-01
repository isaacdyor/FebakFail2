import Link from "next/link";

import { LatestPost } from "@/components/post";
import { api, HydrateClient } from "@/trpc/server";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });

  void api.post.getLatest.prefetch();
  const supabase = createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  return <p>email: {session?.user.email}</p>;
}
