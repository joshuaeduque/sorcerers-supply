import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from "@/components/ui/card"


interface ProductCardProps {
    key?: string,
    name: string,
    price: number,
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

interface ProductCardFullProps {
    key?: string;
    name: string;
    price: number;
    imageSrc?: string;
  }
  
  export function ProductCardFull({
    name = 'Name',
    price = 0.0,
    imageSrc = '/next.svg',
  }: ProductCardFullProps) {
    return (
      <Card className="min-h-[80vh] max-h-[80vh] w-full h-full group cursor-pointer transition-all duration-300">
        <CardContent>
          <div className="min-h-[70vh] max-h-[70vh] overflow-hidden h-full w-full grid place-items-center rounded-lg">
            <img
              src={imageSrc}
              alt={name}
              className="pt-8 rounded-lg min-h-[70vh] max-h-[70vh] h-full w-full object-fill group-hover:scale-110 transition-all duration-300"
            />
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