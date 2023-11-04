"use client";

import { SessionProvider } from "next-auth/react";

const Next_Auth_Provider = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Next_Auth_Provider;
