"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

const emailConfirmationRequired = false;

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [view, setView] = useState<"sign-in" | "sign-up" | "check-email">(
    "sign-in"
  );
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSignUp = async () => {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (!emailConfirmationRequired) {
      setView("check-email");
    } else {
      router.push("/dashboard");
      router.refresh();
    }
  };

  const handleSignIn = async () => {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.push("/dashboard");
    router.refresh();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="flex flex-col items-center justify-center gap-4 max-w-md w-full">
        {view === "check-email" ? (
          <span>
            Check <span className="font-bold">{email}</span> to continue signing
            up
          </span>
        ) : (
          <>
            {view === "sign-up" && (
              <Input
                label="Name"
                size="md"
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            )}
            <Input
              label="Email"
              size="md"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <Input
              type="password"
              label="Password"
              size="md"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {view === "sign-in" && (
              <>
                <Button
                  fullWidth
                  size="md"
                  onClick={handleSignIn}
                  color="primary"
                >
                  Login
                </Button>
                <span>
                  Don&apos;t have an account?{" "}
                  <a className="underline" onClick={() => setView("sign-up")}>
                    Sign Up Now
                  </a>
                </span>
              </>
            )}
            {view === "sign-up" && (
              <>
                <Button
                  fullWidth
                  size="md"
                  onClick={handleSignUp}
                  color="primary"
                >
                  Sign Up
                </Button>
                <span>
                  Already have an account?{" "}
                  <a className="underline" onClick={() => setView("sign-in")}>
                    Sign In Now
                  </a>
                </span>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
