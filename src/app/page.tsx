import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import LoginForm from "@/components/custom/login_form";
import SignupForm from "@/components/custom/signup_form";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Activity } from "lucide-react"; 
import CampaignChart from "@/components/custom/card-chart";

export default function Home() {
  return (
    <>
      <div className="relative flex flex-col min-h-screen w-full bg-slate-50 font-sans text-slate-900 overflow-hidden">

        {/* 
            1. AMBIENT BACKGROUND ANIMATION 
            Soft, blurred colored orbs that pulse slowly in the background.
            They are set to pointer-events-none so they don't block clicks.
        */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-blue-400/10 blur-[100px] animate-pulse duration-10000" />
          <div className="absolute top-[30%] -right-[10%] w-[50%] h-[50%] rounded-full bg-indigo-400/10 blur-[120px] animate-pulse duration-10000 delay-700" />
          <div className="absolute -bottom-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-emerald-400/5 blur-[100px] animate-pulse duration-10000 delay-1000" />
        </div>

        {/* Main Layout Area (Added z-10 to stay above background) */}
        <div className="relative z-10 flex flex-col md:flex-row w-full flex-1">
          
          {/* Left Side: Company Info & Photo */}
          <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-16 lg:p-24 relative">
            
            <div className="mb-6 md:mb-10">
              {/* Badge - Fades in first */}
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 fill-mode-both">
                <Badge 
                  variant="outline" 
                  className="px-4 py-1.5 text-xs tracking-[0.15em] font-bold uppercase bg-blue-50/50 text-blue-700 border-blue-200/50 shadow-sm backdrop-blur-md rounded-full"
                >
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-pulse" />
                    Health care SaaS
                  </span>
                </Badge>
              </div>
              
              {/* Heading - Fades in second (delay-150) */}
              <h1 className="mt-8 text-4xl md:text-5xl font-black tracking-tight text-slate-900 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150 fill-mode-both">
                <Activity className="size-10 text-blue-600" />
                Health care
              </h1>
              
              {/* Paragraph - Fades in third (delay-300) */}
              <p className="mt-4 text-slate-500 text-lg md:text-xl font-medium max-w-md leading-relaxed animate-in fade-in slide-in-from-bottom-6 duration-700 delay-300 fill-mode-both">
                The secure, intelligent platform for modern patient management and clinical workflows.
              </p>
            </div>  
            
            {/* Image Container - Zooms in softly (delay-500) */}
            <div className="hidden md:block relative w-full max-w-md aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 border border-white/40 group shrink-0 animate-in fade-in zoom-in-[0.95] duration-1000 delay-500 fill-mode-both">
              <div className="absolute inset-0 bg-linear-to-tr from-blue-900/20 to-transparent z-10 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-50" />
              <Image 
                src="/login_page2.jpg" 
                alt="Healthcare Professional Portrait"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
          </div>

          {/* Right Side: Login Content */}
          <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-12">
            
            {/* Elevated White Card - Slides in from the right (delay-500) */}
            <div className="w-full max-w-md bg-white/90 backdrop-blur-xl p-6 sm:p-10 rounded-[2rem] shadow-2xl shadow-slate-200/50 border border-white animate-in fade-in slide-in-from-right-8 md:slide-in-from-bottom-8 duration-700 delay-500 fill-mode-both">
              
              <Tabs defaultValue="LOGIN" className="w-full">
                
                <TabsList className="bg-slate-100/80 p-1 mb-8 rounded-xl flex w-full h-14">
                  <TabsTrigger 
                    value="LOGIN" 
                    className="flex-1 rounded-lg text-sm md:text-base font-bold text-slate-600 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm transition-all"
                  >
                    Log In
                  </TabsTrigger>
                  <TabsTrigger 
                    value="SIGNUP" 
                    className="flex-1 rounded-lg text-sm md:text-base font-bold text-slate-600 data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm transition-all"
                  >
                    Sign Up
                  </TabsTrigger>
                </TabsList>
                
                <div className="mt-2">
                  <TabsContent value="LOGIN" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <LoginForm />
                  </TabsContent>
                  <TabsContent value="SIGNUP" className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <SignupForm />
                  </TabsContent>
                </div>

              </Tabs>
            </div>
          </div>

        </div>

        {/* Footer - Fades in last (delay-700) */}
        <footer className="relative z-10 w-full shrink-0 flex flex-col md:flex-row items-center justify-between py-6 px-6 md:px-12 border-t border-slate-200/50 bg-white/50 backdrop-blur-md text-xs md:text-sm text-slate-500 gap-4 text-center md:text-left animate-in fade-in duration-1000 delay-700 fill-mode-both">
          
          <div className="font-medium">
            &copy; 2026 Health care. All rights reserved. <span className="hidden md:inline mx-2">|</span> Made by Shivam Tripathi
          </div>
          
          <div className="text-slate-400 italic">
            Note: Demo application. Fictional data for testing.
          </div>
          
          <div className="font-medium">
            Support:{" "}
            <a 
              href="mailto:shivam1705of@gmail.com" 
              className="text-blue-600 hover:text-blue-800 transition-colors font-bold"
            >
              shivam1705of@gmail.com
            </a>
          </div>  

        </footer>
        
      </div>
    </>
  );
}