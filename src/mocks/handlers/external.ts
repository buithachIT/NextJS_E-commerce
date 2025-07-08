import { CATEGORY, PRODUCT_MOCK } from '../datas/product';
import { http, HttpResponse } from 'msw';
import { apiPath } from '../../lib/api/utils';
import { CUSTOMER_REVIEWS } from '../datas/rating';
import { CART_MOCK } from '../datas/cart';
import { CUSTOMER_REVIEWS_BY_PRODUCT } from '../datas/ratingByProduct';
import { PROMO_CODES } from '../datas/promoCodes';
export const EXTERNAL_HANDLERS = [
  http.get(apiPath('/v1/product/search'), async ({ request }) => {
    console.log('MSW request:', request);
    const url = new URL(request.url);
    const sortBy = url.searchParams.get('sortBy') || 'createdAt';
    const orderBy = url.searchParams.get('orderBy') || 'desc';

    const sortedProducts = [...PRODUCT_MOCK];

    if (sortBy === 'sold') {
      sortedProducts.sort((a, b) => {
        return orderBy === 'desc' ? b.sold - a.sold : a.sold - b.sold;
      });
    }
    return HttpResponse.json({ data: sortedProducts });
  }),
  //Mock api reviewer
  http.get(apiPath('/v1/reviews'), async () => {
    return HttpResponse.json({ data: CUSTOMER_REVIEWS });
  }),

  //Mock api reviewer by productId
  http.get(apiPath('/v1/reviews/product/:productId'), async ({ params }) => {
    const { productId } = params;
    const productReviews = CUSTOMER_REVIEWS_BY_PRODUCT.filter(
      (review) => review.productId === productId
    );
    return HttpResponse.json({ data: productReviews });
  }),

  //Mock api cart
  http.get(apiPath('/v1/cart'), async () => {
    return HttpResponse.json({ data: CART_MOCK });
  }),

  http.get(apiPath('/v1/category'), async () => {
    return HttpResponse.json({ data: CATEGORY });
  }),
  //get product by id
  http.get(apiPath('/v1/product/:id'), async ({ params }) => {
    const { id } = params;

    const product = PRODUCT_MOCK.find((p) => p.id === id);

    if (!product) {
      return HttpResponse.json(
        { message: 'Product not found' },
        { status: 404 }
      );
    }

    return HttpResponse.json({ data: product });
  }),
  //Filter
  http.get(apiPath('/v1/product'), async ({ request }) => {
    const url = new URL(request.url);

    const rawQuery = url.searchParams.get('query') || '{}';
    const parsedQuery = JSON.parse(rawQuery);

    const categoryId = url.searchParams.get('categoryId');
    const sizes: string[] = parsedQuery.size || [];
    const colors: string[] = parsedQuery.color?.map((c: string) => c.toLowerCase()) || [];
    const minPrice: number = parsedQuery.price?.[0] ?? 0;
    const maxPrice: number = parsedQuery.price?.[1] ?? 99999;
    const sortBy = url.searchParams.get('sortBy') || 'createdAt';
    const orderBy = url.searchParams.get('orderBy') || 'desc';
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '9');

    const filteredProducts = PRODUCT_MOCK.filter((product) => {
      const matchCategory = !categoryId || product.categoryId === categoryId;

      const productColors = product.variants.map((v) => v.colorCode.toLowerCase());
      const matchColor = colors.length === 0 || colors.every((c) => productColors.includes(c));

      const matchVariant = product.variants.some((variant) => {
        const matchSize =
          sizes.length === 0 || sizes.every((s) =>
            variant.sizes.some((vSize) => vSize.label === s)
          );

        const matchPrice = variant.price >= minPrice && variant.price <= maxPrice;

        return matchSize && matchPrice;
      });

      return matchCategory && matchColor && matchVariant;
    });

    //Sort
    filteredProducts.sort((a, b) => {
      const valueA = a[sortBy as keyof typeof a];
      const valueB = b[sortBy as keyof typeof b];

      if (typeof valueA === 'number' && typeof valueB === 'number') {
        return orderBy === 'desc' ? valueB - valueA : valueA - valueB;
      }

      if (typeof valueA === 'string' && typeof valueB === 'string') {
        return orderBy === 'desc'
          ? valueB.localeCompare(valueA)
          : valueA.localeCompare(valueB);
      }

      return 0;
    });

    // Phân trang
    const start = (page - 1) * limit;
    const paginated = filteredProducts.slice(start, start + limit);

    return HttpResponse.json({
      data: paginated,
      meta: {
        total: filteredProducts.length,
        page,
        limit,
        totalPages: Math.ceil(filteredProducts.length / limit),
      },
    });
  }),

  //Mock cart API
  http.get(apiPath('/v1/cart'), async () => {
    const cartWithDetails = CART_MOCK.map((item) => {
      const product = PRODUCT_MOCK.find((p) => p.id === item.productId);
      const variant = product?.variants.find((v) => v.id === item.variant.id);

      return {
        productId: item.productId,
        variantId: item.variant.id,
        name: product?.name || '',
        image: variant?.thumbnail || product?.image || '',
        price: variant?.price || product?.price || 0,
        size: item.variant.size,
        color: variant?.colorName || '',
        colorCode: variant?.colorCode || '',
        quantity: item.quantity,
      };
    });

    return HttpResponse.json({ data: cartWithDetails });
  }),

  http.get(apiPath('/v1/discount'), async ({ request }) => {
    const url = new URL(request.url);
    const code = url.searchParams.get('code')?.toUpperCase();

    const discount = PROMO_CODES.find(d => d.code === code);

    if (!discount) {
      return HttpResponse.json({ error: 'Mã giảm giá không hợp lệ' }, { status: 404 });
    }

    return HttpResponse.json({ data: discount });
  }),

];
