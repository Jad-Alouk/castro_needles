import { useRef } from "react"
import { useParams } from "react-router-dom"

import { useMutation, useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"
import type { Id } from "../../../convex/_generated/dataModel"

import { ProductForm } from "./ui/ProductForm"


export const EditorPage = () => {

    const { id } = useParams()
    const product = useQuery(api.product.getOneByID, { prodID: id as Id<"product"> })

    const generateUploadUrl = useMutation(api.media.generateUploadUrl)
    const deleteOldImage = useMutation(api.media.deleteFile)

    const updateProd = useMutation(api.product.updateOneByID)

    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        if (!product) return

        const formData = new FormData(e.currentTarget)
        const file = fileInputRef.current?.files?.[0]
        let image = product.imageID

        if (file) {
            try {
                const uploadUrl = await generateUploadUrl()

                if (product.imageID) {
                    await deleteOldImage({ imageID: product.imageID })
                }

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
            name, sku, desc, color,
            price, quantity, isFeatured,
            category, domain, type
        } = Object.fromEntries(formData.entries()) as {
            name: string, sku: string, desc: string,
            price: string, quantity: string, isFeatured: string, color: string
            category: string, domain: string, type: string
        }

        if (product) {
            await updateProd({
                prodID: product._id as Id<"product">,
                name, sku, desc: desc.length > 0 ? desc : undefined, color: color.length > 0 ? color : undefined,
                price: Number(price), quantity: Number(quantity),
                isFeatured: isFeatured ? true : false,
                categoryID: category as Id<"category">,
                domainID: domain as Id<"domain">,
                typeID: type as Id<"type">,
                imageID: image
            })
        }

    }

    return (
        <form
            onSubmit={handleSubmit}
            className="my-5 flex flex-col justify-center items-center"
        >
            {
                product === undefined
                    ? <p>Fetching data...</p>
                    : <ProductForm preLoadedData={product} fileInputRef={fileInputRef} />
            }
        </form>
    )
}