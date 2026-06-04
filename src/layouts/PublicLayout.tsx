import { AppSidebar } from "@/components/app-sidebar"
import { Footer } from "@/components/Footer"
import { Header } from "@/components/Header"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"


export default function PublicLayout() {

    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full flex flex-col">
                <div className="min-h-screen">
                    <Header />
                    <Outlet />
                </div>
                <Footer />
            </main>
        </SidebarProvider>
    )

}