import PageHeader from "@/components/layout/PageHeader";
import DynamicFooter from "@/components/layout/DynamicFooter";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <PageHeader title="Hustle Hard" />
      <main className="flex-grow">
        {children}
      </main>
      <DynamicFooter />
    </>
  )
}