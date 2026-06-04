import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { BRAND } from "@/constants"


export const AboutPage = () => {
    return (
        <main className="mx-auto max-w-3xl px-4 py-6 sm:px-6 sm:py-8">
            <Card>
                <CardHeader>
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                        {BRAND.logo && (
                            <img src={BRAND.logo} alt={`${BRAND.name} logo`} className="h-12 w-12 object-contain" />
                        )}
                        <div>
                            <CardTitle>{BRAND.title || `About ${BRAND.name}`}</CardTitle>
                            {BRAND.subtitle && <CardDescription>{BRAND.subtitle}</CardDescription>}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {BRAND.image && (
                        <img src={BRAND.image} alt={`${BRAND.name} hero`} className="mb-4 w-full rounded-md object-cover" />
                    )}
                    <p className="text-sm text-muted-foreground mb-2">{BRAND.oneLiner}</p>
                    <p className="text-sm">{BRAND.extra}</p>
                </CardContent>
            </Card>
        </main>
    )
}