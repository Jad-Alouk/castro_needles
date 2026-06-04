import { Link } from "react-router-dom"

import {
    ChevronDown,
    Home,
    Info,
    Folder
} from "lucide-react"

import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import { BRAND, STATIC_CATEGORIES, STATIC_DOMAINS } from "@/constants"


export function AppSidebar() {

    return (
        <Sidebar>
            {/* HEADER */}
            <SidebarHeader className="border-b">
                <div className="flex items-center gap-3 px-2 py-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted">
                        <Folder className="h-5 w-5" />
                    </div>

                    <div className="flex flex-col">
                        <span className="text-sm font-semibold">
                            {BRAND.name}
                        </span>

                        <span className="text-xs text-muted-foreground">
                            {BRAND.title}
                        </span>
                    </div>
                </div>
            </SidebarHeader>

            {/* MAIN CONTENT */}
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {/* HOME */}
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/">
                                        <Home />
                                        <span>Home</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>

                            {/* Categories */}
                            {
                                STATIC_CATEGORIES?.map(
                                    c => (
                                        <Collapsible key={c.name} className="group/collapsible">
                                            <SidebarMenuItem>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton>
                                                        <Link to={`/c/${c.slug}`}>
                                                            <span>{c.name}</span>
                                                        </Link>

                                                        <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                            </SidebarMenuItem>

                                            <CollapsibleContent>
                                                <SidebarMenu className="ml-4 mt-1">

                                                    {
                                                        STATIC_DOMAINS.map(
                                                            d => (
                                                                <SidebarMenuItem key={d.name}>
                                                                    <SidebarMenuButton asChild>
                                                                        <Link to={`/c/${c.slug}?f=${d.slug}`}>
                                                                            <span>{d.name}</span>
                                                                        </Link>
                                                                    </SidebarMenuButton>
                                                                </SidebarMenuItem>
                                                            )
                                                        )
                                                    }

                                                </SidebarMenu>
                                            </CollapsibleContent>
                                        </Collapsible>
                                    )
                                )
                            }

                            {/* ABOUT */}
                            <SidebarMenuItem>
                                <SidebarMenuButton asChild>
                                    <Link to="/about">
                                        <Info />
                                        <span>About</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>

            {/* FOOTER */}
            {/* <SidebarFooter className="border-t">
                <div className="px-2 py-3">
                    <div className="rounded-lg border p-3">
                        <p className="text-sm font-medium">
                            {BRAND.title}
                        </p>

                        <p className="text-xs text-muted-foreground">
                            {BRAND.title}
                        </p>
                    </div>
                </div>
            </SidebarFooter> */}
        </Sidebar>
    )
}