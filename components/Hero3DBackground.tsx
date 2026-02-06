"use client";

import dynamic from "next/dynamic";

const Spline = dynamic(
  () => import("@splinetool/react-spline").then((mod) => mod.default),
  { ssr: false }
);

/** خلفية 3D فقط للهيدر وقسم الهيرو (أول قسم) — absolute لملء القسم فقط وليس الصفحة كاملة */
export function Hero3DBackground() {
  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      aria-hidden
    >
      <Spline
        scene="/3d/hero.splinecode"
        className="!absolute !inset-0 !h-full !w-full"
      />
    </div>
  );
}
