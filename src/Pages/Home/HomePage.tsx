import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { FeaturedCard } from "./ui/FeaturedCard"


export const HomePage = () => {

    const ftProds = useQuery(api.product.getFeatured, {})

    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-4 px-4 py-6 sm:px-6">

            {
                ftProds?.map(
                    f =>
                        <FeaturedCard
                            key={f.category._id}
                            category={f.category}
                            products={f.products}
                        />
                )
            }

        </div>
    )

}