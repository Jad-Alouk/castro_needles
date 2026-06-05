import { mutation, query } from "./_generated/server"
import { getAuthUserId } from "@convex-dev/auth/server"
import { v } from "convex/values"


export const getFeatured = query({

    args: { limit: v.optional(v.number()) },

    handler: async (ctx, args) => {

        const allCategories = await ctx.db.query("category").collect()

        const group = await Promise.all(
            allCategories.map(async c => {

                const products = await ctx.db
                    .query("product")
                    .withIndex(
                        "by_featured_category",
                        q => q.eq("categoryID", c._id).eq("isFeatured", true)
                    )
                    .take(args.limit ?? 4)

                const productsWithMedia = await Promise.all(
                    products.map(async p => ({
                        ...p,
                        imageUrl: p.imageID ? await ctx.storage.getUrl(p.imageID) : null
                    }))
                )

                const categoryWithMedia = {
                    ...c,
                    imageUrl: c.imageID ? await ctx.storage.getUrl(c.imageID) : null
                }

                return {
                    category: categoryWithMedia,
                    products: productsWithMedia,
                }
            })
        )

        return group.filter(g => g.products.length > 0)

    }

})

export const getAllByCategoryID = query({

    args: { categoryID: v.id("category") },

    handler: async (ctx, { categoryID }) => {

        const category = await ctx.db
            .query("category")
            .withIndex("by_id", q => q.eq("_id", categoryID))
            .first()

        const categoryImage =
            category?.imageID
                ? await ctx.storage.getUrl(category.imageID)
                : null

        const products = await ctx.db
            .query("product")
            .withIndex("by_categoryID", q => q.eq("categoryID", categoryID))
            .collect()

        const productsWithMeta = await Promise.all(
            products.map(async p => ({
                ...p,
                domain: await ctx.db.query("domain").withIndex("by_id", q => q.eq("_id", p.domainID)).first(),
                imageUrl: p.imageID ? await ctx.storage.getUrl(p.imageID) : null
            }))
        )

        return {
            category: { imageUrl: categoryImage, ...category },
            products: productsWithMeta
        }

    }

})

export const getAllByCategorySlug = query({

    args: { categorySlug: v.string() },

    handler: async (ctx, { categorySlug }) => {

        const category = await ctx.db
            .query("category")
            .withIndex("by_slug", q => q.eq("slug", categorySlug))
            .first()

        const categoryImage =
            category?.imageID
                ? await ctx.storage.getUrl(category.imageID)
                : null

        const products = await ctx.db
            .query("product")
            .withIndex("by_categoryID", q => q.eq("categoryID", category!._id))
            .collect()

        const productsWithMeta = await Promise.all(
            products.map(async p => ({
                ...p,
                domain: await ctx.db.query("domain").withIndex("by_id", q => q.eq("_id", p.domainID)).first(),
                imageUrl: p.imageID ? await ctx.storage.getUrl(p.imageID) : null
            }))
        )

        return {
            category: { imageUrl: categoryImage, ...category },
            products: productsWithMeta
        }

    }

})

export const getOneByID = query({

    args: { prodID: v.id("product") },

    handler: async (ctx, { prodID }) => {

        const prod = await ctx.db
            .query("product")
            .withIndex("by_id", q => q.eq("_id", prodID))
            .first()

        const imageUrl = prod?.imageID ? await ctx.storage.getUrl(prod.imageID) : null

        return { ...prod, imageUrl }

    }

})

export const collectAll = query({

    args: { andGrab: v.optional(v.string()) },

    handler: async (ctx, { andGrab }) => {

        const plainProductData = await ctx.db.query("product").collect()

        if (andGrab === "media") {
            return await Promise.all(
                plainProductData.map(
                    async p => ({
                        ...p,
                        imageUrl: p.imageID ? await ctx.storage.getUrl(p.imageID) : null
                    })
                ))
        }

        return plainProductData

    }

})

export const createNew = mutation({

    args: {
        name: v.string(),
        sku: v.string(),
        desc: v.optional(v.string()),
        price: v.number(),
        quantity: v.number(),
        isFeatured: v.boolean(),
        color: v.optional(v.string()),
        categoryID: v.id("category"),
        domainID: v.id("domain"),
        typeID: v.id("type"),
        imageID: v.optional(v.id("_storage"))
    },

    handler: async (ctx, args) => {

        const userId = await getAuthUserId(ctx)
        if (userId === null) {
            return null
        }

        return await ctx.db.insert("product", {
            name: args.name,
            sku: args.sku,
            desc: args.desc,
            price: args.price,
            quantity: args.quantity,
            isFeatured: args.isFeatured,
            color: args.color,
            categoryID: args.categoryID,
            domainID: args.domainID,
            typeID: args.typeID,
            imageID: args.imageID
        })

    }

})

export const updateOneByID = mutation({

    args: {
        prodID: v.id("product"),
        name: v.string(),
        sku: v.string(),
        desc: v.optional(v.string()),
        price: v.number(),
        quantity: v.number(),
        isFeatured: v.boolean(),
        color: v.optional(v.string()),
        categoryID: v.id("category"),
        domainID: v.id("domain"),
        typeID: v.id("type"),
        imageID: v.optional(v.id("_storage"))
    },

    handler: async (ctx, args) => {

        const userId = await getAuthUserId(ctx)
        if (userId === null) {
            return null
        }

        const product = await ctx.db
            .query("product")
            .withIndex("by_id", q => q.eq("_id", args.prodID))
            .first()

        if (product) {
            return await ctx.db.patch(product._id, {
                name: args.name,
                sku: args.sku,
                desc: args.desc,
                price: args.price,
                quantity: args.quantity,
                isFeatured: args.isFeatured,
                color: args.color,
                categoryID: args.categoryID,
                domainID: args.domainID,
                typeID: args.typeID,
                imageID: args.imageID
            })
        }

    }

})

export const deleteProductByID = mutation({

    args: { productID: v.id("product") },

    handler: async (ctx, { productID }) => {

        const userId = await getAuthUserId(ctx)
        if (userId === null) {
            return null
        }

        const product = await ctx.db
            .query("product")
            .withIndex("by_id", q => q.eq("_id", productID))
            .first()

        if (product && product.imageID) {
            await ctx.storage.delete(product.imageID)
        }

        await ctx.db.delete(productID)

    }

})

export const authorizeOrder = mutation({

    args: {
        products: v.array(
            v.object(
                { productID: v.id("product"), userQuantity: v.number() }
            )
        )
    },

    handler: async (ctx, { products }) => {

        const userId = await getAuthUserId(ctx)
        if (userId === null) {
            return null
        }

        await Promise.all(
            products.map(async p => {
                const product = await ctx.db
                    .query("product")
                    .withIndex("by_id", q => q.eq("_id", p.productID))
                    .first()
                if (product) {
                    if (product.quantity >= p.userQuantity) {
                        await ctx.db.patch(product._id, { quantity: product.quantity - p.userQuantity })
                    }

                }
            }))

    }

})

export const searchKeywords = query({

    args: { searchTerm: v.string() },

    handler: async (ctx, { searchTerm }) => {

        const formatted = searchTerm.trim().toLowerCase()
        if (!formatted) return []

        const products = await ctx.db.query("product").collect()

        return products
            .filter(p => {
                const name = p.name?.toLowerCase() ?? ""
                const sku = p.sku?.toLowerCase() ?? ""
                return name.includes(formatted) || sku.includes(formatted)
            })
            .slice(0, 10)
    }

})
