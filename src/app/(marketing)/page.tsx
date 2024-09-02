"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export default function Home() {
  const [visitorId, setVisitorId] = useState<string | null>(null);

  useEffect(() => {
    // Access localStorage only after component mounts
    const storedVisitorId = localStorage.getItem("visitorId");
    setVisitorId(storedVisitorId);
  }, []);

  if (visitorId === null) {
    // Still loading or visitor ID not found
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Button>{visitorId}</Button>
    </div>
  );
}
