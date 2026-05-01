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

export function AppSidebar() {
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
                  B2B Enterprise
                </span>
              </div>
        </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
            <SidebarGroup >
             <SidebarGroupLabel className="flex items-center justify-center h-12 mb-2">
  <span className="font-semibold text-4xl text-foreground">
    Manage
  </span>
</SidebarGroupLabel>
  <SidebarGroupAction>
 <span className="sr-only">Add Project</span>
  </SidebarGroupAction>
  <SidebarGroupContent>
<div className="flex flex-col gap-4 text-xl">
  <Link href="/dashboard" className="
    flex items-center gap-3 px-3 py-2 rounded-lg
    text-slate-600 transition-all duration-200 ease-in-out
    hover:bg-white hover:text-black hover:font-heading
    hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] 
    hover:-translate-y-0.5
    active:translate-y-0 active:shadow-inner
  ">
    <LayoutDashboard className="h-4 w-4" />
    <span className="">Dashboard</span>
  </Link>
  <Link href="/analytics" className="
    flex items-center gap-3 px-3 py-2 rounded-lg
    text-slate-600 transition-all duration-200 ease-in-out
    hover:bg-white  hover:text-black hover:font-heading
    hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] 
    hover:-translate-y-0.5
    active:translate-y-0 active:shadow-inner
  ">
    <BarChart3 className="h-4 w-4" />
    <span className="">Analytics </span>
  </Link>
  <Link href="/patients" className="
    flex items-center gap-3 px-3 py-2 rounded-lg
    text-slate-600 transition-all duration-200 ease-in-out
    hover:bg-white hover:text-black hover:font-heading
    hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] 
    hover:-translate-y-0.5
    active:translate-y-0 active:shadow-inner
  ">
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
            "
          >
            {/* User Avatar Container */}
            <div className="flex aspect-square size-10 items-center justify-center rounded-lg bg-slate-200 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
              <User2 className="size-6" />
            </div>

            {/* User Information */}
            <div className="flex flex-col items-start overflow-hidden">
              <span className="truncate text-sm font-semibold text-foreground">
                Shivam Tripathi
              </span>
              <span className="truncate text-xs text-muted-foreground">
                shivam@healthsync.com
              </span>
            </div>

            {/* Optional: Indicator for a dropdown menu */}
            <ChevronUp className="ml-auto size-4 text-muted-foreground" >

            </ChevronUp>
          </SidebarMenuButton>
    
      </SidebarMenuItem>
<SidebarMenuItem>
                              <DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="outline" className="w-full">
      ACTIONS
        </Button>
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
      <DropdownMenuItem>Subscription</DropdownMenuItem>
    </DropdownMenuGroup>
  </DropdownMenuContent>
</DropdownMenu>
</SidebarMenuItem>
    </SidebarMenu>  
        </SidebarFooter>
    </Sidebar>
  )
}