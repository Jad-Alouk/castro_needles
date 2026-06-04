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
        <div className="flex w-full my-3 max-w-md flex-col gap-6">
            <Item variant="outline">
                <ItemMedia variant={"image"}>
                    <img
                        src={product.imageUrl ?? placeholder}
                        alt={`${product.sku ?? "product"}-img`}
                    />
                </ItemMedia>
                <ItemContent>
                    <Link to={`/admin/p/${product._id}`}>
                        <ItemTitle>{product.name}</ItemTitle>
                        <ItemDescription className="flex flex-col">
                            <span className="flex items-center gap-3">
                                <span>Stock: {product.quantity}</span>
                                <span>Price: {product.price}</span>
                            </span>
                        </ItemDescription>
                    </Link>
                </ItemContent>
                <ItemActions>
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
