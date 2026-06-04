import { type RefObject } from "react"

import {
    Field,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"

import { Image } from "@/components/Image"
import type { Product } from "@/types"


export const ProductForm = (
    { preLoadedData, fileInputRef }: {
        preLoadedData: Partial<Product> | undefined | null
        fileInputRef: RefObject<HTMLInputElement | null>
    }
) => {

    const categories = useQuery(api.category.getAll)
    const domains = useQuery(api.domain.getAll)
    const types = useQuery(api.type.getAll)

    return (
        <>
            <FieldSet className="w-full max-w-2xl">
                <FieldGroup>
                    <Field>
                        <FieldLabel htmlFor="name">Name</FieldLabel>
                        <Input
                            id="name"
                            name="name"
                            autoComplete="off"
                            defaultValue={preLoadedData?.name}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="sku">SKU</FieldLabel>
                        <Input
                            id="sku"
                            name="sku"
                            autoComplete="off"
                            defaultValue={preLoadedData?.sku}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="desc">Description</FieldLabel>
                        <Input
                            id="desc"
                            name="desc"
                            autoComplete="off"
                            defaultValue={preLoadedData?.desc}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="price">Price</FieldLabel>
                        <Input
                            id="price"
                            name="price"
                            autoComplete="off"
                            defaultValue={preLoadedData?.price}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="quantity">Quantity</FieldLabel>
                        <Input
                            id="quantity"
                            name="quantity"
                            autoComplete="off"
                            defaultValue={preLoadedData?.quantity}
                        />
                    </Field>
                    <Field>
                        <FieldLabel htmlFor="color">Color</FieldLabel>
                        <Input
                            id="color"
                            name="color"
                            autoComplete="off"
                            defaultValue={preLoadedData?.color}
                        />
                    </Field>
                    <Select name="category" defaultValue={preLoadedData?.categoryID}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Category</SelectLabel>
                                {categories?.map(
                                    c => <SelectItem
                                        key={c.slug}
                                        value={c._id}
                                    >
                                        {c.name}
                                    </SelectItem>
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select name="domain" defaultValue={preLoadedData?.domainID}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Domain" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Domain</SelectLabel>
                                {domains?.map(
                                    d => <SelectItem
                                        key={d.slug}
                                        value={d._id}
                                    >
                                        {d.name}
                                    </SelectItem>
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Select name="type" defaultValue={preLoadedData?.typeID}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Type</SelectLabel>
                                {types?.map(
                                    t => <SelectItem
                                        key={t.slug}
                                        value={t._id}
                                    >
                                        {t.name}
                                    </SelectItem>
                                )}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {
                        preLoadedData?.imageUrl &&
                        <Image src={preLoadedData.imageUrl} size={"md"} />
                    }
                    <Input
                        className="block w-full text-sm border cursor-pointer"
                        type="file"
                        ref={fileInputRef}
                    />
                    <div className="flex items-center space-x-2">
                        <Switch
                            id="isFeatured"
                            name="isFeatured"
                            defaultChecked={!!preLoadedData?.isFeatured}
                        />
                        <Label htmlFor="isFeatured">Featured</Label>
                    </div>
                </FieldGroup>
            </FieldSet>
            <div className="my-5 flex w-full justify-center">
                <Button type="submit" className="w-full sm:w-auto">{preLoadedData ? "Update" : "Create"}</Button>
            </div>
        </>
    )

}