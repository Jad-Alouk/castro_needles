import { Link } from "react-router-dom"
import { SidebarTrigger } from "./ui/sidebar"
import { Button } from "./ui/button"
import { useDebounce } from "@/hooks/useDebounce"
import { useState } from "react"
import { useQuery } from "convex/react"
import { api } from "../../convex/_generated/api"


export const Header = () => {

    const [search, setSearch] = useState("")
    const debouncedSearch = useDebounce(search, 200)
    const suggestions = useQuery(api.product.searchKeywords, { searchTerm: debouncedSearch })

    return (
        <header className="w-full sticky top-0 z-50 border-b bg-background/70 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4 py-3 flex justify-between items-center gap-4">

                <div className="flex items-center gap-3">
                    <SidebarTrigger />
                </div>

                <div className="max-w-xl flex-1">
                    <input
                        placeholder="Search products..."
                        className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm focus:outline-none"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                </div>

                <Link to="/cart">
                    <Button>Cart</Button>
                </Link>

            </div>

            {
                suggestions && suggestions.length
                    ? <ul className="px-4 py-3 flex flex-col">
                        {
                            suggestions.map(
                                s => <Link
                                    key={s._id} to={`/p/${s._id}`}
                                    className="hover:bg-gray-100"
                                    onClick={() => setSearch("")}
                                >
                                    {s.name}
                                </Link>)
                        }
                    </ul>
                    : null
            }

        </header>
    )

}