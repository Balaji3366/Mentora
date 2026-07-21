"use client";

import { ReactNode } from "react";
import BackButton from "./BackButton";

type PageLayoutProps = {
  children: ReactNode;
};

export default function PageLayout({ children }: PageLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-7xl p-8">
        <BackButton variant="light"/>
      </div>

      <div className="p-8">
        {children}
      </div>
    </div>
  );
}