import { Product } from '@/types/product';
import Image from 'next/image';
import StarRating from '../../../components/starRating';
import Link from 'next/link';
import { ROUTES } from '@/config/routes';

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="min-w-[160px] flex flex-col items-start md:mb-5 md:mt-5 rounded-xl md:p-4 transition-transform duration-500 ease-out hover:scale-105 hover:-translate-y-2 hover:shadow-md">
      <div className="aspect-square overflow-hidden rounded-xl bg-[#f2f2f2]">
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={300}
          className="object-cover w-full h-full"
        />
      </div>
      <div className="block w-full text-start">
        <Link href={`${ROUTES.PRODUCT}/${product.id}`}>
          <h4 className="text-lg font-bold mb-2 truncate">{product.name}</h4>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-2 text-sm mb-2">
        <StarRating rating={product.rating} />
        <p>{product.rating}/5</p>
      </div>
      <div className="flex justify-center gap-2 items-center">
        <h3 className="text-lg font-bold">${product.price}</h3>
        {product.oldPrice && (
          <h3 className="line-through text-gray-400 text-sm">
            ${product.oldPrice}
          </h3>
        )}
        {product.discount && (
          <span className="bg-red-100 text-red-500 text-xs rounded-full px-2 py-1">
            {product.discount}
          </span>
        )}
      </div>
    </div>
  );
}
