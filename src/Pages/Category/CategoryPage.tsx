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
        <section className="w-full flex flex-col justify-center items-center">

            <div className="w-1/2 mb-5 flex justify-start items-center">
                <Image
                    src={data?.category.imageUrl}
                    alt={data?.category.slug}
                    size={"sm"} custom=""
                />
                <h1 className="text-2xl">{data?.category.name}</h1>
            </div>

            <FilterOpts opts={userFilters} setter={setUserFilters} />

            <div className="w-1/2 flex justify-between items-center flex-wrap">
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