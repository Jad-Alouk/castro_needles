import { Link } from "react-router-dom"
import type { Product } from "../types"
import { Image } from "./Image"


export const ProductCard = ({ product }: { product: Product }) => {

    return (
        <Link to={`/p/${product._id}`}>

            <div className="flex w-full max-w-[9rem] flex-col items-center justify-center cursor-pointer sm:max-w-none">

                <Image src={product.imageUrl} alt={product.sku} size={"md"} />

                <div className="my-2 w-full px-1 text-center">
                    <p className="mb-2 line-clamp-2 text-sm sm:text-base">{product.name}</p>
                    <p className="text-sm sm:text-base">{`$${product.price.toFixed(2)}`}</p>
                </div>

            </div>

        </Link>
    )

}