import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Dashboard",
  description: "B2B Healthcare Dashboard",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (



      < >  
          <TooltipProvider>
                <SidebarProvider>
                    <AppSidebar />
                    <main className="flex-1 w-full overflow-x-hidden">
                        <SidebarTrigger />
                        {children}
                    </main>
                </SidebarProvider>
          </TooltipProvider>
          
        </>


    );
}
