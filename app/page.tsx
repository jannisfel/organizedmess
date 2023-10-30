import Link from "next/link";
import { ProtectRoute } from "@/lib/protectedRoute";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import { cookies } from "next/headers";
import ItemPreview from "@/components/ItemPreview";

const RightArrowIcon = () => {
  return (
    <svg
      className="w-3.5 h-3.5 ml-2"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 14 10"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M1 5h12m0 0L9 1m4 4L9 9"
      />
    </svg>
  );
};

const QuickLink = ({
  href,
  title,
  description,
}: {
  href: string;
  title: string;
  description: string;
}) => {
  return (
    <Link
      href={href}
      className="flex-grow block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
    >
      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {title}
      </h5>
      <p className="font-normal text-gray-700 dark:text-gray-400 inline-flex items-center ">
        {description}
        <RightArrowIcon />
      </p>
    </Link>
  );
};

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const { data: userProfile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data } = await supabase
    .from("items")
    .select("*")
    .eq("created_by", user.id)
    .lte(
      "expires_at",
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
    )
    .order("expires_at", { ascending: false });

  return (
    <ProtectRoute>
      <section>
        <h1 className="text-2xl font-bold mb-4">
          Welcome, {userProfile?.name}!
        </h1>
        <div className="inline-flex flex-wrap gap-4 w-full mb-4">
          <QuickLink
            title="Manage Items"
            description="Click here to list, add, edit and delete items"
            href="/items"
          />
          <QuickLink
            title="Manage Locations"
            description="Click here to list, add, edit and delete locations"
            href="/locations"
          />
        </div>
        <div>
          <h1 className="text-2xl font-bold mb-4">Expiring Soon</h1>
          <div className="grid grid-cols-1 gap-2">
            {data?.map((item) => (
              <ItemPreview item={item} key={item.id} />
            ))}
          </div>
        </div>
      </section>
    </ProtectRoute>
  );
}
