import { useState } from "react"

import { useParams } from "react-router-dom"
import { useCart } from "@/hooks/useCart"

import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import type { Id } from "../../../convex/_generated/dataModel"

import { Button } from "@/components/ui/button"
import placeholder from "@/assets/product-placeholder.webp"


export const ProductPage = () => {

    const { id } = useParams()
    const product = useQuery(api.product.getOneByID, { prodID: id as Id<"product"> })

    const [userQuantity, setUserQuantity] = useState(1)
    const { addToCart } = useCart()

    const inc = () => {
        if (product) {
            if (userQuantity < product.quantity!) {
                setUserQuantity(p => p + 1)
            }
        }
    }

    const dec = () => {
        if (userQuantity > 1) {
            setUserQuantity(p => p - 1)
        }

    }

    return (
        <main className="mx-auto max-w-7xl px-4 py-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

                <div className="md:col-span-1 flex items-start">
                    <img
                        className="w-full rounded-lg object-cover"
                        src={product?.imageUrl ?? placeholder}
                        alt={`${product?.sku ?? "product"}-img`}
                    />
                </div>

                <div className="md:col-span-2 flex flex-col gap-4">

                    <h1 className="text-2xl font-heading font-semibold">{product?.name ?? "Product"}</h1>
                    <div className="text-muted-foreground">SKU: {product?.sku ?? "—"}</div>

                    <p className="text-base text-foreground/90">{product?.desc ?? "No description provided."}</p>

                    <div className="flex items-center gap-4">
                        <div className="text-2xl font-medium">${product?.price?.toFixed(2) ?? "0.00"}</div>
                        <div className="text-sm text-muted-foreground">{product?.quantity ?? 0} in stock</div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Button variant={"secondary"} onClick={dec}>
                            {`-`}
                        </Button>
                        <span>{userQuantity}</span>
                        <Button variant={"secondary"} onClick={inc}>
                            {`+`}
                        </Button>
                        {
                            product &&
                            <Button onClick={() => addToCart(product, userQuantity)}>
                                Add to cart
                            </Button>
                        }
                    </div>

                    <div className="mt-4 text-sm text-muted-foreground">Color: {product?.color ?? "N/A"}</div>
                </div>
            </div>
        </main>
    )

}