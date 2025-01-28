import { get_products } from "@/pages/api/products";

export default function Home() {

  const products = get_products();

  return (
    <div className="p-4">
      <p className="text-2xl">Sorcerer's Supply</p>
      <p>Products</p>
      <div className="bg-gray-500 p-4 gap-4 flex flex-row flex-wrap justify-center">
        {products.map((product, i) => {
          return (
            <div className="bg-white rounded p-4 aspect-square w-48" key={i}>
              <p>{product.name}</p>
              <p>{product.price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}