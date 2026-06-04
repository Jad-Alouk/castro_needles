import type { Category, Product } from "../../../types"
import { ProductCard } from "../../../components/ProductCard"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom"


export const FeaturedCard = (
    { category, products }: { category: Category, products: Product[] }
) => {

    return (
        <Card className="my-3 w-full max-w-4xl">

            <Link to={`/c/${category.slug}`}>

                <CardHeader className="m-2 p-3 hover:bg-gray-50">
                    <CardTitle className="text-lg sm:text-xl">{category.name}</CardTitle>
                </CardHeader>

            </Link>

            <CardContent className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 justify-items-center">
                {products?.map(p => <ProductCard key={p._id} product={p} />)}
            </CardContent>

            <CardFooter>
                <Link className="w-full text-center" to={`/c/${category.slug}`}>View more</Link>
            </CardFooter>

        </Card>
    )

}
