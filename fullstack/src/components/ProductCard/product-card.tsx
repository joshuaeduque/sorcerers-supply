import {
    Card,
    CardContent,
    CardFooter,
} from "@/components/ui/card"


interface ProductCardProps {
    key?: string,
    name?: string,
    price?: number,
    imageSrc?: string
}

export function ProductCard({ name = 'Name', price = 0.00, imageSrc = '/next.svg' }: ProductCardProps) {
    return (
        <Card className="md:w-48 w-28 group cursor-pointer shadow-white hover:shadow-white hover:shadow-md transition-all duration-300">
            <CardContent>
                <div className="mt-4 overflow-hidden md:h-40 h-20 grid w-full place-items-center rounded-lg">
                    <img src={imageSrc} className="h-full w-full object-fill group-hover:scale-110 transition-all duration-300"/>
                </div>
            </CardContent>
            <CardFooter>
                <div>
                    <p>{name}</p>
                    <p className="text-gray-400 text-sm">${price}</p>
                </div>
            </CardFooter>
        </Card>
    );
}