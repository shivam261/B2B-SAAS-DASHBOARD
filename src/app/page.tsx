import Image from "next/image";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"

import LoginForm from "@/components/custom/login_form"
import SignupForm from "@/components/custom/signup_form"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Label } from "@/components/ui/label";

export default function Home() {
  return (
    <BackgroundBeamsWithCollision className="min-h-screen w-full flex flex-col text-black">
      
      {/* 
        Removed mt-[50%].
        Using flex-1 so this wrapper takes up available space and pushes the footer down naturally.
      */}
      <div className="flex flex-col w-full flex-1 bg-linear-to-br from-[rgb(227,229,230)] to-[rgb(239,227,200)] z-10">

        {/* Main Layout Area */}
        <div className="flex flex-col md:flex-row w-full flex-1">
          
          {/* Left Side: Company Info & Photo */}
          <div className="w-full md:w-[45%] flex flex-col p-6 md:p-8 ">
            <div className="mb-10 md:mb-12">
              <Badge 
                variant="outline" 
                className="px-4 py-1.5 uppercase tracking-widest text-md font-semibold bg-white/40 backdrop-blur-md  text-amber-900 shadow-sm ring-1 ring-amber-900/10"
              >
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                  B2B Healthcare SAAS TOOL
                </span>
              </Badge>
            </div>  
            
            <div className="flex flex-col items-center md:items-start">
              <div className="relative w-full h-full md:w-full md:max-w-100 md:aspect-6/10 rounded-full md:rounded-2xl overflow-hidden shadow-2xl  shrink-0">
                <Image 
                  src="/login_page2.jpg" 
                  alt="Doctor Portrait"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="text-center md:text-left mt-6">
                <p className="text-sm font-medium text-black/60 tracking-widest uppercase">
                  Trusted healthcare solutions.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Login Content */}
          <div className="w-full md:w-[55%] flex grow items-center justify-center p-6 backdrop-blur-xs">
            <div className="max-w-md w-full p-8 rounded-3xl">
              <Tabs defaultValue="LOGIN" className="w-full">
                <TabsList className="bg-white/10 backdrop-blur-md border-white/50 rounded-xl p-1 mb-8 shadow-lg text-black w-full flex">
                  <TabsTrigger value="LOGIN" className="flex-1">
                    <div className="text-black text-2xl font-bold hover:text-sky-600">Login</div>
                  </TabsTrigger>
                  <TabsTrigger value="SIGNUP" className="flex-1">
                    <div className="text-black text-2xl font-bold hover:text-sky-600">Signup</div>
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="LOGIN">
                  <LoginForm />
                </TabsContent>
                <TabsContent value="SIGNUP">
                  <SignupForm />
                </TabsContent>
              </Tabs>
            </div>
          </div>

        </div>

        {/* 
            Footer: 
            Removed min-h-screen. Added standard padding (py-6) and shrink-0 so it doesn't get crushed. 
        */}
        <footer className="w-full shrink-0 flex  font-bold flex-row py-6 px-8 border-t space-x-4 border-black/10 text-center text-black bg-white/10 backdrop-blur-sm z-20">
         Made By Shivam Tripathi | &copy; 2026 B2B Healthcare. All rights reserved.   

          
          <span className="text-shadow-md text-black  ">
            Note: This is a demo application. All data is fictional and for testing purposes only.
          </span>
          <Label className="text-md text-black ">
            For any inquiries or support, please contact us at <a href="mailto:shivam1705of@gmail.com" className="text-amber-700 hover:underline">shivam1705of@gmail.com</a>
          </Label>  
        </footer>
        
      </div>
    </BackgroundBeamsWithCollision>
  );
}