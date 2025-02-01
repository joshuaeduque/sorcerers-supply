import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Key } from "react";

interface ProductCardProps {
    key: Key,
    name: string,
    price: string
}

export function ProductCard(props : ProductCardProps) {
    return (
        <Card className="w-48" key={props.key}>
            <CardHeader></CardHeader>
            <CardContent>
                <img src="/next.svg" />
            </CardContent>
            <CardFooter>
                <div>
                    <p>{props.name}</p>
                    <p className="text-gray-400">{props.price}</p>
                </div>
            </CardFooter>
        </Card>
    );
}