"use client";

import AuthComponent from "@/components/AuthForm";
import { memo } from "react";
// Memoize the component to prevent unnecessary re-renders and improve performance
export default memo(function RegisterPage() {
  return <AuthComponent type="register" />;
});
