"use client";
import AuthComponent from "@/components/AuthForm";
import { useSearchParams } from "next/navigation";
import { memo } from "react";
// Memoize the component to prevent unnecessary re-renders and improve performance
export default memo(function LoginPage() {
  // use the search params to get the email if it exists
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email") || "";
  return <AuthComponent type="login" defaultEmail={emailFromQuery} />;
});
