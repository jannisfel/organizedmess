import Link from "next/link";
import { ProtectRoute } from "@/lib/protectedRoute";

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

export default function Home() {
  return (
    <ProtectRoute>
      <section>
        <div className="inline-flex flex-wrap gap-4 w-full">
          <QuickLink
            title="Add an Item"
            description="Click here to add an item"
            href="/items/create"
          />
          <QuickLink
            title="Add an Item"
            description="Click here to add an item"
            href="/items/create"
          />
          <QuickLink
            title="Add an Item"
            description="Click here to add an item"
            href="/items/create"
          />
          <QuickLink
            title="Add an Item"
            description="Click here to add an item"
            href="/items/create"
          />
        </div>
      </section>
    </ProtectRoute>
  );
}
