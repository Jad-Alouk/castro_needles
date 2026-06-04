import { mutation, query } from "./_generated/server"
import { v } from "convex/values"


export const getAll = query({

    args: {},

    handler: async (ctx) => {
        return await ctx.db.query("category").collect()
    }

})

export const collectAll = query({

    args: { andGrab: v.optional(v.string()) },

    handler: async (ctx, { andGrab }) => {

        const plainCategoryData = await ctx.db.query("category").collect()

        if (andGrab === "media") {
            return await Promise.all(
                plainCategoryData.map(
                    async c => ({
                        ...c,
                        imageUrl: c.imageID ? await ctx.storage.getUrl(c.imageID) : null
                    })
                ))
        }

        return plainCategoryData

    }

})

export const createNew = mutation({

    args: {
        name: v.string(),
        slug: v.string(),
        imageID: v.optional(v.id("_storage"))
    },

    handler: async (ctx, args) => {
        return await ctx.db.insert("category", {
            name: args.name,
            slug: args.slug,
            imageID: args.imageID
        })
    }

})