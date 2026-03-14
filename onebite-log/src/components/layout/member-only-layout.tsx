import { useSession } from "@/store/session";
import React from "react";
import { Navigate, Outlet } from "react-router";

export default function MemberOnlyLayout() {
  const session = useSession();

  if (!session) return <Navigate to={"/sigin-in"} replace={true} />;

  return <Outlet />;
}
