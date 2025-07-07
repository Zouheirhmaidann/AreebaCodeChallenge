"use client";

import { memo } from "react";
import { Toaster } from "react-hot-toast";

/**
 * ToastProvider component that renders the Toaster for displaying toast notifications.
 *
 * This component uses the `react-hot-toast` library to display notifications at the top-right
 * corner of the screen. It should be included at a high level in your component tree to ensure
 * toast notifications can be triggered from anywhere within the application.
 */

export default memo(function ToastProvider() {
  return <Toaster position="top-right" />;
});
