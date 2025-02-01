import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

interface ProductCardProps {
    name?: string,
    price?: string,
    imageSrc?: string
}

export function ProductCard({ name = 'Name', price = '$0.00', imageSrc = '/next.svg' }: ProductCardProps) {
    return (
        <Card className="w-48">
            <CardHeader></CardHeader>
            <CardContent>
                <img src={imageSrc} />
            </CardContent>
            <CardFooter>
                <div>
                    <p>{name}</p>
                    <p className="text-gray-400">{price}</p>
                </div>
            </CardFooter>
        </Card>
    );
}