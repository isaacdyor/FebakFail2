// src/components/pages/home-page.tsx
"use client";

import { useUser } from "@/hooks/use-user";

export default function SettingsPage() {
  const { user } = useUser();
  return (
    <div>
      <p>whats up {user.email}</p>
    </div>
  );
}
