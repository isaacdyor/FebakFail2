"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";
import { useEffect, useState } from "react";

export default function SettingsPage() {
  const doSomething = api.visitors.doSomething.useMutation();
  const [visitorId, setVisitorId] = useState<string | null>(null);

  useEffect(() => {
    const visitorId = localStorage.getItem("visitorId");
    setVisitorId(visitorId);
  }, []);

  return (
    <div>
      {visitorId && (
        <Button
          onClick={() => {
            doSomething.mutate();
          }}
        >
          hi
        </Button>
      )}
    </div>
  );
}
