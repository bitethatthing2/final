"use client"

import { Header } from "@/components/header";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      {/* Footer can be added here later */}
    </>
  )
}