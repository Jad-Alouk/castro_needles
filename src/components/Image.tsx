import placeholder from "../assets/product-placeholder.webp"

type ImgSize = "sm" | "md" | "lg" | number
const strToNum = { sm: 70, md: 120, lg: 170 }


export const Image = (
    { src, alt, size, custom }:
        {
            src?: string | null,
            alt?: string | null,
            size: ImgSize,
            custom?: string
        }
) => {

    return (
        <img
            className={custom ?? "border-2 rounded-md"}
            src={src ?? placeholder}
            alt={`${alt}-img`}
            width={typeof (size) === "string" ? strToNum[size] : size}
        />
    )

}