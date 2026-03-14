import { useSession } from "@/store/session";
import React from "react";
import { Navigate, Outlet } from "react-router";
/**
 * 인증 되지 않는 유저일때 게스트 레이아웃을 보여준다
 */
export default function GuestOnlyLayout() {
  const session = useSession();

  if (session) return <Navigate to={"/"} replace={true} />;
  return <Outlet />;
}
