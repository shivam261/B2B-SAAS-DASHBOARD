import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Patient",
  description: "B2B Healthcare for Patients",
};

export default function PatientLayout({
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