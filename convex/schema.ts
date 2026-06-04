import { defineSchema, defineTable } from "convex/server"
import { authTables } from "@convex-dev/auth/server"
import { v } from "convex/values"


export default defineSchema({

    category: defineTable({
        name: v.string(),
        slug: v.string(),
        imageID: v.optional(v.id("_storage"))
    })
        .index("by_slug", ["slug"]),

    domain: defineTable({
        name: v.string(),
        slug: v.string()
    }),

    type: defineTable({
        name: v.string(),
        slug: v.string()
    }),

    product: defineTable({
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
    })
        .index("by_categoryID", ["categoryID"])
        .index("by_featured_category", ["categoryID", "isFeatured"]),

    ...authTables

})