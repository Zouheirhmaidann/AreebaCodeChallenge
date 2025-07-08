"use client";

import AxiosInstance from "@/lib/AxiosInstance";
import "@/styles/auth.scss"; // Make sure this path matches your setup
import { AxiosError } from "axios";
import { ArrowRight, Eye, EyeOff, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { memo, useCallback, useState } from "react";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
type AuthComponentProps = {
  type: "login" | "register";
  defaultEmail?: string;
};

const AuthComponent: React.FC<AuthComponentProps> = ({
  type,
  defaultEmail = null,
}) => {
  // State to store the email
  const [email, setEmail] = useState(defaultEmail || "");
  // State to store the password
  const [password, setPassword] = useState("");
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  // State to handle loading state
  const [isLoading, setIsLoading] = useState(false);
  // use router
  const router = useRouter();
  // Function to handle the form submission
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        // Set loading state to true
        setIsLoading(true);
        // call an api
        const { data: response } = await AxiosInstance.post(`/users/${type}`, {
          email,
          password,
        });
        // Display success message
        toast.success(
          type === "login"
            ? "Successfully logged in"
            : "Account created successfully"
        );
        if (response?.token) {
          Cookies.set("auth-token", response.token, {
            secure: true,
            sameSite: "Strict",
          });
          router.push("/employees");
        }
        if (type === "register") {
          // Redirect to login page with the created email as a query parameter
          router.push(`/login?email=${encodeURIComponent(email)}`);
        }
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(err.response?.data?.message || "Something went wrong");
      } finally {
        // Set loading state to false
        setIsLoading(false);
      }
    },
    [type, email, password, router]
  );

  return (
    <div className="auth-container">
      <div className="auth-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>

      <div className="auth-card">
        <div className="auth-header">
          <h1 className="auth-title">
            {type === "login" ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="auth-subtitle">
            {type === "login"
              ? "Sign in to your account"
              : "Sign up to get started"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="input-group">
            <label htmlFor="email" className="input-label">
              Email
            </label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={20} />
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={20} />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="form-input"
                required
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className={`auth-button ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              <>
                <span>{type === "login" ? "Sign In" : "Sign Up"}</span>
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div className="auth-footer">
          {type === "login" ? (
            <p>
              Don&apos;t have an account?{" "}
              <Link href="/register" className="auth-link">
                Sign up
              </Link>
            </p>
          ) : (
            <p>
              Already have an account?{" "}
              <Link href="/login" className="auth-link">
                Sign in
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
// Memoize the component to prevent unnecessary re-renders and improve performance
export default memo(AuthComponent);
