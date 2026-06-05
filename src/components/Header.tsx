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

    console.log("search", search)
    console.log("debounce", debouncedSearch)
    console.log("suggestions", suggestions)

    return (
        <header className="w-full sticky top-0 z-50 border-b bg-background/70 backdrop-blur-sm">
            <div className="mx-auto max-w-7xl px-4 py-3 flex justify-between items-center gap-4 relative">

                <div className="flex items-center gap-3">
                    <SidebarTrigger />
                </div>

                <div className="max-w-xl flex-1 relative">
                    <input
                        placeholder="Search products..."
                        className="w-full rounded-md border bg-input/50 px-3 py-2 text-sm focus:outline-none"
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />

                    {debouncedSearch && (
                        <div className="absolute left-0 right-0 top-full mt-1 w-full bg-white border rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
                            {!suggestions ? (
                                <div className="px-4 py-3 text-sm text-gray-500">Searching...</div>
                            ) : Array.isArray(suggestions) && suggestions.length > 0 ? (
                                <ul className="flex flex-col divide-y divide-gray-100">
                                    {suggestions.map((s) => (
                                        <li key={s._id}>
                                            <Link
                                                to={`/p/${s._id}`}
                                                className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                                                onClick={() => setSearch("")}
                                            >
                                                {s.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="px-4 py-3 text-sm text-gray-500">
                                    No products found for "{debouncedSearch}"
                                </div>
                            )}
                        </div>
                    )}
                </div>

                <Link to="/cart">
                    <Button>Cart</Button>
                </Link>

            </div>
        </header>
    )

}