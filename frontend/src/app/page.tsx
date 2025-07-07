"use client";

import { redirect } from "next/navigation";

/**
 * Redirects to the login page when the home page is accessed.
 *
 * This page is a client-side only redirect, meaning that the redirect will
 * happen on the client-side, without making a request to the server.
 *
 * The redirect is done using the `redirect` function from `next/navigation`.
 *
 * @return {Promise<void>} A promise that resolves when the redirect is complete.
 */
export default function Home() {
  redirect("/login");
}
