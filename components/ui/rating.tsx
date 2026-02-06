"use client";

import * as React from "react";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface RatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}

export function Rating({
  rating,
  maxRating = 5,
  size = "md",
  showValue = true,
  className,
}: RatingProps) {
  const sizeClasses = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  };

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={cn("flex items-center gap-1", className)}>
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star
          key={`full-${i}`}
          className={cn(
            sizeClasses[size],
            "fill-yellow-400 text-yellow-400"
          )}
        />
      ))}
      {hasHalfStar && (
        <div className="relative">
          <Star
            className={cn(
              sizeClasses[size],
              "text-yellow-400"
            )}
          />
          <Star
            className={cn(
              sizeClasses[size],
              "fill-yellow-400 text-yellow-400 absolute left-0 top-0 overflow-hidden"
            )}
            style={{ clipPath: "inset(0 50% 0 0)" }}
          />
        </div>
      )}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          className={cn(
            sizeClasses[size],
            "text-gray-300 fill-gray-300"
          )}
        />
      ))}
      {showValue && (
        <span className="ml-1 text-sm font-medium text-muted-foreground">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
}
