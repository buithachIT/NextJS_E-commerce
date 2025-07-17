import StarRating from '@/components/starRating';
import { getPriceInfo } from '../../../utils/formatCurrency';
import parse from 'html-react-parser';
import {
  hasPrice,
  isSimpleProduct,
  isVariableProduct,
} from '@/helper/isTypeProduct';
import { ProductTypeBySlugQuery } from '@/types/product';
import ProductVariantDetail from './ProductVariantDetail';

export default function ProductVariant({
  product,
}: {
  product: ProductTypeBySlugQuery;
}) {
  const isSimple = isSimpleProduct(product);
  const isVariable = isVariableProduct(product);

  if (!hasPrice(product)) return null;

  const price = isSimple || isVariable ? product.price : null;
  const regularPrice = isSimple || isVariable ? product.regularPrice : null;
  const { displayPrice, oldPrice, discountPercent } = getPriceInfo(
    price,
    regularPrice
  );

  return (
    <div className="md:flex-col md:pl-5 md:w-1/2 md:justify-between">
      <h2 className="md:text-[40px] text-2xl md:pt-0 pt-5 font-display pb-5 font-bold">
        {product.name}
      </h2>
      <div className="flex">
        <StarRating rating={product.averageRating ?? 5} />
        <span className="ml-2">{product.averageRating}/5</span>
      </div>
      <div className="flex pt-5 ">
        <h3 className="text-2xl md:text-[32px] font-bold mr-2">
          {displayPrice}
        </h3>
        {oldPrice && (
          <h3 className="line-through text-gray-400 md:text-[32px] font-bold mr-2 text-2xl">
            {oldPrice}
          </h3>
        )}
        {discountPercent && (
          <span className="bg-red-100 text-red-500 text-md rounded-4xl w-20 flex justify-center items-center px-2">
            {discountPercent}
          </span>
        )}
      </div>
      <div className="text-gray-400 text-md pt-5">
        {parse(product.shortDescription || '')}
      </div>
      <hr className="my-4 w-full  mx-auto border-t border-gray-300" />
      <ProductVariantDetail product={product} />
    </div>
  );
}
