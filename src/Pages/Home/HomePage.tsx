import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import { FeaturedCard } from "./ui/FeaturedCard"


export const HomePage = () => {

    const ftProds = useQuery(api.product.getFeatured, {})

    return (
        <div className="w-full flex flex-col justify-center items-center">

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