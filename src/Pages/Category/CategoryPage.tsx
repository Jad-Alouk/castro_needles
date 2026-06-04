import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"

import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"

import { FilterOpts } from "./ui/FilterOpts"
import { ProductCard } from "@/components/ProductCard"
import { Image } from "@/components/Image"


export const CategoryPage = () => {

    const [searchParams] = useSearchParams()
    const searchQuery = searchParams.get("f")

    const { slug } = useParams()
    const data = useQuery(api.product.getAllByCategorySlug, { categorySlug: slug ?? "" })

    const [userFilters, setUserFilters] = useState<string[]>([])

    useEffect(() => {
        if (searchQuery) {
            setUserFilters([searchQuery])
        }
    }, [searchQuery])

    return (
        <section className="mx-auto flex w-full max-w-7xl flex-col items-center gap-6 px-4 py-6 sm:px-6">

            <div className="flex w-full items-center gap-4">
                <Image
                    src={data?.category.imageUrl}
                    alt={data?.category.slug}
                    size={"sm"} custom="shrink-0 border-2 rounded-md"
                />
                <h1 className="text-xl font-semibold sm:text-2xl">{data?.category.name}</h1>
            </div>

            <FilterOpts opts={userFilters} setter={setUserFilters} />

            <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 justify-items-center">
                {
                    data?.products.map(p => {
                        if (!userFilters.length) {
                            return <ProductCard key={p._id} product={p} />
                        }

                        const domain = p.domain?.name
                        if (domain) {
                            return userFilters.includes(domain.toLowerCase())
                                ? <ProductCard key={p._id} product={p} />
                                : null
                        }
                    }
                    )
                }
            </div>

        </section>
    )

}