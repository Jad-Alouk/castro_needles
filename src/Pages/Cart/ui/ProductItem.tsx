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
        <div className="my-3 flex w-full flex-col gap-6">
            <Item variant="outline" className="flex-wrap gap-3">
                <ItemMedia variant={"image"} className="size-16 shrink-0 sm:size-10">
                    <img
                        src={product?.imageUrl ?? placeholder}
                        alt={`${product?.sku ?? "product"}-img`}
                    />
                </ItemMedia>
                <ItemContent className="min-w-0 flex-1">
                    <ItemTitle className="whitespace-normal">{product.name}</ItemTitle>
                    <ItemDescription className="flex flex-col gap-2">
                        <span className="flex flex-wrap items-center gap-3">
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
                <ItemActions className="w-full shrink-0 sm:w-auto sm:ml-auto">
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
