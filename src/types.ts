import type { Id } from "../convex/_generated/dataModel"


export type Category = {
    _id: Id<"category">
    _creationTime: number
    desc?: string | undefined
    imageID?: Id<"_storage"> | undefined
    imageUrl: string | null
    name: string
    slug: string
}

export type Domain = {
    _id: Id<"domain">
    _creationTime: number
    name: string
    slug: string
}

export type Product = {
    _id: Id<"product">
    _creationTime: number
    desc?: string | undefined
    imageID?: string | undefined
    imageUrl: string | null
    name: string
    sku: string
    price: number
    quantity: number
    isFeatured: boolean
    color?: string
    categoryID: Id<"category">
    domainID: Id<"domain">
    typeID: Id<"type">
}

export type CartProduct = {
    _id: Id<"product">
    imageUrl: string | null
    name: string
    sku: string
    price: number
    quantity: number
    userQuantity: number
}
