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
export default function Home() {
  return (
    <BackgroundBeamsWithCollision className="min-h-screen w-full">
      {/* 
          flex-col: Stacked on mobile 
          md:flex-row: Side-by-side on tablets/desktops 
      */}
      <div className="flex flex-col md:flex-row w-full h-full bg-linear-to-br from-[rgb(227,229,230)] to-[rgb(239,227,200)]">
        
        {/* Left Side: Company Info & Photo */}
        {/* w-full on mobile, md:w-1/5 (20%) on desktop */}
        <div className="w-full md:w-[45%] flex flex-col p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/10 z-10">
<div className="mb-10 md:mb-12">
    <Badge 
      variant="outline" 
      className="px-4 py-1.5 uppercase tracking-widest text-md font-semibold bg-white/40 backdrop-blur-md border-white/50 text-amber-900 shadow-sm ring-1 ring-amber-900/10"
    >
      <span className="flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
        B2B Healthcare SAAS TOOL
      </span>
    </Badge>
    

  </div>  
          
          <div className="flex flex-col items-center md:items-start">
            {/* 
                On mobile, we make the photo a bit smaller/centered.
                On desktop, it fills the 20% width.
            */}
            <div className="relative w-32 h-full md:w-full md:aspect-7/11 rounded-full md:rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
              <Image 
                src="/login_page2.jpg" 
                alt="Doctor Portrait"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="text-center md:text-left mt-4">
              <p className="text-sm text-black">
                Trusted healthcare solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Login Content */}
        {/* w-full on mobile, md:w-4/5 (80%) on desktop */}
        <div className="w-full md:w-4/5 flex grow items-center justify-center p-6    backdrop-blur-xs">
          <div className="max-w-md w-full p-8 rounded-3xl ">
         
              <Tabs defaultValue="LOGIN" className="w-100">
      <TabsList className="bg-white/10 backdrop-blur-md border-white/50 rounded-xl p-1 mb-8 shadow-lg text-black">
        <TabsTrigger value="LOGIN" ><div className="text-black text-2xl font-bold hover:text-sky-600">Login</div></TabsTrigger>
        <TabsTrigger value="SIGNUP"><div className="text-black text-2xl font-bold  hover:text-sky-600">Signup</div></TabsTrigger>

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
    </BackgroundBeamsWithCollision>
  );
}