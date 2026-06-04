import { Button } from "@/components/ui/button"
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"

import placeholder from "@/assets/product-placeholder.webp"
import type { CartProduct } from "@/types"
import type { Id } from "../../../../convex/_generated/dataModel"


export const ProductItem = (
    { product, currentCartItem, onRemove, onInc, onDec }: {
        product: CartProduct
        currentCartItem: (productID: Id<"product">) => CartProduct | undefined
        onRemove: (productID: Id<"product">) => void
        onInc: (productID: Id<"product">) => void
        onDec: (productID: Id<"product">) => void
    }
) => {


    return (
        <div className="flex w-full my-3 max-w-md flex-col gap-6">
            <Item variant="outline">
                <ItemMedia variant={"image"}>
                    <img
                        src={product?.imageUrl ?? placeholder}
                        alt={`${product?.sku ?? "product"}-img`}
                    />
                </ItemMedia>
                <ItemContent>
                    <ItemTitle>{product.name}</ItemTitle>
                    <ItemDescription className="flex flex-col">
                        <span className="flex items-center gap-3">
                            <Button variant={"secondary"} onClick={() => onDec(product._id)}>
                                {`-`}
                            </Button>
                            <span>{currentCartItem(product._id)?.userQuantity}</span>
                            <Button variant={"secondary"} onClick={() => onInc(product._id)}>
                                {`+`}
                            </Button>
                        </span>
                        <span>{`Amount: $${(currentCartItem(product._id)?.userQuantity! * product.price).toFixed(2)}`}</span>
                    </ItemDescription>
                </ItemContent>
                <ItemActions>
                    <Button
                        className="bg-red-500 text-white"
                        variant="outline" size="sm"
                        onClick={() => onRemove(product._id)}
                    >
                        X
                    </Button>
                </ItemActions>
            </Item>
        </div>
    )

}
