import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"

import placeholder from "@/assets/product-placeholder.webp"
import type { Product } from "@/types"
import { Link } from "react-router-dom"
import ConfirmBtn from "@/components/ConfirmBtn"
import { useMutation } from "convex/react"
import { api } from "../../../../convex/_generated/api"


export const ProductItem = ({ product }: { product: Partial<Product> }) => {

    const nukeProd = useMutation(api.product.deleteProductByID)

    return (
        <div className="my-3 flex w-full flex-col gap-6">
            <Item variant="outline" className="flex-wrap gap-3">
                <ItemMedia variant={"image"} className="size-16 shrink-0 sm:size-10">
                    <img
                        src={product.imageUrl ?? placeholder}
                        alt={`${product.sku ?? "product"}-img`}
                    />
                </ItemMedia>
                <ItemContent className="min-w-0 flex-1">
                    <Link to={`/admin/p/${product._id}`}>
                        <ItemTitle className="whitespace-normal">{product.name}</ItemTitle>
                        <ItemDescription className="flex flex-col">
                            <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                <span>Stock: {product.quantity}</span>
                                <span>Price: {product.price}</span>
                            </span>
                        </ItemDescription>
                    </Link>
                </ItemContent>
                <ItemActions className="w-full shrink-0 sm:w-auto sm:ml-auto">
                    <ConfirmBtn
                        action={async () => await nukeProd({ productID: product._id! })}
                        actionName="Delete"
                        options={{ A: "Confirm", B: "Cancel" }}
                        item={product.name!}
                    />
                </ItemActions>
            </Item>
        </div>
    )

}
