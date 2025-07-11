import Image from 'next/image';
import Link from 'next/link';
import StarRating from '@/components/starRating';
import { ROUTES } from '@/config/routes';
import { getPriceInfo } from '../utils/formatCurrency';
import { Product } from '@/types/product';

interface Props {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = '' }: Props) {
  const isSimple = product.__typename === 'SimpleProduct';
  const isVariable = product.__typename === 'VariableProduct';

  const price = isSimple || isVariable ? product.price : null;
  const regularPrice = isSimple || isVariable ? product.regularPrice : null;
  const { displayPrice, oldPrice, discountPercent } = getPriceInfo(
    price,
    regularPrice
  );

  const imageUrl = product.image?.sourceUrl || '/placeholder.jpg';
  const altText = product.image?.altText || product.name || 'Product image';

  return (
    <div
      className={`${className} min-w-[160px] md:max-w-[400px] flex flex-col items-start md:mb-5 md:mt-5 rounded-xl md:p-4 transition-transform duration-500 ease-out hover:scale-105 hover:-translate-y-2 hover:shadow-md`}
    >
      <div className="aspect-square overflow-hidden rounded-xl bg-[#f2f2f2] w-full">
        <Image
          src={imageUrl}
          alt={altText}
          width={800}
          height={800}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="block w-full text-start mt-3">
        <Link href={`${ROUTES.PRODUCT}/${product.slug}`}>
          <h4 className="text-xl font-bold mb-2 truncate">{product.name}</h4>
        </Link>
      </div>

      <div className="flex items-center justify-start gap-2 text-xs mb-2">
        <StarRating rating={product.averageRating || 5} />
        <p>{product.averageRating || 5}/5</p>
      </div>

      <div className="flex gap-2 items-center">
        {displayPrice && (
          <h3 className="md:text-2xl text-xl font-bold text-primary">
            {displayPrice}
          </h3>
        )}
        {oldPrice && (
          <h3 className="line-through text-gray-400 md:text-2xl text-xl font-bold">
            {oldPrice}
          </h3>
        )}
        {discountPercent && (
          <span className="bg-red-100 text-red-500 text-xs rounded-full px-2 py-1">
            -{discountPercent}
          </span>
        )}
      </div>
    </div>
  );
}
