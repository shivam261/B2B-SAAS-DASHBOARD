"use client";
import { Badge } from "@/components/ui/badge";
import LoginForm from "@/components/custom/login_form";
import SignupForm from "@/components/custom/signup_form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Activity, BarChart3, Bell, ShieldCheck, Zap } from "lucide-react"; 

export default function Home() {
  return (
    <>
      <div className="relative flex flex-col min-h-screen w-full bg-slate-50 font-sans text-slate-900 overflow-hidden">
        
        {/* 1. AMBIENT BACKGROUND ANIMATION */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[100px] animate-pulse duration-10000" />
          <div className="absolute top-[30%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-400/10 blur-[120px] animate-pulse duration-10000 delay-700" />
          <div className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-emerald-400/5 blur-[100px] animate-pulse duration-10000 delay-1000" />
        </div>

        {/* Main Layout Area */}
        <div className="relative z-10 flex flex-col md:flex-row w-full flex-1">
          
          {/* Left Side: Analytical Features Content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 relative">
            <div className="max-w-xl">
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
                <Badge variant="outline" className="px-4 py-1.5 text-xs tracking-[0.15em] font-bold uppercase bg-blue-50/50 text-blue-700 border-blue-200/50 shadow-sm backdrop-blur-md rounded-full">
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                    Predictive Analytics Active
                  </span>
                </Badge>
              </div>
              
              <h1 className="mt-8 text-4xl md:text-6xl font-black tracking-tight text-slate-900 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 fill-mode-both">
                <Activity className="size-12 text-blue-600" />
                HealthCare Intelligence
              </h1>
              
              <p className="mt-6 text-slate-500 text-lg font-medium leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300 fill-mode-both">
                Harness the power of real-time data to optimize clinical performance and inventory management.
              </p>

              {/* PRODUCTIVE CONTENT: Feature Grid */}
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-500 fill-mode-both">
                <div className="flex gap-4 p-4 rounded-2xl bg-white/40 border border-white/60 backdrop-blur-sm">
                  <div className="bg-blue-600 p-2.5 rounded-xl h-fit text-white">
                    <Bell className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Live Stock Alerts</h4>
                    <p className="text-sm text-slate-500 mt-1">Real-time FCM push notifications for critical inventory thresholds.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-2xl bg-white/40 border border-white/60 backdrop-blur-sm">
                  <div className="bg-emerald-600 p-2.5 rounded-xl h-fit text-white">
                    <BarChart3 className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Revenue Recovery</h4>
                    <p className="text-sm text-slate-500 mt-1">Identify billing gaps and denial trends with 98% accuracy.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-2xl bg-white/40 border border-white/60 backdrop-blur-sm">
                  <div className="bg-amber-500 p-2.5 rounded-xl h-fit text-white">
                    <Zap className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">Operational Flow</h4>
                    <p className="text-sm text-slate-500 mt-1">Visualize patient throughput and resource occupancy live.</p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 rounded-2xl bg-white/40 border border-white/60 backdrop-blur-sm">
                  <div className="bg-indigo-600 p-2.5 rounded-xl h-fit text-white">
                    <ShieldCheck className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">HIPAA Compliant</h4>
                    <p className="text-sm text-slate-500 mt-1">Secure, encrypted authentication via Firebase v10 SDK.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Login Content - CENTERED */}
          <div className="w-full md:w-1/2 flex items-center justify-center p-4 sm:p-6 lg:p-12">
            <div className="w-full max-w-md bg-white/90 backdrop-blur-xl p-6 sm:p-10 rounded-[2.5rem] shadow-2xl shadow-blue-900/10 border border-white animate-in fade-in slide-in-from-right-8 duration-700 delay-500 fill-mode-both">
              
              <Tabs defaultValue="LOGIN" className="w-full">
                {/* Fixed: Tabs are now perfectly centered and balanced */}
                <TabsList className="grid w-full grid-cols-2 bg-slate-100/80 p-0.5 mb-8 rounded-2xl h-14">
                  <TabsTrigger 
                    value="LOGIN" 
                    className="rounded-xl text-sm md:text-base font-bold text-slate-600 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm transition-all"
                  >
                    Log In
                  </TabsTrigger>
                  <TabsTrigger 
                    value="SIGNUP" 
                    className="rounded-xl text-sm md:text-base font-bold text-slate-600 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm transition-all"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>
                
                <div className="mt-2">
                  <TabsContent value="LOGIN" className="animate-in fade-in slide-in-from-bottom-2 duration-500 outline-hidden">
                    <LoginForm />
                  </TabsContent>
                  <TabsContent value="SIGNUP" className="animate-in fade-in slide-in-from-bottom-2 duration-500 outline-hidden">
                    <SignupForm />
                  </TabsContent>
                </div>
              </Tabs>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 w-full shrink-0 flex flex-col md:flex-row items-center justify-between py-6 px-6 md:px-12 border-t border-slate-200/50 bg-white/50 backdrop-blur-md text-xs md:text-sm text-slate-500 gap-4 text-center md:text-left animate-in fade-in duration-1000 delay-700 fill-mode-both">
          <div className="font-medium">
            &copy; 2026 Health care. All rights reserved. <span className="hidden md:inline mx-2">|</span> Made by Shivam Tripathi
          </div>
          <div className="text-slate-400 italic font-medium">
            Next.js 15 &bull; Firebase &bull; Tailwind CSS
          </div>
          <div className="font-medium">
            Support: <a href="mailto:shivam1705of@gmail.com" className="text-blue-600 hover:text-blue-800 transition-colors font-bold">shivam1705of@gmail.com</a>
          </div>  
        </footer>
      </div>
    </>
  );
}