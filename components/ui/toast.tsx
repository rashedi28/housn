"use client";

import * as React from "react";
import { Check, X, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface ToastProps {
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
}

export function Toast({ message, type = "success", onClose }: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const icons = {
    success: Check,
    error: X,
    info: ShoppingBag,
  };

  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-primary",
  };

  const Icon = icons[type];

  return (
    <div
      className={cn(
        "fixed top-20 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white animate-in slide-in-from-right-5 fade-in-0 duration-300",
        colors[type]
      )}
      style={{
        animation: "slideInRight 0.3s ease-out",
      }}
    >
      <Icon className="h-5 w-5 flex-shrink-0" />
      <span className="font-medium">{message}</span>
    </div>
  );
}
