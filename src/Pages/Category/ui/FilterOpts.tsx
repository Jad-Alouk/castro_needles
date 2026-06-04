import { STATIC_DOMAINS } from "@/constants"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { Dispatch, SetStateAction } from "react"


export const FilterOpts = (
    { opts, setter }: { opts: string[], setter: Dispatch<SetStateAction<string[]>> }
) => {

    return (
        <div className="w-full py-2">

            <ToggleGroup
                type="multiple"
                size="default"
                spacing={2}
                className="flex w-full flex-wrap justify-center gap-2"
                value={opts}
                onValueChange={v => setter(v)}
            >
                {
                    STATIC_DOMAINS.map(
                        d => <ToggleGroupItem
                            key={d.name}
                            value={d.name.toLowerCase()}
                        >
                            {d.name}
                        </ToggleGroupItem>
                    )
                }
            </ToggleGroup>

        </div>
    )

}