import Image from "next/image";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export default function Home() {
  return (
    <BackgroundBeamsWithCollision className="min-h-screen w-full">
      {/* 
          flex-col: Stacked on mobile 
          md:flex-row: Side-by-side on tablets/desktops 
      */}
      <div className="flex flex-col md:flex-row w-full h-full bg-linear-to-br from-[rgb(227,229,230)] to-[rgb(233,227,207)]">
        
        {/* Left Side: Company Info & Photo */}
        {/* w-full on mobile, md:w-1/5 (20%) on desktop */}
        <div className="w-full md:w-2/5 flex flex-col p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/10 z-10">
          <div className="mb-6 md:mb-8">
            <h1 className="text-xl font-bold text-white">LOGO</h1>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            {/* 
                On mobile, we make the photo a bit smaller/centered.
                On desktop, it fills the 20% width.
            */}
            <div className="relative w-32 h-full md:w-full md:aspect-3/4 rounded-full md:rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20">
              <Image 
                src="/login_page.jpg" 
                alt="Doctor Portrait"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="text-center md:text-left mt-4">
              <p className="text-sm text-gray-300">
                Trusted healthcare solutions.
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Login Content */}
        {/* w-full on mobile, md:w-4/5 (80%) on desktop */}
        <div className="w-full md:w-4/5 flex grow items-center justify-center p-6    backdrop-blur-xs">
          <div className="max-w-md w-full p-8 bg-white rounded-3xl shadow-xl">
             <h2 className="text-2xl font-semibold text-gray-800">Welcome Back</h2>
             {/* Form goes here */}
          </div>
        </div>

      </div>
    </BackgroundBeamsWithCollision>
  );
}