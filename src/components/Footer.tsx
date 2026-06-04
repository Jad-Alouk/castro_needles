import { BRAND } from "@/constants"


export const Footer = () => {

    return (
        <footer className="w-full flex-1 border-t bg-background/50">
            <div
                className="mx-auto max-w-7xl px-4 py-6 flex items-center justify-center text-sm text-muted-foreground"
            >
                <div>&copy; {new Date().getFullYear()} {BRAND.name}. All rights reserved.</div>
            </div>
        </footer>
    )

}