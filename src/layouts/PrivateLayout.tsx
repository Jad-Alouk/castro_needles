import { Outlet } from 'react-router-dom'
import { useConvexAuth } from 'convex/react'
import { SignIn } from '@/auth/SignIn'
import { SignOut } from '@/auth/SignOut'


export default function PrivateLayout() {

    const { isAuthenticated, isLoading } = useConvexAuth()

    if (isLoading) {
        return (
            <div className="flex h-screen w-screen items-center justify-center">
                <p>Loading admin panel...</p>
            </div>
        )
    }

    if (!isAuthenticated) {
        return <SignIn />
    }

    return (
        <main className="w-full flex flex-col">
            <div className="min-h-screen">
                <Outlet />
            </div>
            <SignOut />
        </main>
    )

}
