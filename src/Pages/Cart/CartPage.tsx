import { useState } from "react"
import { useCart } from "@/hooks/useCart"
import { ProductItem } from "./ui/ProductItem"
import { Button } from "@/components/ui/button"


export const CartPage = () => {

    const {
        storedData,
        currentCartItem, yeetFromCart,
        inc, dec
    } = useCart()

    const [order, setOrder] = useState(false)
    const [error, setError] = useState(false)

    const totalPrice = storedData.reduce((acc, item) => acc + (item.price * item.userQuantity), 0)

    const orderCodeGenerator = () => {
        const items = storedData.map(p => ({ [p._id]: p.userQuantity }))

        navigator.clipboard.writeText(JSON.stringify(items))
            .then(() => {
                setOrder(true)

            })
            .catch(err => {
                setError(true)
                console.error("Failed to copy text: ", err)
            }).finally(() => setTimeout(() => {
                setOrder(false)
                setError(false)
            }, 3000))
    }

    return (
        <div className="mx-auto flex w-full max-w-2xl flex-col items-center gap-4 px-4 py-6 sm:px-6">

            {storedData.map(p => (
                <ProductItem
                    key={p._id}
                    product={p}
                    currentCartItem={currentCartItem}
                    onRemove={yeetFromCart}
                    onInc={inc}
                    onDec={dec}
                />
            ))}

            <div
                className="flex w-full items-center justify-between border-t pt-4 font-bold text-lg sm:text-xl"
            >
                <span>Total:</span>
                <span>${totalPrice.toFixed(2)}</span>
            </div>

            {
                storedData.length
                    ? <Button onClick={orderCodeGenerator}>Generate Order Code</Button>
                    : null
            }

            {
                order
                    ? <p className="text-green-500">Order code copied successfully!</p>
                    : error
                        ? <p className="text-red-500">Failed to copy order code: </p>
                        : null
            }

        </div>
    )

}
