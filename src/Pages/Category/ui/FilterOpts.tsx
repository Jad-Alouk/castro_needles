import { STATIC_DOMAINS } from "@/constants"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import type { Dispatch, SetStateAction } from "react"


export const FilterOpts = (
    { opts, setter }: { opts: string[], setter: Dispatch<SetStateAction<string[]>> }
) => {

    return (
        <div className="m-10">

            <ToggleGroup
                type="multiple"
                size={"lg"} spacing={2}
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