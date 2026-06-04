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
        <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

                <div className="flex items-start md:col-span-1">
                    <img
                        className="mx-auto w-full max-w-sm rounded-lg object-cover md:mx-0"
                        src={product?.imageUrl ?? placeholder}
                        alt={`${product?.sku ?? "product"}-img`}
                    />
                </div>

                <div className="flex flex-col gap-4 md:col-span-2">

                    <h1 className="text-xl font-heading font-semibold sm:text-2xl">{product?.name ?? "Product"}</h1>
                    <div className="text-sm text-muted-foreground sm:text-base">SKU: {product?.sku ?? "—"}</div>

                    <p className="text-sm text-foreground/90 sm:text-base">{product?.desc ?? "No description provided."}</p>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                        <div className="text-xl font-medium sm:text-2xl">${product?.price?.toFixed(2) ?? "0.00"}</div>
                        <div className="text-sm text-muted-foreground">{product?.quantity ?? 0} in stock</div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                        <Button variant={"secondary"} onClick={dec}>
                            {`-`}
                        </Button>
                        <span>{userQuantity}</span>
                        <Button variant={"secondary"} onClick={inc}>
                            {`+`}
                        </Button>
                        {
                            product &&
                            <Button className="w-full sm:w-auto" onClick={() => addToCart(product, userQuantity)}>
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