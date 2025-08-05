"use client";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import React from "react";

const Page = () => {
  const { data: session } = authClient.useSession();
  if (!session) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="flex flex-col p-4 gap-y-4">
        <p>Logged in as {session.user.name}</p>
        <Button onClick={() => authClient.signOut()} className="cursor-pointer">
          Sign Out
        </Button>
      </div>
    </>
  );
};

export default Page;
