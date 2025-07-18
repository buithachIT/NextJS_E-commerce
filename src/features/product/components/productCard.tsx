import Image from 'next/image';
import Link from 'next/link';
import StarRating from '@/components/starRating';
import { ROUTES } from '@/config/routes';
import { extractPriceInfo } from '@/helper/formatCurrency';
import { Product } from '@/types/product';
import { isSimpleProduct, isVariableProduct } from '@/helper/isTypeProduct';

interface Props {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = '' }: Props) {
  const isProduct =
    product.__typename === 'SimpleProduct' ||
    product.__typename === 'VariableProduct';
  if (!isProduct) return null;

  const isSimple = isSimpleProduct(product);
  const isVariable = isVariableProduct(product);
  const regularPrice = isSimple || isVariable ? product.regularPrice : null;
  const { price, image, slug, name } = product;
  const imageUrl = image?.sourceUrl || '/placeholder.jpg';
  const { salePrice, oldPrice, discountPercentage } = extractPriceInfo(
    price,
    regularPrice
  );
  let averageRating = 5;
  if ('averageRating' in product && product.averageRating !== null) {
    averageRating = Number(product.averageRating) || 5;
  }
  return (
    <div
      className={`${className} min-w-[160px] md:max-w-[400px] flex flex-col items-start md:mb-5 md:mt-5 rounded-xl md:p-4 transition-transform duration-500 ease-out hover:scale-105 hover:-translate-y-2 hover:shadow-md`}
    >
      <div className="aspect-square overflow-hidden rounded-xl bg-[#f2f2f2] w-full">
        <Image
          src={imageUrl}
          alt={name || 'Product image'}
          width={800}
          height={800}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="block w-full text-start mt-3">
        <Link href={`${ROUTES.PRODUCT}/${slug}`}>
          <h4 className="text-xl font-bold mb-2 truncate">{name}</h4>
        </Link>
      </div>

      <div className="flex items-center justify-start gap-2 text-xs mb-2">
        <StarRating rating={averageRating || 5} />
        <p>{averageRating || 5}/5</p>
      </div>

      <div className="flex gap-2 items-center">
        {salePrice && (
          <h3 className="md:text-2xl text-xl font-bold text-primary">
            ${salePrice}
          </h3>
        )}
        {oldPrice && (
          <h3 className="line-through text-gray-400 md:text-2xl text-xl font-bold">
            ${oldPrice}
          </h3>
        )}
        {discountPercentage && (
          <span className="bg-red-100 text-red-500 text-xs rounded-full px-2 py-1">
            -{discountPercentage}
          </span>
        )}
      </div>
    </div>
  );
}
