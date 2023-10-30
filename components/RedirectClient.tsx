"use client";

import { useEffect } from "react";

export default function RedirectClient({ href }: { href: string }) {
  useEffect(() => {
    window.location.href = href;
  });
  return <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>;
}
