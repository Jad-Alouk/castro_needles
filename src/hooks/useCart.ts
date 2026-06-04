import { useLocalStorage } from "./useLocalStorage"
import type { Id } from "../../convex/_generated/dataModel"
import type { CartProduct, Product } from "@/types"


export const useCart = () => {

    const { storedData, setStoredData } = useLocalStorage<CartProduct[]>("cart", [])

    const currentCartItem = (productID: Id<"product">) => {
        return storedData.find(p => p._id === productID)
    }

    const inc = (productID: Id<"product">) => {
        const product = currentCartItem(productID)
        if (product) {
            setStoredData(prev =>
                prev.map(item =>
                    item._id === product._id && item.userQuantity < (product.quantity)
                        ? { ...item, userQuantity: item.userQuantity + 1 }
                        : item
                )
            )
        }
    }

    const dec = (productID: Id<"product">) => {
        const product = currentCartItem(productID)
        if (product) {
            setStoredData(prev =>
                prev.map(item =>
                    item._id === product._id && item.userQuantity > 1
                        ? { ...item, userQuantity: item.userQuantity - 1 }
                        : item
                )
            )
        }
    }

    const addToCart = (product: Partial<Product>, userQuantity?: number) => {

        if (!product || !userQuantity) return

        const { _id, name, price, quantity, sku, imageUrl } = product as CartProduct

        setStoredData(prev => {
            const exists = prev.some(item => item._id === _id)

            if (!exists) {
                return [...prev, { _id, name, price, quantity, sku, imageUrl, userQuantity }]
            }

            return prev.map(item =>
                item._id === _id
                    ? { ...item, userQuantity }
                    : item
            )
        })

    }

    const yeetFromCart = (productID: Id<"product">) => {
        const product = currentCartItem(productID)
        if (!product?._id) return
        setStoredData(prev => prev.filter(item => item._id !== product._id))
    }

    return {
        storedData,
        currentCartItem,
        addToCart,
        yeetFromCart,
        inc,
        dec
    }
}
