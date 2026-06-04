import { Link } from "react-router-dom"
import type { Product } from "../types"
import { Image } from "./Image"


export const ProductCard = ({ product }: { product: Product }) => {

    return (
        <Link to={`/p/${product._id}`}>

            <div className="flex flex-col justify-center items-center cursor-pointer">

                <Image src={product.imageUrl} alt={product.sku} size={"md"} />

                <div className="my-2">
                    <p className="text-base mb-2">{product.name}</p>
                    <p className="text-base">{`$${product.price.toFixed(2)}`}</p>
                </div>

            </div>

        </Link>
    )

}