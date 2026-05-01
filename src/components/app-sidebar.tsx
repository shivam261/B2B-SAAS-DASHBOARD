"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { Activity, LayoutDashboard,BarChart3, User2 ,Settings,LogOut,ChevronUp} from "lucide-react"
import { Button } from "./ui/button"
import {usePathname , useRouter} from "next/navigation"
import {app,auth,signOut} from "@/lib/firebase"
import {useState,useEffect}from "react"
export function AppSidebar() {

  const pathname = usePathname();
const router=useRouter();
const [user, setUser] = useState<string>("");
useEffect(()=>{
    const unsubscribe=auth.onAuthStateChanged((user)=>{
        if(user){
            setUser(user.email||"Unknown User")
        }else{
            router.push("/")
        }
    })
    return ()=>unsubscribe();
},[auth]);
const handleLogout=()=>{
    signOut(auth).then(()=>{
        router.push("/")
    }).catch((error)=>{
        console.error("Logout Error:",error);
    })
}   
  return (
    <Sidebar>
      <SidebarHeader >
              <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-blue-600 text-white shadow-lg">
                <Activity className="size-6" />
              </div>
        
              {/* Brand Text */}
              <div className="flex flex-col gap-0.5 leading-none">
                <span className="font-bold text-2xl tracking-tight text-foreground">
                  Health<span className="text-blue-600"> CARE</span>
                </span>
                <span className="text-xs font-medium text-muted-foreground">
                  B2B Enterprise{pathname}
                </span>
              </div>
        </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
            <SidebarGroup >
             <SidebarGroupLabel className="flex items-center justify-center h-12 mb-2 my-10">
<h1 className="font-bold text-2xl tracking-tight text-slate-900">
  Hi,{" "}
  <span className="bg-linear-to-r from-slate-900 to-indigo-700 bg-clip-text text-transparent uppercase">
    {user.split("@")[0]}
  </span>
</h1>  
</SidebarGroupLabel>
  <SidebarGroupAction>
 <span className="sr-only">Add Project</span>
  </SidebarGroupAction>
  <SidebarGroupContent>
<div className="flex flex-col gap-4 text-xl">
  <Link href="/dashboard" 
className={`
        relative flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ease-in-out
        ${pathname === "/dashboard" 
          ? "bg-slate-600/10 text-black font-bold shadow-[0_4px_12px_rgba(0,0,0,0.08)] -translate-y-0.5" 
          : "text-slate-600 hover:bg-white/50 hover:text-black hover:-translate-y-0.5"
        }
      `}
  >
    <LayoutDashboard className="h-4 w-4" />
    <span className="">Dashboard</span>
  </Link>
  <Link href="/dashboard/analytics" className={`
        relative flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ease-in-out
        ${pathname === "/dashboard/analytics" 
          ? "bg-slate-600/10 text-black font-bold shadow-[0_4px_12px_rgba(0,0,0,0.08)] -translate-y-0.5" 
          : "text-slate-600 hover:bg-white/50 hover:text-black hover:-translate-y-0.5"
        }
      `}>
    <BarChart3 className="h-4 w-4" />
    <span className="">Analytics </span>
  </Link>
  <Link href="/dashboard/patient" className={`
        relative flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ease-in-out
        ${pathname === "/dashboard/patient" 
          ? "bg-slate-600/10 text-black font-bold shadow-[0_4px_12px_rgba(0,0,0,0.08)] -translate-y-0.5" 
          : "text-slate-600 hover:bg-white/50 hover:text-black hover:-translate-y-0.5"
        }
      `}>
    <Activity className="h-4 w-4" />
    <span className="">Patients</span>
  </Link>
</div>

  </SidebarGroupContent>
            </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        
        
    <SidebarMenu>
      <SidebarMenuItem>
<SidebarMenuButton
            size="lg"
            className="
              w-full h-auto flex items-center gap-3 p-2 rounded-xl
              transition-all duration-200 
              hover:bg-white hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] 
              hover:-translate-y-0.5 group
              cursor-pointer
            "
          >

            {/* Optional: Indicator for a dropdown menu */}

<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <div  className="w-auto flex flex-row items-center gap-3 p-2 rounded-xl transition-all duration-200 hover:bg-white hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 group cursor-pointer">
                    {/* User Avatar Container */}
            <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-sky-500 text-white group-hover:bg-sky-600 group-hover:text-white transition-colors">
              <User2 className="size-6 " />
            </div>

            {/* User Information */}
            <div className="flex flex-col items-start overflow-hidden">
              <span className="truncate text-sm font-semibold text-foreground">
                {user.split("@")[0]}
              </span>
                <span className="truncate text-xs text-muted-foreground">
                    {user}
                </span>
            </div>
      <ChevronUp className="ml-auto size-4 text-muted-foreground" ></ChevronUp>
        </div>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuGroup>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Billing</DropdownMenuItem>

    </DropdownMenuGroup>
    <DropdownMenuSeparator />
    <DropdownMenuGroup>
      <DropdownMenuItem>Team</DropdownMenuItem>

      <DropdownMenuItem className="text-red-600 cursor-pointer" onClick={handleLogout}>
        <span>Log Out</span>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>


          </SidebarMenuButton>
    
      </SidebarMenuItem>

    </SidebarMenu>  
        </SidebarFooter>
    </Sidebar>
  )
}