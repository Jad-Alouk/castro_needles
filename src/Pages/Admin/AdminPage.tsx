import { useRef, useState } from "react"

import { useMutation, useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import type { Id } from "../../../convex/_generated/dataModel"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ProductItem } from "./ui/ProductItem"
import { ProductForm } from "./ui/ProductForm"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup, FieldLabel, FieldSet } from "@/components/ui/field"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types"
import { Image } from "@/components/Image"


type Order = { productID: Id<"product">, userQuantity: number }


export const AdminPage = () => {

    const generateUploadUrl = useMutation(api.media.generateUploadUrl)
    const addProd = useMutation(api.product.createNew)
    const orderProds = useMutation(api.product.authorizeOrder)
    const allProds = useQuery(api.product.collectAll, { andGrab: "media" })

    const fileInputRef = useRef<HTMLInputElement>(null)
    const [order, setOrder] = useState<(Partial<Product> & { userQuantity: number })[] | undefined>(undefined)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const file = fileInputRef.current?.files?.[0]
        let image = null

        if (file) {
            try {
                const uploadUrl = await generateUploadUrl()

                const result = await fetch(uploadUrl, {
                    method: "POST",
                    headers: { "Content-Type": file.type },
                    body: file
                })

                if (result.ok) {
                    const { storageId } = await result.json()
                    image = storageId
                }

            } catch (error) {
                console.error("Upload error:", error)
                return
            }
        }

        const {
            name, sku, desc,
            price, quantity, isFeatured, color,
            category, domain, type
        } = Object.fromEntries(formData.entries()) as {
            name: string, sku: string, desc: string,
            price: string, quantity: string, isFeatured: string, color: string,
            category: string, domain: string, type: string
        }

        await addProd({
            name, sku, desc: desc.length > 0 ? desc : undefined, color: color.length > 0 ? color : undefined,
            price: Number(price), quantity: Number(quantity),
            isFeatured: isFeatured ? true : false,
            categoryID: category as Id<"category">,
            domainID: domain as Id<"domain">,
            typeID: type as Id<"type">,
            imageID: image
        })

    }

    const authorizeOrder = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const rawOrd = formData.get("code") as string

        let ordCode: Record<string, number>[] | null = null

        try {
            ordCode = JSON.parse(rawOrd)
        } catch {
            console.log("Failed to parse order code.")
            return
        }

        if (ordCode) {

            let products: Order[] = []

            for (const entry of ordCode) {
                for (const key in entry) {
                    const productID = key as Id<"product">
                    const userQuantity = entry[key]

                    products.push({ productID, userQuantity })
                }
            }

            await orderProds({ products })
        }
    }


    const listOrderItems = (e: React.ChangeEvent<HTMLInputElement>) => {

        let orderItems: Record<string, number>[] | null = null

        try {
            orderItems = JSON.parse(e.target.value)
        } catch {
            console.log("Failed to parse order code.")
            return
        }

        if (orderItems) {
            const parsedItems = [] as (Partial<Product> & { userQuantity: number })[]

            for (const entry of orderItems) {
                for (const key in entry) {
                    const product = allProds?.find(p => p._id === key)
                    if (product) {
                        parsedItems.push({ ...product, userQuantity: entry[key] })
                    }
                }
            }

            setOrder(parsedItems)
        }
    }

    return (
        <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-6 sm:px-6">
            <Tabs defaultValue="createNew" className="flex w-full flex-col items-center">

                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="createNew">Create New</TabsTrigger>
                    <TabsTrigger value="products">Products</TabsTrigger>
                    <TabsTrigger value="orders">Orders</TabsTrigger>
                </TabsList>

                <TabsContent value="createNew" className="w-full">
                    <form
                        onSubmit={handleSubmit}
                        className="flex w-full flex-col items-center"
                    >
                        <ProductForm preLoadedData={null} fileInputRef={fileInputRef} />
                    </form>
                </TabsContent>

                <TabsContent value="products" className="w-full">
                    {allProds?.map(p => <ProductItem key={p._id} product={p} />)}
                </TabsContent>

                <TabsContent value="orders" className="w-full">
                    <form
                        onSubmit={authorizeOrder}
                        className="my-5 flex w-full flex-col items-center"
                    >
                        <FieldSet className="w-full">
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor="code">Order Code</FieldLabel>
                                    <Input
                                        id="code"
                                        name="code"
                                        autoComplete="off"
                                        onChange={(e) => listOrderItems(e)}
                                    />
                                </Field>

                                {
                                    order?.map(
                                        ord => <div key={ord._id} className="flex flex-col gap-2 border-b py-3 sm:flex-row sm:items-center sm:justify-between">
                                            <div className="flex min-w-0 items-center gap-3">
                                                <Image src={ord.imageUrl} alt={ord.sku} size={"sm"} />
                                                <span className="truncate">{ord.name}</span>
                                            </div>
                                            <span className="shrink-0 text-muted-foreground">Qty: {ord.userQuantity}</span>
                                        </div>
                                    )
                                }

                                <Button className="w-full sm:w-auto">Authorize Order</Button>
                            </FieldGroup>
                        </FieldSet>
                    </form>
                </TabsContent>

            </Tabs>
        </div>
    )

}