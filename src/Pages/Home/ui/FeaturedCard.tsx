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
        <Card className="w-2/3 my-3">

            <Link to={`/c/${category.slug}`}>

                <CardHeader className="hover:bg-gray-50 p-3 m-2">
                    <CardTitle className="text-xl">{category.name}</CardTitle>
                </CardHeader>

            </Link>

            <CardContent className="flex justify-between items-center">
                {products?.map(p => <ProductCard key={p._id} product={p} />)}
            </CardContent>

            <CardFooter>
                <Link className="w-full text-center" to={`/c/${category.slug}`}>View more</Link>
            </CardFooter>

        </Card>
    )

}
