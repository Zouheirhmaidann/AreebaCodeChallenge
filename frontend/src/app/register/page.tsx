"use client";

import AuthComponent from "@/components/AuthForm";
import { memo } from "react";

export default memo(function RegisterPage() {
  return <AuthComponent type="register" />;
});
