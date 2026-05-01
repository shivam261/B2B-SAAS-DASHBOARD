import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics",
  description: "B2B Healthcare Analytics",
};
export default function AnalyticalLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="p-6">
      
      {children}
    </div>
  );
}
